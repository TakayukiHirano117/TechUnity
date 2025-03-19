"use client";

import MDEditor from "@uiw/react-md-editor";
import { format } from "date-fns";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaReply } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import useSWR from "swr";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import LoginDialog from "@/components/molecules/dialog/LoginDialog";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  user: {
    id: string;
    name: string;
    image: string;
  };
  replies?: Comment[];
}

interface CommentSectionProps {
  recruitId: string;
}

const getComments = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" });
  const json = await response.json();
  return json;
};

// コメントアイテムコンポーネント（再帰的に使用）
const CommentItem = ({ 
  comment, 
  session, 
  replyToId, 
  setReplyToId, 
  replyContent, 
  setReplyContent, 
  isSubmitting, 
  handleSubmitReply 
}: { 
  comment: Comment;
  session: Session | null;
  replyToId: string | null;
  setReplyToId: (id: string | null) => void;
  replyContent: string;
  setReplyContent: (content: string) => void;
  isSubmitting: boolean;
  handleSubmitReply: (parentId: string) => Promise<void>;
}) => {
  return (
    <div className="border-b pb-4">
      <div className="flex items-center gap-3 mb-2">
        <AvatarIcon
          ImageSrc={comment.user.image}
          fallbackText={comment.user.name}
          className="w-8 h-8 border"
        />
        <div>
          <p className="font-semibold">{comment.user.name}</p>
          <p className="text-xs text-slate-500">
            {format(new Date(comment.createdAt), "yyyy/MM/dd HH:mm")}
          </p>
        </div>
      </div>
      <div className="pl-11">
        <MDEditor.Markdown
          source={comment.content}
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeSanitize]}
          className="prose prose-sm max-w-none"
        />
        
        {session && (
          <div className="mt-2">
            <button
              onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {replyToId === comment.id ? (
                <IoMdClose className="text-lg" />
              ) : (
                <>
                  <FaReply className="text-sm" />
                  <span className="text-xs">返信</span>
                </>
              )}
            </button>
          </div>
        )}
        
        {replyToId === comment.id && (
          <div className="mt-3">
            <div data-color-mode="light">
              <MDEditor
                value={replyContent}
                onChange={(value) => setReplyContent(value || "")}
                preview="edit"
                height={150}
                visibleDragbar={false}
                textareaProps={{
                  placeholder: "返信を入力してください...",
                }}
                previewOptions={{
                  remarkPlugins: [remarkGfm, remarkBreaks],
                  rehypePlugins: [rehypeSanitize],
                }}
              />
            </div>
            <div className="mt-2 flex justify-end">
              <MainButton
                onClick={() => handleSubmitReply(comment.id)}
                disabled={isSubmitting || !replyContent.trim()}
                className="rounded-full font-bold text-sm py-1 px-3"
              >
                {isSubmitting ? "送信中..." : "返信する"}
              </MainButton>
            </div>
          </div>
        )}
        
        {/* 返信コメントを表示 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 ml-4 space-y-4 border-l-2 border-gray-200 pl-4">
            {comment.replies.map((reply) => (
              <CommentItem 
                key={reply.id} 
                comment={reply} 
                session={session}
                replyToId={replyToId}
                setReplyToId={setReplyToId}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                isSubmitting={isSubmitting}
                handleSubmitReply={handleSubmitReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentSection = ({ recruitId }: CommentSectionProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  const {
    data: comments,
    error,
    isLoading,
    mutate,
  } = useSWR<Comment[]>(`/api/recruits/${recruitId}/comments`, getComments);

  // トップレベルのコメントのみをフィルタリング
  const topLevelComments = comments?.filter(comment => !comment.parentId) || [];

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      toast({
        title: "エラー",
        description: "コメントを入力してください。",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/recruits/${recruitId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!response.ok) {
        throw new Error("コメントの投稿に失敗しました。");
      }

      setComment("");
      toast({
        title: "成功",
        description: "コメントを投稿しました。",
      });
      mutate(); // Refresh comments
    } catch (error) {
      toast({
        title: "エラー",
        description: "コメントの投稿に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) {
      toast({
        title: "エラー",
        description: "返信内容を入力してください。",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/recruits/${recruitId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          content: replyContent,
          parentId
        }),
      });

      if (!response.ok) {
        throw new Error("返信の投稿に失敗しました。");
      }

      setReplyContent("");
      setReplyToId(null);
      toast({
        title: "成功",
        description: "返信を投稿しました。",
      });
      mutate(); // Refresh comments
    } catch (error) {
      toast({
        title: "エラー",
        description: "返信の投稿に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white border sm:rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">コメント</h2>

      {session ? (
        <div className="mb-6">
          <div data-color-mode="light">
            <MDEditor
              value={comment}
              onChange={(value) => setComment(value || "")}
              preview="edit"
              height={200}
              visibleDragbar={false}
              textareaProps={{
                placeholder: "コメントを入力してください...",
              }}
              previewOptions={{
                remarkPlugins: [remarkGfm, remarkBreaks],
                rehypePlugins: [rehypeSanitize],
              }}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <MainButton
              onClick={handleSubmitComment}
              disabled={isSubmitting || !comment.trim()}
              className="rounded-full font-bold"
            >
              {isSubmitting ? "送信中..." : "コメントを投稿"}
            </MainButton>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-slate-100 rounded-lg text-center">
          <p className="mb-2">コメントを投稿するにはログインが必要です。</p>
          <LoginDialog
            trigger={
              <MainButton className="rounded-full font-bold">
                ログインしてコメントする
              </MainButton>
            }
          />
        </div>
      )}

      <div className="space-y-6">
        {isLoading ? (
          <p className="text-center text-slate-500">コメントを読み込み中...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            コメントの読み込みに失敗しました。
          </p>
        ) : topLevelComments.length > 0 ? (
          topLevelComments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              session={session}
              replyToId={replyToId}
              setReplyToId={setReplyToId}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              isSubmitting={isSubmitting}
              handleSubmitReply={handleSubmitReply}
            />
          ))
        ) : (
          <p className="text-center text-slate-500">
            まだコメントはありません。最初のコメントを投稿しましょう！
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import { z } from "zod";

import MainButton from "@/components/atoms/button/MainButton";
import CommentItem, {
  Comment,
} from "@/components/molecules/comments/CommentItem";
import LoginDialog from "@/components/molecules/dialog/LoginDialog";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

type CommentSectionProps = {
  recruitId: string;
};

// コメントフォームのバリデーションスキーマ
const commentFormSchema = z.object({
  content: z.string().min(1, { message: "コメントを入力してください。" }),
});

// 返信フォームのバリデーションスキーマ
const replyFormSchema = z.object({
  content: z.string().min(1, { message: "返信内容を入力してください。" }),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;
type ReplyFormValues = z.infer<typeof replyFormSchema>;

const getComments = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" });
  const json = await response.json();
  return json;
};

const CommentSection = ({ recruitId }: CommentSectionProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [replyToId, setReplyToId] = useState<string | null>(null);

  // コメントフォーム
  const commentForm = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
    },
  });

  // 返信フォーム
  const replyForm = useForm<ReplyFormValues>({
    resolver: zodResolver(replyFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const isSubmitting =
    commentForm.formState.isSubmitting || replyForm.formState.isSubmitting;

  const {
    data: comments,
    error,
    isLoading,
    mutate,
  } = useSWR<Comment[]>(`/api/recruits/${recruitId}/comments`, getComments);

  // トップレベルのコメントのみをフィルタリング
  const topLevelComments = Array.isArray(comments)
    ? comments.filter((comment) => !comment.parentId)
    : [];

  const handleSubmitComment = async (values: CommentFormValues) => {
    try {
      const response = await fetch(`/api/recruits/${recruitId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: values.content }),
      });

      if (!response.ok) {
        throw new Error("コメントの投稿に失敗しました。");
      }

      commentForm.reset();
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
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    try {
      const values = replyForm.getValues();

      const response = await fetch(`/api/recruits/${recruitId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: values.content,
          parentId,
        }),
      });

      if (!response.ok) {
        throw new Error("返信の投稿に失敗しました。");
      }

      replyForm.reset();
      setReplyToId(null);
      toast({
        title: "成功",
        description: "コメントを投稿しました。",
      });
      mutate(); // Refresh comments
    } catch (error) {
      toast({
        title: "エラー",
        description: "返信の投稿に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-2 bg-white border p-6 sm:rounded-lg">
      <h2 className="text-xl font-bold mb-6">コメント</h2>

      {session ? (
        <div className="mb-6">
          <Form {...commentForm}>
            <form onSubmit={commentForm.handleSubmit(handleSubmitComment)}>
              <FormField
                control={commentForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div data-color-mode="light">
                        <MDEditor
                          value={field.value}
                          onChange={(value) => field.onChange(value || "")}
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
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="mt-4 flex justify-end">
                <MainButton
                  type="submit"
                  disabled={isSubmitting || !commentForm.formState.isValid}
                  className="rounded-full font-bold"
                >
                  {commentForm.formState.isSubmitting
                    ? "送信中..."
                    : "コメントを投稿"}
                </MainButton>
              </div>
            </form>
          </Form>
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
              replyForm={replyForm}
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

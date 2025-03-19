"use client";

import MDEditor from "@uiw/react-md-editor";
import { format } from "date-fns";
import { Session } from "next-auth";
import { UseFormReturn } from "react-hook-form";
import { FaReply } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";

export type Comment = {
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
};

type ReplyFormValues = {
  content: string;
};

type CommentItemProps = {
  comment: Comment;
  session: Session | null;
  replyToId: string | null;
  setReplyToId: (id: string | null) => void;
  replyForm: UseFormReturn<ReplyFormValues>;
  isSubmitting: boolean;
  handleSubmitReply: (parentId: string) => Promise<void>;
};

const CommentItem = ({
  comment,
  session,
  replyToId,
  setReplyToId,
  replyForm,
  isSubmitting,
  handleSubmitReply,
}: CommentItemProps) => {
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
              onClick={() =>
                setReplyToId(replyToId === comment.id ? null : comment.id)
              }
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReply(comment.id);
              }}
            >
              <div data-color-mode="light">
                <MDEditor
                  value={replyForm.watch("content")}
                  onChange={(value) =>
                    replyForm.setValue("content", value || "", {
                      shouldValidate: true,
                    })
                  }
                  preview="edit"
                  height={150}
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
              <div className="mt-2 flex justify-end">
                <MainButton
                  type="submit"
                  disabled={isSubmitting || !replyForm.formState.isValid}
                  className="rounded-full font-bold text-sm py-1 px-3"
                >
                  {isSubmitting ? "送信中..." : "返信する"}
                </MainButton>
              </div>
            </form>
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
                replyForm={replyForm}
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

export default CommentItem;

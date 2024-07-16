import { z } from "zod";

export const CommentValidator = z.object({
  postId: z.string(),
  text: z.string(),
  replyToId: z.string().optional(),
});

export type CreateCommentRequest = z.infer<typeof CommentValidator>;

import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { PostValidator } from "@/lib/validators/post";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, content, subredditId } = PostValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists)
      return new Response("Subscribe to this subreddit to post", {
        status: 400,
      });

    const post = await db.post.create({
      data: {
        title,
        content,
        subredditId,
        authorId: session.user.id,
      },
    });

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Invalid POST request data passed", { status: 422 });

    return new Response(
      "Could not create post to this subreddit at this time, please try again later",
      { status: 500 }
    );
  }
}

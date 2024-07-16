import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { SubredditSubscriberValidator } from "@/lib/validators/subreddit";
import { db } from "@/lib/db";

export const handler = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();

    const { subredditId } = SubredditSubscriberValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (req.method === "POST") {
      if (subscriptionExists)
        return new Response("You are already subscribed to this subreddit", {
          status: 400,
        });

      await db.subscription.create({
        data: {
          subredditId,
          userId: session.user.id,
        },
      });
    } else if (req.method === "DELETE") {
      if (!subscriptionExists)
        return new Response("You are not subscribed to this subreddit", {
          status: 400,
        });

      await db.subscription.delete({
        where: {
          userId_subredditId: {
            subredditId,
            userId: session.user.id,
          },
        },
      });
    }

    return new Response(subredditId);
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Invalid request data passed", { status: 422 });

    return new Response("Could not subscribe, please try again later", {
      status: 500,
    });
  }
};

export { handler as POST, handler as DELETE };

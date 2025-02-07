import { httpRouter } from "convex/server";

import { internal } from "@/convex/_generated/api";
import { httpAction } from "@/convex/_generated/server";
import { validateRequest } from "@/lib/utils";

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const event = await validateRequest(req);

    if (!event) {
      return new Response(null, { status: 400 });
    }

    switch (event.type) {
      case "user.created":
        await ctx.runMutation(internal.users.createUser, {
          clerkId: event.data.id,
          email: event.data.email_addresses[0].email_address,
          imageUrl: event.data.image_url,
          name: event.data.first_name!,
        });
        break;
      case "user.deleted":
        await ctx.runMutation(internal.users.deleteUser, {
          clerkId: event.data.id as string,
        });
        break;
      case "user.updated":
        await ctx.runMutation(internal.users.updateUser, {
          clerkId: event.data.id,
          email: event.data.email_addresses[0].email_address,
          imageUrl: event.data.image_url,
        });
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;

import { v } from "convex/values";

import { internalMutation } from "@/convex/_generated/server";

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
  },
  handler: async (ctx, { clerkId, email, imageUrl, name }) => {
    await ctx.db.insert("users", { clerkId, email, imageUrl, name });
  },
});

import { ConvexError, v } from "convex/values";

import { internalMutation, query } from "@/convex/_generated/server";

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

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, { clerkId }) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});

export const getTopUserByPodcastCount = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    const topUsers = await Promise.all(
      users.map(async (user) => {
        const podcasts = await ctx.db
          .query("podcasts")
          .filter((q) => q.eq(q.field("authorId"), user.clerkId))
          .collect();

        const sortedPodcasts = podcasts.sort((a, b) => b.views - a.views);

        return {
          ...user,
          totalPodcasts: podcasts.length,
          podcast: sortedPodcasts.map((podcast) => ({
            podcastTitle: podcast.title,
            podcastId: podcast._id,
          })),
        };
      })
    );

    return topUsers.sort((a, b) => b.totalPodcasts - a.totalPodcasts);
  },
});

export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  async handler(ctx, { clerkId, email, imageUrl }) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, { imageUrl, email });

    const podcast = await ctx.db
      .query("podcasts")
      .filter((q) => q.eq(q.field("authorId"), clerkId))
      .collect();

    await Promise.all(
      podcast.map(async (podcast) => {
        await ctx.db.patch(podcast._id, {
          authorImageUrl: imageUrl,
        });
      })
    );
  },
});

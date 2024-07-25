import { ConvexError, v } from "convex/values";

import { mutation, query } from "@/convex/_generated/server";

export const createPodcast = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    audioUrl: v.string(),
    imageUrl: v.string(),
    voiceType: v.string(),
    imagePrompt: v.string(),
    voicePrompt: v.string(),
    views: v.number(),
    audioDuration: v.number(),
    audioStorageId: v.id("_storage"),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("No authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    await ctx.db.insert("podcasts", {
      ...args,
      user: user[0]._id,
      author: user[0].name,
      authorId: user[0].clerkId,
      authorImageUrl: user[0].imageUrl,
    });
  },
});

export const deletePodcast = mutation({
  args: {
    audioStorageId: v.id("_storage"),
    imageStorageId: v.id("_storage"),
    podcastId: v.id("podcasts"),
  },
  handler: async (ctx, { audioStorageId, imageStorageId, podcastId }) => {
    const podcast = await ctx.db.get(podcastId);

    if (!podcast) {
      throw new ConvexError("Podcast not found");
    }

    await ctx.storage.delete(audioStorageId);
    await ctx.storage.delete(imageStorageId);

    await ctx.db.delete(podcastId);
  },
});

export const getPodcastByAuthorId = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, { authorId }) => {
    const podcasts = await ctx.db
      .query("podcasts")
      .filter((q) => q.eq(q.field("authorId"), authorId))
      .collect();

    const listeners = podcasts.reduce((sum, podcast) => sum + podcast.views, 0);

    return { podcasts, listeners };
  },
});

export const getPodcastById = query({
  args: {
    podcastId: v.id("podcasts"),
  },
  handler: async (ctx, { podcastId }) => {
    const podcast = await ctx.db.get(podcastId);

    return podcast;
  },
});

export const getPodcastBySearch = query({
  args: {
    search: v.string(),
  },
  handler: async (ctx, { search }) => {
    if (search === "") {
      const podcasts = await ctx.db.query("podcasts").order("desc").collect();

      return podcasts;
    }

    const authorSearch = await ctx.db
      .query("podcasts")
      .withSearchIndex("search_author", (q) => q.search("author", search))
      .take(10);

    if (authorSearch.length > 0) {
      return authorSearch;
    }

    const titleSearch = await ctx.db
      .query("podcasts")
      .withSearchIndex("search_title", (q) => q.search("title", search))
      .take(10);

    if (titleSearch.length > 0) {
      return titleSearch;
    }

    const bodySearch = await ctx.db
      .query("podcasts")
      .withSearchIndex("search_body", (q) =>
        q.search("description" || "title", search)
      )
      .take(10);

    return bodySearch;
  },
});

export const getPodcasts = query({
  handler: async (ctx) => {
    const podcasts = await ctx.db.query("podcasts").order("desc").collect();

    return podcasts;
  },
});

export const getPodcastsByVoiceType = query({
  args: {
    podcastId: v.id("podcasts"),
  },
  handler: async (ctx, { podcastId }) => {
    const podcast = await ctx.db.get(podcastId);

    const podcasts = await ctx.db
      .query("podcasts")
      .filter((q) =>
        q.and(
          q.eq(q.field("voiceType"), podcast?.voiceType),
          q.neq(q.field("_id"), podcastId)
        )
      )
      .collect();

    return podcasts;
  },
});

export const getTrendingPodcasts = query(async (ctx) => {
  const now = new Date();

  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1)).getTime();

  const podcasts = await ctx.db
    .query("podcasts")
    .filter((q) => q.gte(q.field("_creationTime"), oneMonthAgo))
    .collect();

  return podcasts.sort((a, b) => b.views - a.views).slice(0, 8);
});

export const getLatestPodcasts = query({
  handler: async (ctx) => {
    const podcasts = await ctx.db.query("podcasts").order("asc").collect();

    return podcasts.slice(0, 4);
  },
});

export const getPopularPodcasts = query({
  handler: async (ctx) => {
    const podcasts = await ctx.db.query("podcasts").collect();

    return podcasts.sort((a, b) => b.views - a.views).slice(0, 8);
  },
});

export const getUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);

    return url;
  },
});

export const updatePodcastViews = mutation({
  args: {
    podcastId: v.id("podcasts"),
  },
  handler: async (ctx, { podcastId }) => {
    const podcast = await ctx.db.get(podcastId);

    if (!podcast) {
      throw new ConvexError("Podcast not found");
    }

    await ctx.db.patch(podcastId, { views: podcast.views + 1 });
  },
});

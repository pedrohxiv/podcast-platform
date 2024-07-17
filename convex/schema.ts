import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  podcasts: defineTable({
    audioDuration: v.number(),
    audioStorageId: v.optional(v.id("_storage")),
    audioUrl: v.optional(v.string()),
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    description: v.string(),
    imagePrompt: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    title: v.string(),
    user: v.id("users"),
    views: v.number(),
    voicePrompt: v.string(),
    voiceType: v.string(),
  })
    .searchIndex("search_author", { searchField: "author" })
    .searchIndex("search_body", { searchField: "description" })
    .searchIndex("search_title", { searchField: "title" }),

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
  }),
});

import { z } from "zod";

export const createPodcastSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
});

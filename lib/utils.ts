import type { WebhookEvent } from "@clerk/backend";
import { type ClassValue, clsx } from "clsx";
import { Webhook } from "svix";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const validateRequest = async (req: Request) => {
  const payload = await req.text();

  const headers = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let event: Event | null = null;

  try {
    event = webhook.verify(payload, headers) as Event;
  } catch (_) {
    return;
  }

  return event as unknown as WebhookEvent;
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

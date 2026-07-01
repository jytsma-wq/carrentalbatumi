import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/)
    .default("+995555000000"),
  NEXT_PUBLIC_TELEGRAM_USERNAME: z
    .string()
    .regex(/^[A-Za-z0-9_]{5,32}$/)
    .default("batumi_car_rental"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_TELEGRAM_USERNAME: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid environment variables:\n${issues}`);
}

export const env = parsed.data;

export function whatsappHref(): string {
  const number = env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}`;
}

export function telegramHref(): string {
  return `https://t.me/${env.NEXT_PUBLIC_TELEGRAM_USERNAME}`;
}

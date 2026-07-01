# Batumi Private Car Rental

Multilingual request-to-book website for one privately owned Volkswagen Passat 2013 in Batumi, Georgia.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- Public locales: `en`, `ru`, `tr`, `ka`
- File-based translations in `src/i18n/messages`
- Zod validation for booking form input
- Vitest tests for translations, pricing, validation, defaults, and overlap detection
- Prisma/PostgreSQL schema scaffold
- ESLint and Prettier

## Local Development

Install dependencies:

```bash
npm install
```

Create local environment values:

```bash
cp .env.example .env.local
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`. Unprefixed routes redirect to the best supported locale, with English as fallback.

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+995555000000
NEXT_PUBLIC_TELEGRAM_USERNAME=batumi_car_rental
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/carrentalbatumi
ADMIN_USERNAME=owner
ADMIN_PASSWORD=change-me
```

Admin routes use Basic authentication through `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
npm run db:generate
npm run db:push
npm run db:seed
```

## Public Routes

Each public page is available under every locale prefix:

- `/en`
- `/en/car`
- `/en/pricing`
- `/en/availability`
- `/en/book`
- `/en/batumi-airport-car-rental`
- `/en/hotel-delivery-batumi`
- `/en/long-term-car-rental-batumi`
- `/en/faq`
- `/en/terms`
- `/en/privacy`
- `/en/contact`

Replace `en` with `ru`, `tr`, or `ka` for localized versions.

## Admin Routes

Protected placeholders exist for:

- `/admin`
- `/admin/bookings`
- `/admin/calendar`
- `/admin/pricing`
- `/admin/car`
- `/admin/photos`
- `/admin/settings`

The current admin shell is protected and reserved for owner workflows. Database-backed CRUD screens are the next implementation step.

## Booking Storage

The public booking form validates server-side with Zod and stores local development requests in `.data/booking-requests.json`, which is gitignored because it contains personal data.

The Prisma schema in `prisma/schema.prisma` defines the PostgreSQL models for production storage. Move the booking action from the local file store to Prisma once a real `DATABASE_URL` is available.

## Translation Rules

Public UI text belongs in `src/i18n/messages/*.json`. The test in `src/i18n/translations.test.ts` fails when any locale is missing a key or array entry that exists in English.

## Product Scope

This project intentionally does not include online payments, customer accounts, instant booking, fleet search, or marketplace behavior. Bookings start as pending requests and require owner approval.

## Owner TODOs

- Replace placeholder car imagery with real VW Passat photos.
- Set real WhatsApp, Telegram, owner email, and admin credentials.
- Confirm final insurance wording before launch.
- Decide whether pending requests should temporarily block availability.
- Replace the local booking store with PostgreSQL-backed persistence before production deployment.

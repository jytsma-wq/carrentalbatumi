# AGENTS.md

## Project

Multilingual single-car rental website for Batumi, Georgia.

## Business model

- One privately owned car.
- Tourist-focused rental.
- Request-to-book first.
- Owner approval required before confirmation.
- No instant payment in v1.

## Supported locales

- en
- ru
- tr
- ka

## Code rules

- Use TypeScript.
- No hardcoded public UI text.
- Use translation files for all public strings.
- Add tests for translation completeness.
- Validate all form input server-side.
- Keep components small.
- Avoid unnecessary dependencies.
- Keep the architecture simple.
- Keep pricing, deposit, delivery fees, insurance summary, and contact details admin-editable.
- Do not claim "full insurance" unless configured.

## Booking rules

- Bookings start as pending.
- Owner must approve manually.
- Prevent overlapping bookings.
- Store pickup and dropoff location.
- Store planned route.
- Store whether the customer wants cross-border travel.
- Show deposit separately from rental price.
- Do not collect passport or driver licence uploads in the first public form.
- Do not process payments in v1.

## Batumi-specific rules

- Support airport and hotel delivery.
- Support night surcharge.
- Support one-way delivery fees later.
- Cross-border travel is forbidden unless manually approved.
- Abkhazia and South Ossetia must be listed as forbidden travel areas.
- No off-road driving.
- No beach driving.
- Accident reporting must require a police report.

## Security

- Protect admin routes.
- Do not log personal data unnecessarily.
- Use environment variables for secrets.
- Do not send sensitive ID documents by plain email.

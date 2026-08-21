# Property Booking Platform — Project Structure

An Airbnb-style property booking site: browse listings, view property details, check availability, and book — built for a seamless, modern client experience.

## Tech Stack

| Layer | Choice |
|---|---|
| Routing / Framework | React Router v7 (framework mode) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Forms & validation | React Hook Form + Zod |
| Date handling | `date-fns` or `dayjs` |
| Maps | Mapbox GL JS or Google Maps |
| Payments | Stripe (cards) + M-Pesa Daraja API (for Kenyan clients) |
| Auth | Route-level loaders/actions + session cookies (or Clerk/Auth.js if you want it managed) |
| Data layer | PostgreSQL via Prisma, or Supabase |
| Image hosting | Cloudinary or S3 |

---

## Folder Structure

```
property-booking-platform/
├── app/
│   ├── root.tsx                     # App shell: <html>, providers, error boundary
│   ├── routes.ts                    # Central route config (React Router v7 style)
│   │
│   ├── routes/
│   │   ├── _index.tsx                        # Home — featured listings, hero search
│   │   ├── search.tsx                        # Search results w/ filters + map
│   │   ├── listings.$listingId.tsx           # Property detail page
│   │   ├── listings.$listingId.book.tsx      # Booking flow (dates, guests, price)
│   │   ├── checkout.$bookingId.tsx           # Payment / confirmation
│   │   ├── booking-confirmed.$bookingId.tsx  # Success page
│   │   │
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   └── logout.tsx
│   │   │
│   │   ├── dashboard/                        # Logged-in guest area
│   │   │   ├── _layout.tsx
│   │   │   ├── bookings.tsx                  # Upcoming/past trips
│   │   │   ├── favorites.tsx                 # Wishlist
│   │   │   ├── messages.tsx                  # Host <-> guest chat
│   │   │   └── profile.tsx
│   │   │
│   │   ├── host/                             # Property owner area
│   │   │   ├── _layout.tsx
│   │   │   ├── listings.tsx                  # Manage listings
│   │   │   ├── listings.new.tsx               # Create listing
│   │   │   ├── listings.$id.edit.tsx
│   │   │   ├── calendar.tsx                  # Availability/blocked dates
│   │   │   ├── reservations.tsx
│   │   │   └── earnings.tsx
│   │   │
│   │   └── api/                              # Resource routes (no UI)
│   │       ├── properties.server.ts
│   │       ├── availability.server.ts
│   │       ├── bookings.server.ts
│   │       ├── payments.server.ts
│   │       └── webhooks.stripe.server.ts
│   │
│   ├── components/
│   │   ├── ui/                       # Reusable primitives (button, input, modal, tabs…)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── property/
│   │   │   ├── PropertyCard.tsx
│   │   │   ├── PropertyGallery.tsx
│   │   │   ├── PropertyMap.tsx
│   │   │   ├── AmenitiesList.tsx
│   │   │   └── ReviewsList.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   └── MapView.tsx
│   │   └── booking/
│   │       ├── DateRangePicker.tsx
│   │       ├── GuestSelector.tsx
│   │       ├── PriceBreakdown.tsx
│   │       └── BookingSummary.tsx
│   │
│   ├── lib/
│   │   ├── db.server.ts              # Prisma/DB client
│   │   ├── auth.server.ts            # Session helpers
│   │   ├── payments.server.ts        # Stripe/M-Pesa helpers
│   │   ├── validators.ts             # Zod schemas
│   │   └── utils.ts
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── types/
│   │   ├── property.ts
│   │   ├── booking.ts
│   │   └── user.ts
│   │
│   └── styles/
│       └── tailwind.css
│
├── prisma/                           # (if using Prisma)
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│   └── images/
│
├── .env
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Core Data Models (starting point)

- **Property** — title, description, location (lat/lng), price/night, images[], amenities[], maxGuests, bedrooms, bathrooms, hostId, rating
- **Booking** — propertyId, guestId, checkIn, checkOut, guests, totalPrice, status (pending/confirmed/cancelled), paymentRef
- **User** — name, email, role (guest/host/admin), avatar
- **Review** — bookingId, rating, comment, createdAt
- **Availability** — propertyId, blockedDates[] (host-set) or a calendar table

---

## Feature Roadmap (suggested build order)

1. **Listings & search** — home page grid, search with location/date/guest filters, map view
2. **Property detail page** — gallery, amenities, map, reviews, "Reserve" CTA
3. **Booking flow** — date picker with real-time availability check, guest count, price breakdown
4. **Checkout & payments** — Stripe for cards, M-Pesa for local (Kenyan) clients
5. **Auth** — guest signup/login, protected routes for dashboard/host areas
6. **Guest dashboard** — booking history, favorites, messaging
7. **Host dashboard** — create/edit listings, manage calendar, view reservations & earnings
8. **Reviews & ratings** — post-stay review flow
9. **Notifications** — booking confirmations, reminders (email via Resend/SendGrid)
10. **Admin panel** (optional) — moderate listings, manage users, view platform-wide bookings

---

## Notes on "seamless and modern"

- Use React Router v7's **nested layouts** (`_layout.tsx` files) so dashboard/host sections share sidebar navigation without re-fetching shared data.
- Use **loaders** for data fetching (properties, availability) and **actions** for mutations (create booking, submit review) — keeps components thin and logic on the server.
- Co-locate route-specific components only if they're truly single-use; shared UI belongs in `components/`.
- Tailwind: define design tokens (colors, spacing, radius) once in `tailwind.config.ts` so the whole app stays visually consistent — see the frontend-design conventions if you want a distinctive, non-templated look.

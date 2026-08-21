# Kahawa Homes & Safaris — Property Booking Platform

> **Luxury Stays & Safaris in Kenya.** Browse curated beach villas, city apartments, and coastal retreats across Mombasa, Nairobi, Diani Beach, Naivasha, and Nyali — with seamless WhatsApp and M-Pesa booking flows.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Folder Structure](#-project-architecture--folder-structure)
- [Design System & Tokens](#-design-system--tokens)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Available Scripts](#-available-scripts)
- [Data Models & Database](#-data-models--database)
- [License & Credits](#-license--credits)

---

## 🌟 Overview

**Kahawa Homes & Safaris** is a client-centric property booking platform designed to provide a tailored, high-touch booking experience for Kenyan and international travelers. Built with a modern, modular React + TypeScript stack, it combines an Airbnb-style interface with direct WhatsApp reservation integration, M-Pesa payments, host management portals, and full-bleed fluid layout design.

---

## ✨ Key Features

### 1. 🏖️ Guest Experience & Discovery
- **"Let's Escape" Onboarding**: Welcomes guests with an introductory hero screen, name personalization, and direct entry into listings.
- **Dynamic Search & Location Chips**: Filter properties by popular destinations (*All locations, Mombasa, Nairobi - Kahawa, Diani Beach, Naivasha, Nyali*).
- **Advanced Filter Modal**: Slide controls for maximum price (up to KES 30,000), minimum star rating, review count, and property type (*Villas, Apartments, Cottages, Houses*).
- **Interactive Map Explorer**: View properties on a geographic layout with direct Google Maps location lookups.
- **Wishlist / Favorites**: Save properties locally with a single heart tap and review them anytime in the wishlist.

### 2. 🏡 Property Showcase & Gallery
- **High-Impact Photo Mosaic**: 2-column hero photo grid showcasing exterior, interior, and bedroom spaces.
- **Full-Screen Lightbox Modal**: Interactive gallery viewer with keyboard controls (`Left`, `Right`, `Escape`) and thumbnail quick-jump strip.
- **Ratings & Reviews Breakdown**: Metric breakdown bars for Communication, Cleanliness, and Location, plus community reviews.
- **Amenities Grid**: Visual icon tags for High-Speed WiFi, Air Conditioning, Private Pools, Full Kitchens, 24/7 Security, and more.
- **Interactive Guest Guide**: In-app modal detailing house rules, appliance how-tos, and one-tap Google Maps directions to nearby supermarkets, restaurants, and emergency services.

### 3. 📲 Direct WhatsApp & M-Pesa Booking Engine
- **Custom Date Picker Popover**: Fluid calendar selector with host-blocked dates disabled in real-time.
- **Live Price Calculator**: Computes nightly stay rates &times; nights with transparent zero-fee billing.
- **Add-On Preferences**: Checkboxes for Airport Transfers / Transport and Safari Tour Services.
- **Instant WhatsApp Link Generator**: Formats and triggers pre-filled reservation messages directly to the host's WhatsApp (`+254 795 526 788`).
- **M-Pesa Checkout**: Integrated STK push simulation for seamless mobile money payment in Kenya.
- **Booking Toast & Push Reminders**: In-browser notifications and status cards alerting guests of upcoming check-in dates.

### 4. 👤 Guest Dashboard (`/dashboard`)
- **Trips & Bookings**: Status tracker for active, confirmed, and past visits.
- **Wishlist**: Collection of all favorited villas and apartments.
- **Direct Host Chat**: Multi-channel communication hub (WhatsApp, Direct Call, and Email).
- **Profile Manager**: Update name and personalized welcome preferences.

### 5. 🔑 Host Management Portal (`/host`)
- **Listings Overview**: View, manage, and inspect all active properties.
- **Create Listing Wizard (`/host/listings/new`)**: Multi-field form to publish new homes with rates, specs, and descriptions.
- **Listing Editor (`/host/listings/:id/edit`)**: Modify pricing, titles, and property information.
- **Availability & Calendar Manager (`/host/calendar`)**: Interactive date grid to block or unblock availability for guest reservations.
- **Reservations Log (`/host/reservations`)**: Tabular view of guest bookings, guest counts, stay dates, and direct WhatsApp contact buttons.
- **Earnings & Financials (`/host/earnings`)**: Revenue metrics, occupancy rate tracking, and M-Pesa settlement configuration.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework / Bundler** | [Vite 6](https://vitejs.dev/) | Ultra-fast development server & production builder |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type safety across components, models, and routes |
| **UI Library** | [React 18](https://react.dev/) | Component architecture & state hooks |
| **Routing** | [React Router v6/v7](https://reactrouter.com/) | Client-side routing with nested layouts and dynamic params |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + CSS Tokens | Modern styling with HSL design tokens & fluid containers |
| **Icons** | Custom SVG Design System + [Lucide React](https://lucide.dev/) | Tailored icons for amenities, nav, ratings, and social channels |
| **Validation** | [Zod](https://zod.dev/) | Schema validation for bookings, reviews, and properties |
| **Data / Storage** | [Prisma](https://www.prisma.io/) + `localStorage` | PostgreSQL schema definition + reactive local state persistence |
| **Date Utilities** | `date-fns` & custom date helpers | Real-time calendar math & formatting |

---

## 📂 Project Architecture & Folder Structure

```
kahawa-homes/
├── app/
│   ├── root.tsx                              # App shell: RouterProvider, ErrorBoundary, global CSS
│   ├── routes.ts                             # Central React Router configuration
│   │
│   ├── routes/                               # Route views
│   │   ├── _index.tsx                        # Home view: landing onboarding + listings grid + filter modal
│   │   ├── search.tsx                        # Search results with query filters & map explorer
│   │   ├── listings.$listingId.tsx           # Property detail: mosaic gallery, ratings, host, sticky booking
│   │   ├── listings.$listingId.book.tsx      # Dedicated booking flow (dates, guests, price breakdown)
│   │   ├── checkout.$bookingId.tsx           # Checkout with M-Pesa STK push & WhatsApp confirmation
│   │   ├── booking-confirmed.$bookingId.tsx  # Confirmation page with booking reference
│   │   │
│   │   ├── auth/                             # Authentication views
│   │   │   ├── login.tsx                     # Guest login view
│   │   │   ├── register.tsx                  # Guest signup view
│   │   │   ├── forgot-password.tsx           # Password recovery
│   │   │   └── logout.tsx                    # Logout handler
│   │   │
│   │   ├── dashboard/                        # Logged-in guest area
│   │   │   ├── _layout.tsx                   # Guest dashboard tabbed layout
│   │   │   ├── bookings.tsx                  # Trips & reservations
│   │   │   ├── favorites.tsx                 # Saved wishlist
│   │   │   ├── messages.tsx                  # Host <-> guest direct chat & phone
│   │   │   └── profile.tsx                   # Profile editor
│   │   │
│   │   ├── host/                             # Property owner area
│   │   │   ├── _layout.tsx                   # Host navigation layout
│   │   │   ├── listings.tsx                  # Manage active listings
│   │   │   ├── listings.new.tsx              # Create listing form
│   │   │   ├── listings.$id.edit.tsx         # Edit listing details & rates
│   │   │   ├── calendar.tsx                  # Interactive availability & blocked dates calendar
│   │   │   ├── reservations.tsx              # Host reservations table
│   │   │   └── earnings.tsx                  # Revenue and M-Pesa payout settings
│   │   │
│   │   └── api/                              # Resource routes & server helpers
│   │       ├── properties.server.ts          # Properties query handlers
│   │       ├── availability.server.ts        # Date availability checker
│   │       ├── bookings.server.ts            # Booking mutation handlers
│   │       ├── payments.server.ts            # M-Pesa & Stripe payment processor
│   │       └── webhooks.stripe.server.ts     # Webhook listener
│   │
│   ├── components/                           # Reusable UI & Domain Components
│   │   ├── ui/
│   │   │   ├── Button.tsx                    # Reusable styled buttons (primary, WhatsApp, call, outline)
│   │   │   ├── Input.tsx                     # Form inputs with label & error handling
│   │   │   ├── Modal.tsx                     # Accessible modal primitive
│   │   │   └── Icons.tsx                     # Complete SVG icon set (WA, Star, Heart, Pin, amenities, etc.)
│   │   ├── layout/
│   │   │   ├── Header.tsx                    # Sticky header with logo, search pill, review & profile actions
│   │   │   ├── Footer.tsx                    # Kahawa Homes footer with direct WhatsApp, TikTok, and phone
│   │   │   └── MobileNav.tsx                 # Floating bottom pill navigation
│   │   ├── property/
│   │   │   ├── PropertyCard.tsx              # Hover zoom card with badge, rating, price, and favorite toggle
│   │   │   ├── PropertyGallery.tsx           # Photo thumbnail strip + mosaic + full lightbox gallery
│   │   │   ├── PropertyMap.tsx               # Location card with Google Maps integration
│   │   │   ├── AmenitiesList.tsx             # Grid of amenities with matching SVG icons
│   │   │   └── ReviewsList.tsx               # Review ratings breakdown bars & guest feedback list
│   │   ├── search/
│   │   │   ├── SearchBar.tsx                 # Search input component
│   │   │   ├── FilterPanel.tsx               # Horizontal location chips + filter modal sheet
│   │   │   └── MapView.tsx                   # Interactive map stay selector
│   │   └── booking/
│   │       ├── DateRangePicker.tsx           # Custom popover calendar with disabled booked dates
│   │       ├── GuestSelector.tsx             # Guest dropdown and transfer/tour checkboxes
│   │       ├── PriceBreakdown.tsx            # Nights × rate breakdown calculation
│   │       └── BookingSummary.tsx            # Sticky booking card with WhatsApp & Call CTA
│   │
│   ├── lib/                                  # Libraries & utilities
│   │   ├── db.server.ts                      # Prisma / In-memory database client
│   │   ├── auth.server.ts                    # Session & auth helpers
│   │   ├── payments.server.ts                # Stripe & M-Pesa Daraja helper methods
│   │   ├── validators.ts                     # Zod validation schemas
│   │   └── utils.ts                          # Normalizers, dateKey, formatPrice, fallback data
│   │
│   ├── hooks/                                # Custom React hooks
│   │   ├── useDebounce.ts                    # Search input debouncer
│   │   ├── useMediaQuery.ts                  # Responsive query listener
│   │   └── useLocalStorage.ts                # Persistent localStorage synchronization
│   │
│   ├── types/                                # TypeScript type declarations
│   │   ├── property.ts                       # Property, Host, and Filter types
│   │   ├── booking.ts                        # Booking, Review, and Status types
│   │   └── user.ts                           # User, Role, and Profile types
│   │
│   └── styles/
│       └── tailwind.css                      # Kahawa design tokens, fonts, variables & utility classes
│
├── prisma/
│   └── schema.prisma                         # Prisma schema for PostgreSQL / Supabase
│
├── public/
│   ├── images/                               # Static images (logo.jpeg, house photos, etc.)
│   └── properties.json                       # Local property dataset
│
├── .env                                      # Environment variables
├── index.html                                # Root HTML document with Google Fonts & favicon
├── package.json                              # Project manifest, dependencies, and scripts
├── tailwind.config.ts                        # Tailwind design tokens configuration
├── tsconfig.json                             # TypeScript compiler configuration
└── vite.config.ts                            # Vite configuration
```

---

## 🎨 Design System & Tokens

The platform follows a curated **warm luxury coastal** aesthetic:

| Token | Hex / Value | Usage |
|---|---|---|
| `--serif` | `'Playfair Display', Georgia, serif` | Editorial headlines, property titles, brand accents |
| `--sans` | `'Inter', system-ui, sans-serif` | Clean body copy, navigation labels, prices, metadata |
| `--cream` | `#f7f3ec` | Main background color (seamless full-bleed) |
| `--cream-dark` | `#ede6d6` | Cards background, photo placeholders, chip hover states |
| `--espresso` | `#1e120a` | Primary text, main CTA buttons, footer background |
| `--espresso-mid` | `#4a2c17` | Secondary text, button hover backgrounds |
| `--gold` | `#c9a96e` | Brand highlight (*"Homes"*, active tabs, active stars) |
| `--gold-lt` | `#e8d5b0` | Favorited heart highlights, active day selections |
| `--border` | `#e8e0d0` | Subtle hairline dividers and input outlines |
| `--green` | `#25d366` | WhatsApp reservation button & confirmed status pills |

### Layout Pattern: Full-Bleed with Contained Content
All page sections (Header, Filter Bar, Main Content, Footer) stretch **100% full-width**, with inner content aligned inside a fluid, centered container:
```css
.nav-container,
.filter-bar,
.home-wrap,
.detail-wrap,
.footer-container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 5vw, 3rem);
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or later (tested on `v22.11.0`)
- **npm**: `v9.0.0` or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stacy-ao/kahawa-homes.git
   cd kahawa-homes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory (or edit the existing `.env`):

```ini
# Database Connection (Prisma / PostgreSQL)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kahawa_homes"

# Host WhatsApp Contact (Country code + Number, no + or spaces)
VITE_WA_NUMBER="254795526788"
VITE_APP_NAME="Kahawa Homes"

# Payment Gateways (Optional)
STRIPE_SECRET_KEY="sk_test_mock"
STRIPE_WEBHOOK_SECRET="whsec_mock"
MPESA_CONSUMER_KEY="mock_mpesa_key"
MPESA_CONSUMER_SECRET="mock_mpesa_secret"
MPESA_SHORTCODE="174379"
MPESA_PASSKEY="mock_passkey"
```

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite development server at `http://localhost:5173/` |
| `npm run build` | Compiles TypeScript and builds optimized production bundle in `dist/` |
| `npm run preview` | Runs a local server to preview the production build in `dist/` |

---

## 🗄️ Data Models & Database

The project includes a complete Prisma schema in [`prisma/schema.prisma`](file:///c:/_Workspace/Projects/kahawa-homes/prisma/schema.prisma) supporting PostgreSQL or Supabase:

- **`User`**: Accounts, roles (`GUEST`, `HOST`, `ADMIN`), avatars, and relation to bookings & properties.
- **`Property`**: Title, location, geographic coordinates (`lat`, `lng`), price per night, image array, amenities array, house rules array, capacity (`guests`, `bedrooms`, `beds`, `baths`), rating, and host relation.
- **`Booking`**: Dates (`checkIn`, `checkOut`), guest counts, pricing, statuses (`PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`), transfer/tour preferences, and payment references.
- **`Review`**: Rating (1–5 stars), quick attribute tags, guest comments, and timestamps.
- **`Availability`**: Date-based blocked slots managed by hosts.

---

## 📞 Support & Host Contact

- **Host**: Nelly Arunga
- **WhatsApp**: [+254 795 526 788](https://wa.me/254795526788)
- **Phone**: `+254 795 526 788`
- **Email**: [arunganelly@gmail.com](mailto:arunganelly@gmail.com)
- **TikTok**: [@arunga_homes_backup](https://www.tiktok.com/@arunga_homes_backup)

---

&copy; 2026 **Kahawa Homes & Safaris**. *Creating your entire experience.*

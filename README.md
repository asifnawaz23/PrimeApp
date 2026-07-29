<div align="center">

<br/>

<!-- Logo / Brand -->
<img src="https://img.shields.io/badge/Prime_App_Solutions-0f3460?style=for-the-badge&logo=vercel&logoColor=38bdf8" alt="Prime App Solutions" height="40"/>

<br/><br/>

# Prime App Solutions

### Premium Software Development Agency Website

A full-stack, production-ready agency website built with **Next.js 16**, featuring a 3D hero, animated UI, CMS-powered content, and a complete admin dashboard — all in a single codebase.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](/)

<br/>

![-----](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

</div>

<br/>

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Admin Dashboard](#-admin-dashboard)
- [Deployment](#-deployment)

<br/>

![-----](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🎯 About the Project

**Prime App Solutions** is a premium software development agency website. The goal was to build a high-conversion, visually stunning marketing site that:

- Showcases the agency's services, portfolio, and team
- Captures client leads through an inquiry/consultation popup
- Gives the agency full control over content via an admin dashboard (no third-party CMS needed)
- Runs fast in production with static generation and serverless API routes
- Looks world-class — rivaling top agencies like Awwwards winners

Everything from blog posts and FAQs to portfolio items and testimonials is managed through a built-in admin panel backed by a real database.

<br/>

## 🌐 Live Demo

> Coming soon — deploy link will be added after Vercel deployment.

<br/>

## 🛠 Tech Stack

### Core Framework

| Technology | Version | Why It Was Used |
|---|---|---|
| **Next.js** | 16.2 | Full-stack React framework. Handles routing, SSG, API routes, and server components in one place. Turbopack for fast builds. |
| **React** | 19 | UI component model. Latest version with concurrent features and improved performance. |
| **TypeScript** | 5 | Type safety across the entire codebase — catches bugs at compile time, not runtime. |

### Styling

| Technology | Version | Why It Was Used |
|---|---|---|
| **Tailwind CSS** | v4 | Utility-first CSS. v4 uses a new CSS-native engine (`@theme`) — no config file needed, faster builds, better DX. |
| **PostCSS** | — | Required by Tailwind v4's `@tailwindcss/postcss` plugin for processing. |

### Animation & 3D

| Technology | Version | Why It Was Used |
|---|---|---|
| **Framer Motion** | 12 | Declarative animations for page transitions, entrance effects, and interactive UI elements. `AnimatePresence` handles route change animations smoothly. |
| **GSAP** | 3.15 | High-performance animation library for complex, timeline-based sequences used in hero sections. |
| **Three.js** | 0.185 | WebGL 3D graphics. Powers the animated 3D hero scene on the homepage. |
| **@react-three/fiber** | 9 | React renderer for Three.js — lets you write 3D scenes as React components declaratively. |
| **@react-three/drei** | 10 | Helper components for R3F (OrbitControls, environment maps, etc.) — saves hundreds of lines of boilerplate. |

### Database & ORM

| Technology | Version | Why It Was Used |
|---|---|---|
| **Prisma** | 6 | Type-safe ORM. Schema-first design, auto-generated client, and easy migrations. Works with SQLite locally and PostgreSQL in production. |
| **PostgreSQL** | — | Production database (via Neon or Vercel Postgres). Scalable, reliable, and fully supported by Vercel's serverless environment. |
| **SQLite** | — | Local development database. Zero setup — just a file. Swapped for Postgres on deploy. |

### Auth & Security

| Technology | Version | Why It Was Used |
|---|---|---|
| **jsonwebtoken** | 9 | JWT-based authentication for the admin dashboard. Stateless, secure, and simple. |
| **cookie** | 2 | HTTP cookie parsing/serialization for storing the auth token server-side via `httpOnly` cookies. |

### Integrations

| Technology | Version | Why It Was Used |
|---|---|---|
| **googleapis** | 173 | Google Sheets API integration. Inquiry form submissions can optionally be mirrored to a Google Sheet for easy tracking without opening the admin panel. |
| **lucide-react** | 1.27 | Clean, consistent icon set. Tree-shakeable, TypeScript-native, and visually fits the dark UI. |

<br/>

## 📁 Project Structure

```
PrimeApp/
├── prisma/
│   ├── schema.prisma          # Database schema (models: Inquiry, Service, Portfolio, BlogPost, Faq, Testimonial)
│   ├── dev.db                 # Local SQLite database (gitignored)
│   └── migrations/            # Auto-generated migration history
│
├── public/                    # Static assets (SVGs, images)
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout (Header, Footer, PageTransition)
│   │   ├── page.tsx           # Homepage (3D hero, services preview, CTA)
│   │   ├── about/             # About page
│   │   ├── services/          # Services page
│   │   ├── portfolio/         # Portfolio / Case Studies
│   │   ├── blog/              # Blog listing + [slug] dynamic page
│   │   ├── technologies/      # Tech stack showcase
│   │   ├── process/           # Development process page
│   │   ├── faq/               # FAQ page
│   │   ├── contact/           # Contact page with form
│   │   ├── privacy-policy/    # Legal pages
│   │   ├── terms-conditions/
│   │   │
│   │   ├── admin/             # Admin panel (protected)
│   │   │   ├── login/         # Admin login page
│   │   │   └── (dashboard)/   # Dashboard layout group
│   │   │       ├── overview/  # Stats & summary
│   │   │       ├── inquiries/ # View & manage inquiries
│   │   │       ├── services/  # CRUD services
│   │   │       ├── portfolio/ # CRUD portfolio items
│   │   │       ├── blog/      # CRUD blog posts
│   │   │       ├── faq/       # CRUD FAQs
│   │   │       └── testimonials/ # CRUD testimonials
│   │   │
│   │   └── api/               # API Route Handlers
│   │       ├── inquiries/     # POST — public inquiry submission
│   │       └── admin/
│   │           ├── login/     # POST — admin auth
│   │           ├── logout/    # POST — clear auth cookie
│   │           └── inquiries/[id]/ # PATCH — update inquiry status
│   │
│   ├── components/            # Reusable UI components
│   │   ├── Header.tsx         # Sticky navbar with mobile drawer
│   │   ├── Footer.tsx         # Footer with newsletter signup
│   │   ├── PrimeLogo.tsx      # SVG brand logo component
│   │   ├── PageTransition.tsx # Route change animation + progress bar
│   │   ├── ThreeHero.tsx      # 3D WebGL hero scene
│   │   ├── ThreeHeroWrapper.tsx # Dynamic import wrapper (SSR-safe)
│   │   ├── InquiryPopup.tsx   # Global consultation popup/modal
│   │   ├── ContactForm.tsx    # Contact page form
│   │   ├── TestimonialCarousel.tsx # Animated testimonials
│   │   ├── FaqList.tsx        # Accordion FAQ component
│   │   └── [Admin components] # Dashboard-specific managers
│   │
│   ├── context/
│   │   └── AppContext.tsx     # Global state (inquiry popup open/close)
│   │
│   └── lib/
│       ├── db.ts              # Prisma client singleton
│       ├── auth.ts            # JWT verify/sign helpers
│       └── seedData.ts        # Initial seed data for DB
│
├── .env                       # Local environment variables (gitignored)
├── .env.example               # Template — copy this to .env
├── next.config.ts             # Next.js config
├── tailwind.config / postcss  # Styling config
└── package.json
```

<br/>

## ✨ Features

### Public Website
- **3D Animated Hero** — WebGL scene built with Three.js + React Three Fiber
- **Smooth Page Transitions** — Framer Motion fade with top progress bar indicator
- **Services Showcase** — Dynamic cards loaded from database
- **Portfolio / Case Studies** — Filterable project gallery
- **Blog** — Full markdown-content blog with dynamic slug pages
- **FAQ** — Accordion-style, database-driven
- **Testimonials** — Auto-scrolling carousel
- **Contact Form** — Submits to DB + optional Google Sheets sync
- **Consultation Popup** — Global CTA reachable from any page
- **Fully Responsive** — Mobile-first design, optimized for all screen sizes
- **Dark Theme** — Deep space aesthetic with violet/cyan accent system

### Admin Dashboard (`/admin`)
- Password-protected via JWT + httpOnly cookies
- **Overview** — Inquiry stats and recent activity
- **Inquiries** — View all leads, update status (New → Contacted → Closed → Spam)
- **Services** — Add, edit, delete services shown on the website
- **Portfolio** — Manage case studies with tech tags and links
- **Blog** — Write and publish blog posts (Markdown supported)
- **FAQs** — Manage questions and ordering
- **Testimonials** — Add/remove client testimonials

<br/>

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- **Node.js** `v18` or higher → [nodejs.org](https://nodejs.org)
- **npm** `v9+` (comes with Node.js)
- **Git** → [git-scm.com](https://git-scm.com)

### 1. Clone the repository

```bash
git clone https://github.com/asifnawaz23/PrimeApp.git
cd PrimeApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the values (see [Environment Variables](#-environment-variables) below).

### 4. Set up the database

```bash
# For local development (SQLite — no setup needed)
# Make sure DATABASE_URL="file:./dev.db" in your .env

npx prisma migrate dev --name init
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Run in production mode

```bash
npm run build
npm run start
```

<br/>

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# ── Database ──────────────────────────────────────────
# Local dev (SQLite):
DATABASE_URL="file:./dev.db"

# Production (PostgreSQL via Neon/Vercel):
# DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# ── Admin Credentials ─────────────────────────────────
ADMIN_USER="admin"
ADMIN_PASSWORD="your-strong-password-here"
JWT_SECRET="a-long-random-secret-string-minimum-32-chars"

# ── Google Sheets (Optional) ──────────────────────────
# If not set, inquiries are only saved to the database.
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-sa@your-project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_SHEET_ID="your_google_sheet_id"
```

> ⚠️ **Never commit your `.env` file.** It is already in `.gitignore`.

<br/>

## 🗄 Database Setup

### Local Development

The project uses **SQLite** locally — no installation required, it's just a file.

```bash
# Run migrations
npx prisma migrate dev --name init

# View your data visually
npx prisma studio
```

### Production (PostgreSQL)

1. Create a free database at **[neon.tech](https://neon.tech)** or use Vercel Postgres
2. Copy the connection string
3. Set `DATABASE_URL` in your production environment
4. Run migrations on deploy:

```bash
npx prisma migrate deploy
```

### Models Overview

| Model | Purpose |
|---|---|
| `Inquiry` | Client consultation requests from the contact/popup form |
| `Service` | Agency services displayed on the Services page |
| `Portfolio` | Case studies shown in the Portfolio section |
| `BlogPost` | Blog articles with slug, markdown content, and publish toggle |
| `Faq` | FAQ entries with ordering |
| `Testimonial` | Client testimonials for the carousel |

<br/>

## 🔑 Admin Dashboard

Access the admin panel at `/admin/login`

Default credentials (change these in `.env`):
```
Username: admin
Password: SuperSecretAdminPassword2026!
```

> ⚠️ **Change the default credentials before deploying to production.**

The dashboard is protected by a JWT stored in an `httpOnly` cookie. Unauthenticated requests to `/admin/*` routes are redirected to the login page.

<br/>

## ☁️ Deployment

### Deploy to Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add all environment variables from `.env`
4. Set `DATABASE_URL` to your PostgreSQL connection string (from [neon.tech](https://neon.tech))
5. Click **Deploy**

Vercel automatically runs `npm run build` and handles SSL, CDN, and scaling.

### Other Platforms (VPS / Docker)

```bash
npm install
npm run build
npm run start
# Runs on port 3000 by default
```

Use a reverse proxy (nginx) to expose it on port 80/443.

<br/>

![-----](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<div align="center">

Built with ❤️ by **[Muhammad Asif Nawaz](https://github.com/asifnawaz23)**

</div>

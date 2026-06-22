# Weft Passport

**Verified Heritage Textile Provenance** — Loom-to-label certification platform connecting South Asian master weavers to UK/EU fashion markets.

> Built for Silk and Soil Ltd, Sheffield UK · Founder: Mahjabeen Bano

---

## 🚀 Quick Setup (5 steps)

### 1. Clone & Install
```bash
git clone https://github.com/data-professional-taiyabkhan/weft-passport
cd weft-passport
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env.local
# Then edit .env.local and fill in your Supabase keys
```

### 3. Set up Supabase Database
1. Go to [supabase.com](https://supabase.com) → your project → **SQL Editor**
2. Paste the contents of `supabase/schema.sql`
3. Click **Run** — this creates all tables, enums, RLS policies, and seed data

### 4. Run Locally
```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to Vercel
1. Push to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add all environment variables from `.env.example`
4. Deploy

---

## 📁 Project Structure

```
src/
  app/
    (auth)/         # Login, Register, Forgot Password
    actions/        # Server Actions: auth, batches, artisans
    api/            # API routes: passport data, auth callback
    dashboard/      # Protected dashboard (brand + field + admin)
    passport/[id]/  # Public QR passport page (no login needed)
  components/
    landing/        # Public landing page sections
    dashboard/      # Dashboard widgets: sidebar, stats, etc.
  lib/supabase/     # Supabase client (browser + server)
  types/            # TypeScript types
supabase/
  schema.sql        # Full DB schema — run this in Supabase SQL Editor
```

---

## 🔑 User Roles

| Role | Access |
|---|---|
| `brand` | Dashboard: batches, SKUs, artisans, compliance, QR codes |
| `field_coordinator` | Dashboard: capture, artisan registration, batch submission |
| `admin` | Full access: all brands, all artisans, certify batches |

---

## 🌐 Key Pages

| Page | URL | Notes |
|---|---|---|
| Landing | `/` | Public marketing page |
| Login | `/login` | Supabase auth |
| Register | `/register` | Role selection |
| Dashboard | `/dashboard` | Role-based redirect |
| Public Passport | `/passport/[id]` | QR scan page — no login needed |

---

## 📋 MVP Status

- [x] Landing page (full)
- [x] Auth (login, register, forgot password)
- [x] Supabase schema with RLS
- [x] Brand dashboard with stats, batches, SKUs, artisans, compliance
- [x] Field coordinator portal
- [x] Admin portal
- [x] Public passport QR page
- [x] Server actions (auth, batches, artisans)
- [x] API routes (passport, auth callback)
- [ ] QR code image generation (Phase 2)
- [ ] File upload for artisan photos (Phase 2)
- [ ] Compliance PDF export (Phase 2)
- [ ] Email notifications (Phase 2)

---

## 🛡️ Security Note

Never commit `.env` or `.env.local` — they are in `.gitignore`.
Use Vercel Environment Variables for production secrets.

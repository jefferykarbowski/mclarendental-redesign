# McLaren Dental Associates — Redesign Proof of Concept

A polished, proposal-quality static redesign of [mclarendental.com](https://mclarendental.com/) for **McLaren Dental Associates** (Midland, Michigan). Built from the supplied design direction plus real business details pulled from the current live site.

## Preview locally

```bash
cd site
python -m http.server 8080
# then open http://localhost:8080
```

Or open `site/index.html` directly in a browser — the page has no build step and only loads Google Fonts from the network; everything else is local.

## File layout

```
site/
  index.html     # Homepage — the primary deliverable
  styles.css     # All styles
  app.js         # Nav, modal, hours, financing calc, drawer, form
  assets/
    logo-white.png  # White-on-transparent wordmark (dark backgrounds — footer)
    logo-dark.png   # Dark-on-transparent wordmark (light backgrounds — favicon)
    provider-john-mclaren.webp    # Real headshot (from live site)
    provider-charles-mclaren.webp # Real headshot (from live site)
    provider-melissa-janos.webp   # Real headshot (from live site)
    hero.mp4        # Real hero video — autoplay, muted, looped (~40 MB)
    office.webp     # Real office still — used as video poster and fallback
  README.md
```

## What was pulled from the live site

- **Business name, logo, and white-wordmark** (real assets from `mclarendental.com/wp-content/uploads/...`)
- **Hero video** (real exterior/interior b-roll pulled from the live site's homepage) with the office still as poster and fallback for browsers that can't autoplay
- **Real phone number:** (989) 631-7880
- **Real address:** 308 Northgate Drive, Midland, MI 48640
- **Real office hours:** Mon–Wed 8:00 am – 5:30 pm, Thu–Fri 8:00 am – 4:30 pm, Sat & Sun closed
- **Real providers (4):** Dr. John McLaren, Dr. Charles McLaren, Dr. Melissa Janos, Dr. Devan Moody — names and credentials as listed on the live site
- **Real services:** General Dentistry, Cosmetic Dentistry, Invisalign®, Implants, Teeth Whitening (plus Emergency Care, inferred as standard)
- **Real insurance list:** PPO provider for Connection & Careington; accepts Aetna, United Healthcare, United Concordia, Principal
- **Real financing partners:** CareCredit®, HFD, Sunbit
- **Real Facebook link:** facebook.com/McLarenDentalMidland
- **Real practice tagline and mission copy** ("family and cosmetic dental office…", "compassionate care and exceptional service…")

## What was inferred or rewritten

- **Hero headline and subcopy** — rewritten for conversion ("Exceptional dentistry, close to home")
- **Service descriptions** — rewritten to sound warm and modern while staying grounded in the real service list
- **"Why McLaren" cards** — adapted from the live site's four value pillars (Comprehensive Care, Experienced Professionals, Patient-Centered Approach, State-of-the-Art Facilities)
- **"What to expect" steps** — standard new-patient flow, presented as four clear stages
- **Provider role labels** (e.g., "General & Restorative") — reasonable, non-specialty inferences based on the public information available. Swap for verified specialties before launch.
- **Emergency Care** as a 6th service tile — assumed based on standard general-practice offerings; verify before launch or remove.

## What is placeholder/demo-only (clearly marked in code)

- **Provider photos** — three of four are real, pulled from the live site's `/meet-our-team` page (Dr. John McLaren, Dr. Charles McLaren, Dr. Melissa Janos). Dr. Devan Moody has no headshot on the live site, so his card uses a serif-initial monogram tagged "Headshot pending" until one is provided.
- **Testimonials** — three sample testimonials shown under clear "Sample Review · Placeholder" labels and an in-section note stating they are for layout only. Replace with real Google/Facebook reviews before launch.
- **Map panel** — a tasteful styled-CSS placeholder that links through to Google Maps directions for the real address. Swap for an embedded `<iframe>` Google Map or Mapbox tile if preferred.
- **Financing estimator** — a demo calculator using simple arithmetic. 0% APR is assumed for ≤24-month terms; a typical ~14.9% APR is used for the 60-month example. Results are explicitly labeled as estimates only. Replace with true CareCredit®/HFD/Sunbit rate lookups before production.

## Deliberate improvements vs. the current live site

- **Removed TEST-FORM / TEST FORM 2** and other placeholder elements
- **Removed zero-value stat counters**
- **Trimmed the appointment form** to name, phone, optional email, a service picker, and preferred time — the rest is handled by phone
- **Added a focused, 4-step appointment modal** for low-friction booking
- **Clearer hierarchy, spacing, and typographic pairing** (Cormorant Garamond + Inter + JetBrains Mono)
- **Single, consistent CTA ("Request Appointment")** across hero, nav, service cards, and CTA band
- **Sticky mobile call/book bar** for mobile conversion
- **Today-aware open/closed indicator** in the utility bar and mobile CTA
- **Real address linked through to Google Maps** from the map tile and footer

## Missing pieces / still-to-replace before launch

| Item | How to replace |
| --- | --- |
| Dr. Devan Moody headshot | Drop a WebP/JPG into `assets/provider-devan-moody.webp` and swap his `.photo.mono` block for a `.photo.portrait` img (like the other three) |
| Real patient testimonials | Pull from Google Business / Facebook reviews, update the three `.test` blocks |
| Embedded Google Map | Replace the `<a class="map">` block with an `<iframe>` map embed |
| Verified service list | Confirm Emergency Care is offered and whether to add/remove any tiles |
| Accurate financing APR/term rules | Wire the estimator to CareCredit®/HFD/Sunbit actual promotional terms |
| Founding year / "est." claim | Intentionally omitted — add once verified with the practice |
| Social links | Add Instagram / Google profile URLs if the practice maintains them |

## Notes for implementation

- No build step, no bundler, no framework — plain HTML/CSS/JS
- Only external dependency: Google Fonts (Cormorant Garamond, Inter, JetBrains Mono)
- Tested layouts: ≥1280px desktop, 900px tablet, 560px mobile
- Fully keyboard-navigable: Escape closes modals/drawer, focus-visible outlines on form fields

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
    logo-mark.png   # Real logo — pulled from live site
    logo-white.png  # Real white wordmark — pulled from live site
    office.webp     # Real office still — pulled from live site video poster
  README.md
```

## What was pulled from the live site

- **Business name, logo, and white-wordmark** (real assets from `mclarendental.com/wp-content/uploads/...`)
- **Office interior photo** (real still from the live site's homepage video poster)
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

- **Provider photos** — rendered as serif-initial monograms on a navy gradient. The live site does not expose standalone provider headshots from the homepage; swap in real photos when provided. The tiles are labeled "Placeholder · swap headshot" in a small dev tag.
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
| Provider headshots (4) | Drop real WebP/JPG files into `assets/` and swap the `.photo.mono` block inside `#providers` for an `<img>` |
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

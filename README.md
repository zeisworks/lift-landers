# Lift STL — Google Ads Landing Page (Personal Training)

A conversion-optimized landing page for "personal trainer St. Louis" paid
traffic. **Deliverable: standalone HTML** (`index.html`, single
self-contained file) — fastest to load for Quality Score, hostable on any
static host or a subdomain (e.g. `go.lift-stl.com`), and independent of the
Wix editor. It can also be attached to the Wix site via Wix's custom-domain
subdomain routing or an embed if preferred.

**`parallax.html`** is an A/B variant of the same page — identical content,
offer, forms, and tracking — adding a transform-only parallax layer: hero
depth (drifting dumbbell art + giant outlined Rift "LIFT"), counter-drifting
section watermarks, two full-bleed image window bands, count-up stats, and a
red scroll-progress bar. All motion is compositor-friendly (one rAF per
scroll frame, offscreen culling) and is **fully disabled on touch devices
and under `prefers-reduced-motion`**, where it renders as the static page.

## Brand tokens — extracted from the live site (not invented)

Pulled from the rendered Wix theme on `lift-stl.com/`,
`/personal-training`, and `/join` (June 2026). Wix variable names included
for traceability.

### Colors (computed values)

| Token | Hex | Wix var | Used for |
|---|---|---|---|
| Charcoal | `#2E3036` | `--color_15` | Dark sections, headings, body text, button fill |
| Cream | `#F3F1EC` | `--color_11/16` | Page/section background |
| Paper | `#FAF9F8` | `--color_20` | Light cards |
| Brand red | `#E14747` | `--color_17` | Logo, accents, CTA border/hover, sticky call bar |
| Deep red | `#8F3C3C` | `--color_18` | Error/darker red shade |
| Gray | `#95979D` / `#82848B` | `--color_13/14` | Muted text, input borders |

The theme also defines `#ED1C24 / #0088CB / #FFCB05` (`--color_3/4/5`) but
those are unused Wix defaults — the site's actual palette is the
charcoal/cream/red set above. `#E14747` is confirmed as the logo fill.

### Typography (actual loaded font files)

All four faces are the site's own uploaded fonts, served from Wix's CDN
(`static.wixstatic.com/ufonts/...`) and hotlinked here with
`font-display: swap`:

- **Rift Bold** — all headings (`--font_2..6`: 64/48/40/32/24 px, 1.4em)
- **Rift Bold Italic** — the lowercase accent word inside caps headings
  (`--font_0`: 96px) — e.g. "FOCUS ON THE *path*"
- **Avenir LT Std 55 Roman** — body copy (`--font_7..9`: 16/14/12 px)
- **Avenir LT Std 85 Heavy** — buttons and labels (15–16 px)

Heading treatment matches the site: ALL CAPS Rift Bold with one lowercase
Rift Bold Italic word as the accent.

> Licensing note: the fonts are hotlinked from the site's own Wix CDN
> bucket. If this page moves off Wix infrastructure long-term, confirm the
> Rift/Avenir web license covers the new host.

### Buttons (from component CSS vars)

Pill radius (`--rd: 999px`), 2 px border, Avenir 85 Heavy 15–16 px,
`0.4s ease` color/background/border transitions. Primary variant exactly as
extracted: charcoal fill + red border + red text → fills red on hover.

### Other extracted assets

- **Logo**: the official mark is an inline SVG (red circle "LIFT / STL"),
  copied verbatim from the live header.
- **Imagery**: all photos are the site's own Wix media (gym hero with red
  turf, branded squat photo, curl photo) served via Wix's image CDN with
  resize transforms.
- **Video**: the current PT page's hero background video is actually a
  produced 60-second explainer ("How to find the best fitness plan for
  your goals") with burned-in captions, hosted at
  `video.wixstatic.com/video/47b482_1ee9cd80ddcc4316b76ded73a305b9c5/720p/mp4/file.mp4`
  (480p also available). It's embedded click-to-play in the "How it works"
  section (its captions would clash with the H1 as a background loop), with
  `preload="none"` so it costs zero bytes until played. Its first frame is
  reused as the hero's static background image.
- **Before/afters**: real, already-published member transformations from
  the homepage success gallery, with names taken from the gallery's own
  labels: Rhett Mueller, Seth Buhman, Aakarsh, Eric (12 weeks). No
  fabricated social proof; no Google rating shown (none verified).

## Competitive positioning (researched June 2026)

Life Time ("Dynamic Personal Training") and Equinox ("EQX OS") both sell
PT the same way: holistic science positioning, assessment-led onboarding,
anatomy-of-a-session storytelling — and **pricing hidden behind a sales
appointment**, sold on top of separate club dues (Life Time PT runs
~$110+/hr before membership). Life Time Frontenac is the closest premium
competitor to Brentwood.

This page is built to win against that playbook rather than imitate it:

- **Out-credential them**: the founder has trained MLB/MiLB players, Navy
  SEALs, and NFL lineman Jake Long (all from the live About page) — leads
  the hero subhead, a red credibility strip, and coach credential chips.
- **Weaponize transparency**: "Where the luxury clubs lose" comparison
  table (Lift vs. "typical big-box club" — deliberately unnamed and
  hedged with a footnote so every row stays defensible), a stats band
  ("100% of pricing published here"), and pricing copy that calls out the
  quote-appointment pattern.
- **Borrow what works**: assessment-anatomy storytelling (the 4-part
  evaluation grid under the explainer video), "what happens next" steps
  under each form, and an objection-handling FAQ — all from facts already
  published on lift-stl.com.
- **Stay honest**: no named-competitor pricing claims, no invented
  ratings, no fake scarcity.

## Conversion structure (what changed vs. the current PT page)

- **H1 message-matches the query**: "St. Louis personal training that gets
  results" (location + service + outcome) instead of "Start Your Journey
  With Us."
- **Primary CTA is the free tour + day pass** (offer already exists on the
  site); the $100 evaluation is surfaced honestly as step 2, never as the
  first ask.
- **3-field lead form above the fold** (name/email/phone), repeated at the
  bottom. The required free-text message field and all extra fields from
  the current form are gone.
- **Sticky tap-to-call bar on mobile** → `tel:+13142963117`.
- **Pricing in the open**: $100 evaluation + 6/12/24/48-packs
  ($100/$95/$90/$85 per session with included membership) + On/Off Campus
  $325/mo, in a plain table.
- **Proof**: Eric Humes (founder) bio, verbatim Cole Miller & Ryan Finley
  testimonials from the current PT page, real before/after grid.
- **One repeated next step**: every CTA is "Get My Free Day Pass & Tour"
  (phone call is the only intentional secondary path).
- Real NAP and hours: 8356 Musick Memorial Dr, Brentwood, MO 63144 ·
  staffed M–Th 6–7, F 6–5, Sa 6–2, Su 8–2 · 24/7 keycard access ·
  LocalBusiness JSON-LD included.
- Accessibility: visible `:focus-visible` states, labeled inputs,
  `prefers-reduced-motion` respected, semantic landmarks.

## Hardening applied (June 2026 audit)

- **SMS consent microcopy** under both submit buttons (TCPA-style: may
  call/text to schedule, STOP to opt out).
- **Click-ID/UTM capture**: `gclid`/`gbraid`/`wbraid` + `utm_*` are read
  from the landing URL and sent with every lead for offline conversion
  imports.
- **Phone-call conversion fires on coarse-pointer (mobile) taps only** so
  desktop clicks on a phone number don't inflate counts.
- **Spam/junk protection**: honeypot field (silent fake-success for bots)
  and 10–11-digit phone validation.
- **Performance**: before/after photos transcoded PNG→JPEG via the Wix CDN
  (~1.74 MB → ~133 KB); hero image + all four brand fonts preloaded.
- **Contrast**: AA-compliant tints (`--ink-soft`/`--cream-soft`) for small
  secondary text; CTA button labels switched from red-on-charcoal (~3.2:1)
  to cream-on-charcoal, keeping the red border + red hover fill.
- **Header/hero**: charcoal header with red keyline, logo tagline lockup,
  and the homepage video's LIFT-branded dumbbell frame as the hero image
  (replacing the blurry evaluation-video poster).

## 🚨 Launch blockers — could not be determined from the live site

These are deliberately left as marked placeholders rather than guessed:

1. **Form endpoint** (`CONFIG.FORM_ENDPOINT` in `index.html`).
   The page POSTs JSON `{name, email, phone, source, formLocation, page}`.
   The site runs on Wix, so the natural target is a **Wix Velo HTTP
   function** on the main site (e.g.
   `https://www.lift-stl.com/_functions/leads`) that writes to a CMS
   collection / triggers the same notification their current form uses — or
   a Zapier/Make webhook into whatever CRM they use. **Until this is set,
   leads are not delivered anywhere** (the page logs a console error).
2. **Google Ads tag + two conversion actions**:
   - Uncomment the `gtag.js` snippet in `<head>` and set the `AW-` ID.
   - Set `ADS_CONVERSION_FORM_SUBMIT` and `ADS_CONVERSION_PHONE_CALL` in
     `CONFIG`. They fire as **separate conversion actions**: form-submit
     success, and every `tel:` click (header, sticky bar, footer, form
     microcopy).
3. **Indexing**: a commented `noindex` meta is included — uncomment it if
   the page will live on the same domain as the organic PT page.
4. **Privacy policy**: lift-stl.com has none (`/privacy-policy`,
   `/privacy`, `/terms` all 404). Google Ads lead-gen policy expects one on
   the landing page — publish a policy and swap in the commented footer
   link (`REPLACE_WITH_PRIVACY_POLICY_URL`).
5. **Owner sign-off on copy**: the "private gym" framing (the site itself
   says "24/7 Public Gym") and the "we'll text you" follow-up promise both
   need a yes from Eric — see audit notes.

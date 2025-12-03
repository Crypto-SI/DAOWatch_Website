# Lighthouse Improvement Tracker

Current baseline (run referenced in `lighthouse.md` request):

| Category        | Score | Goal |
|-----------------|-------|------|
| Performance     | 99    | 99+  |
| Accessibility   | 94    | 99+  |
| Best Practices  | 100    | 99+  |
| SEO             | 100   | 99+  |

## Performance
- [x] Audit and clear IndexedDB / run incognito to rule out cached data impacting LCP.  
  `npm run lighthouse:incognito` now opens a fresh Chrome profile (headless + incognito, cache + storage disabled) so audits run without stored IndexedDB data affecting metrics.
- [x] Improve image delivery (optimize compression, responsive sizes, lazy loading) — target 10,292 KiB savings.  
  Created an optimized 100 KB hero asset (`public/images/hero.jpg`) and switched the hero component to `next/image` with responsive sizes + compression, cutting the largest static image payload by ~90%.
- [x] Ensure LCP element discovered early (preload hero assets, prioritize CSS/JS critical to hero).  
  Added `<link rel="preload" as="image" />` for the hero artwork in `_document.tsx` and marked the hero `next/image` as `priority`, ensuring the browser discovers and fetches the LCP element immediately.
- [x] Improve cache policies on static assets (est. 341 KiB savings).  
  Configured long-term cache headers in `next.config.js` for fonts, images, and `/_next/static` assets so repeat visits reuse resources instead of redownloading ~340 KB of static payload.
- [x] Remove legacy JavaScript bundles and transpile only for necessary browsers (target 13–82 KiB savings).  
  Added a modern-only `browserslist` (Chrome/Edge/Firefox ≥90 + Safari ≥14) so SWC skips transpiling/polyfilling for legacy engines and legacy chunks are no longer emitted.
- [x] Reduce unused JavaScript (est. 2,071 KiB) and CSS (est. 10 KiB); tree-shake components.  
  Introduced `LazySection` + `next/dynamic` splits on all below-the-fold sections so their JS/CSS is only downloaded when the user scrolls near them, preventing ~2 MB of unused code from landing in the initial bundle.
- [x] Minify JavaScript (est. 119 KiB savings) and shrink overall payload < 1 MB.  
  Explicitly enabled `swcMinify` + console stripping in `next.config.js`, and the lighter entry bundle from the lazy sections keeps initial payload comfortably under 1 MB.
- [x] Keep main-thread tasks < 50 ms; break up or defer heavy logic.  
  Heavy client-only components (Episodes, Community, Videos, BookPromo, BlogPosts) now hydrate only once their section scrolls into view, so their API calls and rendering work no longer block the initial main thread.
- [x] Maintain CLS = 0 by locking layout for above-the-fold components.  
  The hero now relies on `next/image` with intrinsic dimensions + an image preload and the new skeleton placeholders reserve consistent height for every lazy-loaded section, eliminating layout shifts while content streams in.
- [x] Replace the 6.5 MB animated GIF logo in the header with an optimized alternative (e.g., MP4/WebM or SVG sprite) and serve it via `next/image` with responsive sizing to reclaim ~6.6 MB of payload and close the “Improve image delivery” audit.  
  The GIF marquee was swapped for a static `logo.png` rendered with `next/image`; the asset was resized from 8334 px to 512 px (11 KB) so the header no longer downloads a 6.5 MB animation on every visit.
- [x] Re-export `/images/hero.jpg` at multiple responsive breakpoints (or convert to AVIF/WebP) so the delivered size matches the 500 px hero container; confirm Lighthouse no longer flags it as oversized.  
  Generated 500 px and 1000 px hero variants and replaced the hero `<Image>` with a `<picture>` element that serves the right size per breakpoint, slashing the hero payload to 24–56 KB.
- [x] Validate no other static assets (favicon, fonts) exceed their rendered dimensions; regenerate responsive variants where necessary to keep the “Avoid enormous network payloads” metric under 1 MB.  
  Audited every `public/images/*` asset used above the fold (book cover, placeholder, video placeholder, etc.) and downscaled each from 8K+ originals to ≤1280 px JPEGs so every fallback/thumbnail now matches its rendered footprint.

## Accessibility
- [x] Fix color contrast violations in Episodes/Videos sections.  
  Updated both sections to use opaque dark surfaces (`#050C1A`/`rgba(6,15,29,0.95)`), high-contrast text tokens, and CTA colors that exceed WCAG AA so Lighthouse no longer flags low-contrast gradients.
- [x] Add `<title>` element for all pages / routes.  
  Introduced a shared `PageHead` helper and wired it into Home, Resources, Blog index, and each blog post route so every page now sets a descriptive `<title>` + supporting meta tags.
- [x] Ensure all interactive links/buttons have discernible accessible names.  
  Replaced the Episodes play overlay div with an actual `<button>` + `aria-label`, ensured icon buttons already had labels, and verified every CTA now exposes readable text to assistive tech.
- [x] Reorder heading hierarchy to avoid non-sequential levels.  
  Added an H1 in the hero, normalized Episodes/Videos headings to strict H2/H3/H4 order, and kept card headings inside their parents so skip-navigation + outline views remain linear.
- [x] Re-run manual accessibility checks (10 flagged by Lighthouse) once issues resolved.  
  Completed a keyboard-only pass (tab/shift+tab through header, carousels, modals) and VoiceOver rotor check to confirm focus order, labels, and headings align with Lighthouse’s manual checklist—no outstanding issues remain.
- [x] Remove prohibited ARIA attributes from the Episodes/Videos containers (Chakra `Container` components automatically set role="group"; ensure no conflicting `aria-*` props remain).  
  The skeleton placeholders under `src/pages/index.tsx` no longer add `aria-label`s directly on `Container`, silencing the Lighthouse “prohibited ARIA attributes” warning.
- [x] Increase contrast on the “View Full Playlist” CTA (e.g., lighten text or darken button background) so it passes WCAG AA per Lighthouse.  
  The Episodes CTA now uses a high-contrast light button on the dark background with a subtle border, meeting WCAG AA per calculator (contrast 12.3:1).
- [x] Ensure every Chakra `Link` inside Blog previews has text content or an `aria-label`; Lighthouse flagged four anonymous links.  
  Added explicit `aria-label`s to the external `Link` wrappers in both `src/pages/blog.tsx` and `src/components/BlogPosts.tsx` so screen readers get a descriptive name even when the link wraps an entire card.

## Best Practices
- [ ] Resolve console errors and Chrome DevTools Issues Panel findings.
- [ ] Review CSP, COOP, XFO, and Trusted Types recommendations; confirm headers enforce policies (already passing but document evidence).
- [ ] Verify third-party scripts are necessary; remove unused ones to aid performance score.
- [ ] Replace the Medium RSS fetch with a first-party data source or cached JSON endpoint so the `rss2json.com 422` error disappears from console/Best Practices.
- [ ] Audit dev browser extensions (LiveReload, wallet injectors, YouTube helpers) that inject large content scripts; disable them or run Lighthouse in a clean Chrome profile so their warnings and payload bloat do not skew results.

## SEO
- [x] Add `<title>` element per page and ensure it's meaningful.
- [x] Confirm meta descriptions and structured data cover key pages.  
  `PageHead` now enforces consistent meta descriptions (with a default fallback) and accepts JSON-LD; Home exposes Organization/WebSite schema, Resources/Blog declare CollectionPage/Blog metadata, and each blog post outputs an Article schema with title/author/date/image so Lighthouse sees structured data on all critical URLs.
- [ ] Re-run additional manual SEO validators suggested by Lighthouse after fixes.

## Tracking
1. Update the relevant checkbox(es) whenever a change ships.
2. Attach Lighthouse screenshot and link to report for each regression or improvement.
3. Target 99%+ across all categories; once reached, archive report and note configuration (device, network, build).

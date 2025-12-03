# Lighthouse Improvement Tracker

Current baseline (run referenced in `lighthouse.md` request):

| Category        | Score | Goal |
|-----------------|-------|------|
| Performance     | 73    | 99+  |
| Accessibility   | 85    | 99+  |
| Best Practices  | 93    | 99+  |
| SEO             | 91    | 99+  |

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

## Best Practices
- [ ] Resolve console errors and Chrome DevTools Issues Panel findings.
- [ ] Review CSP, COOP, XFO, and Trusted Types recommendations; confirm headers enforce policies (already passing but document evidence).
- [ ] Verify third-party scripts are necessary; remove unused ones to aid performance score.

## SEO
- [x] Add `<title>` element per page and ensure it's meaningful.
- [x] Confirm meta descriptions and structured data cover key pages.  
  `PageHead` now enforces consistent meta descriptions (with a default fallback) and accepts JSON-LD; Home exposes Organization/WebSite schema, Resources/Blog declare CollectionPage/Blog metadata, and each blog post outputs an Article schema with title/author/date/image so Lighthouse sees structured data on all critical URLs.
- [ ] Re-run additional manual SEO validators suggested by Lighthouse after fixes.

## Tracking
1. Update the relevant checkbox(es) whenever a change ships.
2. Attach Lighthouse screenshot and link to report for each regression or improvement.
3. Target 99%+ across all categories; once reached, archive report and note configuration (device, network, build).

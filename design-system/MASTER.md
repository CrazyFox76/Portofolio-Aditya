# Design System: Portofolio Aditya

> **Superseded (2026-11-25):** the site now follows the wahba design (see `hero-spec.md` and `src/styles/wahba.css`). Kept for reference only.

Source: ui-ux-pro-max searches (style, product, typography domains), verified against the brief
"bersih dan profesional" for job, client, and university audiences.
Note: the first `--design-system` run returned Brutalism (0px corners, instant transitions, anti-design).
It was rejected: it conflicts with the brief. Style below comes from the retry on `--domain style`.

## Style: Minimalism & Swiss Style
- Grid-based layout, 12 columns, max-width 1200px, generous white space.
- Single accent color. No gradients. No shadows unless necessary (sharp, subtle).
- Clear type hierarchy. Fast loading. Essential elements only.
- Hover 200-250ms, smooth transitions. Respect `prefers-reduced-motion`.
- Light and dark mode both supported (light default).

## Color tokens (monochrome + blue accent)
| Token | Hex |
|---|---|
| primary | #18181B |
| on-primary | #FFFFFF |
| secondary | #3F3F46 |
| accent | #2563EB |
| on-accent | #FFFFFF |
| background | #FAFAFA |
| foreground | #09090B |
| card | #FFFFFF |
| muted | #E8ECF0 |
| muted-foreground | #475569 |
| border | #E4E4E7 |
| destructive | #DC2626 |
| ring | #18181B |

## Typography
- Heading: Space Grotesk. Body: Archivo (Tailwind config from the pairing "Minimalist Portfolio").
- Google Fonts: Archivo 300-700 + Space Grotesk 300-700, display=swap.
- Body 16px minimum, line-height 1.5.

## Spacing and shape (spacious, density 3/10)
- Section padding 96px desktop, 64px mobile. Card gap 24-32px.
- Border radius: the style default is 0px. Project call: 6px on cards and buttons for approachability. Revisit if it looks soft.

## Motion (standard, 4/10)
- Fade + 16px rise on scroll, stagger 60ms, 300-450ms, ease-out.
- Framer Motion is already a dependency. Skip GSAP (removed).

## Pre-delivery checklist
- SVG icons only (Lucide), no emoji icons.
- cursor-pointer on clickables, visible focus rings, contrast 4.5:1.
- prefers-reduced-motion respected.
- Responsive at 375, 768, 1024, 1440 px. No horizontal scroll.
- Images WebP, lazy loaded, space reserved (CLS < 0.1).

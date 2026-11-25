# Hero + Dock spec (measured from portfolio2027-ten.vercel.app/en)

Source: computed styles read in Chrome on 2026-11-25 at a 1920x965 viewport.
Used with the owner's permission. A "Design by wahba" watermark in the footer is required.
Not yet measured: mobile breakpoints and the hero entrance animation (3 animations running on load).

## Page
- Body background: `#050608` (rgb 5,6,8).
- Font: `bricolage` (Bricolage Grotesque variable, weights 200-800), fallback `Arial, sans-serif`.

## Hero section
- `section`: padding `12px 12px 0`, overflow hidden, height 663px at a 965px viewport.
- Card: `position: relative; overflow: hidden; border-radius: 22px 22px 32px 32px;`
  - Background: `linear-gradient(115deg, #1b1714, #513824 53%, #35271d)`. Fallback color `#6f4e37`.
  - Size 1881x651 (full width minus 12px padding each side).
- Name: two `span`s, "First" top-left, "Last" lower-right, positioned absolutely over the photo.
  - `font-size: 165px; font-weight: 700; letter-spacing: -0.06em (-9.9px); line-height: 1.15;`
  - Color `#b6c6bc` (rgb 182,198,188).
  - First name box: x 87, y 181. Last name box: right edge about 106px from the viewport edge, y 298 (117px lower than the first name).
  - Wrapper `z-index: 1`, so the name is drawn above the card background. Check whether the photo overlaps it.
- Photo: `position: absolute`, 1016x566, horizontally centered (x 445 at 1920), bottom-anchored to the card.
  - `object-fit: contain; object-position: 50% 100%;`
  - Cutout portrait (transparent PNG or WebP), subject's shoulders touch the card bottom.
- CTA "Start your project": `position: absolute`, 189x52, centered horizontally (x 858), y 583, overlapping the photo near the bottom.
  - Pill: `border-radius: 999px; background: #b6c6bc; color: #050608; font-size: 13px; font-weight: 500; line-height: 19.5px; padding: 8px 20px 8px 8px;`
  - Icon circle: 32x32, `border-radius: 50%; background: #050608;` arrow SVG 16x16, stroke `#b6c6bc`.

## Dock header
- `header`: `position: fixed; top: 0;` centered horizontally, 354x64.
  - `background: #050608; border-radius: 0 0 27px 27px; box-shadow: 0 4px 10px rgba(0,0,0,.07);`
  - Inner: `padding: 10px 16px; gap: 10px;` row.
- Items, left to right: logo (Home), Solutions, Tools, How I work, About (wahba), Let's talk, language toggle (small, last).
  - Link hit area 44x44, `border-radius: 13px`, `transition: color .18s`.
  - Icon tile 40x40, `border-radius: 11px`. Colored app-style tiles with white glyphs (blue grid, indigo folder, orange path, red people, green chat).
  - Hover: icon `transform: scale(1.045) translateY(-2px)`, `transition: transform .36s cubic-bezier(.16,1,.3,1), filter .24s ease-out`.
  - Tooltip below the dock on hover: `background: #050608; border-radius: 12px; padding: 8px 13px;` white text, y 70.
- Nav gap between items: 2px inside `nav`.

## Mapping to Aditya's site
- Name: "Aditya" / "Pratama".
- Dock items: Home, Projects, Skills, Experience, About, Contact, ID/EN toggle.
- Dock icons: recreated (Lucide glyphs on colored tiles). The original icon images are not copied.
- Photo: Aditya's own cutout portrait.

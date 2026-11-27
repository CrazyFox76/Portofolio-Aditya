# Portofolio Aditya Pratama

Personal portfolio of Aditya Pratama: web, network and AI work, certificates, and a way to get in touch.

**Live:** https://portofolio-aditya-three.vercel.app

## Stack

- **React 18 + Vite**
- **Tailwind CSS** plus hand-written styles in `src/styles/wahba.css`
- **Framer Motion** for the hero entrance; the scroll-driven sections use plain `requestAnimationFrame`
- **Web3Forms** for the contact form
- **Lucide** icons

The layout follows the design of [wahba](https://portfolio2027-ten.vercel.app), used with its owner's permission.

## Run locally

```bash
npm install
npm run dev
```

Create `.env` (git-ignored) so the contact form delivers to the inbox:

```
VITE_WEB3FORMS_KEY=your-web3forms-access-key
```

Without the key, the form falls back to opening the visitor's email app.

## Structure

| Path | What it is |
|---|---|
| `src/sections/` | Page sections: `Hero`, `FolderRow`, `BrandStory`, `WhyWait` |
| `src/components/` | Dock, footer, glass folder, tools folder |
| `src/i18n/` | Indonesian and English copy (`id.js`, `en.js`) and the language toggle |
| `src/styles/wahba.css` | Section styles |
| `public/` | Portrait, icons, certificates, project screenshots, OG image |

## Deploy

Vercel builds from the `main` branch. Set `VITE_WEB3FORMS_KEY` in Project Settings → Environment Variables.

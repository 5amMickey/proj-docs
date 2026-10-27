# Phantom Break Studio brand

Updated 2026-10-16. Source files are in `Documents\Development\branding`. The latest card is v14 (`business-card-2025-jp-v14.pdf`, made from `business_card_front.svg` and `business_card_back.svg`). The older vertical card (`business-card-2025-jp-v10.svg`) uses more purple and isn't the reference.

## How the brand works

The studio colours, logo and ghost never change. Each game has its own theme with its own colours and mood, and the studio shows up as a frame around it: the logo, the studio credit, the ghost, and the contact block. A game document should look like that game first and carry the studio mark second.

| Layer | What it controls | Where it lives |
|---|---|---|
| Studio | Logo, ghost, pattern, studio colours, Roboto, contact block | this folder (`tokens.css`) |
| Game theme | Page and slide colours, accent use, imagery, headings | the game's brand file, e.g. `ProjectRunner/brand.md` |

Name use: "Phantom Break Studio" on logos, headers, slides and the web. "Phantom Break Inc." only where the legal name is needed: CMF forms, contracts, letters, and the copyright line.

## Colours

| Token | Hex | Use |
|---|---|---|
| `--pb-coral` | `#f05658` | Logo, studio accent, rules, buttons |
| `--pb-slate` | `#374a58` | Text on light, card back, ghost body |
| `--pb-slate-deep` | `#1d262e` | Logo shadow on dark, darkest studio ground |
| `--pb-plum` | `#4b3e70` | Logo shadow on light |
| `--pb-cream` | `#fef9f5` | Paper, card front |
| `--pb-white` | `#ffffff` | Ghost outline, logo fill on light |

Contrast (WCAG 2):

| Pair | Ratio | Allowed |
|---|---|---|
| Slate on cream | 8.8 | Any text |
| Muted `#5f6f7b` on cream | 5.0 | Any text |
| Coral on cream | 3.3 | Text 24 px and up, or 19 px bold. Rules and fills. |
| White on coral | 3.4 | Button labels 19 px bold and up |
| Coral on slate-deep | 4.5 | Any text |
| Coral on slate | 2.7 | Logo and shapes only, no text |

## Logo

| File | Use |
|---|---|
| `logo/pb-logo-light.svg` (+ `-1200.png`, `-400.png`) | Light grounds. Plum shadow, white letters in the "Studio" bar. |
| `logo/pb-logo-dark.svg` (+ PNGs) | Dark grounds. Near-black shadow. "Studio" and the control icons are cut out, so the ground shows through. |
| `logo/pb-ghost.svg` (+ `-512.png`, `-128.png`) | Mark and avatar. Use where the full logo doesn't fit: favicons, slide corners, sign-offs. |

- Keep clear space around the logo at least the height of the "Studio" bar.
- Minimum width is 120 px on screen, 30 mm in print.
- Don't recolour, outline, stretch or add effects. On a busy image, put the logo on a slate or cream panel.
- The logo letters are outlined art. There is no font file for them, so don't set new text to imitate the logo.

## Pattern

`logo/pb-pattern.svg` is the maze pattern from the card back, at card strength (cream lines at 7%). Lay it over slate or any dark game colour. `logo/pb-pattern-solid.svg` has full-opacity lines for recolouring. Both SVGs are about 900 KB, so the web uses `logo/pb-pattern-slate.webp` (pattern flattened onto slate, 1200 px, 34 KB). `logo/pb-pattern-1600.png` is the transparent version at 1600 px. `logo/pb-pattern-banner.png` is the 1592x399 profile banner.

Use the pattern on studio surfaces only: covers, contact slides, letterhead bands, footers. Don't put it behind game screenshots.

## Type

Roboto, variable (weight 100-900, width 75-100%), OFL licence. Files in `fonts/`: variable TTF for installing on a machine, WOFF2 for the web, and `fonts/static/` (Regular, Bold, Italic, Bold Italic) for embedding in Word files.

| Role | Setting |
|---|---|
| Display (names, slide titles) | Roboto 800, width 75% (`font-stretch: 75%`). On the card: "Michael Brandt". |
| Body | Roboto 400, 16-18 px on screen, 11 pt in print |
| Labels | Roboto 500-700, letter-spacing 0.06em, uppercase |

A game theme can set its own heading face. Body text stays Roboto.

The Word templates carry Roboto inside the file, so they show correctly on machines without it. To type new text in Roboto in Word, install it once: double-click each file in `fonts/static/` and choose Install.

## CMF and other plain uploads

CMF uploads must be Arial or Helvetica over 11 pt, black on white, no columns (`ProjectRunner/cmf/requirements.md`). Those documents get no brand colour in the body. A small logo in the header is the most they carry.

## Contact block

```
Phantom Break Studio
phantombreak.studio
michael@phantombreak.studio
```

## Templates

| File | Use |
|---|---|
| `templates/PhantomBreak_Letterhead.docx` | Letters, commitment letters, anything signed. Studio colours only. Preview: `templates/PhantomBreak_Letterhead_preview.pdf`. |

Game templates live with each game. Project Runner's are in `C:\Prod\ProjectRunner\Docs\` (deck, Word document, theme). See `ProjectRunner/brand.md`.

## Add a game theme

1. Copy `tokens.css` into the game's `Docs/brand/` as `pb-tokens.css`, with `fonts/` and `logo/`.
2. Write `<game>-theme.css` that sets every `--theme-*` value from the game's palette. Keep the studio colours untouched.
3. Write `<Game>/brand.md` in proj-docs with the palette, contrast checks, and what each accent is for.

## Files

```
brand/
  BRAND.md          this guide
  tokens.css        studio colours, fonts and the default (studio) theme
  fonts/            Roboto variable TTF and WOFF2, static TTFs for Word, OFL.txt
  logo/             logos, ghost, pattern
  templates/        studio letterhead (.docx) and its PDF preview
```

The logo, ghost and pattern files were cut out of the card SVGs: front `text` group (light logo), back `text` group (dark logo), back `icon` group (ghost), back `pattern-bgd` group (pattern).

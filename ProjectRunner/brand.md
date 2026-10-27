# Project Runner theme

Updated 2026-10-16. How Project Runner uses the Phantom Break Studio brand (`../brand/BRAND.md`). The studio colours, logo and ghost stay fixed. This file covers the game's own palette and where each colour goes.

## Palette

Taken from `refs/visual-reference.md`: cool night ambient against warm practicals, with neon accents used sparingly. Neon red is the studio coral, so the game and the studio share one accent.

| Token | Hex | Use |
|---|---|---|
| `--pr-night` | `#0a0e13` | Page and slide ground, cover bands, table headers in Word |
| `--pr-night-raised` | `#121a22` | Panels and cards |
| `--pr-line` | `#233140` | Borders on night |
| `--pr-teal` | `#1e5f66` | Exterior grade, ambient tints |
| `--pr-sodium` | `#ffa24a` | Interior grade, warm highlights. Also marks placeholder text in the deck. |
| `--pr-neon-red` | `#f05658` | Main accent (studio coral): rules, labels, numbers, the title glow |
| `--pr-cyan` | `#19e3ff` | Hacking only: the hack card, hack UI shots, focus rings on the web |
| `--pr-text` | `#e6edf2` | Text on night |
| `--pr-muted` | `#9fb0bd` | Secondary text on night |

Contrast on night (`#0a0e13`): text 16.4, muted 8.7, neon red 5.7, cyan 12.4, sodium 9.7. All pass for any text size. On white paper, neon red is 3.4, so use it there only for 14 pt bold headings and rules.

Scene grades follow Replaced: teal for exteriors, sodium for interiors. In CSS they are `.grade-exterior` and `.grade-interior`.

## Type

Headings are Roboto 800 at width 75%, uppercase, the same face as the name on the studio card. Body text is Roboto 400. The Word templates use Roboto Bold for headings, because Word can't set font width.

## Where the studio shows

| Place | Studio part |
|---|---|
| Web top bar | Dark logo, 150 px |
| Web studio block, deck last slide | Slate ground, maze pattern, dark logo, ghost, contact, all in studio colours |
| Deck cover | Dark logo on a slate-deep badge, top right |
| Deck slide footers | Ghost, bottom left |
| Word document | Ghost and "Phantom Break Studio" in the footer, "Phantom Break Studio presents" on the cover band |
| Copyright lines | "Phantom Break Inc." |

## Files

All in `C:\Prod\ProjectRunner`:

| Path | What |
|---|---|
| `Docs\brand\runner-theme.css` | The theme. Load it after `pb-tokens.css`. |
| `Docs\brand\pb-tokens.css`, `fonts\`, `logo\` | Copy of the studio kit from `proj-docs/brand` |
| `Docs\deck\deck.html`, `src\tailwind.css` | Pitch deck template, 10 layouts at 1920x1080. Styled with Tailwind v4; `npm run build` writes `deck.css`, and `render.ps1` builds before it renders. |
| `Docs\deck\render.ps1` | Renders the deck to PDF with headless Brave |
| `Docs\deck\ProjectRunner_Deck_template.pdf` | The rendered template |
| `Docs\templates\ProjectRunner_Document.docx` | Word document: cover band, styles, table, studio footer |
| `Docs\templates\PhantomBreak_Letterhead.docx` | Studio letterhead (copy of `proj-docs/brand/templates`) |
| `Docs\templates\_preview\` | LibreOffice PDF renders of both Word files |
| `Docs\templates\_build\build_docx.py` | Rebuilds both Word files from scratch with Roboto embedded |
| `Web\` | Landing page. Tailwind v4: `src\tailwind.css` builds `style.css` (guide: `Web\README.md`) |
| `Web\brand\` | The landing page's own copy of the tokens, theme, fonts and logos |

When a colour changes, edit `Docs\brand\runner-theme.css` first, then copy it to `Web\brand\`.

The deck and the landing page are styled with Tailwind CSS v4 (decided 2026-10-16). Each has a `src\tailwind.css` whose `@theme` block names the brand variables (`coral`, `night`, `slate-deep`, ...), so colours still come from the theme files. Run `npm run build` in the folder after changing classes.

The landing page uses studio slate-deep `#1d262e` as its page ground instead of night. That applies to the website only; the deck and Word documents stay on night. On slate-deep, coral text is 4.5:1, which only just passes.

## Rules

- Images are in-engine captures only. No AI-generated images (pitch-plan decision 9).
- Cyan means hacking. Don't use it as a general accent.
- Don't put the maze pattern behind game screenshots. It belongs to studio surfaces.
- CMF uploads stay plain: Arial or Helvetica over 11 pt, black on white, no columns. The Runner theme doesn't apply to them.

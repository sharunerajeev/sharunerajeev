# Copilot Instructions for sharunerajeev Website

## Project Overview

- This is a personal website built with Vite, TypeScript, SCSS, and HTML, designed for deployment on GitHub Pages.
- The project uses a theme system in SCSS that adapts to browser color scheme (light/dark) using SCSS variables and media queries.
- The main entry point is `src/index.html`, with logic in `src/main.ts` and styles in `src/style.scss`.

## Architecture & Patterns

- **Vite** is used for fast development and builds. Source files are in `src/`, and production output is in `dist/`.
- **SCSS Theming:**
  - Theme variables are defined as SCSS maps (`$light-theme`, `$dark-theme`).
  - The `$theme` variable is set at build time and switched using `@media (prefers-color-scheme: dark)`.
  - Use the `theme-color($key)` function to access theme values in styles.
- **Responsive Design:**
  - Font sizes use `clamp()` and viewport units for fluid scaling.
  - Layouts use flexbox and custom mixins (see `@mixin flex-center-column`).
    **Dynamic Content & Header Time:**
  - All main content sections (Home, About Me, Education, Contact Me) are defined in `src/contentData.ts` and rendered dynamically.
  - The current date/time is rendered in `.header-time` by TypeScript (`main.ts`) and updates every second.
  - The header time always shows the time in IST (Asia/Kolkata) via code, but does not display "IST" in the UI. Example: `Sun Aug 3 20:05 India`.
  - The header time is shown as plain text, zooming slightly on hover, with no extra containers or backgrounds.

## Developer Workflows

- **Install dependencies:** `bun install`
- **Start dev server:** `bun run dev`
- **Build for production:** `bun run build`
- **Preview build:** `bun run preview`
- **Deploy to GitHub Pages:** `bun run deploy`
- **Format code:** `bun run format` (Prettier, auto-formats on save via VS Code settings)

## Conventions & Tips

- All source code lives in `src/`. Use relative imports for TS/SCSS.
- Use `.scss` for all styles; do not use plain `.css`.
- Use semantic HTML and keep logic in `main.ts`.
- For new theme colors, add to both `$light-theme` and `$dark-theme` maps and access via `theme-color()`.
- Responsive font sizes should use `clamp()` for consistency.

## Key Files

- `src/index.html`: Main HTML structure
- `src/style.scss`: Theming, layout, and responsive styles
- `src/main.ts`: DOM logic, dynamic content, animation, header time logic
- `src/contentData.ts`: All content sections as constants
- `vite.config.ts`: Vite configuration (root is `src/`, output is `dist/`)
- `.prettierrc`, `.prettierignore`: Formatting rules
- `.vscode/settings.json`: Editor settings (format on save)
- `README.md`: Main project documentation (no /docs folder)

## External Integrations

- Fonts loaded from Google Fonts in `index.html`
- Deployment via `gh-pages` npm package

---

If you add new features, follow the established patterns for theming, responsiveness, and code organization. For questions, check the README or existing code for examples. The main `README.md` in the project root is the source of truth for documentation.

# Lahiru Sathsara — Portfolio

Open this folder in VS Code, then use the terminal:

```powershell
npm install
npm run dev
```

Open the URL printed by Vite. Use Node.js 24 or a compatible supported Node version. Open the site through Vite rather than opening HTML files directly; Vite includes the shared header and footer.

```powershell
npm run build
npm run preview
```

Deploy the contents of `dist` to a static host at the domain root. The included `dist` is ready to upload. No backend or API keys are required.

## Structure

- `index.html`: Home
- `about.html`: About, experience, education and skills
- `projects/index.html`: filterable projects
- `case-studies/index.html`: all five case studies
- `projects/dataguard.html`, `acas.html`, `uber-eats.html`, `revenuelift.html`, `f1-pipeline.html`: case study pages
- `certifications-articles/index.html`: selected credentials and LinkedIn articles
- `contact/index.html`: contact channels and CV
- `partials/header.html`, `footer.html`, `icons.html`: shared navigation, footer and social icons
- `src/style.css`: shared base styles
- `src/polish.css`: final responsive layout refinements
- `src/css/pages/`: page styles
- `src/main.js`: shared interactions
- `src/projects-page.js`: project data, statuses and links
- `public/assets/`: portrait, logos, certificate images, article images, CV and covers

Photographs and certificate images are preserved. SVG covers are intentional local designs for projects without supplied cover images. LinkedIn pages and demos remain external services.

F1 remains in progress. Planned components and unmeasured benchmarks are stated honestly.

## Contact form and cover images

The contact form submits to `https://formspree.io/f/xwlpzadz`. A successful response shows a confirmation popup. Failed submissions keep the visitor's message and allow a retry; the form also works as a native POST when JavaScript is unavailable. Notification emails use the destination configured in your Formspree account.

All supplied cover images are included as local WebP files in `public/assets/`. Home, the gallery and the relevant existing case studies share these files. The original typography is also served locally from `public/assets/fonts/`, with the font licenses included. Theme colors and background animation styles are preserved.

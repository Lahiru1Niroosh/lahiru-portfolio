# PORTFOLIO_CONFIG.md

Save this file in the **root of the portfolio repo**. Every Copilot prompt tells it to read this file first. Edit the TODO lines as you learn the answers.

## Project
Vite multi-page static site (no framework) for recruiters hiring **data engineering, data analytics, BI and DBA** roles. Pages: Home, About, Certifications + Articles, Projects, Case Studies, Contact, and case study detail pages under `projects/`. Header and footer come from `partials/` and are injected by `vite.config.js`.

## Rules (apply to every phase)
1. **Never invent facts, numbers, dates, links or achievements.** Use this file only. Missing information gets a visible `TODO` and goes in the report.
2. Label simulated or synthetic data wherever results are shown.
3. Keep the look: dark theme, tokens `--bg:#070b16 --panel:#0f1729 --line:rgba(255,255,255,.09) --text:#eef3ff --muted:#9aa8c2 --mint:#63ead7 --blue:#7aa8ff --amber:#ffbd7c`; fonts Bricolage Grotesque (headings), Figtree (body).
4. Animate only `transform` and `opacity`. Respect `prefers-reduced-motion`. Cursor effects only when `(hover:hover)`. No animation libraries, particles, custom cursors or scroll-jacking.
5. Accessibility: semantic landmarks, visible focus, 44 px touch targets, alt text, `aria-current`, keyboard-operable menu, filters and lightbox.
6. **Do only the phase you were asked to do.** Do not edit the F1 pages, the F1 cards, or any file outside the phase's scope.
7. A phase is done only when the definition of done below passes.

## Definition of done
- `npm run build` passes with no warnings you introduced.
- At widths 375, 768, 1024 and 1440 px: no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`) and no content flush to the screen edge.
- Keyboard: every new control works with Tab, Enter, Space and Escape, and focus is visible.
- Reduced motion: nothing animates and all content is visible.
- Take a screenshot of each page you changed at 375 px and 1440 px and describe what you see.

## Report format (end every phase with this)
1. Files changed.
2. What was fixed, mapped to findings A–F.
3. Open TODOs.
4. What you chose not to do, and why.
Then **stop and wait**.

## CONFIG

**Contact**
- Email: lahirusathsara671@gmail.com
- Phone: +94 76 154 5631 (`tel:+94761545631`)
- WhatsApp: https://wa.me/94761545631
- LinkedIn: https://www.linkedin.com/in/lahiru-niroshan/
- GitHub: https://github.com/Lahiru1Niroosh/
- CV: /assets/Lahiru_Niroshan_Sathsara_CV.pdf
- Location: Sri Lanka (GMT+5:30)
- Contact form endpoint (Formspree or Web3Forms): TODO
- Typical reply time: TODO

**Roles (About page)**
- Database Administrator, VS Information Systems: started Apr 2025. End-date display: TODO (my decision).
- IT Support Engineer, NDB Securities: page shows "Apr 2025 – Jul 2025 · Contract". TODO: confirm; it overlaps the DBA start.
- Sales Executive, FlyLanka: Aug 2023 – Aug 2024 · Contract.
- Education: BSc (Hons) Information Technology, SLIIT, expected 2026.

**Live links**
- DataGuard Insights demo: https://dataguard-insights-cjf2jbrvhgsxpaup4zljkg.streamlit.app/
- Billing Assurance demo: https://billing-assurance-control-tower-demo.streamlit.app/Billing_Integrity
- Uber Eats demo: current URL `uber-eats-sl-analytics-project-here.streamlit.app` is a placeholder. TODO: real URL, otherwise remove the button.
- F1 repo: https://github.com/Lahiru1Niroosh/F1-Real-Time-Data-Pipline (TODO: confirm spelling and that it is public)

**F1 status (single source of truth):** Kafka to PostgreSQL ingestion complete; Spark to Cassandra streaming complete; Airflow in progress; dashboards planned. Live-versus-replayed data: TODO. Benchmarks: TODO.

**Certifications** (only these; never add expired ones)
| Title | Issuer | Issued |
|---|---|---|
| Oracle Cloud Infrastructure 2025 Certified Foundations Associate | Oracle | Jul 2025 |
| Oracle Fusion AI Agent Studio Foundations Associate – Rel 1 | Oracle | Jul 2025 |
| Building a Highly Available, Scalable Web Application | AWS | Oct 2025 |
| AWS SimuLearn: Core Security Concepts | AWS | Oct 2025 |
| AWS SimuLearn: Databases in Practice | AWS | Sep 2025 |
| Configure Azure Blob Storage | Microsoft | Aug 2025 |

Verification URL and credential ID per certificate: TODO.

**Articles (LinkedIn)**
1. "Designing for Resilience: The Core Pillars of Modern Production Database Architecture" https://www.linkedin.com/pulse/designing-worst-case-scenario-core-pillars-modern-lahiru-niroshan-jvf0c/
2. "Why Linux Is a Must-Have Skill for Every Data Engineer (and How I'm Learning It)" https://www.linkedin.com/pulse/why-linux-must-have-skill-every-data-engineer-how-im-niroshan--nslqc/
Publish dates and reading times: TODO.

## FINDINGS (from a scan of the site; verify each one before fixing)

**A. Broken layout on Contact, Certifications + Articles and Case Studies.** These pages use classes `.shell`, `.sec` and `.fx`, defined only in the inline `<style>` of other pages. `src/style.css` defines only `.site-shell`. Content sits flush left with no container.

**B. The header shows no contact details.** `vite.config.js` (`sitePartials`) replaces each page's header with `partials/header.html`, which has an icon sprite but no contact links. Edit the partial.

**C. Certification cards are far too big** (4:3 image area per card). Images are hot-linked from LinkedIn with signed tokens that **expire Oct 6, Oct 8 and Oct 15, 2026**. The "verify" button opens the image, not a verification page. Article covers have the same expiry problem.

**D. Case Studies index is thin**: four plain cards, no filter, metrics, stack or status. `/assets/acas-cover.png` and `/assets/revenuelift-cover.png` are missing.

**E. Case study detail pages are inconsistent and mostly static.** `acas.html`, `uber-eats.html`, `revenuelift.html` are minified with duplicated CSS; `dataguard.html` has about 840 lines of inline CSS. `vite.config.js` deletes every inline `<script>` on project pages with a regex and rewrites `p<0.0001` with a string replace. "What broke" sections contain internal notes such as "the supplied README does not…" and "this case study does not invent one". Motion is only reveal-on-scroll and the diagram wires.

**F. Site-wide.** `src/style.css` has duplicate `:root`, `html`, `body` blocks and dead CSS (`hero-bg`, `gradient-text`, `portrait-glow`, `social-icon`, `section-title`, `project-card`, `skill-card`) and an unloaded font (Space Grotesk). Tailwind is imported but not intentionally used. Cover PNGs are 1.6–3.0 MB. No favicon or canonical; Open Graph tags only on Home. No skip link; `<main>` has no id. Missing assets: `kafka.svg spark.svg cassandra.svg duckdb.svg powerbi.svg git.svg dbt.svg sql.svg` and covers for Job Market, Logistics, Spotify, Weather ETL, BookVault, Clinic, EcoVita, Homestacks, DataGuard Core, DataGuard Insights.

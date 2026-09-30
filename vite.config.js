import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { defineConfig } from "vite";

const root = process.cwd();

const pageStylesheets = {
  "index.html": "home",
  "about.html": "about",
  "projects/index.html": "projects",
  "projects/dataguard.html": "dataguard",
  "projects/acas.html": "project-detail",
  "projects/uber-eats.html": "project-detail",
  "projects/revenuelift.html": "project-detail",
  "projects/f1-pipeline.html": "f1-pipeline",
};

function sitePartials() {
  const headerTemplate = readFileSync(
    resolve(root, "partials/header.html"),
    "utf8",
  );
  const icons = readFileSync(resolve(root, "partials/icons.html"), "utf8");
  const footer = readFileSync(resolve(root, "partials/footer.html"), "utf8");

  return {
    name: "site-html-partials",
    transformIndexHtml: {
      order: "pre",
      handler(html, context) {
        const pagePath = relative(root, context.filename).replaceAll("\\", "/");
        const page =
          pagePath === "index.html"
            ? "home"
            : pagePath === "about.html"
              ? "about"
              : pagePath === "certifications-articles/index.html"
                ? "certifications"
                : pagePath === "projects/index.html"
                  ? "projects"
                  : pagePath === "case-studies/index.html"
                    ? "caseStudies"
                    : pagePath === "contact/index.html"
                      ? "contact"
                      : pagePath.startsWith("projects/")
                        ? "caseStudies"
                        : "";

        const activeNames = {
          home: "home",
          about: "about",
          certifications: "certifications",
          projects: "projects",
          caseStudies: "caseStudies",
          contact: "contact",
        };
        const header = headerTemplate.replaceAll(
          /\{\{(\w+)Current\}\}/g,
          (_, name) =>
            activeNames[page] === name ? 'aria-current="page"' : "",
        );

        let output = html
          .replace(
            /<svg width="0" height="0" style="position:absolute" aria-hidden="true">[\s\S]*?<\/svg>/g,
            "",
          )
          .replace(/<div class="(?:fx|site-atmosphere)"[^>]*><\/div>/g, "")
          .replace(/<div class="site-progress"[^>]*><\/div>/g, "")
          .replace(/<div id="(?:bar|progress|siteProgress)"[^>]*><\/div>/g, "")
          .replace("<!-- site-header -->", header)
          .replace("<!-- site-footer -->", footer);

        if (!output.includes("<!-- site-header -->")) {
          output = output.replace(
            /<header class="hdr">[\s\S]*?<\/header>/,
            header,
          );
        }

        if (!output.includes("<!-- site-footer -->")) {
          output = output.replace(
            /<footer class="ftr"[^>]*>[\s\S]*?<\/footer>/,
            footer,
          );
        }

        output = output.replace("<!-- site-icons -->", icons);
        output = output.replace(
          /<main\b(?![^>]*\bid=)([^>]*)>/i,
          '<main id="main"$1>',
        );
        const pageStylesheet = pageStylesheets[pagePath]
          ? `  <link rel="stylesheet" href="/src/css/pages/${pageStylesheets[pagePath]}.css" />\n`
          : "";
        output = output.replace(
          "</head>",
          `  <link rel="stylesheet" href="/src/style.css" />\n${pageStylesheet}  <link rel="stylesheet" href="/src/polish.css" />\n</head>`,
        );
        output = output.replace(
          "</body>",
          '  <script type="module" src="/src/main.js"></script>\n</body>',
        );
        return output;
      },
    },
  };
}

const pageEntries = {
  home: resolve(root, "index.html"),
  about: resolve(root, "about.html"),
  certifications: resolve(root, "certifications-articles/index.html"),
  projects: resolve(root, "projects/index.html"),
  caseStudies: resolve(root, "case-studies/index.html"),
  contact: resolve(root, "contact/index.html"),
  dataguard: resolve(root, "projects/dataguard.html"),
  acas: resolve(root, "projects/acas.html"),
  uberEats: resolve(root, "projects/uber-eats.html"),
  revenueLift: resolve(root, "projects/revenuelift.html"),
  f1Pipeline: resolve(root, "projects/f1-pipeline.html"),
};

export default defineConfig({
  plugins: [sitePartials()],
  build: {
    rollupOptions: {
      input: pageEntries,
    },
  },
});

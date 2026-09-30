export function initProjectsPage() {
  const grid = document.querySelector("#projectGrid");
  if (!grid) return;

  /*
        Add a cover image by placing the named file in public/assets.
        Example: public/assets/dataguard-core-cover.png

        Missing images automatically reveal the designed placeholder.
        You can use a .jpg instead by changing that project's cover path.
      */

  const coverDimensions = {"/assets/weather-etl-cover.webp": [1440, 896], "/assets/logistics-cover.webp": [1440, 896], "/assets/dataguard-cover.webp": [1440, 901], "/assets/dataguard-insights-cover.webp": [1440, 896], "/assets/revenuelift-cover.webp": [1440, 896], "/assets/job-market-cover.webp": [1440, 896], "/assets/bookvault-cover.webp": [1440, 896], "/assets/billing-assurance-cover.webp": [1440, 896], "/assets/clinic-cover.webp": [1440, 896], "/assets/f1-cover.webp": [1440, 901], "/assets/homestacks-cover.webp": [1440, 896], "/assets/acas-cover.webp": [1440, 804], "/assets/uber-eats-cover.webp": [1440, 901], "/assets/spotify-cover.webp": [1440, 896], "/assets/ecovita-cover.webp": [1440, 650]};

  const projects = [
    {
      title: "DataGuard Core",
      category: "Data Engineering",
      filters: ["engineering"],
      status: "Complete",
      symbol: "DG",
      cover: "/assets/dataguard-cover.webp",
      description:
        "Reconciles a simulated core-banking source against a reporting replica. On labeled fault injection, it achieved 100% precision and recall; at 1M rows it ran 6.4× faster than a naive SQL EXCEPT baseline.",
      stack: ["Python", "PostgreSQL", "Docker"],
      caseStudy: "/projects/dataguard.html",
      repo: "https://github.com/Lahiru1Niroosh/dataguard-core",
      featured: true,
    },
    {
      title: "F1 Real-Time Data Pipeline",
      category: "Data Engineering",
      filters: ["engineering"],
      status: "In progress",
      symbol: "F1",
      cover: "/assets/f1-cover.webp",
      description:
        "OpenF1-fed streaming architecture with Kafka ingestion to PostgreSQL and Spark-to-Cassandra processing complete; Airflow is in progress and dashboards are planned.",
      stack: ["Kafka", "PostgreSQL", "Spark", "Cassandra", "Airflow"],
      caseStudy: "/projects/f1-pipeline.html",
      repo: "https://github.com/Lahiru1Niroosh/F1-Real-Time-Data-Pipline",
    },
    {
      title: "DataGuard Insights",
      category: "Data Analytics / BI",
      filters: ["analytics"],
      status: "Live",
      symbol: "DI",
      cover: "/assets/dataguard-insights-cover.webp",
      description:
        "The BI layer for DataGuard, using SQL window functions to explore reconciliation trends and risk through an audit-ledger themed dashboard.",
      stack: ["Streamlit", "PostgreSQL", "Plotly"],
      repo: "https://github.com/Lahiru1Niroosh/dataguard-insights",
      demo: "https://dataguard-insights-cjf2jbrvhgsxpaup4zljkg.streamlit.app/",
    },
    {
      title: "Billing Assurance Control Tower",
      category: "Data Analytics / BI",
      filters: ["analytics"],
      status: "Live",
      symbol: "BA",
      cover: "/assets/billing-assurance-cover.webp",
      description:
        "Five billing controls, exception management, discount decisions, and SLA monitoring over synthetic test data. A six-page Streamlit app and Excel workbook support review.",
      stack: ["Python", "DuckDB", "Streamlit"],
      repo: "https://github.com/Lahiru1Niroosh/billing-assurance-control-tower",
      demo: "https://billing-assurance-control-tower-demo.streamlit.app/Billing_Integrity",
    },
    {
      title: "Executive Logistics Intelligence Suite",
      category: "Data Analytics / BI",
      filters: ["analytics"],
      status: "Live",
      symbol: "EL",
      cover: "/assets/logistics-cover.webp",
      description:
        "Logistics BI platform for 50,000 simulated shipments, with fuel-price integration, demand forecasting, and margin what-if analysis.",
      stack: ["DuckDB", "Python", "Streamlit"],
      repo: "https://github.com/Lahiru1Niroosh/logistics-sales-platform",
      demo: "https://7qr53o653pfxp2bxhrsfku.streamlit.app/",
    },
    {
      title: "Uber Eats Sri Lanka Analytics",
      category: "Data Analytics / BI",
      filters: ["analytics"],
      status: "Live",
      symbol: "UE",
      cover: "/assets/uber-eats-cover.webp",
      description:
        "Five-page marketplace dashboard over 70,000+ simulated orders. Explores restaurant operations, price elasticity, and Random Forest churn-risk signals.",
      stack: ["Python", "Streamlit", "SQLite"],
      repo: "https://github.com/Lahiru1Niroosh/uber-eats-sl-analytics-Project",
      caseStudy: "/projects/uber-eats.html",
      demo: "https://uber-eats-sl-analytics-project-here.streamlit.app/",
    },
    {
      title: "Spotify User Analytics",
      category: "Data Analytics / BI",
      filters: ["analytics"],
      status: "Complete",
      symbol: "SP",
      cover: "/assets/spotify-cover.webp",
      description:
        "Power BI dashboard exploring engagement, churn, and listening preferences by user segment on a simulated streaming platform.",
      stack: ["Power BI", "Python", "PostgreSQL"],
      repo: "https://github.com/Lahiru1Niroosh/spotify-user-analytics",
    },
    {
      title: "RevenueLift",
      category: "Data Analytics / BI",
      filters: ["analytics"],
      status: "Complete",
      symbol: "RL",
      cover: "/assets/revenuelift-cover.webp",
      description:
        "A/B test analysis for a simulated checkout experiment, including power analysis, significance testing, multiple-testing correction, and a Power BI decision report.",
      stack: ["Python", "DuckDB", "Power BI"],
      repo: "https://github.com/Lahiru1Niroosh/revenuelift",
      caseStudy: "/projects/revenuelift.html",
    },
    {
      title: "Job Market Skill Tracker",
      category: "Data Engineering",
      filters: ["engineering"],
      status: "Complete",
      symbol: "JM",
      cover: "/assets/job-market-cover.webp",
      description:
        "Bronze, silver, and gold pipeline over 100+ scraped Reddit job discussions to explore demand for data skills.",
      stack: ["Python", "DuckDB", "Pandas"],
      repo: "https://github.com/Lahiru1Niroosh/reddit-job-market-analysis",
    },
    {
      title: "Weather ETL Pipeline",
      category: "Data Engineering",
      filters: ["engineering"],
      status: "In progress",
      symbol: "WE",
      cover: "/assets/weather-etl-cover.webp",
      description:
        "Airflow-oriented weather ETL under development in WSL2 and Docker Compose. Environment initialization remains unfinished.",
      stack: ["Airflow", "Docker", "PostgreSQL"],
      repo: "https://github.com/Lahiru1Niroosh/Weather-Data-ETL-Pipeline",
    },
    {
      title: "ACAS — Credibility Assessment",
      category: "AI / ML",
      filters: ["ai"],
      status: "Complete",
      symbol: "AI",
      cover: "/assets/acas-cover.webp",
      description:
        "Final-year research project combining privacy masking, text and image models, and cross-modal checks in a multi-agent misinformation assessment system.",
      stack: ["CrewAI", "Python", "React"],
      repo: "https://github.com/Lahiru1Niroosh/acas-social-media",
      caseStudy: "/projects/acas.html",
    },
    {
      title: "BookVault",
      category: "Web / Apps",
      filters: ["web"],
      status: "Academic",
      symbol: "BV",
      cover: "/assets/bookvault-cover.webp",
      description:
        "Layered Spring Boot book-management application using controller, service, repository, and MySQL layers.",
      stack: ["Java", "Spring Boot", "MySQL"],
      repo: "https://github.com/Lahiru1Niroosh/bookvault",
    },
    {
      title: "Clinic Appointment System",
      category: "Web / Apps",
      filters: ["web"],
      status: "Academic",
      symbol: "CA",
      cover: "/assets/clinic-cover.webp",
      description:
        "Microservices coursework with API Gateway routing to patient, doctor, appointment, and feedback services. Uses in-memory storage.",
      stack: ["Python", "FastAPI", "HTTPX"],
      repo: "https://github.com/Lahiru1Niroosh/Clinic-appointment-system",
    },
    {
      title: "EcoVita",
      category: "Web / Apps",
      filters: ["web"],
      status: "Live",
      symbol: "EV",
      cover: "/assets/ecovita-cover.webp",
      description:
        "Responsive organic-wellness website featuring products, services, a blog, and a dark-mode toggle.",
      stack: ["React", "Tailwind CSS"],
      repo: "https://github.com/Lahiru1Niroosh/EcoVita-website",
      demo: "https://eco-vita.netlify.app/",
    },
    {
      title: "Homestacks",
      category: "Web / Apps",
      filters: ["web"],
      status: "Complete",
      symbol: "HS",
      cover: "/assets/homestacks-cover.webp",
      description:
        "MERN home-inventory and shopping-list application with expiry alerts and a Python item recommendation component.",
      stack: ["React", "MongoDB", "Python"],
      repo: "https://github.com/Lahiru1Niroosh/Homestacks",
    },
  ];

  const iconPaths = {
    Python: "/assets/python.svg",
    PostgreSQL: "/assets/postgresql.svg",
    Docker: "/assets/docker.svg",
    Pandas: "/assets/pandas.svg",
    Streamlit: "/assets/streamlit.svg",
  };

  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const addLink = (container, label, href, primary = false) => {
    if (!href) return;

    const link = make("a", primary ? "primary" : "", `${label} ↗`);
    link.href = href;

    if (/^https?:\/\//.test(href)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    container.append(link);
  };

  function projectCard(project) {
    const card = make("article", project.featured ? "card feature" : "card");
    card.dataset.categories = project.filters.join(" ");

    const cover = make("div", "cover");
    const placeholder = make("div", "cover-placeholder");
    placeholder.append(
      make("span", "cover-symbol", project.symbol),
      make("span", "", "PROJECT COVER"),
    );
    cover.append(placeholder);

    if (project.cover) {
      const image = document.createElement("img");
      image.src = project.cover;
      image.alt = `${project.title} project cover`;
      image.loading = "lazy";
      image.decoding = "async";
      const [width, height] = coverDimensions[project.cover] || [1440, 900];
      image.width = width;
      image.height = height;

      // Hide the broken image; the designed placeholder remains visible.
      image.addEventListener("error", () => image.remove(), { once: true });
      cover.append(image);
    }

    cover.append(make("span", "cover-badge", project.category));

    const body = make("div", "body");
    const meta = make("div", "card-meta");
    meta.append(
      make("span", "category-label", project.category),
      make(
        "span",
        project.status === "Live"
          ? "status live"
          : project.status === "In progress"
            ? "status wip"
            : "status",
        project.status,
      ),
    );

    body.append(
      meta,
      make("h2", "", project.title),
      make("p", "", project.description),
    );

    const tech = make("div", "tech");

    project.stack.forEach((name) => {
      const item = make("span", "tech-item");

      if (iconPaths[name]) {
        const icon = document.createElement("img");
        icon.src = iconPaths[name];
        icon.alt = "";
        icon.addEventListener(
          "error",
          () => {
            icon.replaceWith(make("span", "tech-initial", name.slice(0, 1)));
          },
          { once: true },
        );
        item.append(icon);
      } else {
        item.append(make("span", "tech-initial", name.slice(0, 1)));
      }

      item.append(document.createTextNode(name));
      tech.append(item);
    });

    body.append(tech);

    const actions = make("div", "actions");
    addLink(actions, "Read case study", project.caseStudy, true);
    addLink(actions, "Live demo", project.demo, !project.caseStudy);
    addLink(actions, "GitHub", project.repo);

    body.append(actions);
    card.append(cover, body);

    return card;
  }

  projects.forEach((project) => grid.append(projectCard(project)));
}

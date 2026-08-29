/* =========================================================================
   main.js — navigation, theme toggle, forms, modals, stats, GitHub card
   Personal info you'll want to edit lives near the top of this file.
   ========================================================================= */

/* ---------------------------- EDIT ME ---------------------------------- */
const SOCIAL_LINKS = {
  github: "https://github.com/[YOUR GITHUB]",
  linkedin: "https://linkedin.com/in/[YOUR LINKEDIN]",
  facebook: "https://facebook.com/[YOUR FACEBOOK]",
  instagram: "https://instagram.com/[YOUR INSTAGRAM]",
  youtube: "https://youtube.com/@[YOUR YOUTUBE]",
};

const STATS_DATA = { projects: 0, certificates: 0, technologies: 0, achievements: 0 };

// Set this to your real GitHub username to pull live stats via the public
// GitHub API. Leave it as the placeholder to keep static, editable numbers.
const GITHUB_USERNAME = "[your-github-username]";
const GITHUB_STATIC_FALLBACK = { repos: 0, followers: 0, following: 0 };

const SKILLS_DATA = {
  Programming: [
    { name: "Python", level: "Comfortable" },
    { name: "JavaScript", level: "Comfortable" },
    { name: "C", level: "Familiar" },
    { name: "C++", level: "Familiar" },
    { name: "Java", level: "Familiar" },
  ],
  Frontend: [
    { name: "HTML", level: "Proficient" },
    { name: "CSS", level: "Proficient" },
    { name: "JavaScript", level: "Comfortable" },
    { name: "Bootstrap", level: "Comfortable" },
    { name: "React", level: "Comfortable" },
  ],
  Backend: [
    { name: "Python", level: "Comfortable" },
    { name: "Flask", level: "Familiar" },
    { name: "Django", level: "Familiar" },
    { name: "Node.js", level: "Familiar" },
  ],
  Database: [
    { name: "MySQL", level: "Familiar" },
    { name: "MongoDB", level: "Familiar" },
    { name: "SQLite", level: "Comfortable" },
  ],
  Tools: [
    { name: "Git", level: "Comfortable" },
    { name: "GitHub", level: "Comfortable" },
    { name: "VS Code", level: "Proficient" },
    { name: "Figma", level: "Familiar" },
  ],
};
/* ------------------------- END EDIT ME ---------------------------------- */

const LEVEL_DOTS = { Familiar: 1, Comfortable: 2, Proficient: 3 };
const NAV_SECTION_IDS = ["home", "about", "skills", "projects", "services", "experience", "education", "certificates", "contact"];

/* ---------------------------- Loading screen ---------------------------- */
function initLoadingScreen() {
  const screen = document.getElementById("loading-screen");
  if (!screen) return;
  window.addEventListener("load", () => {
    setTimeout(() => screen.classList.add("hidden"), 400);
  });
  // Fallback in case the load event already fired or takes too long.
  setTimeout(() => screen.classList.add("hidden"), 1500);
}

/* ------------------------------ Theme toggle ----------------------------- */
function initTheme() {
  const stored = localStorage.getItem("portfolio-theme");
  const theme = stored === "light" ? "light" : "dark";
  document.body.setAttribute("data-theme", theme);

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });
}

/* ------------------------------- Navbar ---------------------------------- */
function initNavbarScrollEffect() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navContainer = document.querySelector(".nav-container");
  if (!hamburger || !navContainer) return;

  const menu = document.createElement("div");
  menu.className = "mobile-menu";
  menu.id = "mobile-menu";

  const linksClone = document.getElementById("nav-links").cloneNode(true);
  linksClone.removeAttribute("id");
  linksClone.style.display = "block";
  menu.appendChild(linksClone);

  const resumeBtn = document.createElement("a");
  resumeBtn.href = "assets/resume/resume.pdf";
  resumeBtn.setAttribute("download", "");
  resumeBtn.className = "btn btn-primary";
  resumeBtn.textContent = "Download Resume";
  menu.appendChild(resumeBtn);

  navContainer.parentElement.appendChild(menu);

  hamburger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

function initScrollSpy() {
  const links = document.querySelectorAll(".nav-link");
  const sections = NAV_SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === entry.target.id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ------------------------------ Back to top ------------------------------ */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  const footerBtn = document.getElementById("back-to-top-footer");
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (btn) {
    window.addEventListener(
      "scroll",
      () => btn.classList.toggle("visible", window.scrollY > 600),
      { passive: true }
    );
    btn.addEventListener("click", scrollTop);
  }
  if (footerBtn) footerBtn.addEventListener("click", scrollTop);
}

/* ------------------------------ Social icons ------------------------------ */
const SOCIAL_ICON_PATHS = {
  github: `<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.4 1.3a11.7 11.7 0 0 1 6.2 0c2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/>`,
  linkedin: `<path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3ZM6.5 8.7A1.7 1.7 0 1 1 8.2 7a1.7 1.7 0 0 1-1.7 1.7ZM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3v-9h2.9v1.3a3.1 3.1 0 0 1 2.8-1.5c3 0 3.6 2 3.6 4.5Z"/>`,
  facebook: `<path d="M13.5 22v-8h2.7l.4-3.1h-3.1V9c0-.9.2-1.5 1.6-1.5H17V4.7C16.6 4.6 15.5 4.5 14.3 4.5c-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V14h2.6v8Z"/>`,
  instagram: `<path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .2 2.5.4a4.9 4.9 0 0 1 1.8 1.2 4.9 4.9 0 0 1 1.2 1.8c.2.5.4 1.3.4 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 2-.4 2.5a5.1 5.1 0 0 1-3 3c-.5.2-1.3.4-2.5.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.2-2.5-.4a4.9 4.9 0 0 1-1.8-1.2 4.9 4.9 0 0 1-1.2-1.8c-.2-.5-.4-1.3-.4-2.5C2 15.7 2 15.3 2 12s0-3.6.1-4.9c.1-1.2.2-2 .4-2.5a4.9 4.9 0 0 1 1.2-1.8 4.9 4.9 0 0 1 1.8-1.2c.5-.2 1.3-.4 2.5-.4C9.4 2.2 9.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1 0-1.6.2-2 .3-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.4-.3 1-.3 2C3 9.5 3 9.9 3 13s0 3.5.1 4.7c0 1 .2 1.6.3 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.1 1 .3 2 .3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1 0 1.6-.2 2-.3.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.4.3-1 .3-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1-.2-1.6-.3-2a3.1 3.1 0 0 0-.8-1.2 3.1 3.1 0 0 0-1.2-.8c-.4-.1-1-.3-2-.3-1.2-.1-1.6-.1-4.7-.1Zm0 4.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm5-2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"/>`,
  youtube: `<path d="M22 7.2s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.1-.9C16.6 4 12 4 12 4s-4.6 0-7.1.1c-.4 0-1.3.1-2.1.9C2.2 5.7 2 7.2 2 7.2S1.8 9 1.8 10.7v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.2c.8.8 1.9.8 2.4.9C7 19 12 19 12 19s4.6 0 7.1-.1c.4 0 1.3-.1 2.1-.9.6-.7.8-2.2.8-2.2s.2-1.7.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5ZM10 14.6V8.9l5.2 2.9Z"/>`,
};

function renderSocialIcons(container) {
  if (!container) return;
  Object.entries(SOCIAL_LINKS).forEach(([key, url]) => {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "social-icon";
    a.setAttribute("aria-label", key);
    a.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">${SOCIAL_ICON_PATHS[key]}</svg>`;
    container.appendChild(a);
  });
}

/* -------------------------------- Skills --------------------------------- */
function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  Object.entries(SKILLS_DATA).forEach(([category, items], i) => {
    const card = document.createElement("div");
    card.className = "skill-category reveal";
    card.dataset.delay = String((i % 4) + 1);

    const rows = items
      .map((skill) => {
        const filled = LEVEL_DOTS[skill.level] || 1;
        const dots = [1, 2, 3]
          .map((d) => `<span class="skill-dot${d <= filled ? " filled" : ""}"></span>`)
          .join("");
        return `
          <div class="skill-row">
            <span>${skill.name}</span>
            <span class="skill-level">
              <span class="skill-level-label">${skill.level}</span>
              <span class="skill-dots">${dots}</span>
            </span>
          </div>`;
      })
      .join("");

    card.innerHTML = `<h3>${category}</h3>${rows}`;
    grid.appendChild(card);
  });

  if (typeof observeRevealElements === "function") {
    observeRevealElements(grid.querySelectorAll(".reveal"));
  }
}

/* --------------------------------- Stats ---------------------------------- */
function renderStats() {
  const cards = document.querySelectorAll("#stats-grid .stat-value");
  const values = [STATS_DATA.projects, STATS_DATA.certificates, STATS_DATA.technologies, STATS_DATA.achievements];
  cards.forEach((el, i) => {
    el.textContent = String(values[i] ?? 0);
  });
}

/* ------------------------------ Project modal ------------------------------ */
function openProjectModal(project) {
  const overlay = document.getElementById("project-modal");
  if (!overlay) return;
  document.getElementById("project-modal-title").textContent = project.title;
  document.getElementById("project-modal-desc").textContent = project.description;
  document.getElementById("project-modal-details").textContent = project.details;
  document.getElementById("project-modal-tech").innerHTML = project.tech
    .map((t) => `<span class="chip">${t}</span>`)
    .join("");
  document.getElementById("project-modal-github").href = project.github;
  document.getElementById("project-modal-demo").href = project.demo;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}

function initProjectModalClose() {
  const overlay = document.getElementById("project-modal");
  const closeBtn = document.getElementById("project-modal-close");
  if (!overlay || !closeBtn) return;
  const close = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  };
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ------------------------------- Cert modal -------------------------------- */
function initCertModal() {
  const overlay = document.getElementById("cert-modal");
  const closeBtn = document.getElementById("cert-modal-close");
  if (!overlay) return;

  document.querySelectorAll(".cert-view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".cert-card");
      document.getElementById("cert-modal-title").textContent = card.dataset.name;
      document.getElementById("cert-modal-meta").textContent = `${card.dataset.issuer} · ${card.dataset.date}`;
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
    });
  });

  const close = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  };
  if (closeBtn) closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
}

/* -------------------------------- Contact form ------------------------------ */
function validateContactForm(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email.";
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  if (!data.message.trim()) errors.message = "Message is required.";
  return errors;
}

function handleContactSubmit(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById("cf-name").value,
    email: document.getElementById("cf-email").value,
    subject: document.getElementById("cf-subject").value,
    message: document.getElementById("cf-message").value,
  };

  const errors = validateContactForm(data);
  ["name", "email", "subject", "message"].forEach((field) => {
    const errorEl = document.getElementById(`err-${field}`);
    const group = document.getElementById(`cf-${field}`).closest(".form-group");
    if (errors[field]) {
      errorEl.textContent = errors[field];
      group.classList.add("error");
    } else {
      errorEl.textContent = "";
      group.classList.remove("error");
    }
  });

  const status = document.getElementById("form-status");
  if (Object.keys(errors).length > 0) {
    status.textContent = "Please fix the highlighted fields.";
    status.className = "form-status error";
    return;
  }

  // No backend/email service is connected yet. Connect Formspree, EmailJS,
  // or your own API endpoint here — never expose API keys in this file.
  status.textContent = "Message ready to send — connect a form service to deliver it.";
  status.className = "form-status success";
  e.target.reset();
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (form) form.addEventListener("submit", handleContactSubmit);
}

/* -------------------------------- GitHub card -------------------------------- */
async function initGithubCard() {
  const usernameEl = document.getElementById("github-username");
  const reposEl = document.getElementById("github-repos");
  const followersEl = document.getElementById("github-followers");
  const followingEl = document.getElementById("github-following");
  if (!usernameEl) return;

  const isPlaceholder = GITHUB_USERNAME.startsWith("[");
  if (isPlaceholder) {
    reposEl.textContent = GITHUB_STATIC_FALLBACK.repos;
    followersEl.textContent = GITHUB_STATIC_FALLBACK.followers;
    followingEl.textContent = GITHUB_STATIC_FALLBACK.following;
    return;
  }

  usernameEl.textContent = `@${GITHUB_USERNAME}`;
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!res.ok) throw new Error("GitHub API request failed");
    const data = await res.json();
    reposEl.textContent = data.public_repos ?? GITHUB_STATIC_FALLBACK.repos;
    followersEl.textContent = data.followers ?? GITHUB_STATIC_FALLBACK.followers;
    followingEl.textContent = data.following ?? GITHUB_STATIC_FALLBACK.following;
  } catch (err) {
    reposEl.textContent = GITHUB_STATIC_FALLBACK.repos;
    followersEl.textContent = GITHUB_STATIC_FALLBACK.followers;
    followingEl.textContent = GITHUB_STATIC_FALLBACK.following;
  }
}

/* ---------------------------------- Init ------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initTheme();
  initNavbarScrollEffect();
  initMobileMenu();
  initScrollSpy();
  initBackToTop();

  renderSocialIcons(document.getElementById("hero-socials"));
  renderSocialIcons(document.getElementById("footer-socials"));

  renderSkills();
  renderStats();

  initProjectModalClose();
  initCertModal();
  initContactForm();
  initGithubCard();
});

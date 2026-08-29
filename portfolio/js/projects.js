/* =========================================================================
   projects.js — project data + rendering + filtering
   Edit the PROJECTS_DATA array below to add, remove, or update projects.
   category must be one of: "Web", "Python", "AI", "Other"
   ========================================================================= */

const PROJECTS_DATA = [
  {
    title: "AI Personal Assistant",
    image: "assets/images/project-1.jpg",
    description: "A Python-based personal assistant that can perform useful tasks through voice or text commands.",
    details: "[Add more detail: the problem it solves, key features, and anything you're proud of in the implementation.]",
    tech: ["Python", "AI", "APIs"],
    category: "AI",
    github: "#",
    demo: "#",
  },
  {
    title: "Student Productivity Dashboard",
    image: "assets/images/project-2.jpg",
    description: "A productivity dashboard designed to help students organize tasks, schedules, notes, and daily goals.",
    details: "[Add more detail: the problem it solves, key features, and anything you're proud of in the implementation.]",
    tech: ["Python", "HTML", "CSS", "JavaScript"],
    category: "Web",
    github: "#",
    demo: "#",
  },
  {
    title: "AI Chat Application",
    image: "assets/images/project-3.jpg",
    description: "A modern AI chat application with a clean user interface.",
    details: "[Add more detail: the problem it solves, key features, and anything you're proud of in the implementation.]",
    tech: ["Python", "API", "JavaScript"],
    category: "AI",
    github: "#",
    demo: "#",
  },
];

function renderProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.dataset.category = project.category;
  card.dataset.delay = String((index % 3) + 1);

  card.innerHTML = `
    <img class="project-thumb" src="${project.image}" alt="${project.title} screenshot" loading="lazy" />
    <div class="project-body">
      <h3>${project.title}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="chip-row">
        ${project.tech.map((t) => `<span class="chip">${t}</span>`).join("")}
      </div>
      <div class="project-actions">
        <a href="${project.github}" class="btn btn-outline">Code</a>
        <a href="${project.demo}" class="btn btn-outline">Demo</a>
        <button type="button" class="btn btn-primary project-details-btn" data-index="${index}">Details</button>
      </div>
    </div>
  `;
  return card;
}

function renderProjects(filter = "All") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = PROJECTS_DATA.filter((p) => filter === "All" || p.category === filter);
  filtered.forEach((project, i) => {
    const realIndex = PROJECTS_DATA.indexOf(project);
    grid.appendChild(renderProjectCard(project, realIndex));
  });

  // Newly injected .reveal elements need to be (re)observed for scroll animation.
  if (typeof observeRevealElements === "function") {
    observeRevealElements(grid.querySelectorAll(".reveal"));
  }

  // Wire up "Details" buttons for the modal (handled in main.js).
  grid.querySelectorAll(".project-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const project = PROJECTS_DATA[Number(btn.dataset.index)];
      if (typeof openProjectModal === "function") openProjectModal(project);
    });
  });
}

function initProjectFilters() {
  const filterBar = document.getElementById("filter-bar");
  if (!filterBar) return;
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects("All");
  initProjectFilters();
});

/* =========================================================================
   animations.js — scroll reveal + hero role animation
   Respects prefers-reduced-motion by skipping the observer setup and role
   cycling interval, and by marking everything visible immediately.
   ========================================================================= */

const PREFERS_REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let revealObserver = null;

function getRevealObserver() {
  if (revealObserver) return revealObserver;
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  return revealObserver;
}

function observeRevealElements(nodeList) {
  if (PREFERS_REDUCED_MOTION) {
    nodeList.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = getRevealObserver();
  nodeList.forEach((el) => observer.observe(el));
}

function initScrollReveal() {
  observeRevealElements(document.querySelectorAll(".reveal"));
}

/* ---------- Hero animated role text ---------- */
const HERO_ROLES = ["Student", "Developer", "Python Developer", "Web Developer"];

function initHeroRoleCycle() {
  const el = document.getElementById("hero-role");
  if (!el) return;

  if (PREFERS_REDUCED_MOTION) {
    el.textContent = HERO_ROLES[0];
    return;
  }

  let index = 0;
  setInterval(() => {
    index = (index + 1) % HERO_ROLES.length;
    // Re-trigger the CSS animation by toggling the class off and on.
    el.style.animation = "none";
    el.textContent = HERO_ROLES[index];
    // Force reflow so the animation restarts.
    void el.offsetWidth;
    el.style.animation = "";
  }, 2400);
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initHeroRoleCycle();
});

# [YOUR NAME] — Developer Portfolio

A single-page, responsive developer portfolio built with plain HTML, CSS, and
JavaScript — no frameworks, no build step. Open `index.html` in a browser, or
serve the folder with any static host (GitHub Pages, Netlify, Vercel, etc.).

## Folder structure

```
portfolio/
│
├── index.html            ← the only HTML page — every section lives here
│
├── css/
│   ├── style.css          ← variables, layout, and all component styles
│   ├── responsive.css      ← breakpoints (320 / 375 / 425 / 768 / 1024 / 1440+)
│   └── animations.css      ← keyframes, scroll-reveal, prefers-reduced-motion
│
├── js/
│   ├── main.js             ← nav, theme toggle, forms, modals, GitHub card
│   ├── projects.js         ← project data + grid rendering + filtering
│   └── animations.js       ← scroll-reveal observer + hero role cycling
│
├── assets/
│   ├── images/
│   │   ├── profile.jpg      ← placeholder headshot — replace with your photo
│   │   ├── project-1.jpg
│   │   ├── project-2.jpg
│   │   └── project-3.jpg    ← placeholder project thumbnails — replace with screenshots
│   ├── icons/
│   │   └── favicon.svg
│   └── resume/
│       └── resume.pdf       ← placeholder — replace with your real resume, same filename
│
└── README.md
```

## What to edit first

1. **`index.html`** — replace every `[BRACKETED]` placeholder (name, email,
   location, education, social links, etc.) with your real information.
2. **`js/main.js`** — top of the file has `SOCIAL_LINKS`, `SKILLS_DATA`,
   `STATS_DATA`, and `GITHUB_USERNAME`. Set `GITHUB_USERNAME` to your real
   username to pull live repo/follower counts from the public GitHub API;
   leave it as the placeholder to keep static, editable numbers.
3. **`js/projects.js`** — edit the `PROJECTS_DATA` array to add, remove, or
   update projects. `category` must be one of `"Web"`, `"Python"`, `"AI"`,
   `"Other"` so the filter buttons work correctly.
4. **`assets/images/`** — swap in your real profile photo and project
   screenshots, keeping the same filenames (or update the paths in
   `index.html` / `projects.js` if you rename them).
5. **`assets/resume/resume.pdf`** — replace the placeholder with your actual
   resume, keeping the filename `resume.pdf`.

## Notes

- **Contact form** validates client-side but isn't wired to a backend. The
  submit handler (`handleContactSubmit` in `js/main.js`) has a marked spot to
  connect Formspree, EmailJS, or your own API endpoint — never put API keys
  directly in this frontend code.
- **Theme** — dark mode by default, toggle saves the choice to
  `localStorage` under the key `portfolio-theme`.
- **Accessibility** — all animations respect `prefers-reduced-motion`, focus
  states are visible, and interactive elements have `aria-label`s.
- No professional experience is invented — the Experience section defaults to
  a "Learning Journey" timeline. Edit the comment block above `.timeline` in
  `index.html` to switch it to a real work-experience timeline once you have
  one.

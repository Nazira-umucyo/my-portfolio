/* ------------------------------------------------------------------
   YOUR PROJECTS. Edit this list to change what shows on the page.
   - id: also the image name. Put a screenshot at images/<id>.png and it
     shows on the card and in the details panel.
   - groups: which filters the project appears under
   - role: leave it out ("") and the "What I did" box is hidden
   - links: leave the list empty and no buttons show
------------------------------------------------------------------- */
const projects = [
  {
    id: "bond-system",
    title: "Bond management system",
    mono: "B",
    sub: "Internship, National Bank of Rwanda",
    groups: ["internships", "web"],
    live: true,
    about: "A bond management system built during my MIS-IT internship at the National Bank of Rwanda, from February to April 2026.",
    role: "I worked on it as an MIS-IT intern, using Spring Boot, React and PostgreSQL.",
    stack: ["Spring Boot", "React", "PostgreSQL"],
    links: [{ label: "Live site", url: "https://bond-system.netlify.app", primary: true }]
  },
  {
    id: "or360i",
    title: "OR360i",
    mono: "360",
    sub: "Team capstone, SolvIT Africa",
    groups: ["internships", "mobile"],
    live: true,
    // TODO: add one sentence on what OR360i does, right after this text.
    about: "A team capstone project from my internship at SolvIT Africa, deployed on Netlify.",
    role: "I worked on the mobile development, building with Expo.",
    stack: ["Expo", "React Native"],
    links: [{ label: "Live site", url: "https://or-360i.netlify.app", primary: true }]
  },
  {
    id: "smart-rwanda",
    title: "Smart Rwanda Tourism Marketplace",
    mono: "SR",
    sub: "Capstone, Igire Rwanda",
    groups: ["training", "web"],
    live: false,
    about: "A marketplace that connects tourists with verified hotels, tour agencies, guides, restaurants and car rentals, with a trip planner that suggests itineraries. It has three roles: tourist, provider and admin.",
    role: "I built the Reviews and Ratings module on the backend team: reviews with star ratings, rating summaries, helpful votes and admin moderation.",
    stack: ["Spring Boot", "Spring Security", "PostgreSQL", "React", "Docker"],
    links: [{ label: "Backend code", url: "https://github.com/SheCanCODE-Capstone-Projects/Smart-Rwanda-tourism-BE" }]
  },
  {
    id: "innerglow",
    title: "Innerglow",
    mono: "IG",
    sub: "Mental health web app",
    groups: ["web"],
    live: true,
    about: "A website for mental well-being where people track their mood, write reflection notes and get motivational nudges.",
    role: "I built it with HTML, CSS and JavaScript, and set it up with Docker and a load balancer.",
    stack: ["HTML", "CSS", "JavaScript", "Docker", "Load balancer"],
    links: [{ label: "Live site", url: "https://nazira-umucyo.github.io/InnerGlow_nazira/", primary: true }]
  },
  {
    id: "eventwave",
    title: "EventWave",
    mono: "EW",
    sub: "Pair project, event ticketing app",
    groups: ["mobile"],
    live: false,
    about: "A mobile app for event ticketing and management, made for events across Africa and starting in Rwanda.",
    role: "I built authentication and user profiles, user management, and event organization features. My partner built event browsing and ticket booking with QR codes.",
    stack: ["Expo", "React Native", "TypeScript"],
    links: []
  },
  {
    id: "alu-bridge",
    title: "ALU Bridge",
    mono: "AB",
    sub: "Campus internship platform",
    groups: ["mobile"],
    live: false,
    about: "A mobile app that connects ALU students with internship opportunities posted by departments and student ventures. It has student, organization and admin roles, opportunity feeds matched to skills, application status tracking, and admin verification of organizations.",
    role: "",
    stack: ["Flutter", "Firebase", "Firestore"],
    links: [{ label: "Code", url: "https://github.com/Nazira-umucyo/bridge_alu" }]
  },
  {
    id: "hospital-management",
    title: "Hospital Management System",
    mono: "HM",
    sub: "Backend project, Igire Rwanda",
    groups: ["training"],
    live: false,
    about: "A hospital backend with secure login and role-based access, so each type of user only reaches what they should.",
    role: "I built the backend, including login with JWT and OAuth2 and role-based access control.",
    stack: ["Java", "Spring Boot", "JWT", "OAuth2"],
    links: [{ label: "Code", url: "https://github.com/Nazira-umucyo/hospital_management_system" }]
  },
  {
    id: "igirepay",
    title: "IgirePay",
    mono: "IP",
    sub: "Capstone, digital wallet",
    groups: ["training"],
    live: false,
    about: "A digital wallet with a full admin dashboard and role-based access.",
    role: "I worked on it in a team, using a Git pull request workflow.",
    stack: ["Java", "JavaFX", "PostgreSQL"],
    links: []
  },
  {
    id: "social-media-api",
    title: "Social media platform API",
    mono: "SM",
    sub: "Backend project",
    groups: ["training"],
    live: false,
    about: "A backend API for a social media platform.",
    role: "",
    stack: ["Java", "Spring Boot"],
    links: []
  },
  {
    id: "malaria-cnn",
    title: "Malaria diagnosis with a CNN",
    mono: "ML",
    sub: "Group assignment, machine learning",
    groups: ["ml"],
    live: false,
    about: "A group project that trains a convolutional neural network for malaria diagnosis and uses transfer learning.",
    role: "",
    stack: ["Python", "CNN", "Transfer learning"],
    links: []
  },
  {
    id: "mental-distress-prediction",
    title: "Mental distress prediction",
    mono: "MD",
    sub: "Machine learning project",
    groups: ["ml"],
    live: false,
    // TODO: add what the model predicts, the data you used, and the result.
    about: "A machine learning project on predicting mental distress.",
    role: "",
    stack: ["Machine learning"],
    links: []
  }
];

const filters = [
  { id: "all", label: "All" },
  { id: "internships", label: "Internships" },
  { id: "training", label: "Training and capstones" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "ml", label: "Machine learning" }
];

/* ------------------------------------------------------------------ */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const grid = document.getElementById("grid");
const filterBar = document.getElementById("filters");
const dlg = document.getElementById("detail");
let activeFilter = "all";
let lastTrigger = null;

/* Things that animate in when they scroll into view */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

function watch(root) {
  root.querySelectorAll(".drop, .pop, .slide, .drop-line").forEach((el) => {
    if (!el.classList.contains("in")) io.observe(el);
  });
}

/* Cards */
function thumbHTML(p, i) {
  return '<span class="thumb tone-' + (i % 3) + '">' +
    '<span class="mono">' + p.mono + '</span>' +
    '<img src="images/' + p.id + '.png" alt="" loading="lazy" onerror="this.remove()">' +
    '</span>';
}

function renderGrid() {
  const list = projects.filter((p) => activeFilter === "all" || p.groups.includes(activeFilter));
  grid.innerHTML = "";
  list.forEach((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "card drop";
    b.dataset.id = p.id;
    b.style.setProperty("--d", (i % 3) * 110);
    b.style.setProperty("--r", ((i % 3) - 1) * 2.5 + "deg");
    b.innerHTML =
      thumbHTML(p, projects.indexOf(p)) +
      '<span class="card-body">' +
        '<span class="card-top"><span class="card-title">' + p.title + '</span>' +
        (p.live ? '<span class="live">Live</span>' : '') + '</span>' +
        '<span class="card-sub">' + p.sub + '</span>' +
        '<span class="tags">' + p.stack.slice(0, 3).map((s) => '<span class="tag">' + s + '</span>').join("") + '</span>' +
        '<span class="more">See details</span>' +
      '</span>';
    b.addEventListener("click", () => { lastTrigger = b; openProject(p.id); });
    grid.appendChild(b);
  });
  watch(grid);
}

function renderFilters() {
  filterBar.innerHTML = "";
  filters.forEach((f) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pill";
    b.textContent = f.label;
    b.setAttribute("aria-pressed", f.id === activeFilter ? "true" : "false");
    b.addEventListener("click", () => {
      activeFilter = f.id;
      filterBar.querySelectorAll(".pill").forEach((x) => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      renderGrid();
    });
    filterBar.appendChild(b);
  });
}

/* Details panel */
function openProject(id) {
  const i = projects.findIndex((x) => x.id === id);
  if (i < 0) return;
  const p = projects[i];

  document.getElementById("d-shot").innerHTML = thumbHTML(p, i);
  document.getElementById("d-ctx").textContent = p.sub;
  document.getElementById("d-title").textContent = p.title;

  let html = '<section><h4>What it does</h4><p>' + p.about + '</p></section>';
  if (p.role) html += '<section><h4>What I did</h4><p>' + p.role + '</p></section>';
  if (p.stack.length) html += '<section class="wide"><h4>Built with</h4><div class="tags">' +
    p.stack.map((s) => '<span class="tag">' + s + '</span>').join("") + '</div></section>';
  document.getElementById("d-grid").innerHTML = html;

  document.getElementById("d-links").innerHTML = p.links.map((l) =>
    '<a class="btn ' + (l.primary ? "primary" : "ghost") + '" href="' + l.url + '" target="_blank" rel="noopener">' + l.label + '</a>'
  ).join("");

  dlg.scrollTop = 0;
  dlg.showModal();
  document.documentElement.style.overflow = "hidden";
  history.replaceState(null, "", "#" + id);
}

document.getElementById("d-close").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener("close", () => {
  document.documentElement.style.overflow = "";
  history.replaceState(null, "", location.pathname + location.search);
  if (lastTrigger) lastTrigger.focus();
});

/* Nav: highlight the section you are in */
const links = document.querySelectorAll(".nav-links a");
const secObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((a) => a.removeAttribute("aria-current"));
      const a = document.querySelector('.nav-links a[href="#' + e.target.id + '"]');
      if (a) a.setAttribute("aria-current", "true");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["projects", "skills", "experience", "contact"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) secObserver.observe(el);
});

/* Timeline line fills as you scroll */
const timeline = document.getElementById("timeline");
function fillTimeline() {
  const r = timeline.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (window.innerHeight * 0.75 - r.top) / r.height));
  timeline.style.setProperty("--p", p.toFixed(3));
}
if (timeline) {
  if (reduceMotion) timeline.style.setProperty("--p", 1);
  else { window.addEventListener("scroll", fillTimeline, { passive: true }); fillTimeline(); }
}

/* Stagger delays for chips and timeline items */
document.querySelectorAll(".chips").forEach((group) => {
  group.querySelectorAll(".pop").forEach((c, i) => c.style.setProperty("--d", i * 55));
});
document.querySelectorAll(".timeline .slide").forEach((t, i) => t.style.setProperty("--d", i * 90));

document.getElementById("year").textContent = new Date().getFullYear();

renderFilters();
renderGrid();
watch(document);

if (location.hash.length > 1) openProject(decodeURIComponent(location.hash.slice(1)));
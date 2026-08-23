/*
  Add new entries anywhere in this array. The feed prints the newest date first.

  Required: id, date, project, title
  Optional: time, body, url, linkLabel, mark, markImage, markColor, isExample

  `mark` is a short text stamp. `markImage` can later point to a project logo.
  Project-wide stamp colors live in NOOK_PROJECTS. An entry-level `markColor`
  can override its project's color when needed.
  Use an ISO date (YYYY-MM-DD) and 24-hour time (HH:MM) when a time is included.
*/
window.NOOK_PROJECTS = {
  "Operational Entropy Index": { stampColor: "#3D5368" },
  "Entropy Compatible Hiring": { stampColor: "#112638" },
  "The Stuff I Have Online": { stampColor: "#171b1a" },
  "Inglés Rebelde": { stampColor: "#39ff14" },
  "Swipet": { stampColor: "#2B3B8C" },
  "Fletcher Lite": { stampColor: "#d4a574" }
};

window.NOOK_UPDATES = [
  {
    id: "portfolio-operations-leadership",
    date: "2025-11-16",
    project: "The Stuff I Have Online",
    title: "Rebuilt the portfolio around operations leadership",
    body: "Moved beyond the earlier soft-skill portfolio and positioned my work around operations leadership, systems building, founder support, measurable impact, and a concrete COO offer.",
    url: "/",
    linkLabel: "Visit The Stuff I Have Online",
    mark: "OPS"
  },
  {
    id: "portfolio-playlist-archive",
    date: "2025-07-20",
    project: "The Stuff I Have Online",
    title: "Made room for my never-ending playlist quest",
    body: "Added the site's first Things I Do for Fun section and built a branching archive for playlist categories, individual mixes, notes, artwork, and listening links.",
    url: "/0-things-i-do-for-fun/spotify/spotify.html",
    linkLabel: "Explore the playlist archive",
    mark: "MIX"
  },
  {
    id: "portfolio-ideas-and-inventions",
    date: "2025-05-08",
    project: "The Stuff I Have Online",
    title: "Made room for ideas and inventions",
    body: "Expanded the professional portfolio with a public page for systems, shipped work, physical concepts, and ideas that had not yet become projects.",
    url: "/0-about/ideas.html",
    linkLabel: "See how the ideas page evolved",
    mark: "IDEA"
  },
  {
    id: "fletcher-lite-knowledge-architect",
    date: "2026-08-21",
    project: "Fletcher Lite",
    title: "Made Knowledge Architect the focus of Fletcher Lite",
    body: "Repositioned the site as a specialized companion to The Stuff I Have Online, changed the visible professional identity from Documentation Engineer to Knowledge Architect, and added a direct call-booking path.",
    url: "/fletcherlite/",
    linkLabel: "Visit Fletcher Lite",
    mark: "FL"
  },
  {
    id: "fletcher-lite-knowledge-preservation",
    date: "2026-06-28",
    project: "Fletcher Lite",
    title: "Focused Fletch Lite on preserving organizational knowledge",
    body: "Reframed the portfolio around documentation, knowledge management, organizational learning, institutional memory, and expertise transfer. Added real writing samples and a downloadable résumé.",
    url: "/fletcherlite/",
    linkLabel: "Visit Fletcher Lite",
    mark: "FL"
  },
  {
    id: "fletcher-lite-first-recorded-version",
    date: "2026-06-28",
    project: "Fletcher Lite",
    title: "Built the first recorded version of Fletch Lite",
    body: "Created a responsive multi-page portfolio presenting Fletcher as a Documentation Engineer, with professional experience, writing, contact information, and light and dark themes.",
    url: "/fletcherlite/",
    linkLabel: "Visit Fletcher Lite",
    mark: "FL"
  },
  {
    id: "swipet-adoption-inquiries",
    date: "2026-08-13",
    project: "Swipet",
    title: "Built the handoff from compatible matches to shelters",
    body: "Added location-aware discovery and a structured adoption inquiry that sends readiness, consent, contact details, compatibility results, and match reasons into an administrative queue.",
    mark: "SWP"
  },
  {
    id: "swipet-operator-platform",
    date: "2026-06-13",
    project: "Swipet",
    title: "Made Swipet bilingual and operator-managed",
    body: "Added Spanish and English interfaces, persistent pet and user records, photo uploads, an administrative workspace, and a manual premium-activation workflow.",
    mark: "SWP"
  },
  {
    id: "swipet-product-identity",
    date: "2026-05-15",
    project: "Swipet",
    title: "Turned a generic scaffold into Swipet",
    body: "Built a branded mobile pet-adoption experience with lifestyle onboarding, explainable compatibility scoring, swipe discovery, saved matches, pet profiles, and a navy visual identity.",
    mark: "SWP"
  },
  {
    id: "oei-identity-governance",
    date: "2026-08-21",
    project: "Operational Entropy Index",
    title: "Added a system for governing OEI's identity",
    body: "Created structured identity records, a propagation map, an internal consistency dashboard, and publishing tools for keeping project decisions synchronized.",
    url: "https://operationalentropy.com",
    linkLabel: "Visit the Operational Entropy Index",
    mark: "OEI"
  },
  {
    id: "oei-practitioner-workspace",
    date: "2026-08-21",
    project: "Operational Entropy Index",
    title: "Built a practitioner workspace for OEI diagnoses",
    body: "Added an internal browser application for structured intake, evidence collection, scoring, recommendations, checkpoints, and client-safe report exports.",
    url: "https://operationalentropy.com",
    linkLabel: "Visit the Operational Entropy Index",
    mark: "OEI"
  },
  {
    id: "ech-desktop-beta",
    date: "2026-08-20",
    project: "Entropy Compatible Hiring",
    title: "Presented Entropy Compatible Hiring as a desktop-software beta",
    body: "Repositioned the Hiring Archetype Map as a separately purchasable Windows product with ten OEI-derived assessment instruments, versioning, beta pricing, and documented limitations.",
    url: "https://operationalentropy.com/entropy-compatible-hiring/",
    linkLabel: "Explore Entropy Compatible Hiring",
    mark: "ECH"
  },
  {
    id: "oei-modular-engagements",
    date: "2026-08-12",
    project: "Operational Entropy Index",
    title: "Made OEI's engagement architecture modular",
    body: "Separated known-issue investigations from broad diagnostic work and added a 15-day audit alongside the existing 30-day option.",
    url: "https://operationalentropy.com",
    linkLabel: "Visit the Operational Entropy Index",
    mark: "OEI"
  },
  {
    id: "oei-focused-investigations",
    date: "2026-06-27",
    project: "Operational Entropy Index",
    title: "Added five focused operational investigations",
    body: "Created targeted investigations for organizations that already knew where their operational problem was, providing an alternative to a comprehensive diagnosis.",
    url: "https://operationalentropy.com",
    linkLabel: "Visit the Operational Entropy Index",
    mark: "OEI"
  },
  {
    id: "oei-methodology-library",
    date: "2026-06-25",
    project: "Operational Entropy Index",
    title: "Turned the OEI site into a methodology library",
    body: "Added information packets, downloadable resources, conceptual models, and detailed explanations of OEI's five dimensions.",
    url: "https://operationalentropy.com",
    linkLabel: "Visit the Operational Entropy Index",
    mark: "OEI"
  },
  {
    id: "oei-engagement-assessment",
    date: "2026-06-22",
    project: "Operational Entropy Index",
    title: "Let visitors find their own OEI engagement path",
    body: "Added a browser-based assessment that used operational friction and primary pain to recommend an engagement before requiring contact information.",
    url: "https://operationalentropy.com",
    linkLabel: "Visit the Operational Entropy Index",
    mark: "OEI"
  },
  {
    id: "oei-hiring-archetype-map",
    date: "2026-06-20",
    project: "Operational Entropy Index",
    title: "Extended OEI into hiring",
    body: "Introduced the Hiring Archetype Map, a reusable deliverable translating OEI findings into the contribution patterns needed from future hires.",
    url: "https://operationalentropy.com",
    linkLabel: "Visit the Operational Entropy Index",
    mark: "OEI"
  },
  {
    id: "oei-public-diagnostic",
    date: "2026-05-30",
    project: "Operational Entropy Index",
    title: "Put OEI online as a complete diagnostic system",
    body: "Launched the public OEI methodology with five diagnostic dimensions, a staged intervention model, pricing, contact paths, and its own visual identity.",
    url: "https://operationalentropy.com",
    linkLabel: "Visit the Operational Entropy Index",
    mark: "OEI"
  },
  {
    id: "show-and-tell-nook-launch",
    date: "2026-08-23",
    project: "Show & Tell Nook",
    title: "Added a continuously printing record of what I'm making",
    body: "Created this nook so launches, fixes, experiments, and other meaningful changes can exist without becoming full case studies.",
    url: "/show-and-tell/",
    linkLabel: "You are looking at it",
    mark: "S&T"
  },
  {
    id: "resident-inventor-model",
    date: "2026-08-18",
    project: "Resident Inventor",
    title: "Made Resident Inventor into an interactive model",
    body: "Defined the Field, Collision, Ding, Form, Reality, Field cycle and added an interactive companion showing how AI participates in the process.",
    url: "/0-about/resident-inventor.html",
    linkLabel: "Explore the Resident Inventor model",
    mark: "RI"
  },
  {
    id: "job-search-case-record",
    date: "2026-08-15",
    project: "The Stuff I Have Online",
    title: "Published my job search as a public case record",
    body: "Added an interactive account of the positioning changes, applications, conversations, tools, and lessons behind a ten-month transition.",
    url: "/0-about/job-search-timeline.html",
    linkLabel: "Open the job search case record",
    mark: "CASE"
  },
  {
    id: "the-stuff-i-have-online-v1",
    date: "2026-08-16",
    project: "The Stuff I Have Online",
    title: "Named the whole thing The Stuff I Have Online",
    body: "Introduced the dark-first editorial system, reorganized the site, moved it to thestuffihave.online, and marked it as version 1.0.",
    url: "/",
    linkLabel: "Visit The Stuff I Have Online",
    mark: "v1.0"
  },
  {
    id: "portfolio-living-workshop",
    date: "2026-07-22",
    project: "The Stuff I Have Online",
    title: "Turned the portfolio into a living workshop",
    body: "Reframed the site as a place for frameworks, experiments, observations, unfinished products, and ongoing refinement. Resident Inventor became the homepage identity.",
    url: "/",
    linkLabel: "Visit the living workshop",
    mark: "LAB"
  },
  {
    id: "ingles-rebelde-site",
    date: "2026-05-18",
    project: "Inglés Rebelde",
    title: "Gave Inglés Rebelde its own corner of the site",
    body: "Added a separately branded educational offering with its own teaching philosophy, instructors, course levels, contact flow, and pricing calculator.",
    url: "/0-things-i-do-for-fun/inglesrebelde.html",
    linkLabel: "Visit Inglés Rebelde",
    mark: "IR"
  },
  {
    id: "oei-led-practice",
    date: "2026-05-31",
    project: "Operational Entropy Index",
    title: "Made OEI the center of my professional practice",
    body: "The portfolio shifted from a conventional operations résumé site toward a diagnostic-led practice built around operational entropy and the Operational Entropy Index.",
    url: "https://operationalentropy.com",
    linkLabel: "Visit the Operational Entropy Index",
    mark: "OEI"
  }
];

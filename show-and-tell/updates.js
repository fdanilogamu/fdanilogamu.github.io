/*
  Add new entries to the top of this array so the newest update prints first.

  Required: id, date, project, title
  Optional: time, body, url, linkLabel, mark, markImage, isExample

  `mark` is a short text stamp. `markImage` can later point to a project logo.
  Use an ISO date (YYYY-MM-DD) and 24-hour time (HH:MM) when a time is included.
*/
window.NOOK_UPDATES = [
  {
    id: "example-project-page",
    date: "2026-08-21",
    time: "14:20",
    project: "Example Project",
    title: "Made a new home for the project",
    body: "A sample of how a short note can add just enough context without becoming a case study.",
    url: "#",
    linkLabel: "Example project link",
    mark: "EP",
    isExample: true
  },
  {
    id: "example-docs",
    date: "2026-08-16",
    project: "Documentation Sample",
    title: "Reorganized the getting-started notes",
    body: "This example demonstrates a compact documentation update with no external link.",
    mark: "DOC",
    isExample: true
  },
  {
    id: "example-beta",
    date: "2026-08-09",
    time: "09:05",
    project: "Tiny Experiment",
    title: "Put a small beta on the internet",
    url: "#",
    linkLabel: "Example beta link",
    mark: "BETA",
    isExample: true
  },
  {
    id: "example-identity",
    date: "2026-08-02",
    project: "Identity Sample",
    title: "Gave the project a sharper visual voice",
    body: "A placeholder showing how future identity marks can sit on the paper like ink stamps.",
    mark: "ID!",
    isExample: true
  }
];

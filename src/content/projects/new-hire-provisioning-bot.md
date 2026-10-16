---
title: "Automated New-Hire Provisioning Bot"
summary: "Cut multi-platform account setup from a manual checklist to a button click."
date: 2026-08-26
tags: ["automation", "python", "api-integration", "onboarding"]
stack: ["Python", "Playwright", "REST APIs", "Firebase/Firestore", "HTTP Basic Auth"]
draft: false
---

## The Problem
Onboarding a new hire meant creating accounts by hand across several
disconnected platforms: a training LMS, scheduling, and internal portals. There
was no shared API and no single source of truth, so it was slow, easy to get
wrong, and the same tedious steps every single time. Offboarding had the same
problem in reverse, and a missed deactivation is a security gap.

## What I Built
A provisioning service that creates and deactivates accounts across multiple
vendor platforms from a single action. It uses a direct REST integration with
the LMS over HTTP Basic Auth, including automatic mapping of team and content
roles by location and access level. For the platforms with no public API, it
drives the browser with Playwright instead. Offboarding happens by deactivation
rather than deletion, which matches the existing records-retention process. The
whole thing runs off the Firestore collection that already tracks incoming hires
and separations, so the bot acts on the same data HR maintains.

## Results
- New-hire account setup dropped from ~7 to 10 minutes to a
  single button press
- 3 platforms provisioned from one action so far
- Closed the missed-deactivation gap on separations

## Lessons Learned
Not every vendor gives you an API, and automating the browser is a legitimate
answer when they don't. It is fragile, though, so I isolated each platform
behind its own adapter to keep one vendor's change from breaking the rest.
Matching the automation to the company's existing process, deactivating instead
of deleting, mattered more than doing it the "clean" way.

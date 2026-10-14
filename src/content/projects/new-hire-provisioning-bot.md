---
title: "Automated New-Hire Provisioning Bot"
summary: "Cut multi-platform account setup from a manual checklist to a button click."
date: 2026-08-26
tags: ["automation", "python", "api-integration", "onboarding"]
stack: ["Python", "Playwright", "REST APIs", "Firebase/Firestore", "HTTP Basic Auth"]
draft: true
---

## The Problem
Onboarding a new hire meant creating accounts by hand across several
disconnected platforms — a training LMS, scheduling, and internal portals —
with no shared API and no single source of truth. It was slow, easy to get
wrong, and the same tedious steps every time. Offboarding had the same problem
in reverse, and a missed deactivation is a security gap.

## What I Built
A provisioning service that creates and deactivates user accounts across
multiple vendor platforms from a single action:
- Direct REST integration with the LMS (HTTP Basic Auth), including
  auto-mapping of team and content roles by location and access level
- Browser automation (Playwright) for vendor platforms with no public API
- Offboarding by deactivation rather than deletion, matching the existing
  records-retention process
- Driven off a Firestore collection that already tracks incoming hires and
  separations, so the bot acts on the same data HR already maintains

## Results
- New-hire account setup reduced from [~X minutes of manual clicking] to a
  single button press
- [N] platforms provisioned from one action
- Eliminated missed-deactivation gaps on separation by [tie it to your
  offboarding flow]

## Lessons Learned
Not every vendor gives you an API, and "automate the browser" is a legitimate
answer when they don't — but it's fragile, so I isolated each platform behind
its own adapter. Matching the automation to the company's existing process
(deactivate, don't delete) mattered more than doing it the "clean" way.

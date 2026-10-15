---
title: "Microsoft 365 License Cleanup"
summary: "Audited the tenant with Graph sign-in data and right-sized licenses against actual usage."
date: 2026-10-06
tags: ["m365", "entra", "graph-api", "cost-optimization"]
stack: ["Microsoft Graph", "Entra ID P1", "PowerShell"]
draft: true
---

## The Problem
Licenses had been assigned by habit, not by use. Kiosk mailboxes were licensed
like full users, and dozens of staff held Teams licenses with no Teams activity
at all. Nobody had the usage data to challenge any of it.

## What I Built
A usage-driven cleanup, made possible by standing up Entra ID P1 so sign-in and
activity data was queryable through Graph. I converted 25 per-store shared
accounts from paid mailbox plans to unlicensed shared mailboxes, found roughly
68 users holding Teams licenses with zero Teams activity and moved them to a plan
that matched what they actually use, and documented the before and after so every
change was reviewable.

## Results
- Right-sized recurring M365 licensing against measured usage instead of
  assumption, correcting about 93 licenses across the two changes
- Removed the biggest sources of waste: paid seats on accounts that didn't need
  them and Teams licenses nobody was using
- Left behind a repeatable Graph query to catch license drift going forward

## Lessons Learned
You can't right-size what you can't measure, and standing up P1 to get real
activity data was what made the whole cleanup defensible. The hard part wasn't
the scripting. It was mapping each license type to the real-world role it was
supposed to serve, then proving the gap with data before touching anything.

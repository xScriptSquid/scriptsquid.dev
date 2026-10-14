---
title: "Microsoft 365 License Cleanup"
summary: "Audited the tenant with Graph sign-in data and right-sized licenses against actual usage."
date: 2026-10-06
tags: ["m365", "entra", "graph-api", "cost-optimization"]
stack: ["Microsoft Graph", "Entra ID P1", "PowerShell"]
draft: true
---

## The Problem
Licenses had been assigned by habit, not by use: kiosk mailboxes licensed like
full users, and dozens of staff holding Teams licenses with no Teams activity
at all. Nobody had the usage data to challenge it.

## What I Built
A usage-driven cleanup, enabled by standing up Entra ID P1 so sign-in and
activity data was queryable via Graph:
- Converted >100 per-store shared accounts from paid kiosk plans to unlicensed
  shared mailboxes
- Identified >75 users holding Teams licenses with zero Teams activity and
  moved them to a cheaper plan that matched what they actually use
- Documented the before/after so the changes were reviewable

## Results
- Estimated annual savings of [$ amount]
- Licensing now tied to measured activity instead of assumption
- A repeatable query to catch license drift going forward

## Lessons Learned
You can't right-size what you can't measure — the P1 purchase paid for itself
by making usage visible. The hard part wasn't the scripting; it was mapping
each license type to the real-world role it was supposed to serve.

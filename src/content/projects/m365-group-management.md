---
title: "One-Click M365 Group Membership Management"
summary: "Add or remove staff from security groups and distribution lists by role and location, from one checklist."
date: 2026-10-01
tags: ["automation", "m365", "graph-api", "powershell", "azure"]
stack: ["Microsoft Graph", "Exchange Online PowerShell", "Azure Functions", "Entra ID", "MSAL"]
draft: false
---

## The Problem
Group membership was a manual chore with two complications. Security groups and
distribution lists live in different systems, and most of the company's groups
are distribution lists, which Microsoft Graph can't manage at all. Getting a new
hire into the right groups meant knowing which type each one was and switching
tools accordingly.

## What I Built
A checklist on the IT dashboard that adds or removes a person from the correct
groups based on their location and position, with per-group toggles. Under the
hood it routes each change to the right system automatically. Security and M365
groups go through the dashboard's existing delegated Graph auth. Distribution
lists go through a separate Exchange Online PowerShell path, deployed as a
PowerShell-runtime Azure Function. That path authenticates through a dedicated
Entra app registration scoped to the Distribution Groups management role only,
using certificate-based, app-only auth with no broad tenant admin.

## Results
- Group assignment for a new hire became a single reviewed action
- Least-privilege by design: the automation can manage distribution-list
  membership and nothing else
- Established the company's first Azure footprint, reusable for later work

## Lessons Learned
The interesting engineering here was in the auth boundaries, not the UI.
Splitting the Graph and Exchange paths and scoping the Exchange app to exactly
one role kept a convenience feature from becoming a privilege-escalation risk. I
also pulled back a more ambitious combined-offboarding flow once the ordering and
shared-component risks got too high to wire up safely. Shipping the safe version
beat shipping the clever one.

---
title: "Fleet-Wide Unattended Remote Access Rollout"
summary: "Deployed remote access across a mixed Windows/Mac fleet with no MDM or GPO to lean on."
date: 2026-08-31
tags: ["infrastructure", "endpoint-management", "powershell", "deployment"]
stack: ["PowerShell", "Windows", "macOS", "AWS S3"]
draft: true
---

## The Problem
The company bought an unattended remote access tool and needed it on every
computer — across [~N] endpoints at 26 locations — but there was no MDM or
GPO for Windows or Mac to push software with. Everything was manual installs
and scripts, and the existing in-house reporting agent couldn't silently
deploy anything (it needs users to accept updates by hand).

## What I Built
[Describe the path you landed on — e.g. a PowerShell deployment script plus
the distribution mechanism you used, and how you handled Macs.] The key
constraint was "no silent-push infrastructure exists," so the solution had to
create its own reliable, low-touch install path across both OSes and all sites.

## Results
- Remote access deployed to [X%] of the fleet across 26 sites
- [Reduced on-site/truck-roll support by …]

## Lessons Learned
Ruling things out is real work: confirming the in-house agent couldn't be the
delivery vehicle saved me from building on a foundation that would've failed
silently. In an environment without MDM, you design around the constraint
instead of pretending it isn't there.

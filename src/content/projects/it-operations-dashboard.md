---
title: "Internal IT Operations Dashboard"
summary: "A single pane for IT to run people management and provisioning, replacing a scatter of manual steps."
date: 2026-10-09
tags: ["full-stack", "react", "typescript", "automation", "firebase"]
stack: ["React 19", "TypeScript", "Vite", "Firebase", "Cloud Functions", "Tailwind"]
draft: true
---

## The Problem
IT operations were spread across vendor consoles, spreadsheets, and one-off
scripts. There was no shared place to see incoming hires and separations or to
take action on them, which made routine work slow, error-prone, and hard to
hand off to anyone else.

## What I Built
A React 19 + TypeScript dashboard (Vite, Firebase hosting) that centralizes IT
operations:
- A People Management tab backed by the same data source that already tracks
  incoming hires and separations
- Action buttons that trigger provisioning and group-membership automation via
  Cloud Functions, so routine account work happens in-app instead of across
  separate tools
- A public, read-only projects page so leadership can see what IT has in
  flight without touching the internal tool

## Results
Consolidated what used to be separate consoles and scripts into one interface:
- New-hire account provisioning across platforms
- Deactivation and offboarding for separations
- M365 security-group and distribution-list membership, assigned by role and
  location
- Tracking of incoming hires and separations

Routine provisioning actions moved from multi-step manual processes to reviewed
button clicks, and leadership gained visibility into IT work without any extra
reporting on my part.

## Lessons Learned
The dashboard's value isn't the UI — it's being the front end for the
automation underneath. Building it as a hub that other tools plug into (rather
than one monolith) let each piece ship on its own timeline, and kept risky
actions behind a reviewed, deliberate click instead of a raw script.

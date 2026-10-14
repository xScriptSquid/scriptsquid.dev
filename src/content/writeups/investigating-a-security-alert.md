---
title: "How I Investigate a Security Alert"
summary: "A walkthrough of the way I work an alert from first ping to written report — using a composite example, not a real incident."
date: 2026-10-12
tags: ["security", "incident-response", "investigation", "process"]
draft: true
---

> **Note.** The scenario below is a composite built for illustration. No real
> incident, employer, user, or system is described. The point is the process,
> which is the part that transfers.

Investigating a security alert is less about tools and more about discipline:
ask the right question next, write down what you find, and don't jump to the
conclusion that lets you close the ticket fastest. Here's the shape my
investigations usually take.

## 1. Triage: is this real, and how urgent?
Most alerts aren't incidents. The first job is deciding whether this one is,
and how fast I need to move. I ask three things:
- **What fired, and what does that detection actually mean?** A rule name isn't
  a finding. I read what condition it's really matching.
- **What's the blast radius if it's real?** A single standard user is a
  different night than an admin account or a shared mailbox.
- **Is it live or historical?** Something happening right now gets contained
  first and understood second.

## 2. Establish a timeline
The most useful artifact in any investigation is an ordered timeline. I pull
the relevant sign-in, audit, and endpoint logs and lay events out in sequence:
when, from where, by whom, and what happened next. Patterns show up in order
that are invisible in a pile — an impossible-travel sign-in, a password reset
minutes before a rule-change, a quiet burst of activity at 3 a.m.

## 3. Pull the threads
With a timeline I can ask sharper questions:
- **Identity:** whose credentials, and does the activity fit that person's
  normal pattern? What can that identity reach?
- **Access:** successful auth, or just attempts? From a known device and
  location, or something new?
- **Actions:** what was actually *done* — files touched, rules or forwarding
  changed, groups modified, data moved?
- **Spread:** did it touch anything else? One compromised account is often a
  doorway, not the destination.

I try to actively disconfirm my first guess. If I think it's a phish, I go
looking for the evidence that it *isn't* — that's what keeps a plausible story
from becoming the wrong one.

## 4. Contain and remediate
If it's real, stop the bleeding — [generic actions: disable the account,
revoke sessions, reset credentials, pull the device off the network, kill a
malicious inbox rule] — then remediate the root cause, not just the symptom.
Resetting a password does nothing if the mailbox rule that auto-forwards every
email is still in place.

## 5. Write it up
Every investigation ends in a written report, even the false alarms. Mine
cover: what triggered it, the timeline, what I found, what I did, and what
should change so it's less likely or easier to catch next time. Management
doesn't need the packet captures — they need to know what happened, what the
risk was, and what I did about it, in plain language.

## Why the boring parts matter
The exciting version of this job is "found the hacker." The real version is
timelines, log queries, and careful write-ups — and that discipline is exactly
what turns a scary alert into a known, closed, documented event. The report is
the deliverable. The calm is the skill.

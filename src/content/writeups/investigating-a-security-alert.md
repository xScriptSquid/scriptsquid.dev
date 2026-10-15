---
title: "How I Investigate a Security Alert"
summary: "A walkthrough of how I work an alert from first ping to written report, using a composite example rather than a real incident."
date: 2026-10-12
tags: ["security", "incident-response", "investigation", "process"]
draft: true
---

> **Note.** The scenario below is a composite built for illustration. No real
> incident, employer, user, or system is described. The point is the process,
> which is the part that transfers.

Investigating a security alert is less about tools and more about discipline.
Ask the right question next, write down what you find, and don't jump to the
conclusion that lets you close the ticket fastest. Here's the shape my
investigations usually take.

## 1. Triage: is this real, and how urgent?
Most alerts aren't incidents. The first job is deciding whether this one is, and
how fast I need to move. I ask what actually fired and what that detection really
means, because a rule name isn't a finding. I ask what the blast radius would be
if it's real, since a single standard user is a very different night than an admin
account or a shared mailbox. And I ask whether it's live or historical, because
something happening right now gets contained first and understood second.

## 2. Establish a timeline
The most useful artifact in any investigation is an ordered timeline. I pull the
relevant sign-in, audit, and endpoint logs and lay events out in sequence: when,
from where, by whom, and what happened next. Patterns show up in order that are
invisible in a pile, like an impossible-travel sign-in, a password reset minutes
before a rule change, or a quiet burst of activity at 3 a.m.

## 3. Pull the threads
With a timeline I can ask sharper questions. Whose credentials, and does the
activity fit that person's normal pattern? Was it successful auth or just
attempts, and from a known device and location or something new? What was
actually done: files touched, rules or forwarding changed, groups modified, data
moved? And did it touch anything else, since one compromised account is often a
doorway rather than the destination?

I also try to actively disconfirm my first guess. If I think it's a phish, I go
looking for the evidence that it isn't. That's what keeps a plausible story from
becoming the wrong one.

## 4. Contain and remediate
If it's real, I stop the bleeding first, then remediate the root cause rather
than the symptom. Resetting a password does nothing if the mailbox rule that
auto-forwards every email is still in place.

## 5. Write it up
Every investigation ends in a written report, even the false alarms. Mine cover
what triggered it, the timeline, what I found, what I did, and what should change
so it's less likely or easier to catch next time. Management doesn't need the
packet captures. They need to know what happened, what the risk was, and what I
did about it, in plain language.

## Why the boring parts matter
The exciting version of this job is "found the hacker." The real version is
timelines, log queries, and careful write-ups, and that discipline is exactly
what turns a scary alert into a known, closed, documented event. The report is
the deliverable. The calm is the skill.

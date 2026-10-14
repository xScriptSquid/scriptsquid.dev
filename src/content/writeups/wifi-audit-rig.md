---
title: "Building a WiFi Security Audit Rig with Parrot OS"
summary: "How I built a repeatable setup to validate WPA pre-shared key strength across the networks I manage — and what the results changed."
date: 2026-10-07
tags: ["security", "wireless", "hardening", "homelab"]
draft: true
---

> **Scope and authorization.** Everything here is authorized testing on
> networks I own or administer. Auditing wireless security is only legal and
> ethical on networks you have explicit permission to test. This writeup is
> about validating and hardening my own environment, not a how-to for anyone
> else's network.

## Why
A WPA2/WPA3 network is only as strong as its pre-shared key. If the PSK is
short, common, or reused, the encryption around it doesn't matter much — an
offline guessing attack gets there eventually. I manage wireless across a lot
of sites, and "we set a password once" isn't the same as knowing those
passwords would hold up. I wanted measured evidence, not assumptions.

## The Setup
The goal was a repeatable rig I could take site to site.

**Host:** a laptop dual-booting Parrot Security alongside Windows, with Parrot
on its own NVMe drive so the audit environment stays isolated from daily use.

**Wireless adapters:** the built-in card can't go into monitor mode reliably,
so capture runs on external adapters:
- An ALFA AWUS036ACS (Realtek RTL8811AU) for 2.4 GHz
- An ALFA AWUS036ACM (MediaTek MT7612U) for 5 GHz — the MediaTek chipset has a
  mainline kernel driver and handles 5 GHz monitor mode, which the Realtek
  part won't

**Compute for analysis:** the laptop's GPU is power-capped under Linux, so it's
fine for light work, while a separate desktop GPU does the heavier lifting.
The specific throughput numbers aren't the point — the point is having enough
to meaningfully test whether a key is weak.

I'm also building a portable Raspberry Pi 5 version running Parrot so the field
unit is a small self-contained device rather than a whole laptop.

## The Process (high level)
1. Confirm authorization and scope for the site before anything else.
2. Put an adapter into monitor mode on the right band.
3. Capture the handshake for the target network.
4. Run the captured handshake against a wordlist offline.
5. Record the outcome: did the key fall, how fast, and why.

I'm deliberately not publishing commands or wordlist specifics. The value of a
writeup like this is the methodology and the defensive conclusion, not a
copy-paste recipe.

## What It Changed
The exercise turned "our WiFi is fine" into a short, evidence-backed list of
which networks had PSKs worth strengthening and which already held up. That
led to concrete hardening: longer, unique, randomly generated PSKs, and a plan
to move sensitive traffic off PSK entirely toward 802.1X/enterprise auth where
it's warranted.

## Takeaways
- Testing your own defenses tells you things a policy document can't.
- Hardware matters: chipset and driver support decide whether you can even
  capture on a given band.
- The real output of an audit isn't the crack — it's the remediation list and
  the follow-through.

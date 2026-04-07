# Brand Guidelines – Gödecke Auto & Zweirad × CFMOTO

> Last updated: 2026-04-07
> Status: v1.0

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #00e5cc (Teal) |
| Primary Dark | #00c4ad (Teal Dark) |
| Accent Color | #c8f400 (Neon-Gelb) |
| Primary Font | Barlow |
| Display Font | Barlow Condensed |
| Voice | Kraftvoll, Abenteuerlich, Premium |

---

## 1. Farbpalette

### Primary Colors

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| Teal (Primär) | #00e5cc | rgb(0, 229, 204) | CTAs, Buttons, Akzente, Links |
| Teal Dark | #00c4ad | rgb(0, 196, 173) | Hover-States, Hervorhebungen |

### Accent Color

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| Neon-Gelb | #c8f400 | rgb(200, 244, 0) | Logo-Highlights, Titel-Akzente, Focus-Ringe |

### Neutral Palette – Dark Theme

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| Schwarz | #0d0d0d | rgb(13, 13, 13) | Haupt-Hintergrund |
| Dark 2 | #111111 | rgb(17, 17, 17) | Sekundärer Hintergrund |
| Dark 3 | #1a1a1a | rgb(26, 26, 26) | Karten, Kategorien |
| Footer | #08080a | rgb(8, 8, 10) | Footer-Hintergrund |
| Dealer BG | #111216 | rgb(17, 18, 22) | Dealer-Section |

### Neutral Palette – Light Theme

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| Weiß | #ffffff | rgb(255, 255, 255) | Text auf dunklem Grund |
| Offwhite | #f4f4f4 | rgb(244, 244, 244) | Helle Sections (Angebote, App) |
| Tagline BG | #e0e0e0 | rgb(224, 224, 224) | Tagline-Section |

### Text Colors

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| Weiß | #ffffff | rgb(255, 255, 255) | Überschriften, Body (Dark Theme) |
| Grau Hell | #bbbbbb | rgb(187, 187, 187) | Beschreibungen, Labels |
| Grau | #888888 | rgb(136, 136, 136) | Muted Text, Footer-Links |
| Dunkelgrau | #555555 | rgb(85, 85, 85) | Body-Text (Light Sections) |
| Dunkel | #0d0d0d | rgb(13, 13, 13) | Überschriften (Light Sections) |

### UI Colors

| Name | Hex/Wert | Verwendung |
|------|----------|------------|
| Border | rgba(255,255,255,0.1) | Trennlinien, Rahmen |
| Overlay Dark | rgba(0,0,0,0.75-0.95) | Navigation, Overlays |
| Overlay Light | rgba(255,255,255,0.08) | Hover-States Navigation |

### Semantic Colors

| State | Hex | Verwendung |
|-------|-----|------------|
| Success | #22C55E | Positive Aktionen |
| Warning | #F59E0B | Warnungen |
| Error | #EF4444 | Fehler |
| Info | #3B82F6 | Informationen |

---

## 2. Farb-Proportionen

| Kategorie | Anteil | Farben |
|-----------|--------|--------|
| Dominant | 60-70% | Dark Theme (#0d0d0d, #111, #1a1a1a) |
| Primär | 15-20% | Teal (#00e5cc) |
| Akzent | 5-10% | Neon-Gelb (#c8f400) |
| Neutral | 10-15% | Weiß, Offwhite, Grau-Töne |

---

## 3. Typografie

### Fonts

| Zweck | Font | Gewichte |
|-------|------|----------|
| Display / Überschriften | Barlow Condensed | 600, 700, 800, 900 |
| Body / UI | Barlow | 300, 400, 500, 600, 700 |

### Hierarchie

| Element | Font | Größe | Gewicht |
|---------|------|-------|---------|
| Hero-Titel | Barlow Condensed | clamp(4rem, 10vw, 9rem) | 900 |
| Section-Titel | Barlow Condensed | clamp(2rem, 4vw, 3rem) | 800 |
| Kategorie-Tag | Barlow Condensed | 3rem | 900 |
| Eyebrow | Barlow | 0.75rem | 700 |
| Body | Barlow | 0.95rem | 400 |
| Button | Barlow | 0.88rem | 700 |
| Nav-Link | Barlow | 1.07rem | 600 |

---

## 4. CSS-Variablen

```css
:root {
  /* Primary */
  --cf-primary:       #00e5cc;
  --cf-primary-dark:  #00c4ad;
  --cf-accent:        #c8f400;

  /* Neutral – Dark */
  --cf-dark:          #0d0d0d;
  --cf-dark-2:        #111111;
  --cf-dark-3:        #1a1a1a;

  /* Neutral – Light */
  --cf-white:         #ffffff;
  --cf-offwhite:      #f4f4f4;

  /* Text */
  --cf-gray:          #888888;
  --cf-gray-lt:       #bbbbbb;

  /* UI */
  --cf-border:        rgba(255,255,255,0.1);
}
```

> **Status:** Variablen wurden von `--cf-red` zu `--cf-primary` refactored (2026-04-07).

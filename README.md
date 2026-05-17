# svihalek.dev — Web

Developer portfolio web ve stylu IDE / terminal. Multiplatformní mobilní aplikace ve Flutteru.

## Struktura

- `index.html` — hlavní soubor, načítá React, Babel, fonty a komponenty
- `variant-a-terminal.jsx` — celá UI komponenta webu (hero, služby, portfolio, stack, kontakt)
- `tweaks-panel.jsx` — in-page Tweaks panel (akcentová barva, indikátor dostupnosti)

## Lokální spuštění

Soubor `index.html` používá inline JSX přes `@babel/standalone`. Stačí ho otevřít přes lokální HTTP server, **ne přímo souborem `file://`** (kvůli CORS pravidlům prohlížeče pro JSX moduly).

### Nejjednodušší způsoby:

```bash
# Pythonem
python3 -m http.server 8080

# Node.jsem
npx serve .

# PHP
php -S localhost:8080
```

Pak otevři `http://localhost:8080/index.html`.

## Deploy

Stačí nahrát všechny 3 soubory na statický hosting (Vercel, Netlify, GitHub Pages, FTP).
Žádný build step není potřeba.

### Doporučená optimalizace pro produkci

Pro lepší výkon doporučuju před deployem:
1. Pre-transpilovat JSX přes Vite / esbuild → vyhneš se runtime Babel transformaci v prohlížeči
2. Stáhnout fonty (JetBrains Mono, Archivo) lokálně místo Google Fonts CDN
3. Přidat OG tagy a favicon

## Co web obsahuje

- **Hero** — `$ whoami` prompt + velký nápis Jan Švihálek + role + bio
- **Služby** — 4 karty (Vývoj aplikací, Konzultace, UI/UX, Údržba)
- **Portfolio** — TORKIS + QRkni s vlastními mock UI (žádné externí obrázky)
- **Stack** — YAML-style výpis core / backend / native / tooling
- **Kontakt** — formulář + přímé údaje (email, telefon, web, LinkedIn, GitHub)

## Tweaks

Stránka obsahuje skrytý Tweaks panel s in-page editingem (akcentová barva, viditelnost stavu).
Pro produkci je možné Tweaks komponentu vyhodit — odstraň `<script src="tweaks-panel.jsx">` z indexu a celý `<TweaksPanel>` blok z `variant-a-terminal.jsx`.

## Lokalizace

Web podporuje CS / EN přepnutí. Texty jsou v objektech `cs` a `en` na konci `variant-a-terminal.jsx`.

## Responzivita

Breakpointy v `index.html`:
- `< 1100px` — portfolio / services / contact do 1 sloupce
- `< 900px` — sidebar skrytý
- `< 640px` — mobilní layout, tab bar horizontálně scrollable

## Kontakt

Jan Švihálek
jan.svihalek00@gmail.com
+420 731 901 003

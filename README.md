# svihalek.dev — Web

Developer portfolio web ve stylu IDE / terminal. Multiplatformní mobilní aplikace ve Flutteru.

## Struktura

- `index.html` — celý web v jednom souboru (HTML + CSS + JS), bez závislostí a bez build stepu
- `images/` — screenshoty a ikony projektů

## Lokální spuštění

```bash
firebase serve
# nebo
npx serve .
```

Pak otevři `http://localhost:5000` (resp. port, který vypíše server).

## Deploy

```bash
firebase deploy --only hosting
```

Projekt `svihalek-dev-web` (viz `.firebaserc`). Skryté soubory (`.git` apod.) se nenahrávají, viz `firebase.json`.

## Co web obsahuje

- **Header** — sticky navigace se scroll-spy, přepínač světlý / tmavý režim, na mobilu hamburger menu
- **Hero** — `$ whoami` prompt + velký nápis Jan Švihálek + role + bio
- **Služby** — 4 karty (Vývoj aplikací, Konzultace, UI/UX, Údržba)
- **Portfolio** — RenoWorkshop + RenoEnergy
- **Zkušenosti** — praxe + forma spolupráce (HPP, částečný úvazek, IČO, remote)
- **Stack** — mobile / backend / data / integrace / infrastruktura / jazyky
- **Kontakt** — formulář s přepínačem „Mám projekt / Pracovní nabídka“ a validací (odesílá přes Web3Forms) + přímé údaje s kopírováním

## Téma

`data-theme="dark|light"` na `<html>`. Volba se ukládá do `localStorage['sv-theme']`, jinak se řídí `prefers-color-scheme`. Barvy jsou CSS proměnné na začátku `<style>`.

## Responzivita

- `≤ 1080px` — portfolio a kontakt do 1 sloupce
- `≤ 860px` — hamburger menu, služby do 1 sloupce
- `≤ 640px` — mobilní layout

## Kontakt

Jan Švihálek
jan.svihalek00@gmail.com
+420 731 901 003

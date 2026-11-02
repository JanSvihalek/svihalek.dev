# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primárně zaměstnavatelé:** recruiteři a techničtí vedoucí, kteří hledají vývojáře, v Česku i v zahraničí. Když jsou potřeby publik v rozporu, mají přednost oni.

**Sekundárně firmy, které chtějí aplikaci na míru:** majitelé a manažeři malých a středních firem. Tato nabídka na webu zůstává, ale neurčuje jeho priority.

## Product Purpose

Osobní web Jana Švihálka, který má přinést pracovní nabídku, především na HPP, a vedle toho i poptávky na zakázkový vývoj. Úspěch znamená, že se zaměstnavatel nebo firma ozve přes formulář nebo přímý kontakt.

## Positioning

Jeden člověk od A do Z. Jan zvládne návrh UI, backend, integrace i vydání aplikace sám, bez předávání mezi lidmi. Tohle je hlavní sdělení, které si má návštěvník zapamatovat. Praxe z firemního IT (síť, ERP Helios Nephrite, digitalizace procesů) je důkaz, že „od A do Z“ sahá až k infrastruktuře, ve které aplikace běží.

## Operating Context

- Formulář rozlišuje dva typy zprávy: „Mám projekt“ a „Pracovní nabídka“. Tlačítka na webu mohou typ předvybrat.
- Přímý kontakt: e-mail, telefon a LinkedIn.
- Preferovaná forma práce je HPP. Částečný úvazek, IČO / kontrakt a remote zůstávají jako další možnosti.

## Capabilities and Constraints

- Celý web je jeden soubor `index.html` (HTML, CSS, JS), bez závislostí a bez build stepu. Hostuje se na Firebase Hosting, projekt `svihalek-dev-web`.
- Web míří na český i zahraniční trh. Výchozí jazyk je čeština, angličtina se přepíná přepínačem CZ/EN přímo na stránce a jde na ni odkazovat přes `?lang=en`. Každý nový text musí mít i anglickou verzi. Anglické texty Jan schválil 2. 11. 2026.
- Web má světlý i tmavý režim. Volba se ukládá do `localStorage['sv-theme']`.
- Formulář odesílá přes Web3Forms.
- Firebase hostuje celý kořen projektu. Nové soubory, které nemají být veřejné, musí být uvedené v `ignore` ve `firebase.json`.
- `svihalek.dev.html` se nenasazuje a není zdrojem pravdy o webu.
- Web neodkazuje na GitHub.
- Web nemá sekci s praxí a seznam pozic nepřidává. Životopisné údaje jsou na LinkedInu, na webu zůstává jedna věta s počtem let ve firemním IT, který se počítá z data 1. 9. 2022, a odkaz na LinkedIn.

### Otevřená rozhodnutí

- **Testy a CI u jednotlivých projektů:** Jan zatím neupřesnil, na webu se u projektů neuvádějí.
- **Přihlášení v RenoEnergy:** nepotvrzeno, přihlášení přes M365 je na webu jen u RenoWorkshopu.
- **Životopis:** zatím se na web nepřidává, Jan to odložil.

## Brand Commitments

- Jméno a doména: Jan Švihálek, svihalek.dev.
- Role uvedená na webu: Mobile App/Web Developer, Flutter a cross-platform.
- Identita: `favicon.svg`, `apple-touch-icon.png`.
- Tón na webu: první osoba, návštěvníkovi vyká. Věcný a profesionální jako od zkušeného vývojáře. Bez hovorových obratů („beru“, „zvládnu sám“) a bez dětsky znějících výčtů sloves („navrhnu, postavím, napíšu“). Sdělení „od A do Z“ se v textech na webu formuluje věcně, například „pokrývám celý vývoj aplikace“.

## Evidence on Hand

**Projekty v portfoliu**

RenoWorkshop i RenoEnergy vznikly v zaměstnání, ne jako freelance zakázky. Jan je u obou udělal sám, od návrhu UI přes Flutter a backend po nasazení.

- **RenoWorkshop:** interní dílenská aplikace pro servis dealera BMW, napojená na ERP Helios Nephrite: potřebná data jsou v samostatné databázi, která se s Heliosem synchronizuje každých 5 minut, a aplikace s ní komunikuje přes API. Uživatelé se přihlašují účty v tenantu M365. Stav: pilot. Distribuce přes MDM, není v obchodech. Screenshoty: `images/renoworkshop_seznam.png`, `images/renoworkshop_detail.png`. Ikona: `images/renoworkshop-app-icon-192.png`.
- **RenoEnergy:** interní aplikace pro evidenci nabíjení elektromobilů a odečty měřidel. Backend Firebase, databáze Firestore. Stav: v produkci. Není v obchodech. Screenshoty: `images/renoenergy_nabijeni_light.png`, `images/renoenergy_mista.png`.

**Praxe a dovednosti**

- IT systémový administrátor v Renocaru od 1. 9. 2022, stále ve funkci: vývoj interních aplikací, správa sítě, správa ERP Helios Nephrite, digitalizace procesů.
- Mobile app / web developer na volné noze: Flutter, návrh UI, backend, integrace na ERP a SSO.
- Stack a jazyky jsou uvedené v sekci Stack v `index.html`. Angličtina B2, španělština A2.

**Potvrzená tvrzení**

- Nová aplikace za 6–12 týdnů.
- Odpověď do jednoho pracovního dne.
- CI/CD, testy a monitoring od prvního dne.
- Lokalita pro HPP: Brno nebo remote.

**Nevymýšlet, zatím neexistuje**

Reference, doporučení, metriky a čísla o dopadu, loga klientů a začátek práce na volné noze. Jan nemá žádnou aplikaci v App Store ani Google Play, takže web nesmí slibovat vydání v obchodech ani na ně odkazovat.

**Nepoužívat**

- **Jméno klienta:** u RenoWorkshopu a RenoEnergy se klient uvádí jen jako „dealer BMW“. Web nesmí napsat, že aplikace vznikly pro Renocar. Renocar zůstává v praxi jako zaměstnavatel a Jan přijímá, že si čtenář vazbu může domyslet.
- **Torkis a QRkni:** do portfolia se nevracejí. Jejich obrázky jsou z projektu smazané.
- **Screenshoty se skutečnými osobními údaji:** žádný obrázek na webu nesmí ukazovat skutečný IBAN, telefon, e-mail, SPZ, VIN ani údaje zákazníků. Nové screenshoty musí používat vymyšlená data. Současné screenshoty jsou v pořádku: RenoEnergy ukazuje Janovo vlastní vozidlo a údaje, které schválil ke zveřejnění, a RenoWorkshop vymyšlená data.

## Product Principles

1. **Zaměstnavatel na prvním místě.** Recruiter i technický vedoucí musí rychle pochopit, co Jan umí a že hledá hlavně HPP. Nabídka pro firmy tomu ustupuje, když si obě publika konkurují.
2. **Dokazovat šíři na skutečných projektech.** „Od A do Z“ se ukazuje na tom, co Jan v konkrétní aplikaci sám navrhl, napojil a vydal, ne na seznamu technologií.
3. **Jen pravdivé důkazy.** Pilot zůstává pilotem, interní aplikace zůstává interní a chybějící čísla se nenahrazují odhady.
4. **Chránit data lidí a klientů.** Co se týká klienta nebo osobních údajů, se zveřejňuje jen po výslovném rozhodnutí.

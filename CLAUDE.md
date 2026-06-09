# CLAUDE.md — Projektkontext: „Bin ich gewerblich?"

## Was ist das?
Ein kostenloses, statisches Single-Page-Tool (Lead-Magnet) für deutsche
Online-Verkäufer (Vinted, eBay, Kleinanzeigen, Etsy). Es beantwortet die
Angst-Frage „Bin ich privat oder schon gewerblich?" in ~2 Minuten und fängt
am Ende eine E-Mail ein. Es ist die obere Trichterstufe für ein späteres
kostenpflichtiges Produkt (automatisches Verkaufs-/Steuer-Tracking).

Wichtig: Das Tool gibt eine **Orientierung/Tendenz**, kein Urteil. Es ist
**keine Steuerberatung** und verweist im Zweifel an einen Steuerberater.

## Tech & Constraints
- Eine einzige Datei: `index.html` (HTML + CSS + JS inline).
- **Keine externen Ressourcen** (keine Google Fonts/CDN, keine Tracker) —
  GDPR/DSGVO-Gründe. Alles selbst gehostet.
- Kein localStorage/Cookies nötig. State läuft im JS-Speicher.
- Responsive, Tastatur-Fokus sichtbar, `prefers-reduced-motion` respektiert.

## Klassifizierungslogik (das Herz des Tools)
6 Fragen → Antworten in Array `ans[0..5]`.
- Q0 Was: 0=eigene Sachen, 1=Einkauf zum Weiterverkauf, 2=selbst hergestellt
- Q1 Absicht: 0=kein Gewinn, 1=Gewinnabsicht
- Q2 Regelmäßigkeit: 0=gelegentlich, 1=laufend, 2=dauerhaft
- Q3 Menge/Umsatz: 0=<30 & <2.000€, 1=30+ oder 2.000€+  → NUR DAC7-Flag
- Q4 planmäßig: 0/1
- Q5 Händler-Auftritt: 0/1

Entscheidung:
- `eigengut` (Q0=0): privat — AUSSER businessLook(=Q4&Q5&dauerhaft) UND Gewinn → grauzone
- sonst (Einkauf/Herstellung): Gewinn → gewerblich, sonst → grauzone

Leitprinzip aus der Rechtsprechung: **kein fester Grenzwert**; Gesamtbild
zählt. Entscheidende Achse = Eigengut vs. Einkauf/Herstellung × Gewinnabsicht.
Menge/Umsatz (Q3) bestimmt NICHT die Einstufung, nur die DAC7-Meldung —
das wird im Ergebnis explizit klargestellt.

## Verifizierte Steuer-Fakten (Stand 2025/26)
- Gewerbebetrieb §15 Abs. 2 EStG: selbständig + nachhaltig + Gewinnabsicht +
  Teilnahme am wirtschaftlichen Verkehr; über private Vermögensverwaltung hinaus.
- DAC7/PStTG: Plattform meldet ab 30 Verkäufen ODER 2.000 €/Jahr ans Finanzamt.
  Das ist KEINE Steuer und KEIN Beleg für „gewerblich".
- Eigene Gebrauchsgegenstände (Kleidung, Möbel, Technik) verkaufen = i.d.R.
  steuerfrei; §23 EStG nimmt „Gegenstände des täglichen Gebrauchs" aus.
- §23-Ausnahme: andere Wertgegenstände (Schmuck, Sammlerstücke, Krypto) mit
  Gewinn innerhalb 1 Jahr, Freigrenze 1.000 €/Jahr (seit 2024) → Anlage SO.
- Kleinunternehmer §19 UStG (seit 2025): Vorjahr ≤ 25.000 € UND lfd. Jahr
  ≤ 100.000 € (beide Bedingungen) → keine Umsatzsteuer.
- Gewerbesteuer-Freibetrag Einzelunternehmer: 24.500 € Gewinn.
- Härteausgleich §46 Abs. 3 EStG: Nebeneinkünfte bis 410 € bleiben bei
  Arbeitnehmern faktisch steuerfrei (410–820 € gleitend). Anmelde-/Erklärungs-
  pflicht bleibt trotzdem bestehen — dieser Hinweis ist bewusst hervorgehoben.

## Design
- Ruhige, vertrauensbildende Identität: Petrol/Teal (#0E5C5A) auf warmem
  Weiß (#FBFAF7); Serif-H1 (System-Serif) als „advisory" Note; Sans-Body.
- Ergebnis-Ampel: privat=grün, grauzone=amber, gewerblich=blau.
- Signature-Element: das klare Ergebnis + die hervorgehobene Box
  „Auch ohne Steuer bleibt die Pflicht".

## Offene TODOs (vor Live-Gang)
1. `FORM_ENDPOINT` im `<script>` setzen (Brevo/MailerLite/Formspree o.ä.),
   Double-Opt-in im Mail-Dienst aktivieren.
2. `impressum.html` und `datenschutz.html` erstellen (in DE Pflicht).
3. Optional: Q0 mit den bereits eingebauten Beispielen weiter schärfen
   (Self-Reporting-Bias ist die größte Genauigkeitsgrenze des Tools).
4. Optional: eigene Domain (z.B. bin-ich-gewerblich.de).

## Deployment
Statisch. GitHub-Repo → Vercel/Netlify, Auto-Deploy bei jedem Push.

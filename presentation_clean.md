% Clinical Simulation — An eLearning Course for Medical Students
% Educational Technologies SoSe 2026

# Introduction & Overview

## Project Overview & Motivation
- **Zielsetzung:** Interaktive eLearning-Simulation für Medizinstudierende (HTML5-basiert)
- **Motivation:** "Clinical Reasoning" erfordert sichere, realistische Übungsumgebungen abseits von Vorlesungen
- **Methode:** Problem-Based Learning anhand von 10 authentischen klinischen Fällen (z.B. Appendizitis, GERD)
- **Technologie:** Vanilla HTML5, CSS, JavaScript — ohne Frameworks für maximale Zugänglichkeit

## Problem-Based Learning (PBL)
- **Theorie:** Lernendenzentrierte Pädagogik durch authentische, offene Probleme (Barrows, 1986)
- **Umsetzung:** 10 realistische Fälle aus diversen medizinischen Fachrichtungen (Chirurgie, Kardiologie etc.)
- **Kerndesign:** Die Diagnose wird nie vorgegeben — Studierende müssen Anamnese und Diagnostik selbst synthetisieren

## Cognitive Apprenticeship
- **Theorie:** Novizen lernen durch geführte Erfahrungen von Experten (Collins, Brown & Newman, 1989)
- **Umsetzung:** Die Simulation (Notaufnahme) ist die realistische Umgebung
- **Drei Säulen:**
  - Modeling
  - Scaffolding
  - Fading

# Cognitive Apprenticeship in der Praxis

## Modeling: Der Experten-Weg
- **Theorie:** Das System demonstriert Expertenwissen als konzeptionelles Vorbild
- **Umsetzung:** Die **Feedback-Phase** zeigt den "Expert's Path" nach Abschluss eines Falls
- **Details:** Zeigt exakt, welche Tests ein erfahrener Arzt angeordnet hätte und vergleicht dies mit den studentischen Kosten

## Scaffolding (Gerüstbau)
- **Theorie:** Strukturierte Unterstützung zur Vermeidung kognitiver Überlastung
- **Umsetzung 1 (Struktur):** Strikter 4-Phasen-Ablauf (Anamnese → Diagnostik → Diagnose → Feedback) verhindert Überspringen
- **Umsetzung 2 (Budget):** Startbudget von 1000$ verhindert das planlose Anordnen aller Tests ("Shotgun-Testing") und zwingt zu bewussten Entscheidungen

## Fading (Dynamische Schwierigkeit)
- **Theorie:** Schrittweiser Abbau der Unterstützung bei zunehmender Kompetenz der Lernenden
- **Umsetzung:** Das Startbudget sinkt pro gelöstem Fall um 100$ (von 1000$ auf bis zu 500$)
- **Effekt:** Level 1 (Fehlertolerant) bis Level 6 (Erfordert Experten-Präzision)

## Active Experimentation (Experiential Learning)
- **Theorie:** Lernende testen Hypothesen in sicherer Umgebung (Kolb)
- **Umsetzung:** Freier Wechsel zwischen Anamnese und Diagnostik ohne Strafe
- **Nutzen:** Fördert hypothesengetriebenes Erkunden statt Angst vor Fehlern

# Feedback, Assessment & Analytics

## Formatives Feedback
- **Theorie:** Iteratives Feedback *während* des Lernprozesses (Black & Wiliam, 1998)
- **Umsetzung:** Bei falscher Diagnose erklärt das System den Fehler und zeigt irrelevante Tests auf
- **Kerndesign:** Simulation endet nicht bei Misserfolg — der Button **"Return to Patient"** ermöglicht einen neuen Versuch

## Summatives Assessment
- **Theorie:** Abschließende Bewertung im Vergleich zu einem Benchmark (Scriven, 1967)
- **Bewertungssystem (100 Punkte):**
  - **60 Punkte:** Korrekte Diagnose
  - **40 Punkte:** Diagnostische Effizienz (-15 pro irrelevanter Test)
- **Vorteil:** Spiegelt die reale Medizin wider, in der unnötige Tests Ressourcen binden

## Learning Analytics (Dashboard)
- **Theorie:** Messung von Lernerdaten zur Optimierung des Lernverhaltens (Siemens & Long, 2011)
- **Umsetzung:** Speicherung von 3 Kernmetriken im `localStorage`:
  1. Gelöste Fälle
  2. Durchschnittliche Punktzahl
  3. Verschwendetes Budget
- **Zusatz:** Zeigt den aktuellen "Fading"-Schwierigkeitsgrad an

# Abschluss

## Live Demo & Zusammenfassung
- **Die Simulation vereint:**
  - Problem-Based Learning
  - Cognitive Apprenticeship
  - Active Experimentation
  - Formatives & Summatives Assessment
  - Learning Analytics
- **Nächste Schritte / Future Work:** Erweiterung der Fälle, Dozenten-Dashboard
- **Vielen Dank für die Aufmerksamkeit!**

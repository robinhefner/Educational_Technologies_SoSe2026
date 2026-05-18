# Presentation Outline — Clinical Simulation eLearning
**Course:** Educational Technologies · **Duration:** 10–15 minutes · **Team Size:** 3

---

## Speaker & Responsibility Distribution

| Speaker | Slides | Focus Area | Responsibility |
|---------|--------|------------|----------------|
| **Speaker A** | 1–4 | Introduction, Project Overview, PBL, Cognitive Apprenticeship | Front-end structure (HTML/CSS), case data, project architecture |
| **Speaker B** | 5–8 | Modeling, Scaffolding, Fading, Active Experimentation | Core application logic (`app.js`), game loop, state management |
| **Speaker C** | 9–12 | Formative Feedback, Summative Assessment, Learning Analytics, Conclusion | Assessment engine, dashboard, localStorage analytics |

> [!IMPORTANT]
> The professor requires **transparency about each student's responsibilities**. Make sure each speaker clearly states which part of the codebase they owned at the start of their section.

---

## Slide-by-Slide Outline

### Slide 1 — Title Slide *(Speaker A · ~30 sec)*

| Element | Content |
|---------|---------|
| **Title** | *Clinical Simulation — An eLearning Course for Medical Students* |
| **Subtitle** | Educational Technologies SoSe 2026 |
| **Names** | All three group members with individual roles (see table above) |
| **Visual** | A screenshot or logo of the application |

**Speaker Notes:** Brief greeting. State the project title, team composition, and that each member will present the concepts they were responsible for implementing.

---

### Slide 2 — Project Overview & Motivation *(Speaker A · ~1 min)*

| Element | Content |
|---------|---------|
| **What** | An HTML5-based eLearning simulation for medical students |
| **Why** | Clinical reasoning is hard to teach with lectures alone; students need safe, realistic practice environments |
| **How** | Problem-Based Learning through 10 authentic clinical cases (Appendicitis → GERD) |
| **Tech Stack** | Vanilla HTML5, CSS, JavaScript — no frameworks, runs in any browser |

**Visuals:** Architecture diagram showing `index.html` → `styles.css` + `data.js` + `app.js`. Optionally a flow diagram: *Patient Case → Anamnesis → Diagnostics → Diagnosis → Feedback*.

**Speaker Notes:** Explain that the simulation places the student in an Emergency Room setting. They receive a patient, must gather history, order tests within a budget, and submit a diagnosis. Emphasize the deliberate choice to use no external frameworks for accessibility.

---

### Slide 3 — Problem-Based Learning (PBL) *(Speaker A · ~1.5 min)*

| Element | Content |
|---------|---------|
| **Theory** | Student-centered pedagogy driven by authentic, open-ended problems (Barrows, 1986) |
| **Implementation** | 10 realistic clinical cases (e.g., Acute Appendicitis, Myocardial Infarction, Ectopic Pregnancy) |
| **Key Design Decision** | Students are *never* told the diagnosis — they must synthesize anamnesis + diagnostics to reason it out themselves |

**Visuals:**
- A table or grid showing all 10 case names with their medical domains
- Screenshot of the Anamnesis stage showing a patient intro

**Speaker Notes:** Stress that this is not a quiz — the learner actively investigates. The cases are designed with realistic patient dialogue and medically accurate diagnostic results. Mention the diversity of cases spanning surgery, cardiology, gynecology, pulmonology, gastroenterology, and urology.

---

### Slide 4 — Cognitive Apprenticeship *(Speaker A · ~1 min)*

| Element | Content |
|---------|---------|
| **Theory** | Novices learn from experts through guided experience; making hidden cognitive processes visible (Collins, Brown & Newman, 1989) |
| **Implementation** | The simulation is the realistic environment (ER). Three key CA components are embedded: **Modeling**, **Scaffolding**, and **Fading** |
| **Transition** | "Speaker B will now walk you through exactly how we implemented each of these three components." |

**Visuals:** A diagram showing the three pillars of Cognitive Apprenticeship (Modeling → Scaffolding → Fading) as a progression, with arrows pointing to corresponding application features.

**Speaker Notes:** This is the overarching framework. Briefly explain that CA is about making expert thinking visible, then hand off to Speaker B who demonstrates the concrete implementations.

---

### Slide 5 — Modeling: The Expert's Path *(Speaker B · ~1.5 min)*

| Element | Content |
|---------|---------|
| **Theory** | The system demonstrates expert-level performance so learners can build a conceptual model of expert reasoning |
| **Implementation** | After completing a case, the **Feedback Stage** shows the "Expert's Path": exactly which tests an expert doctor would order + the optimal cost |
| **Code Reference** | `renderFeedback()` in `app.js` — calculates `relevantTests`, `optimalCost`, and `optimalTestsNames` |

**Visuals:**
- Screenshot of the Feedback stage highlighting the "Expert's Path" card
- Side-by-side: Student's ordered tests vs. Expert's optimal tests

**Speaker Notes:** Explain that this makes the *invisible* reasoning of a senior clinician *visible*. Students can compare their own test-ordering strategy against the gold standard. Emphasize the cost comparison ($wastedMoney vs $optimalCost).

---

### Slide 6 — Scaffolding *(Speaker B · ~1.5 min)*

| Element | Content |
|---------|---------|
| **Theory** | Providing structured support to prevent cognitive overload while learners tackle complex tasks |
| **Implementation 1 — Stage Structure** | The strict 4-stage UI flow (Anamnesis → Diagnostics → Diagnosis → Feedback) prevents students from skipping steps |
| **Implementation 2 — The Budget** | A $1000 starting budget prevents "shotgun testing" (ordering every available test) and forces deliberate, reasoned choices |
| **Code Reference** | Progress bar + stage navigation in `render()`, budget enforcement in `renderDiagnostics()` |

**Visuals:**
- Screenshot of the progress bar and stage navigation
- Screenshot of the budget display + the "Insufficient budget" alert
- Diagram: "Without scaffold → random guessing" vs. "With scaffold → structured reasoning"

**Speaker Notes:** Emphasize two types of scaffolding: (1) procedural scaffolding via the UI structure forcing a clinical workflow, and (2) constraint scaffolding via the budget preventing brute-force strategies. Mention the `alert("Insufficient budget for this test!")` as the enforcement mechanism.

---

### Slide 7 — Fading (Dynamic Difficulty) *(Speaker B · ~1 min)*

| Element | Content |
|---------|---------|
| **Theory** | Gradual removal of support as learner competence grows, increasing cognitive responsibility |
| **Implementation** | Starting budget decreases by $100 per successfully solved case (from $1000 down to a minimum of $500) |
| **Code** | `state.initialBudget = Math.max(500, 1000 - (state.analytics.casesSolved * 100))` |
| **Effect** | Level 1 = $1000 budget (forgiving) → Level 6 = $500 budget (expert-level precision required) |

**Visuals:**
- A simple chart/graph showing Budget vs. Cases Solved (staircase going from $1000 → $500)
- Screenshot of the Dashboard showing "Current Difficulty (Fading): Level X"

**Speaker Notes:** Explain that this is *automatic* fading — the system adapts without instructor intervention. Connect to Vygotsky's Zone of Proximal Development: as students master cases, the scaffold is pulled away to push them toward independent mastery.

---

### Slide 8 — Active Experimentation (The ER Loop) *(Speaker B · ~1 min)*

| Element | Content |
|---------|---------|
| **Theory** | From Kolb's Experiential Learning Cycle — learners test hypotheses in a safe environment and reflect on outcomes |
| **Implementation** | Students can freely navigate back and forth between Anamnesis ↔ Diagnostics without penalty. They form a hypothesis, order a test, view the result, and if surprised, return to ask more questions |
| **Code Reference** | The "Back to Anamnesis" button in `renderDiagnostics()` and clickable stage navigation indicators |

**Visuals:**
- A circular arrow diagram: Anamnesis ↔ Diagnostics (loop) → Diagnosis → Feedback
- Screenshot showing the "Back to Anamnesis" button

**Speaker Notes:** Emphasize that this is a *safe sandbox*. There is no penalty for going back — only for ordering irrelevant tests. This encourages hypothesis-driven exploration rather than fear of failure. Transition to Speaker C for the assessment concepts.

---

### Slide 9 — Formative Feedback *(Speaker C · ~1.5 min)*

| Element | Content |
|---------|---------|
| **Theory** | Immediate, iterative feedback *during* the learning process to modify and improve understanding before final evaluation (Black & Wiliam, 1998) |
| **Implementation** | On an **incorrect diagnosis**: the system explains what was wrong, shows how many irrelevant tests were ordered, and provides a **"Return to Patient"** button to try again |
| **Key Design Decision** | The simulation does **not** end on failure — it invites the learner to rethink and retry |
| **Code Reference** | The `!isCorrect` branch in `renderFeedback()` with `#return-btn` |

**Visuals:**
- Screenshot of the incorrect diagnosis feedback (red card) with the "Return to Patient" button highlighted
- Flow: Incorrect → Feedback → Return to Diagnostics → Reorder tests → Resubmit

**Speaker Notes:** Stress the difference between formative and summative feedback. This is the formative component — it's *constructive* and *actionable*. The student doesn't just see "Wrong", they see *why* it's wrong and get to immediately apply that knowledge. Also mention the "Give Up" option for cases that are too difficult.

---

### Slide 10 — Summative Assessment *(Speaker C · ~1.5 min)*

| Element | Content |
|---------|---------|
| **Theory** | Evaluation at the end of a learning unit, compared against a benchmark (Scriven, 1967) |
| **Scoring Breakdown** | **60 points** for correct diagnosis + up to **40 points** for diagnostic efficiency (−15 per irrelevant test) |
| **Grade Scale** | ≥90 = Excellent · ≥70 = Good · ≥50 = Satisfactory · <50 = Needs Improvement |
| **Code Reference** | Score calculation in `renderFeedback()`: `score += 60` (diagnosis) + `40 - (irrelevantCount * 15)` (efficiency) |

**Visuals:**
- Screenshot of the summative score display ("Score: X / 100, Final Grade: Y")
- A breakdown graphic: 60 pts (Diagnosis Accuracy) + 40 pts (Diagnostic Efficiency) = 100 pts max

**Speaker Notes:** Explain the dual-axis grading: it's not enough to get the right answer — students must also demonstrate *efficient* clinical reasoning. This mirrors real-world medicine where unnecessary tests cost money and burden patients. Mention that this fulfills the professor's requirement for **summative or formative assessment**.

---

### Slide 11 — Learning Analytics (Dashboard) *(Speaker C · ~1 min)*

| Element | Content |
|---------|---------|
| **Theory** | Measurement and reporting of learner data to understand and optimize the learning environment (Siemens & Long, 2011) |
| **Implementation** | Browser `localStorage` persists three key metrics across sessions: Cases Solved, Average Score, and Budget Wasted |
| **Additional Feature** | The dashboard also shows the current Fading difficulty level |
| **Code Reference** | `loadAnalytics()` / `saveAnalytics()` + the Dashboard modal in `index.html` |

**Visuals:**
- Screenshot of the Dashboard modal with sample data filled in
- Diagram showing the data flow: User actions → `state.analytics` → `localStorage` → Dashboard display

**Speaker Notes:** Explain that learning analytics allow students to *self-regulate* their learning by tracking longitudinal progress. Highlight that this data persists — if the student returns the next day, their progress is still there. Mention that this could be extended to instructor-facing analytics in future versions.

---

### Slide 12 — Live Demo *(All Speakers · ~2 min)*

| Element | Content |
|---------|---------|
| **Action** | Open `index.html` in a browser and walk through one complete case |
| **Suggested Flow** | Pick a case → ask 2–3 anamnesis questions → order 2 relevant + 1 irrelevant test → submit a correct diagnosis → show the feedback page with Expert's Path, scores, and formative feedback |
| **Highlight** | Point out the budget decreasing, the progress bar advancing, and the scaffolding UI |

> [!TIP]
> Pre-load the application with 2–3 previously solved cases (via localStorage manipulation) so the Dashboard shows meaningful data and the Fading difficulty level is visible at Level 3+.

**Speaker Notes:** Keep this tight — no more than 2 minutes. The goal is to connect theory to practice. Each speaker can point out the feature they presented when it appears during the demo.

---

### Slide 13 — Conclusion & Summary *(Speaker C · ~1 min)*

| Element | Content |
|---------|---------|
| **Summary Table** | Map each educational concept to its concrete implementation |
| **Best Practices** | Emphasize adherence to educational technology theory (PBL, CA, Kolb, formative/summative distinction) |
| **Future Work** | Possible extensions: more cases, instructor dashboard, adaptive case selection, multiplayer case discussions |
| **Closing** | "Thank you — we're happy to take questions." |

**Summary Table for the slide:**

| Educational Concept | Implementation in Our Simulation |
|---|---|
| Problem-Based Learning | 10 authentic clinical cases |
| Cognitive Apprenticeship | ER simulation environment |
| Modeling | Expert's Path in Feedback stage |
| Scaffolding | 4-stage UI + $1000 budget constraint |
| Fading | Budget decreases with each solved case |
| Active Experimentation | Free Anamnesis ↔ Diagnostics loop |
| Formative Feedback | "Return to Patient" on incorrect diagnosis |
| Summative Assessment | 0–100 score with dual-axis grading |
| Learning Analytics | Persistent dashboard with key metrics |

---

## Timing Summary

| Section | Slides | Speaker | Time |
|---------|--------|---------|------|
| Introduction + PBL + CA | 1–4 | A | ~4 min |
| Modeling + Scaffolding + Fading + Experimentation | 5–8 | B | ~5 min |
| Feedback + Assessment + Analytics + Conclusion | 9–13 | C | ~5 min |
| Live Demo | 12 | All | ~2 min |
| **Total** | | | **~12–14 min** |

> [!NOTE]
> This leaves 1–3 minutes of buffer for questions or if the professor asks for elaboration on specific concepts. Aim for 12 minutes of content to stay safely within the 10–15 minute window.

---

## Best Practices Checklist

- [x] Every educational concept is grounded in theory (citations provided)
- [x] Each concept has a concrete, demonstrable implementation
- [x] Both **formative** and **summative** assessment are present (professor requirement)
- [x] Student responsibilities are transparently distributed
- [x] Live demo connects theory to running code
- [x] Quality deliverable: polished, working HTML5 application
- [x] Quantity of deliverables: 10 clinical cases, analytics dashboard, multi-stage simulation

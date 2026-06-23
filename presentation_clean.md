# Clinical Simulation — Google Slides Copy & Paste Guide (Image-Driven Version)

This presentation guide is optimized slide-by-slide for **Google Slides**. The structure is specifically designed to let you lead the presentation using your **8 screenshots (Images 1 to 8)** that show the application, explaining the underlying educational and didactical concepts illustrated on each screen.

---

## SLIDE 0: Title Slide (Cover)

### 🖼️ SLIDE VISUAL SUGGESTION
* A premium title design showing the logo or a stylized concept of the Clinical Simulation. 
* Corporate color palette: deep indigo, sapphire blue, and a touch of glowing cyan.

### 📋 COPY FOR SLIDE TITLE
**Clinical Simulation: An eLearning Course for Medical Students**

### 📝 COPY FOR SLIDE BODY
* **Subtitle:** An Interactive Simulation Platform for Clinical Reasoning in Emergency Medicine
* **Course:** Educational Technologies (SoSe 2026)
* **Presented by:** [Your Team Member Names]
* **Presentation Format:** Image-driven walkthrough demonstrating 10 integrated pedagogical concepts.

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker A**: "Good morning everyone. Today we are excited to present our semester project: 'Clinical Simulation,' an interactive eLearning platform designed for medical students. Rather than relying on passive memorization or dry multiple-choice quizzes, our application places the student in a high-pressure Emergency Room sandbox. 
> 
> In this presentation, we will do things differently. Instead of talking about abstract pedagogy, we will lead you directly through the actual screens of our running application using our screenshots, Images 1 through 8. For each screen, we will show how our code concretely implements key didactical concepts like Problem-Based Learning, Cognitive Apprenticeship, Scaffolding, and Metacognitive Reflection."

---

## SLIDE 1: Image 1 — Patient Intake & Case Initiation (PBL Intro)

### 🖼️ PRESENTATION SCREENSHOT
> **[Insert Image 1 here]**
> *Screenshot of the Patient Intake screen, displaying the chief complaint, patient demographic data, and starting the anamnesis step.*

### 📋 COPY FOR SLIDE TITLE
**PBL in Action: Authentic, Ill-Structured Cases**

### 📝 COPY FOR SLIDE BODY
* **Problem-Based Learning (Barrows, 1986):** Learning is anchored in complex, open-ended clinical problems mirroring real-world practice.
* **Chief Complaint:** The student starts with only basic intake details (e.g., *"A 54-year-old male presents with sudden, crushing chest pain..."*).
* **Self-Directed Inquiry:** No initial diagnostic guidance or multiple-choice lists; the student must formulate their own initial pathology hypothesis.
* **Student Responsibility (Speaker A):** Front-end UI design, HTML/CSS structure, and writing the database of 10 authentic clinical cases in `data.js`.

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker A**: "Let us begin with Image 1, which displays the patient intake and the start of a case. This screen represents the core of **Problem-Based Learning**, founded by Howard Barrows. Traditional clinical learning often starts with a lecture telling you the disease, followed by a quiz. In our simulation, the student is thrown into the role of a physician. 
> 
> As you can see, they start with nothing but the patient's age, gender, and chief complaint. They are not given a multiple-choice list or a list of steps. They must think like a doctor, forming a mental model of the pathophysiology right from the start. I was responsible for implementing the front-end layout and writing the database of 10 highly realistic clinical cases, which range from cardiac emergencies to acute surgical cases, ensuring they are medically authentic."

---

## SLIDE 2: Image 2 — Stage 1: Anamnesis (Patient Interviewing)

### 🖼️ PRESENTATION SCREENSHOT
> **[Insert Image 2 here]**
> *Screenshot showing the interactive history questions (Anamnesis list) and the retrieved answers from the patient profile.*

### 📋 COPY FOR SLIDE TITLE
**Active Exploration & Structural Scaffolding**

### 📝 COPY FOR SLIDE BODY
* **Cognitive Apprenticeship (Collins et al., 1989):** Providing a situated, realistic environment (the ER) to develop cognitive skills.
* **Structural Scaffolding:** Strict 4-stage workflow (Anamnesis → Diagnostics → Diagnosis → Feedback) in the navigation bar.
* **Active Exploration:** Enforces history-gathering before diagnostics; prevents novices from rushing to expensive tests without asking basic questions.
* **Didactic Design:** The student gathers subjective patient symptoms to refine their differential diagnosis list.

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker A**: "Moving to Image 2, we are in the middle of Stage 1: Anamnesis. Under the **Cognitive Apprenticeship** framework, learning must be situated in a authentic context—in our case, an emergency department. 
> 
> Here, the student conducts the patient interview. They click on specific diagnostic questions and receive realistic responses from the patient. This screen showcases our **Structural Scaffolding**. Notice the progress bar and the strict four-stage navigation. A common mistake for novice medical students is to skip the patient interview and jump straight to ordering expensive lab tests. Our UI scaffold structurally prevents this, enforcing a professional clinical workflow. Now, Speaker B will explain how we manage the diagnostic investigation."

---

## SLIDE 3: Image 3 — Stage 2: Diagnostics Panel & Budget Constraint

### 🖼️ PRESENTATION SCREENSHOT
> **[Insert Image 3 here]**
> *Screenshot of the Diagnostics screen, showing the selectable list of examinations, their individual costs, and the active budget display in the header.*

### 📋 COPY FOR SLIDE TITLE
**Managing Cognitive Load via Boundary Scaffolding**

### 📝 COPY FOR SLIDE BODY
* **Boundary Scaffolding (Sweller, 1988):** Starting diagnostic budget manages cognitive load and sets explicit limits.
* **Combatting "Shotgun-Testing":** Novices tend to order every test available. The budget forces deliberate, hypothesis-driven clinical choices.
* **Active Experimentation (Kolb, 1984):** A penalty-free navigation loop. Students can move back and forth between Anamnesis ↔ Diagnostics to adjust their hypothesis as test results come in.
* **Student Responsibility (Speaker B):** Core logic in `app.js`, stage progression, state management, and the interactive budget mechanics.

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker B**: "Thank you, Speaker A. In Image 3, we see the Diagnostics Panel, which I engineered. Here, the student orders tests like lab work or imaging. 
> 
> This screen highlights **Boundary Scaffolding**, which is rooted in John Sweller's Cognitive Load Theory. Novices frequently resort to 'shotgun-testing'—ordering every single test to see what sticks. To combat this, we implement a starting diagnostic budget constraint. If a student tries to order a test they cannot afford, the system blocks them. This forces them to make highly deliberate, reasoned choices. However, based on Kolb's **Active Experimentation**, we allow students to freely navigate back and forth between history-taking and diagnostics without penalty. They can order a test, read the result, and if surprised, return to ask the patient more questions, testing their hypotheses in a safe sandbox."

---

## SLIDE 4: Image 4 — Stage 3: Diagnosis Formulation (Articulation)

### 🖼️ PRESENTATION SCREENSHOT
> **[Insert Image 4 here]**
> *Screenshot of the Diagnosis screen, displaying the free-text input box where students must type in their clinical hypothesis.*

### 📋 COPY FOR SLIDE TITLE
**Stimulating Articulation & Active Recall**

### 📝 COPY FOR SLIDE BODY
* **Articulation (Collins et al., 1989):** Forcing students to externalize their implicit reasoning and diagnostic hypotheses.
* **Free-Text Entry vs. Recognition:** By using a text input instead of multiple-choice, we test active clinical recall rather than passive recognition.
* **Hypothesis Synthesis:** The student must synthesize anamnesis data and diagnostic findings to articulate a final, definitive medical diagnosis.
* **Clinical Accuracy Check:** The string is parsed and evaluated against target correct answers behind the scenes.

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker B**: "Image 4 shows Stage 3: Diagnosis. Once the student has gathered enough clinical evidence, they must formulate their diagnosis. 
> 
> A crucial didactical choice here was using a free-text input rather than a multiple-choice list. Under Cognitive Apprenticeship, **Articulation** is the key process of making one's internal thinking visible. Multiple-choice questions only test recognition—a student might guess the correct disease by seeing it in a list. By forcing the student to physically type in their diagnosis (for example, 'Acute Appendicitis' or 'Myocardial Infarction'), we stimulate active cognitive recall and force them to commit to a synthesized hypothesis, just like a real doctor writing a clinical report. Next, Speaker C will explain what happens when the student submits."

---

## SLIDE 5: Image 5 — Stage 4: Formative Feedback & Incorrect Retry Loop

### 🖼️ PRESENTATION SCREENSHOT
> **[Insert Image 5 here]**
> *Screenshot showing an incorrect diagnosis result (red card) with the corrective feedback text, the wasted budget penalty, and the prominent "Return to Patient" button.*

### 📋 COPY FOR SLIDE TITLE
**Formative Feedback & The Diagnostic Retry Loop**

### 📝 COPY FOR SLIDE BODY
* **Formative Feedback (Black & Wiliam, 1998):** Actionable, developmental feedback during the learning process rather than a punitive failing grade.
* **The "Return to Patient" Loop:** Rather than ending in immediate failure, the system invites the student to rethink, re-examine, and try again.
* **Pathophysiological Explanations:** The red card explains the diagnostic mismatch, helping the student adjust their mental models.
* **Student Responsibility (Speaker C):** Scoring engine, feedback rendering, database-driven diagnostic hints, and retry state mechanics.

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker C**: "Thank you, Speaker B. Let us look at Image 5, which represents a critical didactical system: the incorrect diagnosis feedback screen, which I developed. 
> 
> According to didactical research by Black and Wiliam, feedback is most effective when it is **formative**—meaning it helps the learner improve during the process. If a student submits an incorrect diagnosis, the simulation does not end in failure or lock them out. Instead, a red feedback card appears, explaining the pathophysiological mismatch and showing their wasted cost. Most importantly, we provide a 'Return to Patient' button. This creates a formative retry loop. The student immediately applies the feedback, returns to the diagnostics room, refines their hypothesis, and orders targeted tests to rule out their initial mistake. This builds true clinical resilience."

---

## SLIDE 6: Image 6 — The Learning Analytics Dashboard Modal

### 🖼️ PRESENTATION SCREENSHOT
> **[Insert Image 6 here]**
> *Screenshot showing the Dashboard overlay displaying lifetime metrics: Solved Cases, Average Score, Cumulative Budget Wasted, and the active Fading difficulty level.*

### 📋 COPY FOR SLIDE TITLE
**Self-Regulated Learning & Adaptive Fading**

### 📝 COPY FOR SLIDE BODY
* **Learning Analytics (Siemens & Long, 2011):** Measuring learner data to foster self-regulation and long-term goal monitoring.
* **Session Persistence:** Lifetime metrics are saved in browser `localStorage`, persisting across user sessions.
* **Adaptive Fading (Vygotsky, 1978):** Gradually removing support as clinical competence grows.
* **Dynamic Difficulty Engine:** The patient's starting budget decreases by **$100** per successfully solved case (fading from a forgiving **$1000** down to a highly strict **$500**), demanding ever-higher efficiency.

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker C**: "Moving to Image 6, we see our Learning Analytics Dashboard modal, which persists data across browser sessions using localStorage. 
> 
> Learning analytics, as defined by Siemens and Long, is vital for fostering **self-regulated learning**. By showing students their cumulative solved cases, average score, and total budget wasted, we enable them to track their developmental progression over time. 
> 
> This dashboard also showcases our implementation of **Fading**, rooted in Vygotsky's Zone of Proximal Development. As the student demonstrates competence by solving cases, the platform automatically withdraws financial safety nets. The dynamic difficulty engine reduces the starting budget by $100 per case solved. While a beginner starts with a lenient $1000 budget, an advanced student operates on a tight $500 expert budget, forcing them to transition to high-precision reasoning."

---

## SLIDE 7: Image 7 — Stage 4: Summative Assessment, Formative Feedback & Expert Modeling (Single-Trial Analysis)

### 🖼️ PRESENTATION SCREENSHOT
> **[Insert Image 7 here]**
> *Screenshot showing a successful diagnosis feedback screen (green card) with the 0–100 score, qualitative grade, the "Expert's Path" comparison box, and the formative efficiency feedback card.*

### 📋 COPY FOR SLIDE TITLE
**Clinical Evaluation: Assessment, Modeling & Feedback**

### 📝 COPY FOR SLIDE BODY
The single-case feedback screen combines three essential educational technology pillars:
* **1. Summative Assessment (Scriven, 1967):** The final score (out of 100 points) and qualitative grade (e.g. *"Excellent"*, *"Good"*) evaluating overall performance.
* **2. Cognitive Modeling (Collins et al., 1989) — The Expert's Path:** A side-by-side comparison revealing exactly which diagnostics an expert physician would order and the optimal cost.
* **3. Formative Feedback (Black & Wiliam, 1998):** Actionable clinical explanations clarifying both diagnostic correctness and diagnostic testing efficiency.

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker C**: "In Image 7, we see the screen after the student has successfully diagnosed a patient. Here we present three key didactical components integrated into a single view. 
> 
> First is the **Summative Assessment**, which represents a score out of 100 points, formally evaluating competence against established clinical standards. 
> 
> Second is **Cognitive Modeling**, realized through our 'Expert's Path' card. It explicitly visualizes the invisible thinking of an experienced, cost-conscious physician, showing what the optimal test sequence and optimal cost would be, allowing the novice to compare their own choices. 
> 
> Third is **Formative Feedback**. In addition to the final score, the system provides constructive explanations about diagnostic efficiency, showing which tests were relevant and which were irrelevant, helping students adjust their conceptual mental models for future patient encounters."

---

## SLIDE 8: Image 8 — 10-Trial Block Final Evaluation Screen

### 🖼️ PRESENTATION SCREENSHOT
> **[Insert Image 8 here]**
> *Screenshot of the final 10-Trial Block screen, displaying the SVG radial success ring, financial waste KPIs, the Metacognitive Reflection text, and the expandable accordion ledger.*

### 📋 COPY FOR SLIDE TITLE
**Metacognitive Reflection & Cognitive Auditing**

### 📝 COPY FOR SLIDE BODY
* **Reflection-on-Action (Schön, 1983):** Broadening focus from single-case outcomes to longitudinal cognitive patterns.
* **10-Trial Cohorts:** Shuffles and ensures exposure to all 10 clinical conditions in a single block, with state saved across refreshes.
* **Didactic Coach:** Analyzes metrics to give targeted metacognitive advice (e.g., warning accurate students about "shotgun-testing").
* **Accordion Ledger & Relevance Tags:** Expandable ledger with color-coded tags (**[✓ green]** for relevant tests, **[✗ red]** for irrelevant tests) allows students to audit their diagnostic search paths.

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker C**: "Finally, Image 8 shows our crowning feature: the **10-Trial Block Final Evaluation screen**, which we added to close the reflective learning loop. According to Donald Schön, professional mastery requires systematic **reflection-on-action**. 
> 
> Upon completing a block of 10 shuffled cases, the student transitions to this comprehensive dashboard. It displays a dynamic SVG Radial Success ring and a Financial Waste KPI. It features a Didactic Reflection Coach that analyzes their overall behavior. For example, if they have high accuracy but massive budget waste, the coach advises them to spend more time in Anamnesis rather than over-testing. 
> 
> Crucially, the Accordion Case Ledger lets them expand any of the 10 completed trials. Inside, they see green checkmarks for relevant tests and red crosses for irrelevant ones. This provides an interactive visual ledger for **cognitive auditing**, allowing students to review exactly where they made diagnostic errors."

---

## SLIDE 9: Theoretical Mapping & Conclusion

### 📋 COPY FOR SLIDE TITLE
**Conclusion: A Highly Cohesive Pedagogical Tool**

### 📝 COPY FOR SLIDE BODY
| Educational Concept | Technical Feature & Image Reference | Didactic Outcome |
| :--- | :--- | :--- |
| **Problem-Based Learning** | 10 realistic, open-ended cases (Image 1, 2) | Cultivates clinical hypothesis formulation |
| **Cognitive Apprenticeship** | Situated ER sandbox simulation (Image 2) | Makes expert diagnostic workflows explicit |
| **Boundary Scaffolding** | Strict 4-stage UI flow & Budget constraint (Image 3) | Prevents cognitive overload & shotgun-testing |
| **Adaptive Fading** | Budget decreases by $100 per case solved (Image 6) | Pushes students from exploration to expert precision |
| **Articulation & Recall** | Free-text diagnosis input (Image 4) | Exercises active recall over passive recognition |
| **Formative Feedback** | Actionable clinical explanation & retry options (Image 5, 7) | Enables iterative learning-from-errors |
| **Summative Assessment** | Final score (accuracy & efficiency check) (Image 7) | Enforces cost-effective clinical care |
| **Learning Analytics** | Persistent modal tracking longitudinal metrics (Image 6) | Stimulates self-regulated clinical learning |
| **Metacognitive Reflection** | 10-Trial Block, coaching, tagged ledger (Image 8) | Promotes systematic reflection-on-action |

* **Thank you! We look forward to your questions.**

### 🗣️ SPEAKER NOTES (Copy to Slide Notes)
> **Speaker A/B/C**: "In conclusion, our Clinical Simulation is not just a coding exercise; it is a carefully engineered didactical tool. By mapping every technical feature in our vanilla HTML5/JS codebase to established educational technology theories, we have created an environment that bridges the clinical reasoning gap. 
> 
> From the initial ill-structured case entry to the boundary scaffolds, the adaptive budget fading, the formative retry loops, and finally the 10-trial block metacognitive evaluation dashboard, we provide a complete learning cycle that transforms novice medical students into structured, cost-conscious clinical thinkers. Thank you for your time, and we are now happy to take any questions."we provide a complete learning cycle that transforms novice medical students into structured, cost-conscious clinical thinkers. Thank you for your time, and we are now happy to take any questions."

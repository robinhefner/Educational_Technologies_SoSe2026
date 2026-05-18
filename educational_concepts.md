# Educational Technologies & Concepts in the Clinical Simulation

This document outlines the didactical frameworks, pedagogical concepts, and educational technologies applied within the Clinical Simulation project, explaining both the theoretical background and the concrete implementation within the codebase.

## Project Description
This semester project involves the development of an HTML5-based eLearning course for medical students, utilizing Problem-Based Learning to cultivate clinical competencies through authentic patient case studies. Grounded in the Cognitive Apprenticeship framework, the course implements systematic scaffolding that progressively increases in complexity to guide learners toward independent problem-solving and exploration. The simulation covers the critical stages of patient care: starting with anamnesis (patient history) followed by diagnostic examinations that provide immediate results. Based on these findings, the user must formulate a diagnosis, which is then evaluated. By providing immediate feedback on both the appropriateness of requested tests and the accuracy of the final diagnosis, the system ensures that students master clinical procedures through active experimentation within a realistic, simulated environment.

---

## 1. Problem-Based Learning (PBL)
**Concept:** A student-centered pedagogy where learning is driven by the challenge of open-ended, authentic problems rather than direct instruction or rote memorization (Barrows, 1986; Schmidt, 1983). PBL promotes critical thinking, clinical reasoning, and self-directed learning skills.
**Implementation:** 
- The entire application is structured around a sequence of **10 authentic clinical cases** (e.g., Acute Appendicitis, Myocardial Infarction, Ectopic Pregnancy) written in [data.js](file:///c:/Users/rohefner/Documents/GitHub/Educational_Technologies_SoSe2026/js/data.js).
- Students are not handed the diagnosis; instead, they must actively investigate the patient's condition, synthesized from clinical symptoms and diagnostic tests.
- By engaging with open-ended cases, students learn to construct mental models of pathophysiology and develop hypotheses, mimicking the actual clinical environment in a risk-free setting.

## 2. Cognitive Apprenticeship
**Concept:** A situated learning theory where novices acquire cognitive skills under the guidance of an expert in a realistic environment, making the expert's implicit cognitive processes visible to the learner (Collins, Brown, & Newman, 1989). It utilizes six core teaching methods: **Modeling, Coaching, Scaffolding, Articulation, Reflection, and Exploration**.
**Implementation:**
- The simulation serves as the realistic environment (an Emergency Room).
- **Coaching** is simulated by the system's dynamic instructions and formative alerts.
- **Articulation** is stimulated by forcing students to type in their diagnosis rather than selecting it from a multiple-choice list.
- The remaining pillars (Modeling, Scaffolding, Fading/Exploration, and Reflection) are mapped to dedicated code systems detailed below.

## 3. Modeling (The Expert's Path)
**Concept:** The demonstration of a task by an expert so that the student can build a conceptual model of the processes required to accomplish it. In cognitive domains, this requires making the expert's internal thoughts and decision-making explicit.
**Implementation:**
- Located in the **Feedback Stage** ([app.js:254-311](file:///c:/Users/rohefner/Documents/GitHub/Educational_Technologies_SoSe2026/js/app.js#L254-L311)).
- When a student finishes or abandons a case, the system displays the "Expert's Path" (Cognitive Modeling).
- It reveals exactly which diagnostic tests an experienced, cost-conscious physician would have ordered (the `isRelevant: true` subset) and lists the "Optimal Cost" alongside the student's wasted expenditure.
- This comparison explicitly models expert efficiency, allowing the novice to observe the gap between their own performance and the targeted expert path.

## 4. Scaffolding (Cognitive Load Management)
**Concept:** Temporary support structures provided to learners to assist them in performing tasks that they would otherwise be unable to complete independently, systematically preventing cognitive overload (Sweller, 1988).
**Implementation:**
- **Structural Scaffolding:** The strict 4-stage UI layout (Anamnesis -> Diagnostics -> Diagnosis -> Feedback) gives the medical student a mental framework, ensuring they systematically collect patient history before requesting examinations and jumping to conclusions.
- **Boundary Scaffolding:** The starting budget of `$1000` acts as a boundary. It prevents the novice strategy of "Shotgunning" (randomly ordering all tests to see what matches) and forces deliberate, hypothesis-driven clinical choices.

## 5. Fading (Zone of Proximal Development)
**Concept:** The gradual removal of scaffolding as the learner's expertise and autonomy increase, challenging them to take on more cognitive responsibility (Vygotsky, 1978).
**Implementation:**
- The system features a **dynamic difficulty curve** based on the student's solved cases (stored in `localStorage`).
- As the student solves cases, the simulation initiates "Fading" by reducing their starting budget by $100 per solved case, decreasing from a lenient $1000 down to a highly challenging expert budget of $500 ([app.js:106](file:///c:/Users/rohefner/Documents/GitHub/Educational_Technologies_SoSe2026/js/app.js#L106)).
- Financial leniency fades as clinical competence grows, demanding ever-higher efficiency and clinical precision to complete the case.

## 6. Formative Feedback (Iterative Loop)
**Concept:** Ongoing feedback provided during the learning process to modify and improve the learner's thinking and behavior (Black & Wiliam, 1998). It is developmental rather than punitive.
**Implementation:**
- If a student submits an incorrect diagnosis, the system provides formative text detailing the diagnostic mismatch and identifying irrelevant tests ordered ([app.js:271-282](file:///c:/Users/rohefner/Documents/GitHub/Educational_Technologies_SoSe2026/js/app.js#L271-L282)).
- Crucially, the simulation does not terminate upon failure. It offers a **"Return to Patient"** button.
- This creates an iterative learning loop: students immediately apply the formative feedback, return to the diagnostics panel, reconsider their clinical hypothesis, and order targeted tests to refine their diagnosis.

## 7. Active Experimentation (Experiential Learning)
**Concept:** The testing of hypotheses and ideas in practice, forming one of the four phases of Kolb's Experiential Learning Cycle (1984), transitioning from Concrete Experience to Reflective Observation.
**Implementation:**
- The **Iterative ER Loop**. Users are permitted to traverse back and forth between "Anamnesis" and "Diagnostics" without penalty.
- They can form a hypothesis, order a test, view the result, and if the finding is unexpected, return to the patient to ask more questions.
- This safe, sandbox-like exploration cultivates genuine clinical inquiry rather than fear of failure.

## 8. Summative Assessment
**Concept:** The evaluation of learning at the conclusion of an instructional unit, measured against a standard or benchmark (Scriven, 1967).
**Implementation:**
- Upon completing a trial, the student receives a summative grade out of `100 points`:
  - **60 points** are awarded for a correct diagnosis.
  - **40 points** represent diagnostic efficiency, with a penalty of **15 points per irrelevant test ordered** ([app.js:227-240](file:///c:/Users/rohefner/Documents/GitHub/Educational_Technologies_SoSe2026/js/app.js#L227-L240)).
- The score is translated into a qualitative grade (e.g., "Excellent", "Good", "Needs Improvement"), reflecting real-world clinical standards where excessive testing increases patient cost, strain, and wait times.

## 9. Learning Analytics (Self-Regulated Learning)
**Concept:** The collection and analysis of student performance data to understand and optimize learning behaviors, fostering self-regulation and metacognitive monitoring (Siemens & Long, 2011).
**Implementation:**
- Utilizing browser `localStorage`, the application persists lifetime analytics across sessions.
- Opening the **Dashboard Modal** reveals:
  - Total Cases Successfully Solved
  - Lifetime Average Score
  - Cumulative Wasted Budget
  - Current Fading Difficulty Level
- This data allows students to visibly track their longitudinal progression and efficiency improvements across multiple simulation runs.

## 10. Systematic Reflection & Metacognitive Evaluation (The 10-Trial Block)
**Concept:** Deep reflection-on-action (Schön, 1983) is essential for transitioning from a novice to an expert practitioner. By reviewing a series of clinical decisions in a structured manner, students can identify cognitive biases, patterns of over-testing, and conceptual gaps.
**Implementation:**
- **The 10-Trial Block:** The application groups case play into structured 10-trial sequences. Cases are loaded in a randomized, shuffled sequence to ensure that the student encounters every unique condition once per block, eliminating duplications ([app.js:90](file:///c:/Users/rohefner/Documents/GitHub/Educational_Technologies_SoSe2026/js/app.js#L90)).
- **Session Persistence:** The active block state is saved in `localStorage` (`clinicalSimTrialBlock`), enabling robust progression across browser refreshes.
- **The Evaluation Dashboard:** Upon completing the 10th trial (either via correct diagnosis or giving up), the simulation displays a premium, interactive **Auswertung der 10 Trials** screen ([app.js:475](file:///c:/Users/rohefner/Documents/GitHub/Educational_Technologies_SoSe2026/js/app.js#L475)):
  - **Radial Success Gauge:** A dynamic SVG progress ring visualizing the overall diagnostic accuracy percentage.
  - **Financial Waste KPIs:** A metrics card tracking total budget wasted across all 10 cases, making the clinical-economic impact of decision-making starkly visible.
  - **Didactic Reflection Box:** A metacognitive coaching card that reviews their combined accuracy and cost-efficiency. It provides tailored guidance (e.g., advising students who get correct diagnoses but waste budget to use the Anamnesis stage more thoroughly rather than relying on "shotgun-testing").
  - **Interactive Trial Accordion:** An expandable summary of the 10 completed trials. Clicking a trial reveals:
    - The student's submitted diagnosis vs. the correct diagnosis.
    - Detailed cost and score breakdowns.
    - **Colored Relevance Tags:** A visual ledger of all ordered tests. Relevant tests are rendered as green badges with checkmarks (`[✓ Physical Exam]`), while irrelevant tests are rendered as red badges with crosses (`[✗ Chest X-Ray]`). This visualization lets students analyze their cognitive search paths and recognize precisely where they went off-track.
- This 10-trial block and dashboard structure systematically bridges the gap between active gameplay and reflective, abstract conceptualization, closing the loop of the Experiential Learning Cycle.

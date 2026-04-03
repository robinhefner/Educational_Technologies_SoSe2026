// Data loaded from data.js globally

let clinicalCase;

function loadAnalytics() {
    try {
        const data = localStorage.getItem('clinicalSimAnalytics');
        if (data) return JSON.parse(data);
    } catch(e) {}
    return { casesSolved: 0, totalScore: 0, totalWasted: 0 };
}

function saveAnalytics() {
    localStorage.setItem('clinicalSimAnalytics', JSON.stringify(state.analytics));
}

const state = {
    stage: 'anamnesis', // anamnesis, diagnostics, diagnosis, feedback
    selectedQuestions: new Set(),
    selectedDiagnostics: new Set(),
    submittedDiagnosis: '',
    progress: 25,
    budget: 1000,
    initialBudget: 1000,
    analytics: loadAnalytics()
};

function setupNewCase() {
    clinicalCase = clinicalCases[Math.floor(Math.random() * clinicalCases.length)];
    state.stage = 'anamnesis';
    state.selectedQuestions.clear();
    state.selectedDiagnostics.clear();
    state.submittedDiagnosis = '';
    
    // Fading logic: reduce initial budget by $100 per case solved, max down to $500.
    state.initialBudget = Math.max(500, 1000 - (state.analytics.casesSolved * 100));
    state.budget = state.initialBudget;
    render();
}

const appContent = document.getElementById('app-content');
const progressBar = document.getElementById('progress-bar');
const indicators = {
    anamnesis: document.getElementById('indicator-anamnesis'),
    diagnostics: document.getElementById('indicator-diagnostics'),
    diagnosis: document.getElementById('indicator-diagnosis'),
    feedback: document.getElementById('indicator-feedback')
};

function updateProgress(stage) {
    let progressValue = 25;
    Object.keys(indicators).forEach(key => indicators[key].classList.remove('active'));

    if (stage === 'anamnesis') { progressValue = 25; indicators.anamnesis.classList.add('active'); }
    else if (stage === 'diagnostics') { progressValue = 50; indicators.diagnostics.classList.add('active'); }
    else if (stage === 'diagnosis') { progressValue = 75; indicators.diagnosis.classList.add('active'); }
    else if (stage === 'feedback') { progressValue = 100; indicators.feedback.classList.add('active'); }

    progressBar.style.width = `${progressValue}%`;
}

function updateBudget() {
    const budgetEl = document.getElementById('budget-amount');
    if (budgetEl) budgetEl.innerText = state.budget;
}

function render() {
    updateProgress(state.stage);
    updateBudget();
    appContent.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'fade-in';

    if (state.stage === 'anamnesis') {
        renderAnamnesis(container);
    } else if (state.stage === 'diagnostics') {
        renderDiagnostics(container);
    } else if (state.stage === 'diagnosis') {
        renderDiagnosis(container);
    } else if (state.stage === 'feedback') {
        renderFeedback(container);
    }

    appContent.appendChild(container);
}

function renderAnamnesis(container) {
    const html = `
        <h2 class="section-title">Stage 1: Anamnesis</h2>
        <p class="description">${clinicalCase.intro}<br><br>Select questions to ask the patient:</p>
        <div class="item-list" id="questions-list"></div>
        <div class="nav-row" style="justify-content: flex-end;">
            <button class="btn" id="next-to-diag">Proceed to Diagnostics &rarr;</button>
        </div>
    `;
    container.innerHTML = html;

    const list = container.querySelector('#questions-list');
    clinicalCase.anamnesis.forEach(q => {
        const item = document.createElement('div');
        item.className = 'list-item' + (state.selectedQuestions.has(q.id) ? ' selected' : '');
        item.innerHTML = `
            <div class="item-content">
                <div class="item-title">${q.text}</div>
                <div class="item-result">${q.result}</div>
            </div>
        `;
        item.onclick = () => {
            state.selectedQuestions.add(q.id);
            render();
        };
        list.appendChild(item);
    });

    container.querySelector('#next-to-diag').onclick = () => {
        state.stage = 'diagnostics';
        render();
    };
}

function renderDiagnostics(container) {
    const html = `
        <h2 class="section-title">Stage 2: Diagnostics</h2>
        <p class="description">Select clinical tests to order. Keep relevance and costs in mind.</p>
        <div class="item-list" id="tests-list"></div>
        <div class="nav-row" style="justify-content: space-between;">
            <button class="btn" id="back-to-anamnesis" style="background: var(--text-secondary);">&larr; Back to Anamnesis</button>
            <button class="btn" id="next-to-diagnosis">Proceed to Diagnosis &rarr;</button>
        </div>
    `;
    container.innerHTML = html;

    const list = container.querySelector('#tests-list');
    clinicalCase.diagnostics.forEach(t => {
        const item = document.createElement('div');
        item.className = 'list-item' + (state.selectedDiagnostics.has(t.id) ? ' selected' : '');
        item.innerHTML = `
            <div class="item-content">
                <div class="item-title">${t.name} <span style="font-size: 0.8rem; opacity: 0.7; margin-left:10px;">(Cost: $${t.cost})</span></div>
                <div class="item-result">${t.result}</div>
            </div>
        `;
        item.onclick = () => {
            if (state.selectedDiagnostics.has(t.id)) {
                state.selectedDiagnostics.delete(t.id);
                state.budget += t.cost;
            } else {
                if (state.budget >= t.cost) {
                    state.selectedDiagnostics.add(t.id);
                    state.budget -= t.cost;
                } else {
                    alert("Insufficient budget for this test!");
                    return;
                }
            }
            render();
        };
        list.appendChild(item);
    });

    container.querySelector('#back-to-anamnesis').onclick = () => {
        state.stage = 'anamnesis';
        render();
    };

    container.querySelector('#next-to-diagnosis').onclick = () => {
        state.stage = 'diagnosis';
        render();
    };
}

function renderDiagnosis(container) {
    const html = `
        <h2 class="section-title">Stage 3: Diagnosis</h2>
        <p class="description">Based on the patient history and diagnostic results, please enter your final diagnosis.</p>
        <div class="input-group">
            <input type="text" class="text-input" id="diagnosis-input" placeholder="e.g. Broken Arm" value="${state.submittedDiagnosis}">
        </div>
        <div class="nav-row" style="justify-content: space-between;">
            <button class="btn" id="back-to-diagnostics" style="background: var(--text-secondary);">&larr; Back to Diagnostics</button>
            <button class="btn" id="submit-diagnosis">Submit Diagnosis &rarr;</button>
        </div>
    `;
    container.innerHTML = html;

    const input = container.querySelector('#diagnosis-input');
    input.addEventListener('input', (e) => {
        state.submittedDiagnosis = e.target.value;
    });

    container.querySelector('#back-to-diagnostics').onclick = () => {
        state.stage = 'diagnostics';
        render();
    };

    container.querySelector('#submit-diagnosis').onclick = () => {
        if (!state.submittedDiagnosis.trim()) {
            alert("Please enter a diagnosis first.");
            return;
        }
        state.stage = 'feedback';
        render();
    };
}

function renderFeedback(container) {
    // Evaluate Diagnosis
    const normalizedInput = state.submittedDiagnosis.toLowerCase().trim();
    const isCorrect = clinicalCase.diagnosisObj.correctDiagnoses.some(d => normalizedInput.includes(d));

    // Evaluate Diagnostics Ordered
    const totalTests = clinicalCase.diagnostics.length;
    const orderedTests = Array.from(state.selectedDiagnostics).map(id => clinicalCase.diagnostics.find(t => t.id === id));

    let irrelevantCount = 0;
    orderedTests.forEach(t => {
        if (!t.isRelevant) irrelevantCount++;
    });

    let diagFeedbackStr = "";
    if (irrelevantCount > 0) {
        diagFeedbackStr = `You ordered ${irrelevantCount} irrelevant test(s), which increases cost and patient burden unnecessarily.`;
    } else {
        diagFeedbackStr = `Excellent diagnostic choices. You avoided unnecessary tests.`;
    }

    // SUMMATIVE ASSESSMENT CALCULATION
    let score = 0;
    if (isCorrect) score += 60; // 60 points for correct diagnosis

    let diagScore = 40 - (irrelevantCount * 15); // penalize 15 points per irrelevant test
    if (diagScore < 0) diagScore = 0;
    score += diagScore;

    let gradeText = "";
    if (score >= 90) gradeText = "Excellent (Pass)";
    else if (score >= 70) gradeText = "Good (Pass)";
    else if (score >= 50) gradeText = "Satisfactory (Pass)";
    else gradeText = "Needs Improvement (Fail)";

    // Fading UI Text
    const lvl = Math.min(5, state.analytics.casesSolved + 1);

    // Expert Modeling Path
    const relevantTests = clinicalCase.diagnostics.filter(t => t.isRelevant);
    const optimalCost = relevantTests.reduce((sum, t) => sum + t.cost, 0);
    const optimalTestsNames = relevantTests.map(t => t.name).join(', ') || "None required";
    
    const wastedMoney = Array.from(state.selectedDiagnostics)
                             .filter(id => !clinicalCase.diagnostics.find(t => t.id === id).isRelevant)
                             .reduce((sum, id) => sum + clinicalCase.diagnostics.find(t => t.id === id).cost, 0);

    const html = `
        <h2 class="section-title">Stage 4: Feedback & Assessment</h2>
        <p class="description">Here is the evaluation of your clinical reasoning processes.</p>
        
        <div class="feedback-card" style="border-left: 4px solid var(--accent-color);">
            <div class="feedback-title" style="color: var(--accent-color);">Summative Assessment</div>
            <h1 style="font-size: 2.5rem; margin: 10px 0;">${score} / 100</h1>
            <p style="font-weight: bold; font-size: 1.1rem;">Final Grade: ${gradeText}</p>
        </div>

        <h3 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--text-secondary);">Expert's Path (Cognitive Modeling):</h3>
        <div class="feedback-card" style="border-left: 4px solid var(--text-secondary);">
            <div class="feedback-title" style="color: var(--text-secondary);">How an expert would approach this:</div>
            <p style="margin-bottom: 0.5rem; margin-top: 0.5rem;">An experienced doctor prioritizes cost-effectiveness and only orders immediately relevant diagnostics. For this case, the optimal targeted diagnostics were: <br><strong>${optimalTestsNames}</strong>.</p>
            <p style="font-size: 0.9rem;"><strong>Optimal Cost:</strong> $${optimalCost}</p>
            <p style="font-size: 0.9rem;"><strong>Your Expenditure on Irrelevant Tests:</strong> <span style="color: var(--danger-color);">$${wastedMoney}</span></p>
        </div>

        <h3 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--text-secondary);">Formative Feedback:</h3>

        <div class="feedback-card ${isCorrect ? 'success' : 'danger'}">
            <div class="feedback-title ${isCorrect ? 'success' : 'danger'}">${isCorrect ? 'Correct Diagnosis (+60 pts)' : 'Incorrect Diagnosis (0 pts)'}</div>
            <p>${isCorrect ? clinicalCase.diagnosisObj.feedbackSuccess : clinicalCase.diagnosisObj.feedbackFailure}</p>
            <p style="margin-top:0.5rem; opacity:0.8;">Your Submission: <em>"${state.submittedDiagnosis}"</em></p>
        </div>

        <div class="feedback-card ${irrelevantCount === 0 ? 'success' : 'warning'}">
            <div class="feedback-title ${irrelevantCount === 0 ? 'success' : 'warning'}">Diagnostic Efficiency (+${diagScore} pts)</div>
            <p>${diagFeedbackStr}</p>
        </div>

        <div class="nav-row" style="justify-content: ${isCorrect ? 'flex-end' : 'space-between'};">
            ${!isCorrect ? '<button class="btn" id="give-up-btn" style="background: var(--danger-color);">Give Up (Next Patient)</button>' : ''}
            ${!isCorrect ? '<button class="btn" id="return-btn">Return to Patient &olarr;</button>' : ''}
            ${isCorrect ? '<button class="btn" id="next-patient-btn">Next Patient &rarr;</button>' : ''}
        </div>
    `;
    container.innerHTML = html;

    if (isCorrect) {
        container.querySelector('#next-patient-btn').onclick = () => {
            state.analytics.casesSolved++;
            state.analytics.totalScore += score;
            state.analytics.totalWasted += wastedMoney;
            saveAnalytics();
            setupNewCase();
        };
    } else {
        container.querySelector('#return-btn').onclick = () => {
            state.stage = 'diagnostics';
            render();
        };
        container.querySelector('#give-up-btn').onclick = () => {
            state.analytics.totalWasted += wastedMoney;
            saveAnalytics();
            setupNewCase();
        };
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Top Nav Indicators Clickable (unless in feedback)
    const setNav = (id, targetStage) => {
        indicators[id].style.cursor = 'pointer';
        indicators[id].onclick = () => {
            if (state.stage !== 'feedback') {
                state.stage = targetStage;
                render();
            }
        };
    };
    setNav('anamnesis', 'anamnesis');
    setNav('diagnostics', 'diagnostics');
    setNav('diagnosis', 'diagnosis');

    setupNewCase();

    // Dashboard Modal Logic
    const dashboardBtn = document.getElementById('dashboard-btn');
    if (dashboardBtn) {
        dashboardBtn.onclick = () => {
            document.getElementById('stat-cases').innerText = state.analytics.casesSolved;
            const avg = state.analytics.casesSolved > 0 ? (state.analytics.totalScore / state.analytics.casesSolved).toFixed(1) : 0;
            document.getElementById('stat-score').innerText = `${avg} / 100`;
            document.getElementById('stat-wasted').innerText = `$${state.analytics.totalWasted}`;
            
            const lvl = Math.min(5, state.analytics.casesSolved + 1);
            document.getElementById('stat-difficulty').innerText = `Level ${lvl}`;
            
            document.getElementById('dashboard-modal').classList.add('open');
        };
    }
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('dashboard-modal').classList.remove('open');
        };
    }
});

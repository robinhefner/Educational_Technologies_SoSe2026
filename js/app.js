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

// Utility function to shuffle array items
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Block session persistence helpers
function loadTrialBlock() {
    try {
        const data = localStorage.getItem('clinicalSimTrialBlock');
        if (data) {
            const parsed = JSON.parse(data);
            return {
                trialHistory: parsed.trialHistory || [],
                trialSequence: parsed.trialSequence || [],
                currentTrialIndex: parsed.currentTrialIndex || 0
            };
        }
    } catch(e) {}
    return null;
}

function saveTrialBlock() {
    localStorage.setItem('clinicalSimTrialBlock', JSON.stringify({
        trialHistory: state.trialHistory,
        trialSequence: state.trialSequence,
        currentTrialIndex: state.currentTrialIndex
    }));
}

function clearTrialBlock() {
    localStorage.removeItem('clinicalSimTrialBlock');
}

const savedBlock = loadTrialBlock();

const state = {
    stage: savedBlock ? (savedBlock.trialHistory.length >= 10 ? 'evaluation' : 'anamnesis') : 'anamnesis',
    selectedQuestions: new Set(),
    selectedDiagnostics: new Set(),
    submittedDiagnosis: '',
    progress: 25,
    budget: 1000,
    initialBudget: 1000,
    analytics: loadAnalytics(),
    trialHistory: savedBlock ? savedBlock.trialHistory : [],
    trialSequence: savedBlock ? savedBlock.trialSequence : [],
    currentTrialIndex: savedBlock ? savedBlock.currentTrialIndex : 0
};

function setupNewCase(resume = false) {
    // If no sequence or we completed the 10-trial block, start a new run
    if (!state.trialSequence || state.trialSequence.length === 0 || state.currentTrialIndex >= 10) {
        state.trialSequence = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        state.currentTrialIndex = 0;
        state.trialHistory = [];
        clearTrialBlock();
    }

    if (state.trialHistory.length >= 10) {
        state.stage = 'evaluation';
        render();
        return;
    }

    const caseIndex = state.trialSequence[state.currentTrialIndex];
    clinicalCase = clinicalCases[caseIndex];

    if (!resume) {
        state.stage = 'anamnesis';
        state.selectedQuestions.clear();
        state.selectedDiagnostics.clear();
        state.submittedDiagnosis = '';
    }

    // Fading logic: reduce initial budget by $100 per case solved in lifetime stats, minimum $500
    state.initialBudget = Math.max(500, 1000 - (state.analytics.casesSolved * 100));
    
    if (!resume) {
        state.budget = state.initialBudget;
    }
    
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

// Update the header details based on evaluation vs trial progression
function updateHeader() {
    const stageNav = document.getElementById('stage-nav');
    const progressContainer = document.getElementById('progress-bar-container');
    const budgetDisplay = document.getElementById('budget-display');

    // Create a trial badge in header if not already present
    let badge = document.getElementById('trial-badge');
    if (!badge) {
        badge = document.createElement('span');
        badge.id = 'trial-badge';
        badge.style.marginLeft = '1rem';
        badge.style.fontSize = '0.9rem';
        badge.style.padding = '0.3rem 0.6rem';
        badge.style.borderRadius = '20px';
        badge.style.background = 'rgba(59, 130, 246, 0.2)';
        badge.style.border = '1px solid var(--accent-color)';
        badge.style.color = '#60a5fa';
        badge.style.verticalAlign = 'middle';
        badge.style.fontWeight = '600';
        badge.style.display = 'inline-block';
        
        const h1 = document.querySelector('#app-header h1');
        if (h1) h1.appendChild(badge);
    }

    if (state.stage === 'evaluation') {
        if (stageNav) stageNav.style.display = 'none';
        if (progressContainer) progressContainer.style.display = 'none';
        if (budgetDisplay) budgetDisplay.style.display = 'none';
        badge.innerText = `Run Completed`;
        badge.style.background = 'rgba(16, 185, 129, 0.2)';
        badge.style.borderColor = 'var(--success-color)';
        badge.style.color = '#34d399';
    } else {
        if (stageNav) stageNav.style.display = 'flex';
        if (progressContainer) progressContainer.style.display = 'block';
        if (budgetDisplay) budgetDisplay.style.display = 'block';
        badge.innerText = `Trial ${state.currentTrialIndex + 1} / 10`;
        badge.style.background = 'rgba(59, 130, 246, 0.2)';
        badge.style.borderColor = 'var(--accent-color)';
        badge.style.color = '#60a5fa';
    }
}

function render() {
    updateHeader();
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
    } else if (state.stage === 'evaluation') {
        renderEvaluation(container);
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
            completeTrial(true, score, wastedMoney);
        };
    } else {
        container.querySelector('#return-btn').onclick = () => {
            state.stage = 'diagnostics';
            render();
        };
        container.querySelector('#give-up-btn').onclick = () => {
            completeTrial(false, score, wastedMoney);
        };
    }
}

// Log current trial, save state and check sequence progress
function completeTrial(isCorrect, score, wastedMoney) {
    // Record to lifetime analytics
    if (isCorrect) {
        state.analytics.casesSolved++;
        state.analytics.totalScore += score;
    }
    state.analytics.totalWasted += wastedMoney;
    saveAnalytics();

    // Record to active block trialHistory
    const orderedTestsList = Array.from(state.selectedDiagnostics).map(id => {
        const test = clinicalCase.diagnostics.find(t => t.id === id);
        return {
            name: test.name,
            cost: test.cost,
            isRelevant: test.isRelevant
        };
    });

    state.trialHistory.push({
        trialNum: state.trialHistory.length + 1,
        patientName: clinicalCase.patientInfo.name,
        patientAge: clinicalCase.patientInfo.age,
        patientGender: clinicalCase.patientInfo.gender,
        expectedDiagnosis: clinicalCase.diagnosisObj.correctDiagnoses[0],
        submittedDiagnosis: state.submittedDiagnosis,
        isCorrect: isCorrect,
        score: score,
        budgetSpent: state.initialBudget - state.budget,
        budgetWasted: wastedMoney,
        testsOrdered: orderedTestsList
    });

    if (state.trialHistory.length >= 10) {
        state.stage = 'evaluation';
        clearTrialBlock();
        render();
    } else {
        state.currentTrialIndex++;
        saveTrialBlock();
        setupNewCase();
    }
}

function renderEvaluation(container) {
    const totalTrials = state.trialHistory.length;
    const correctCount = state.trialHistory.filter(t => t.isCorrect).length;
    const successPercent = totalTrials > 0 ? Math.round((correctCount / totalTrials) * 100) : 0;
    
    const avgScore = totalTrials > 0 ? (state.trialHistory.reduce((sum, t) => sum + t.score, 0) / totalTrials).toFixed(1) : 0;
    const totalWasted = state.trialHistory.reduce((sum, t) => sum + t.budgetWasted, 0);
    const totalSpent = state.trialHistory.reduce((sum, t) => sum + t.budgetSpent, 0);

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (successPercent / 100) * circumference;

    let reflectionTitle = "Didactic Reflection";
    let reflectionText = "";
    if (successPercent >= 80 && totalWasted <= 300) {
        reflectionText = "Outstanding clinical reasoning! You demonstrated high diagnostic precision over all 10 trials while keeping medical costs low. You ordered highly targeted tests and avoided unnecessary patient strain. Keep it up—you are practicing at an expert level!";
    } else if (successPercent >= 80 && totalWasted > 300) {
        reflectionText = "Good diagnostic accuracy, but your resource efficiency needs work! While you formulate correct diagnoses, you tend to order unnecessary tests (Shotgun-Testing). Focus more heavily on the patient history (Anamnesis) to build a stronger differential hypothesis before requesting diagnostics. In the real world, this reduces costs and patient burden.";
    } else if (successPercent >= 50) {
        reflectionText = "Solid clinical foundation, but your diagnostic paths are somewhat unbalanced. You occasionally missed key details during Anamnesis, which led to incorrect decisions or unnecessary diagnostics. Analyze the red tags (irrelevant tests) in the trial history below and compare them to the expert's path.";
    } else {
        reflectionText = "Critical clinical review recommended! Your success rate is below 50%. You may be rushing to conclusions without gathering sufficient anamnesis data or diagnostics. Review each case in the accordion history below and study the 'Expert's Path' to understand the optimal diagnostic pathways.";
    }

    let accordionHTML = "";
    state.trialHistory.forEach((trial, index) => {
        const statusClass = trial.isCorrect ? "correct" : "incorrect";
        const statusLabel = trial.isCorrect ? "Correct" : "Incorrect / Gave Up";
        
        let tagsHTML = "";
        if (trial.testsOrdered && trial.testsOrdered.length > 0) {
            trial.testsOrdered.forEach(test => {
                if (test.isRelevant) {
                    tagsHTML += `<span class="test-tag relevant">&#10003; ${test.name}</span>`;
                } else {
                    tagsHTML += `<span class="test-tag irrelevant">&#10007; ${test.name}</span>`;
                }
            });
        } else {
            tagsHTML = `<span style="font-style:italic; font-size:0.85rem; color:var(--text-secondary);">No diagnostics ordered</span>`;
        }

        accordionHTML += `
            <div class="trial-accordion-item">
                <div class="trial-header" data-index="${index}">
                    <div class="trial-header-left">
                        <div class="trial-num-badge">${trial.trialNum}</div>
                        <div class="trial-patient-name">${trial.patientName} (${trial.patientGender === 'Male' ? 'm' : 'w'}, ${trial.patientAge} yrs.)</div>
                    </div>
                    <div class="trial-header-right">
                        <div class="trial-score-badge">${trial.score} / 100 pts.</div>
                        <span class="status-badge ${statusClass}">${statusLabel}</span>
                        <span class="toggle-icon">&#9660;</span>
                    </div>
                </div>
                <div class="trial-body" id="trial-body-${index}">
                    <div class="trial-details-grid">
                        <div>
                            <div class="trial-detail-label">Submitted Diagnosis</div>
                            <div class="trial-detail-value">"${trial.submittedDiagnosis || 'None'}"</div>
                        </div>
                        <div>
                            <div class="trial-detail-label">Expected Diagnosis</div>
                            <div class="trial-detail-value">${trial.expectedDiagnosis}</div>
                        </div>
                        <div>
                            <div class="trial-detail-label">Financial Expenditure</div>
                            <div class="trial-detail-value">Total: $${trial.budgetSpent} | Wasted: <span style="color:${trial.budgetWasted > 0 ? 'var(--danger-color)' : 'var(--success-color)'}">$${trial.budgetWasted}</span></div>
                        </div>
                    </div>
                    <div class="trial-diagnostics-section">
                        <div class="trial-detail-label">Ordered Diagnostics (Efficiency Check)</div>
                        <div class="test-tags-container">
                            ${tagsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    const html = `
        <h2 class="section-title">10-Trial Block Final Evaluation</h2>
        <p class="description">Here is your detailed clinical performance ledger across the completed 10-trial block.</p>

        <div class="eval-grid">
            <div class="eval-card">
                <div class="eval-card-title">Success Rate</div>
                <div class="success-ring-container">
                    <svg class="success-ring-svg" width="100" height="100">
                        <circle class="success-ring-bg" cx="50" cy="50" r="${radius}"></circle>
                        <circle class="success-ring-bar" cx="50" cy="50" r="${radius}" 
                            style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};"></circle>
                    </svg>
                    <div class="success-ring-text">${successPercent}%</div>
                </div>
                <div class="eval-card-subtext">${correctCount} of ${totalTrials} cases solved</div>
            </div>

            <div class="eval-card">
                <div class="eval-card-title">Average Score</div>
                <div class="eval-card-value">${avgScore} <span style="font-size:1.2rem; font-weight:500;">/ 100</span></div>
                <div class="eval-card-subtext">Optimal Target: 100 pts.</div>
            </div>

            <div class="eval-card">
                <div class="eval-card-title">Resource Efficiency</div>
                <div class="eval-card-value" style="color: ${totalWasted > 0 ? 'var(--warning-color)' : 'var(--success-color)'}">
                    ${totalWasted > 0 ? `-$${totalWasted}` : '$0'}
                </div>
                <div class="eval-card-subtext">Total Budget Wasted</div>
            </div>
        </div>

        <div class="reflection-box">
            <div class="reflection-title">
                <span>&#128161;</span> ${reflectionTitle}
            </div>
            <div class="reflection-content">
                ${reflectionText}
            </div>
        </div>

        <h3 style="margin-bottom:1rem; color:var(--text-primary); font-size:1.2rem;">Case History (Click to expand)</h3>
        <div class="accordion-container">
            ${accordionHTML}
        </div>

        <div class="eval-restart-btn-container">
            <button class="eval-restart-btn" id="eval-restart-btn">Start New 10-Trial Run</button>
        </div>
    `;
    
    container.innerHTML = html;

    // Attach accordion click listeners
    const headers = container.querySelectorAll('.trial-header');
    headers.forEach(header => {
        header.onclick = () => {
            const index = header.getAttribute('data-index');
            const body = container.querySelector(`#trial-body-${index}`);
            const icon = header.querySelector('.toggle-icon');
            
            if (body.style.display === 'block') {
                body.style.display = 'none';
                icon.innerHTML = '&#9660;'; // down arrow
                header.style.background = 'rgba(255, 255, 255, 0.03)';
            } else {
                body.style.display = 'block';
                body.classList.add('fade-in');
                icon.innerHTML = '&#9650;'; // up arrow
                header.style.background = 'rgba(255, 255, 255, 0.08)';
            }
        };
    });

    // Attach restart listener
    container.querySelector('#eval-restart-btn').onclick = () => {
        state.trialSequence = [];
        state.currentTrialIndex = 0;
        state.trialHistory = [];
        clearTrialBlock();
        setupNewCase();
    };
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Top Nav Indicators Clickable (unless in feedback or evaluation)
    const setNav = (id, targetStage) => {
        indicators[id].style.cursor = 'pointer';
        indicators[id].onclick = () => {
            if (state.stage !== 'feedback' && state.stage !== 'evaluation') {
                state.stage = targetStage;
                render();
            }
        };
    };
    setNav('anamnesis', 'anamnesis');
    setNav('diagnostics', 'diagnostics');
    setNav('diagnosis', 'diagnosis');

    if (state.stage === 'evaluation') {
        render();
    } else {
        setupNewCase(true);
    }

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

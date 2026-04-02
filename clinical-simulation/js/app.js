import { clinicalCase } from './data.js';

// Application State
const state = {
    stage: 'anamnesis', // anamnesis, diagnostics, diagnosis, feedback
    selectedQuestions: new Set(),
    selectedDiagnostics: new Set(),
    submittedDiagnosis: '',
    progress: 25
};

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

function render() {
    updateProgress(state.stage);
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
        <div class="nav-row">
            <button class="btn" id="next-to-diag">Proceed to Diagnostics</button>
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
        <div class="nav-row">
            <button class="btn" id="next-to-diagnosis">Proceed to Diagnosis</button>
        </div>
    `;
    container.innerHTML = html;

    const list = container.querySelector('#tests-list');
    clinicalCase.diagnostics.forEach(t => {
        const item = document.createElement('div');
        item.className = 'list-item' + (state.selectedDiagnostics.has(t.id) ? ' selected' : '');
        item.innerHTML = `
            <div class="item-content">
                <div class="item-title">${t.name} <span style="font-size: 0.8rem; opacity: 0.7; margin-left:10px;">(Cost: ${t.cost})</span></div>
                <div class="item-result">${t.result}</div>
            </div>
        `;
        item.onclick = () => {
            state.selectedDiagnostics.add(t.id);
            render();
        };
        list.appendChild(item);
    });

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
        <div class="nav-row">
            <button class="btn" id="submit-diagnosis">Submit Diagnosis</button>
        </div>
    `;
    container.innerHTML = html;

    const input = container.querySelector('#diagnosis-input');
    input.addEventListener('input', (e) => {
        state.submittedDiagnosis = e.target.value;
    });

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

    const html = `
        <h2 class="section-title">Stage 4: Feedback & Reflection</h2>
        <p class="description">Here is the evaluation of your clinical reasoning processes.</p>
        
        <div class="feedback-card ${isCorrect ? 'success' : 'danger'}">
            <div class="feedback-title ${isCorrect ? 'success' : 'danger'}">${isCorrect ? 'Correct Diagnosis!' : 'Incorrect Diagnosis'}</div>
            <p>${isCorrect ? clinicalCase.diagnosisObj.feedbackSuccess : clinicalCase.diagnosisObj.feedbackFailure}</p>
            <p style="margin-top:0.5rem; opacity:0.8;">Your Submission: <em>"${state.submittedDiagnosis}"</em></p>
        </div>

        <div class="feedback-card ${irrelevantCount === 0 ? 'success' : 'warning'}">
            <div class="feedback-title ${irrelevantCount === 0 ? 'success' : 'warning'}">Diagnostic Efficiency</div>
            <p>${diagFeedbackStr}</p>
        </div>

        <div class="nav-row">
            <button class="btn" id="restart-btn">Restart Simulation</button>
        </div>
    `;
    container.innerHTML = html;

    container.querySelector('#restart-btn').onclick = () => {
        state.stage = 'anamnesis';
        state.selectedQuestions.clear();
        state.selectedDiagnostics.clear();
        state.submittedDiagnosis = '';
        render();
    };
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    render();
});

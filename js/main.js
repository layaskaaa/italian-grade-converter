/**
 * Italian Grade Converter Core Logic
 * Based on Universitaly Allegato 5
 */

// State Object
const state = {
    currentStep: 1,
    conversionType: null, // 'esami' or 'laurea'
    vmin: null,
    vmax: null,
    grades: [{ id: Date.now(), subject: '', val: null }],
    finalDegreeVal: null,
    language: 'en'
};

// I18n strings
const translations = {
    en: {
        title: "Academic Grade Conversion Tool",
        subtitle: "Inspired by the Italian Higher Education System (Universitaly)",
        step1_title: "Select Conversion Type",
        type_esami: "Course Grades",
        type_esami_desc: "Individual subjects (Scale /30)",
        type_laurea: "Final Degree",
        type_laurea_desc: "Overall degree grade (Scale /110)",
        step2_title: "Academic Context",
        vmin: "Minimum Passing Grade (Vmin)",
        vmax: "Maximum Possible Grade (Vmax)",
        formula_explain: "Vmin is the minimum grade required to pass, and Vmax is the highest possible grade in your system.",
        step3_title_esami: "Input Your Grades",
        step3_title_laurea: "Input Your Degree Grade",
        add_subject: "Add Subject",
        final_grade: "Final Overall Grade",
        step4_title: "Conversion Result",
        classification: "Classification Table",
        col_orig: "Original",
        col_ital: "Italian",
        col_class: "Classification",
        disclaimer_text: "Conversion based on Universitaly guidelines. Final validation remains the responsibility of the receiving university.",
        official_sources: "Official Sources",
        source_universitaly: "Universitaly - Foreign Degrees Conversion Table (PDF)",
        source_cimea: "CIMEA - Italian Grading System Information",
        excellent: "Excellent",
        good: "Good",
        satisfactory: "Satisfactory",
        pass: "Pass",
        insufficient: "Insufficient"
    },
    it: {
        title: "Strumento di Conversione Voti Accademici",
        subtitle: "Ispirato al sistema di istruzione superiore italiano (Universitaly)",
        step1_title: "Seleziona il Tipo di Conversione",
        type_esami: "Voti Esami",
        type_esami_desc: "Singole materie (Scala /30)",
        type_laurea: "Voto di Laurea",
        type_laurea_desc: "Voto finale complessivo (Scala /110)",
        step2_title: "Contesto Accademico",
        vmin: "Voto Minimo per la Promozione (Vmin)",
        vmax: "Voto Massimo Possibile (Vmax)",
        formula_explain: "Vmin è il voto minimo per passare, Vmax è il massimo raggiungibile nel tuo sistema.",
        step3_title_esami: "Inserisci i tuoi Voti",
        step3_title_laurea: "Inserisci il Voto di Laurea",
        add_subject: "Aggiungi Materia",
        final_grade: "Voto Finale Complessivo",
        step4_title: "Risultato della Conversione",
        classification: "Tabella di Classificazione",
        col_orig: "Originale",
        col_ital: "Italiano",
        col_class: "Classificazione",
        disclaimer_text: "Conversione basata sulle linee guida Universitaly. La convalida finale spetta all'università ricevente.",
        official_sources: "Fonti Ufficiali",
        source_universitaly: "Universitaly - Tabella di conversione dei Titoli stranieri (PDF)",
        source_cimea: "CIMEA - Sistema di Votazione Italiano",
        excellent: "Eccellente",
        good: "Buono",
        satisfactory: "Soddisfacente",
        pass: "Sufficiente",
        insufficient: "Insufficiente"
    },
    ar: {
        title: "أداة تحويل الدرجات الأكاديمية",
        subtitle: "مستوحى من نظام التعليم العالي الإيطالي (Universitaly)",
        step1_title: "اختر نوع التحويل",
        type_esami: "درجات المواد",
        type_esami_desc: "المواد الفردية (مقياس /30)",
        type_laurea: "درجة التخرج",
        type_laurea_desc: "درجة الدرجة النهائية (مقياس /110)",
        step2_title: "السياق الأكاديمي",
        vmin: "أدنى درجة للنجاح (Vmin)",
        vmax: "أقصى درجة ممكنة (Vmax)",
        formula_explain: "Vmin هي أدنى درجة مطلوبة للنجاح، و Vmax هي أعلى درجة ممكنة في نظامك.",
        step3_title_esami: "أدخل درجاتك",
        step3_title_laurea: "أدخل درجة التخرج",
        add_subject: "إضافة مادة",
        final_grade: "الدرجة النهائية الإجمالية",
        step4_title: "نتيجة التحويل",
        classification: "جدول التصنيف",
        col_orig: "الأصلي",
        col_ital: "الإيطالي",
        col_class: "التصنيف",
        disclaimer_text: "التحويل يعتمد على إرشادات Universitaly. يظل التحقق النهائي من مسؤولية الجامعة المستلمة.",
        official_sources: "المصادر الرسمية",
        source_universitaly: "Universitaly - جدول تحويل الدرجات الأجنبية (PDF)",
        source_cimea: "CIMEA - نظام الدرجات الإيطالي",
        excellent: "ممتاز",
        good: "جيد",
        satisfactory: "مرضٍ",
        pass: "مقبول",
        insufficient: "غير كافٍ"
    }
};

// --- Wizard Navigation ---

function updateWizardUI() {
    // Show/hide steps
    document.querySelectorAll('.step').forEach((el, index) => {
        el.classList.toggle('active', index + 1 === state.currentStep);
    });

    // Update progress steps
    document.querySelectorAll('.progress-step').forEach((el, index) => {
        const stepNum = index + 1;
        el.classList.remove('active', 'completed');
        if (stepNum === state.currentStep) el.classList.add('active');
        if (stepNum < state.currentStep) el.classList.add('completed');
    });

    // Update buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.style.visibility = state.currentStep === 1 ? 'hidden' : 'visible';

    if (state.currentStep === 4) {
        nextBtn.innerHTML = 'Reset';
        nextBtn.onclick = resetApp;
    } else {
        nextBtn.innerHTML = 'Next';
        nextBtn.onclick = nextStep;
    }

    validateCurrentStep();
}

function nextStep() {
    if (state.currentStep < 4) {
        if (state.currentStep === 3) {
            calculateResult();
        }
        state.currentStep++;
        updateWizardUI();
    }
}

function prevStep() {
    if (state.currentStep > 1) {
        state.currentStep--;
        updateWizardUI();
    }
}

function resetApp() {
    state.currentStep = 1;
    state.conversionType = null;
    state.grades = [{ id: Date.now(), subject: '', val: null }];
    state.finalDegreeVal = null;
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    document.getElementById('vmin').value = '';
    document.getElementById('vmax').value = '';
    updateWizardUI();
}

// --- Step 1: Type Selection ---

function selectType(type) {
    state.conversionType = type;
    document.querySelectorAll('.card').forEach(c => {
        c.classList.toggle('selected', c.getAttribute('onclick').includes(type));
    });

    // UI adjustment for Step 3
    if (type === 'esami') {
        document.getElementById('add-grade-btn').style.display = 'inline-block';
        document.getElementById('degree-grade-container').style.display = 'none';
        document.getElementById('classification-area').style.display = 'block';
        renderGrades();
    } else {
        document.getElementById('add-grade-btn').style.display = 'none';
        document.getElementById('grades-container').innerHTML = '';
        document.getElementById('degree-grade-container').style.display = 'block';
        document.getElementById('classification-area').style.display = 'none';
    }

    validateCurrentStep();
}

// --- Step 3: Grade Management ---

function addGradeRow() {
    state.grades.push({ id: Date.now(), subject: '', val: null });
    renderGrades();
    validateCurrentStep();
}

function removeGradeRow(id) {
    if (state.grades.length > 1) {
        state.grades = state.grades.filter(g => g.id !== id);
        renderGrades();
    }
    validateCurrentStep();
}

function updateGrade(id, field, value) {
    const grade = state.grades.find(g => g.id === id);
    if (grade) {
        grade[field] = value;
    }
    validateCurrentStep();
}

function renderGrades() {
    const container = document.getElementById('grades-container');
    container.innerHTML = '';

    state.grades.forEach(g => {
        const row = document.createElement('div');
        row.className = 'grade-entry-row';
        row.innerHTML = `
            <input type="text" placeholder="Subject Name" value="${g.subject}" oninput="updateGrade(${g.id}, 'subject', this.value)">
            <input type="number" placeholder="Grade" value="${g.val || ''}" step="0.1" oninput="updateGrade(${g.id}, 'val', parseFloat(this.value))">
            <button class="btn-remove" onclick="removeGradeRow(${g.id})"><i class="fa-solid fa-trash"></i></button>
        `;
        container.appendChild(row);
    });
}

// --- Validation ---

function validateCurrentStep() {
    let isValid = false;

    if (state.currentStep === 1) {
        isValid = !!state.conversionType;
    } else if (state.currentStep === 2) {
        const vmin = parseFloat(document.getElementById('vmin').value);
        const vmax = parseFloat(document.getElementById('vmax').value);
        state.vmin = vmin;
        state.vmax = vmax;
        isValid = !isNaN(vmin) && !isNaN(vmax) && vmax > vmin;
    } else if (state.currentStep === 3) {
        if (state.conversionType === 'esami') {
            isValid = state.grades.every(g => !isNaN(g.val) && g.val >= state.vmin && g.val <= state.vmax);
        } else {
            const val = parseFloat(document.getElementById('final-degree-val').value);
            state.finalDegreeVal = val;
            isValid = !isNaN(val) && val >= state.vmin && val <= state.vmax;
        }
    } else {
        isValid = true;
    }

    document.getElementById('next-btn').disabled = !isValid;
}

// --- Conversion & Output ---

function calculateResult() {
    const Imin = state.conversionType === 'esami' ? 18 : 66;
    const Imax = state.conversionType === 'esami' ? 30 : 110;

    let result;
    if (state.conversionType === 'esami') {
        // For multiple grades, we calculate the average first or show individual?
        // Usually, we convert each. Let's calculate the overall average for the big circle.
        const avgOrig = state.grades.reduce((acc, g) => acc + g.val, 0) / state.grades.length;
        result = convert(avgOrig, state.vmin, state.vmax, Imin, Imax);
        populateClassificationTable(Imin, Imax);
    } else {
        result = convert(state.finalDegreeVal, state.vmin, state.vmax, Imin, Imax);
    }

    const formatted = result.toFixed(2);
    document.getElementById('converted-val').innerText = formatted;
    document.getElementById('converted-scale').innerText = state.conversionType === 'esami' ? '/30' : '/110';

    const label = getAcademicLabel(result, state.conversionType);
    const labelEl = document.getElementById('academic-label');
    labelEl.innerText = translations[state.language][label];
}

function convert(V, Vmin, Vmax, Imin, Imax) {
    return ((V - Vmin) / (Vmax - Vmin)) * (Imax - Imin) + Imin;
}

function getAcademicLabel(val, type) {
    if (type === 'esami') {
        if (val >= 29) return 'excellent';
        if (val >= 27) return 'good';
        if (val >= 24) return 'satisfactory';
        if (val >= 18) return 'pass';
        return 'insufficient';
    } else {
        if (val >= 105) return 'excellent';
        if (val >= 95) return 'good';
        if (val >= 85) return 'satisfactory';
        if (val >= 66) return 'pass';
        return 'insufficient';
    }
}

function populateClassificationTable(Imin, Imax) {
    const body = document.getElementById('classification-body');
    body.innerHTML = '';

    state.grades.forEach(g => {
        const itGrade = convert(g.val, state.vmin, state.vmax, Imin, Imax);

        // Find which range it falls into
        let classification = 'E';
        let highlight = '';
        if (itGrade >= 29) classification = 'A (30)';
        else if (itGrade >= 27) classification = 'B (28)';
        else if (itGrade >= 24) classification = 'C (26)';
        else if (itGrade >= 21) classification = 'D (23)';
        else classification = 'E (18)';

        const row = document.createElement('tr');
        if (itGrade >= 18) {
            row.innerHTML = `
                <td>${g.subject || 'Subject'}: ${g.val}</td>
                <td>${itGrade.toFixed(2)}</td>
                <td>${classification} - ${translations[state.language][getAcademicLabel(itGrade, 'esami')]}</td>
            `;
        } else {
            row.innerHTML = `
                <td>${g.subject || 'Subject'}: ${g.val}</td>
                <td>${itGrade.toFixed(2)}</td>
                <td style="color: var(--color-secondary);">${translations[state.language].insufficient}</td>
            `;
        }
        body.appendChild(row);
    });
}

// --- Language Management ---

function setLanguage(lang) {
    state.language = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    updateWizardUI();
}

// Initial Call
document.addEventListener('DOMContentLoaded', () => {
    updateWizardUI();
    // Check for form changes to re-validate
    document.getElementById('vmin').addEventListener('input', validateCurrentStep);
    document.getElementById('vmax').addEventListener('input', validateCurrentStep);
    document.getElementById('final-degree-val').addEventListener('input', validateCurrentStep);
});

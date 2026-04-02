export const clinicalCase = {
    patientInfo: {
        name: "Max Mustermann",
        age: 24,
        gender: "Male"
    },
    intro: "A 24-year-old male presents to the emergency department complaining of abdominal pain that started this morning.",
    anamnesis: [
        {
            id: "q1",
            text: "Where exactly is the pain located and has it moved?",
            result: "It started around my belly button this morning, but now it has moved down to the lower right side.",
            isRelevant: true
        },
        {
            id: "q2",
            text: "Can you describe the type of pain? Is it sharp, dull, cramping?",
            result: "It's a constant, sharp pain. It gets worse when I move or cough.",
            isRelevant: true
        },
        {
            id: "q3",
            text: "Have you experienced any nausea or vomiting?",
            result: "Yes, I completely lost my appetite and I threw up once a few hours ago.",
            isRelevant: true
        },
        {
            id: "q4",
            text: "Have you travelled abroad recently?",
            result: "No, I haven't left the country in the last year.",
            isRelevant: false
        },
        {
            id: "q5",
            text: "Do you have any pain when urinating?",
            result: "No, passing urine is completely normal.",
            isRelevant: true
        },
        {
            id: "q6",
            text: "Do you have any family history of heart disease?",
            result: "My grandfather had a heart attack at 70, but my parents are healthy.",
            isRelevant: false
        }
    ],
    diagnostics: [
        {
            id: "t1",
            name: "Physical Examination (Abdomen)",
            result: "Tenderness in the right lower quadrant (McBurney's point). Positive rebound tenderness.",
            isRelevant: true,
            cost: "Low"
        },
        {
            id: "t2",
            name: "Complete Blood Count (CBC)",
            result: "Leukocytes (WBC): 14.5 x 10^9/L (Elevated). Neutrophil dominance.",
            isRelevant: true,
            cost: "Low"
        },
        {
            id: "t3",
            name: "Abdominal Ultrasound",
            result: "Enlarged, non-compressible appendix with a diameter of 8mm. Surrounding fluid present.",
            isRelevant: true,
            cost: "Medium"
        },
        {
            id: "t4",
            name: "Chest X-Ray",
            result: "Clear lung fields, no cardiomegaly. Normal.",
            isRelevant: false,
            cost: "Low"
        },
        {
            id: "t5",
            name: "Urinalysis",
            result: "Normal. No erythrocytes, leukocytes, or bacteria.",
            isRelevant: true, // Relevant to rule out kidney stones / UTI
            cost: "Low"
        },
        {
            id: "t6",
            name: "Brain MRI",
            result: "Normal brain parenchyma. No acute pathology.",
            isRelevant: false,
            cost: "Very High"
        }
    ],
    diagnosisObj: {
        correctDiagnoses: ["acute appendicitis", "appendicitis"],
        feedbackSuccess: "Excellent work! The clinical presentation of migrating pain to the RLQ, nausea, fever (likely), elevated WBC, and ultrasound findings solidly point to acute appendicitis.",
        feedbackFailure: "That is not quite right. Based on the progression of periumbilical pain to the right lower quadrant, localized tenderness, and leukocytosis, the most likely diagnosis is Acute Appendicitis."
    }
};

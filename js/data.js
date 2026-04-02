const clinicalCases = [
    {
        // Case 1: Acute Appendicitis
        patientInfo: { name: "Max Mustermann", age: 24, gender: "Male" },
        intro: "A 24-year-old male presents to the emergency department complaining of abdominal pain that started this morning.",
        anamnesis: [
            { id: "q1", text: "Where exactly is the pain located and has it moved?", result: "It started around my belly button this morning, but now it has moved down to the lower right side.", isRelevant: true },
            { id: "q2", text: "Can you describe the type of pain?", result: "It's a constant, sharp pain. It gets worse when I move or cough.", isRelevant: true },
            { id: "q3", text: "Have you experienced any nausea or vomiting?", result: "Yes, I completely lost my appetite and threw up once.", isRelevant: true },
            { id: "q4", text: "Have you travelled abroad recently?", result: "No, I haven't left the country in the last year.", isRelevant: false },
            { id: "q5", text: "Do you have any pain when urinating?", result: "No, passing urine is completely normal.", isRelevant: true },
            { id: "q6", text: "Do you have any family history of heart disease?", result: "My grandfather had a heart attack at 70.", isRelevant: false }
        ],
        diagnostics: [
            { id: "t1", name: "Physical Examination (Abdomen)", result: "Tenderness in the right lower quadrant (McBurney's point). Positive rebound tenderness.", isRelevant: true, cost: "Low" },
            { id: "t2", name: "Complete Blood Count (CBC)", result: "Leukocytes: 14.5 x 10^9/L (Elevated). Neutrophil dominance.", isRelevant: true, cost: "Low" },
            { id: "t3", name: "Abdominal Ultrasound", result: "Enlarged, non-compressible appendix with a diameter of 8mm.", isRelevant: true, cost: "Medium" },
            { id: "t4", name: "Chest X-Ray", result: "Clear lung fields. Normal.", isRelevant: false, cost: "Low" },
            { id: "t5", name: "Urinalysis", result: "Normal. To rule out UTI.", isRelevant: true, cost: "Low" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["acute appendicitis", "appendicitis"],
            feedbackSuccess: "Excellent! The migrating pain to the RLQ, nausea, leukocytosis, and ultrasound findings point directly to acute appendicitis.",
            feedbackFailure: "Incorrect. The migration of pain to the RLQ and localized tenderness strongly suggest appendicitis."
        }
    },
    {
        // Case 2: Acute Cholecystitis
        patientInfo: { name: "Maria Schmidt", age: 45, gender: "Female" },
        intro: "A 45-year-old female arrives complaining of severe right-sided abdominal pain that started after dinner.",
        anamnesis: [
            { id: "q1", text: "Can you describe the pain and where it is located?", result: "It is a severe, crampy pain in my upper right abdomen. It radiates to my right shoulder.", isRelevant: true },
            { id: "q2", text: "Did the pain start after eating?", result: "Yes, about an hour after eating a heavy, greasy fast-food meal.", isRelevant: true },
            { id: "q3", text: "Do you have any fever or nausea?", result: "Yes, I feel nauseous and my husband said I feel warm.", isRelevant: true },
            { id: "q4", text: "Do you have difficulty breathing?", result: "No, breathing is fine.", isRelevant: false },
            { id: "q5", text: "Have you ever had pain like this before?", result: "I had milder versions of this after heavy meals, but they always went away.", isRelevant: true }
        ],
        diagnostics: [
            { id: "t1", name: "Physical Examination (Abdomen)", result: "Tenderness in the right upper quadrant. Positive Murphy's sign.", isRelevant: true, cost: "Low" },
            { id: "t2", name: "Complete Blood Count (CBC)", result: "Leukocytes (WBC): 12.0 x 10^9/L (Slightly Elevated).", isRelevant: true, cost: "Low" },
            { id: "t3", name: "Abdominal Ultrasound", result: "Gallbladder wall thickening (5mm) and pericholecystic fluid. Multiple gallstones visible.", isRelevant: true, cost: "Medium" },
            { id: "t4", name: "Brain MRI", result: "Normal.", isRelevant: false, cost: "High" },
            { id: "t5", name: "Liver Function Tests (LFTs)", result: "Mild elevation of AST and ALT.", isRelevant: true, cost: "Low" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["acute cholecystitis", "cholecystitis", "gallstones", "gallstone disease"],
            feedbackSuccess: "Spot on! The RUQ pain radiating to the shoulder, positive Murphy's sign, and ultrasound showing gallstones confirm acute cholecystitis.",
            feedbackFailure: "Incorrect. The relationship with a fatty meal, RUQ pain, and ultrasound findings suggest symptomatic gallstones/cholecystitis."
        }
    },
    {
        // Case 3: Myocardial Infarction
        patientInfo: { name: "Hans Bauer", age: 62, gender: "Male" },
        intro: "A 62-year-old male is brought in by his wife due to sudden chest pain and shortness of breath.",
        anamnesis: [
            { id: "q1", text: "Where is the pain and what does it feel like?", result: "It's like an elephant is sitting on the middle of my chest. It goes down my left arm.", isRelevant: true },
            { id: "q2", text: "When did it start and what were you doing?", result: "It started suddenly while I was shoveling snow about 30 minutes ago.", isRelevant: true },
            { id: "q3", text: "Are you sweating or feeling nauseous?", result: "Yes, I'm drenched in cold sweat and feel a bit sick to my stomach.", isRelevant: true },
            { id: "q4", text: "Does the pain get worse if I press on your chest?", result: "No, pressing on it doesn't change anything.", isRelevant: true },
            { id: "q5", text: "Do you have any history of asthma?", result: "No, never.", isRelevant: false }
        ],
        diagnostics: [
            { id: "t1", name: "12-Lead Electrocardiogram (ECG)", result: "ST-segment elevations in leads V2-V4 (Anterior wall ischemia).", isRelevant: true, cost: "Low" },
            { id: "t2", name: "Cardiac Troponin Test", result: "Highly elevated.", isRelevant: true, cost: "Low" },
            { id: "t3", name: "Physical Examination (Chest)", result: "No reproducible tenderness on palpation of chest wall. Diaphoretic.", isRelevant: true, cost: "Low" },
            { id: "t4", name: "Abdominal Ultrasound", result: "Normal.", isRelevant: false, cost: "Medium" },
            { id: "t5", name: "Urinalysis", result: "Normal.", isRelevant: false, cost: "Low" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["myocardial infarction", "heart attack", "stemi", "acute myocardial infarction"],
            feedbackSuccess: "Excellent! The crushing chest pain radiating to the arm, diaphoretic state, and ST elevations on the ECG conclusively point to a STEMI (Myocardial Infarction). Time is muscle!",
            feedbackFailure: "Not quite. The radiating crushing chest pain, lack of reproducible pain on palpation, and ECG findings indicate a Heart Attack (Myocardial Infarction)."
        }
    },
    {
        // Case 4: Peptic Ulcer Disease
        patientInfo: { name: "Julia Fischer", age: 35, gender: "Female" },
        intro: "A 35-year-old female presents with recurrent upper abdominal burning.",
        anamnesis: [
            { id: "q1", text: "Where exactly is the pain and how does it feel?", result: "It's a burning ache right below my breastbone (epigastric).", isRelevant: true },
            { id: "q2", text: "Is the pain affected by meals?", result: "Actually yes, it usually gets much better right after I eat, but comes back a few hours later.", isRelevant: true },
            { id: "q3", text: "Have you noticed any black or bloody stools?", result: "No, my bowel movements look normal.", isRelevant: true },
            { id: "q4", text: "Do you take any pain relievers frequently?", result: "Yes, I take Ibuprofen almost daily for my back pain.", isRelevant: true },
            { id: "q5", text: "Do you have a history of heart problems?", result: "No.", isRelevant: false }
        ],
        diagnostics: [
            { id: "t1", name: "Upper Endoscopy", result: "Visualization of a 1.5 cm ulcer in the duodenal bulb without active bleeding.", isRelevant: true, cost: "High" },
            { id: "t2", name: "H. pylori breath test", result: "Positive carbon isotope detection.", isRelevant: true, cost: "Medium" },
            { id: "t3", name: "Complete Blood Count (CBC)", result: "Normal hemoglobin levels (no severe bleeding).", isRelevant: true, cost: "Low" },
            { id: "t4", name: "Brain CT Scanner", result: "Normal", isRelevant: false, cost: "High" },
            { id: "t5", name: "Physical Examination", result: "Mild epigastric tenderness.", isRelevant: true, cost: "Low" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["peptic ulcer", "peptic ulcer disease", "duodenal ulcer", "ulcer"],
            feedbackSuccess: "Correct! The pain relieved by eating and exacerbated by NSAIDs is classic for Peptic Ulcer Disease, confirmed by endoscopy.",
            feedbackFailure: "Incorrect. The chronic NSAID use, burning upper abdominal pain relieved by eating, and endoscopic findings denote a Peptic Ulcer."
        }
    },
    {
        // Case 5: Acute Pancreatitis
        patientInfo: { name: "Robert Weber", age: 50, gender: "Male" },
        intro: "A 50-year-old male with a history of alcohol abuse presents with severe abdominal pain.",
        anamnesis: [
            { id: "q1", text: "Can you describe the location and nature of the pain?", result: "It's severe, steady pain in my upper stomach. It shoots straight through to my back.", isRelevant: true },
            { id: "q2", text: "Does anything make it better or worse?", result: "It gets slightly better when I lean forward. Laying flat on my back makes it unbearable.", isRelevant: true },
            { id: "q3", text: "Do you drink alcohol?", result: "Yes, I usually have about a six-pack of beer every day.", isRelevant: true },
            { id: "q4", text: "Have you been coughing up blood?", result: "No.", isRelevant: false },
            { id: "q5", text: "Are you experiencing nausea and vomiting?", result: "Yes, I have vomited multiple times today.", isRelevant: true }
        ],
        diagnostics: [
            { id: "t1", name: "Serum Lipase and Amylase", result: "Lipase is remarkably elevated at 2,400 U/L (highly predictive).", isRelevant: true, cost: "Low" },
            { id: "t2", name: "Abdominal CT Scan", result: "Enlarged pancreas with peripancreatic fluid, indicating inflammation. No pseudocyst.", isRelevant: true, cost: "Medium" },
            { id: "t3", name: "Liver Function Tests (LFTs)", result: "Slightly elevated, but no severe derangement.", isRelevant: true, cost: "Low" },
            { id: "t4", name: "Electrocardiogram (ECG)", result: "Normal sinus rhythm.", isRelevant: false, cost: "Low" },
            { id: "t5", name: "Physical Exam", result: "Epigastric tenderness on palpation. Heart rate 110 bpm.", isRelevant: true, cost: "Low" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["acute pancreatitis", "pancreatitis"],
            feedbackSuccess: "Excellent reasoning. The radiating epigastric pain piercing to the back, alcohol history, and heavily elevated lipase levels diagnose Acute Pancreatitis.",
            feedbackFailure: "Not quite. Check the lipase levels. The combination of radiating epigastric pain, alcohol consumption and fluid around the pancreas is classic for Pancreatitis."
        }
    },
    {
        // Case 6: Nephrolithiasis (Kidney Stones)
        patientInfo: { name: "Stefan Hoffmann", age: 38, gender: "Male" },
        intro: "A 38-year-old male presents in extreme agony, constantly writing on the bed unable to find a comfortable position.",
        anamnesis: [
            { id: "q1", text: "Where is the pain located?", result: "It's in my right side and lower back (flank) and radiates down into my groin area.", isRelevant: true },
            { id: "q2", text: "How would you rate the pain?", result: "It's 10/10. The worst pain I've ever felt. It comes in intense waves.", isRelevant: true },
            { id: "q3", text: "Have you noticed any changes in your urine?", result: "Yes, it looked a bit red or pink earlier today.", isRelevant: true },
            { id: "q4", text: "Did you hit your back recently?", result: "No trauma at all.", isRelevant: true },
            { id: "q5", text: "Have you lost vision?", result: "No.", isRelevant: false }
        ],
        diagnostics: [
            { id: "t1", name: "Urinalysis", result: "Microscopic hematuria (blood in urine). No bacteria.", isRelevant: true, cost: "Low" },
            { id: "t2", name: "Non-contrast CT Abdomen/Pelvis", result: "A 4mm radiopaque calcification seen in the right proximal ureter. Mild hydronephrosis.", isRelevant: true, cost: "Medium" },
            { id: "t3", name: "Physical Exam", result: "Right Costovertebral Angle (CVA) tenderness. Patient cannot sit still.", isRelevant: true, cost: "Low" },
            { id: "t4", name: "Chest X-Ray", result: "Clear.", isRelevant: false, cost: "Low" },
            { id: "t5", name: "Liver Function Tests (LFTs)", result: "Normal.", isRelevant: false, cost: "Low" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["kidney stones", "kidney stone", "nephrolithiasis", "renal colic", "ureteral calculus"],
            feedbackSuccess: "Spot on! The colicky flank-to-groin pain, patient writhing in pain, hematuria, and CT findings are definitive for Nephrolithiasis (Kidney Stone).",
            feedbackFailure: "Incorrect. The wave-like radiating flank pain, inability to find a comfortable position, hematuria, and stone found on the CT clearly signify Kidney Stones (Renal Colic)."
        }
    },
    {
        // Case 7: Pulmonary Embolism
        patientInfo: { name: "Anna Meyer", age: 65, gender: "Female" },
        intro: "A 65-year-old female presents with sudden onset of shortness of breath and chest pain.",
        anamnesis: [
            { id: "q1", text: "When did the chest pain start and what is it like?", result: "It started suddenly today. It feels sharp and gets worse when I take a deep breath in.", isRelevant: true },
            { id: "q2", text: "Have you been immobilized lately?", result: "Yes, I just got back from a 12-hour long-haul flight from Asia two days ago.", isRelevant: true },
            { id: "q3", text: "Do you have any leg pain or swelling?", result: "Actually, my left calf feels a bit warm and swollen since yesterday.", isRelevant: true },
            { id: "q4", text: "Do you have any indigestion?", result: "No, stomach is fine.", isRelevant: false },
            { id: "q5", text: "Have you had a fever or cough?", result: "No fever. I have a slight dry cough, but no phlegm.", isRelevant: true }
        ],
        diagnostics: [
            { id: "t1", name: "D-Dimer Test", result: "Highly elevated (>2000 ng/mL).", isRelevant: true, cost: "Low" },
            { id: "t2", name: "CT Pulmonary Angiography (CTPA)", result: "Filling defect in the right lower lobe pulmonary artery branch.", isRelevant: true, cost: "High" },
            { id: "t3", name: "Doppler Ultrasound (Legs)", result: "Thrombus visualized in the left deep popliteal vein (DVT).", isRelevant: true, cost: "Medium" },
            { id: "t4", name: "12-Lead ECG", result: "Sinus tachycardia. Occasional S1Q3T3 pattern.", isRelevant: true, cost: "Low" },
            { id: "t5", name: "Endoscopy", result: "Normal stomach lining.", isRelevant: false, cost: "High" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["pulmonary embolism", "pe", "thromboembolism"],
            feedbackSuccess: "Perfect! The sudden pleuritic chest pain, history of long travel, swelling in the calf (DVT), and CTPA findings confirm a Pulmonary Embolism.",
            feedbackFailure: "Incorrect. The triad of long travel history, DVT leg swelling, and sudden pleuritic chest breathlessness indicates a Pulmonary Embolism."
        }
    },
    {
        // Case 8: Ectopic Pregnancy
        patientInfo: { name: "Lisa Wagner", age: 28, gender: "Female" },
        intro: "A 28-year-old female presents to the emergency room with sharp lower abdominal pain and mild vaginal spotting.",
        anamnesis: [
            { id: "q1", text: "When was your last menstrual cycle?", result: "It was about 6 weeks ago. I think I might be pregnant.", isRelevant: true },
            { id: "q2", text: "Can you describe the pain?", result: "It's a very sharp, stabbing pain localized to my right lower pelvis. I feel lightheaded.", isRelevant: true },
            { id: "q3", text: "Have you noticed any bleeding?", result: "Yes, there is some mild vaginal spotting.", isRelevant: true },
            { id: "q4", text: "Do you have a history of pelvic inflammatory disease (PID)?", result: "Yes, I was treated for it a few years ago.", isRelevant: true },
            { id: "q5", text: "Does it hurt when you cough?", result: "Not specifically, but standing up dizzy makes it worse.", isRelevant: false }
        ],
        diagnostics: [
            { id: "t1", name: "Urine Pregnancy Test (hCG)", result: "Positive.", isRelevant: true, cost: "Low" },
            { id: "t2", name: "Transvaginal Ultrasound", result: "Empty uterus. Complex adnexal mass in the right fallopian tube and free fluid in the pelvis.", isRelevant: true, cost: "Medium" },
            { id: "t3", name: "Serum quantitative bhCG", result: "3,500 mIU/mL.", isRelevant: true, cost: "Low" },
            { id: "t4", name: "Chest X-Ray", result: "Normal.", isRelevant: false, cost: "Low" },
            { id: "t5", name: "Physical Exam", result: "Adnexal tenderness on the right side. Cervical motion tenderness.", isRelevant: true, cost: "Low" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["ectopic pregnancy", "tubal pregnancy"],
            feedbackSuccess: "Outstanding! A positive pregnancy test with an empty uterus on ultrasound and an adnexal mass points definitively to a ruptured Ectopic Pregnancy.",
            feedbackFailure: "Incorrect. The combination of a missed period, positive hCG, spotting, lower abdominal pain, and an empty uterus on ultrasound defines an Ectopic Pregnancy."
        }
    },
    {
        // Case 9: Pneumonia
        patientInfo: { name: "Erkan Yilmaz", age: 72, gender: "Male" },
        intro: "A 72-year-old male is brought in from his nursing home with fever, confusion, and a productive cough.",
        anamnesis: [
            { id: "q1", text: "How long have you had the cough and what do you cough up?", result: "About 4 days. I'm coughing up thick, yellowish-green phlegm.", isRelevant: true },
            { id: "q2", text: "Do you have a fever or chills?", result: "Yes, I've had shaking chills and sweat through my clothes at night.", isRelevant: true },
            { id: "q3", text: "Do you have any chest pain?", result: "My chest hurts only when I take a deep breath or cough.", isRelevant: true },
            { id: "q4", text: "Have you lost your sense of taste or smell?", result: "No.", isRelevant: false },
            { id: "q5", text: "Do you have pain urinating?", result: "No.", isRelevant: false }
        ],
        diagnostics: [
            { id: "t1", name: "Physical Exam (Lungs)", result: "Crackles/rales heard in the left lower lung base. Dullness to percussion.", isRelevant: true, cost: "Low" },
            { id: "t2", name: "Chest X-Ray", result: "Lobar consolidation in the left lower lobe.", isRelevant: true, cost: "Low" },
            { id: "t3", name: "Complete Blood Count (CBC)", result: "Leukocytes: 16.5 x 10^9/L (Significantly elevated).", isRelevant: true, cost: "Low" },
            { id: "t4", name: "Sputum Culture", result: "Positive for Streptococcus pneumoniae.", isRelevant: true, cost: "Medium" },
            { id: "t5", name: "Head CT Scan", result: "No acute findings. Confusion likely due to infection/hypoxia.", isRelevant: false, cost: "High" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["pneumonia", "bacterial pneumonia", "strep pneumonia"],
            feedbackSuccess: "Great job! Productive cough, fever, localized crackles, and X-ray consolidation make Bacterial Pneumonia the obvious diagnosis.",
            feedbackFailure: "Not correct. The fever, productive cough, leukocytosis, and left lower lobe consolidation on the X-ray point securely to Pneumonia."
        }
    },
    {
        // Case 10: GERD (Gastroesophageal Reflux Disease)
        patientInfo: { name: "Sophie Becker", age: 41, gender: "Female" },
        intro: "A 41-year-old female visits complaining of frequent burning in her chest after meals.",
        anamnesis: [
            { id: "q1", text: "Where is the burning and when does it happen?", result: "Right behind my breastbone. It usually happens after eating spicy food or drinking coffee.", isRelevant: true },
            { id: "q2", text: "Does body position affect it?", result: "Yes, it's terrible when I lie down to sleep at night. I have to prop myself up.", isRelevant: true },
            { id: "q3", text: "Do you have any trouble swallowing or weight loss?", result: "No, swallowing is fine and my weight has been stable.", isRelevant: true },
            { id: "q4", text: "Any shortness of breath or sweating?", result: "No, breathing is fine. Just the burning sensation.", isRelevant: true },
            { id: "q5", text: "Do you experience headaches?", result: "Occasionally, but not right now.", isRelevant: false }
        ],
        diagnostics: [
            { id: "t1", name: "Physical Exam", result: "Normal. No abdominal tenderness, normal heart sounds.", isRelevant: true, cost: "Low" },
            { id: "t2", name: "12-Lead ECG", result: "Normal sinus rhythm. (Done to rule out atypical cardiac ischemia).", isRelevant: true, cost: "Low" },
            { id: "t3", name: "Empiric trial of PPI (Omeprazole)", result: "Symptoms completely resolved after 2 weeks of use.", isRelevant: true, cost: "Low" },
            { id: "t4", name: "Upper Endoscopy", result: "Mild irritation of the lower esophagus. No ulcers or malignancy.", isRelevant: true, cost: "Medium" },
            { id: "t5", name: "Chest X-Ray", result: "Clear.", isRelevant: false, cost: "Low" }
        ],
        diagnosisObj: {
            correctDiagnoses: ["gerd", "gastroesophageal reflux disease", "acid reflux", "reflux"],
            feedbackSuccess: "Spot on! Retrosternal burning after meals, worse on lying down, that improves with a PPI is classic Gastroesophageal Reflux Disease (GERD).",
            feedbackFailure: "Incorrect. The burning chest pain after spicy meals, exacerbated by lying flat, and resolving with PPIs is typical of Gastroesophageal Reflux Disease (GERD)."
        }
    }
];

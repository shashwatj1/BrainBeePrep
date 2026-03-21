// Brain Bee Study App - Disease Library
// Based on Brain Facts book (8th Edition)

export const diseases = [
  // ============================================================
  // NEURODEGENERATIVE DISEASES (Chapter 15)
  // ============================================================
  {
    id: 'alzheimers',
    name: "Alzheimer's Disease",
    category: 'neurodegenerative',
    chapter: 15,
    icon: '\u{1F9E9}',
    whatIsIt:
      "Alzheimer's disease is the most common neurodegenerative disorder and the leading cause of dementia. It is a progressive brain disease that slowly destroys memory, thinking skills, and eventually the ability to carry out simple tasks. It affects approximately 5.7 million Americans. The disease typically begins with mild memory loss and gradually worsens over years, ultimately becoming fatal as it disrupts vital body functions.",
    symptoms: [
      'Memory loss, especially of recent events',
      'Difficulty planning or solving problems',
      'Confusion with time or place',
      'Trouble understanding visual and spatial relationships',
      'Problems with words in speaking or writing',
      'Misplacing things and inability to retrace steps',
      'Decreased or poor judgment',
      'Withdrawal from work or social activities',
      'Changes in mood and personality',
    ],
    causes:
      "Alzheimer's is caused by the abnormal accumulation of two proteins in the brain: amyloid-beta, which forms sticky plaques outside neurons, and tau, which forms neurofibrillary tangles inside neurons. These plaques and tangles disrupt cell-to-cell communication and trigger inflammation, ultimately causing neurons to die. The APOE4 gene variant is the strongest known genetic risk factor for late-onset Alzheimer's. Age is the greatest overall risk factor. Both genetic and environmental factors contribute to disease development.",
    brainChanges:
      "The disease first attacks the hippocampus, the brain region critical for forming new memories, which is why memory loss is the earliest symptom. As the disease progresses, it spreads to other cortical areas, affecting language, reasoning, and behavior. The brain physically shrinks as neurons die, with the cortex shriveling and ventricles enlarging. There is a dramatic loss of synapses and a significant reduction in acetylcholine, a neurotransmitter important for memory and learning.",
    treatments:
      "Current treatments include acetylcholinesterase inhibitors such as donepezil (Aricept), which boost levels of acetylcholine in the brain by preventing its breakdown. These medications can help manage symptoms temporarily but do not stop or reverse the disease. Memantine, which regulates glutamate activity, is used for moderate-to-severe stages. No cure currently exists, and research is actively pursuing therapies that target amyloid plaques and tau tangles.",
    keyFacts: [
      'Most common neurodegenerative disease, affecting ~5.7 million Americans',
      'Characterized by amyloid-beta plaques and neurofibrillary tau tangles',
      'Hippocampus is affected first, causing early memory loss',
      'APOE4 gene is the strongest genetic risk factor for late-onset form',
      'Acetylcholinesterase inhibitors like donepezil are used for treatment',
    ],
  },

  {
    id: 'parkinsons',
    name: "Parkinson's Disease",
    category: 'neurodegenerative',
    chapter: 15,
    icon: '\u{1F932}',
    whatIsIt:
      "Parkinson's disease is a progressive neurodegenerative disorder that primarily affects movement. It results from the death of dopamine-producing neurons in a brain region called the substantia nigra, which is part of the basal ganglia circuitry that controls smooth, coordinated movement. As dopamine levels drop, patients lose the ability to control their movements normally. The disease typically develops gradually, often starting with a barely noticeable tremor in one hand.",
    symptoms: [
      'Resting tremor, often starting in one hand',
      'Rigidity or stiffness of muscles',
      'Bradykinesia (slowness of movement)',
      'Postural instability and balance problems',
      'Shuffling gait and difficulty walking',
      'Reduced facial expression (mask-like face)',
      'Soft or slurred speech',
      'Sleep disturbances',
      'Depression and anxiety',
    ],
    causes:
      "Parkinson's disease is caused by the progressive death of dopamine neurons in the substantia nigra. The protein alpha-synuclein misfolds and aggregates to form clumps called Lewy bodies inside neurons, which are a hallmark of the disease. These Lewy bodies are thought to be toxic to cells. Most cases are sporadic with no clear single cause, though both genetic susceptibility and environmental factors play roles. Exposure to certain pesticides and head injuries may increase risk.",
    brainChanges:
      "The substantia nigra, a dark-pigmented region in the midbrain, loses its dopamine-producing neurons. By the time motor symptoms appear, approximately 60-80% of these neurons have already been lost. The accumulation of alpha-synuclein into Lewy bodies disrupts normal cell function. The loss of dopamine disrupts the basal ganglia circuit, which normally helps initiate and smooth out voluntary movements. This imbalance leads to the characteristic motor symptoms.",
    treatments:
      "L-dopa (levodopa) is the primary and most effective treatment. It is a precursor to dopamine that can cross the blood-brain barrier and be converted into dopamine in the brain, compensating for the lost dopamine neurons. It is usually given with carbidopa to prevent premature conversion outside the brain. Deep brain stimulation (DBS) is a surgical option where electrodes implanted in the brain deliver electrical pulses to reduce symptoms. Dopamine agonists and MAO-B inhibitors are also used. None of these treatments stop disease progression.",
    keyFacts: [
      'Caused by death of dopamine neurons in the substantia nigra',
      'Cardinal motor symptoms: tremor, rigidity, bradykinesia, balance problems',
      'Alpha-synuclein protein aggregates form Lewy bodies in neurons',
      'L-dopa (levodopa) is the primary treatment, converted to dopamine in the brain',
      'Deep brain stimulation (DBS) is a surgical treatment option',
    ],
  },

  {
    id: 'als',
    name: 'ALS (Lou Gehrig\'s Disease)',
    category: 'neurodegenerative',
    chapter: 15,
    icon: '\u{1F9BE}',
    whatIsIt:
      "Amyotrophic lateral sclerosis (ALS), also known as Lou Gehrig's disease, is a progressive neurodegenerative disease that attacks motor neurons - the nerve cells in the brain and spinal cord that control voluntary muscle movement. As motor neurons die, the brain loses the ability to send signals to muscles, leading to progressive muscle weakness, paralysis, and eventually death, typically within 3-5 years of diagnosis. The mind usually remains sharp even as the body fails.",
    symptoms: [
      'Muscle weakness, often starting in hands or feet',
      'Muscle twitching and cramping',
      'Difficulty speaking, swallowing, and breathing',
      'Tripping and falling',
      'Dropping things',
      'Progressive paralysis',
      'Eventually inability to breathe without support',
    ],
    causes:
      "Most cases of ALS are sporadic, meaning they occur without a clear family history. About 10% of cases are familial (inherited). Mutations in the SOD1 gene were among the first genetic links identified. More recently, mutations in the C9ORF72 gene have been found to be the most common genetic cause of both familial ALS and some sporadic cases. The exact mechanism of motor neuron death is not fully understood but may involve oxidative stress, protein aggregation, and glutamate toxicity.",
    brainChanges:
      "ALS selectively destroys both upper motor neurons in the motor cortex and lower motor neurons in the brainstem and spinal cord. As these neurons die, they can no longer send messages to muscles. The muscles gradually weaken, waste away (atrophy), and twitch (fasciculate). The disease spreads from one region to others as more motor neurons are affected. Sensory neurons and cognition are generally spared.",
    treatments:
      "There is no cure for ALS. Riluzole is a medication that can slow disease progression slightly by reducing glutamate levels. Treatment is primarily supportive, focusing on managing symptoms, maintaining quality of life, and using assistive devices for breathing, communication, and mobility. The Ice Bucket Challenge significantly raised public awareness and research funding for the disease.",
    keyFacts: [
      'Progressive death of both upper and lower motor neurons',
      'About 90% sporadic, ~10% familial (inherited)',
      'SOD1 and C9ORF72 gene mutations are linked to familial cases',
      'Riluzole can slow progression slightly but there is no cure',
      'Ice Bucket Challenge raised significant awareness and funding',
    ],
  },

  {
    id: 'multiple-sclerosis',
    name: 'Multiple Sclerosis',
    category: 'neurodegenerative',
    chapter: 15,
    icon: '\u{1F9F5}',
    whatIsIt:
      "Multiple sclerosis (MS) is a chronic autoimmune disease in which the body's immune system mistakenly attacks the myelin sheath, the protective insulation that surrounds nerve fibers in the brain, spinal cord, and optic nerves. When myelin is damaged (demyelination), nerve signals slow down or are blocked entirely, causing a wide range of neurological symptoms. The disease is called 'multiple sclerosis' because it causes multiple areas of scarring (sclerosis) in the nervous system.",
    symptoms: [
      'Vision problems (blurry vision, double vision, optic neuritis)',
      'Numbness or tingling in limbs',
      'Muscle weakness',
      'Extreme fatigue',
      'Difficulty with coordination and balance',
      'Muscle spasms and stiffness',
      'Cognitive difficulties',
      'Bladder and bowel problems',
    ],
    causes:
      "MS is an autoimmune disease where the immune system attacks the myelin sheath. The exact trigger is unknown, but it is thought to involve a combination of genetic susceptibility and environmental factors. It is more common in women than men. Risk factors may include low vitamin D levels, viral infections (such as Epstein-Barr virus), smoking, and living farther from the equator. It is not directly inherited, but having a family member with MS increases risk.",
    brainChanges:
      "The immune system's T cells cross the blood-brain barrier and attack myelin, the fatty insulation around axons produced by oligodendrocytes. This demyelination disrupts the ability of neurons to conduct electrical signals efficiently. Damaged areas form scar tissue (plaques or lesions) that can be seen on MRI scans. These lesions can occur throughout the brain, spinal cord, and optic nerves, which explains the wide variety of symptoms. Some remyelination can occur but is often incomplete.",
    treatments:
      "Several disease-modifying therapies are available that can reduce the frequency and severity of relapses and slow disease progression. The relapsing-remitting form is the most common type of MS and is most responsive to treatment. Treatments include interferon-beta, glatiramer acetate, and newer oral and infusion therapies. Corticosteroids are used to treat acute relapses. Physical therapy and symptom management are important components of care.",
    keyFacts: [
      'Autoimmune attack on the myelin sheath (demyelination)',
      'Affects the brain, spinal cord, and optic nerves',
      'Relapsing-remitting is the most common form',
      'More common in women than men',
      'Several disease-modifying therapies are available',
    ],
  },

  {
    id: 'huntingtons',
    name: "Huntington's Disease",
    category: 'neurodegenerative',
    chapter: 15,
    icon: '\u{1F9EC}',
    whatIsIt:
      "Huntington's disease is a fatal inherited neurodegenerative disorder caused by a specific genetic mutation. It is caused by an abnormal expansion of a CAG trinucleotide repeat in the huntingtin gene on chromosome 4. The disease causes progressive deterioration of movement, cognition, and psychiatric function. Because it is autosomal dominant, a child of an affected parent has a 50% chance of inheriting the disease. Symptoms typically appear between the ages of 30 and 50.",
    symptoms: [
      'Chorea (involuntary, jerky, dance-like movements)',
      'Difficulty walking and maintaining balance',
      'Cognitive decline and difficulty thinking',
      'Psychiatric symptoms (depression, irritability, anxiety)',
      'Personality changes',
      'Difficulty speaking and swallowing',
      'Weight loss',
      'Progressive dementia',
    ],
    causes:
      "Huntington's is caused by a CAG trinucleotide repeat expansion in the huntingtin gene. Normal individuals have fewer than 36 CAG repeats, while individuals with more than 36 repeats will develop the disease. The more repeats, the earlier the onset tends to be (a phenomenon called anticipation). The mutant huntingtin protein misfolds and forms toxic aggregates that damage neurons. The disease follows autosomal dominant inheritance, meaning only one copy of the mutated gene is needed.",
    brainChanges:
      "The disease primarily affects the basal ganglia, particularly the caudate nucleus and putamen (together called the striatum). The mutant huntingtin protein forms clumps inside neurons, eventually killing them. As the basal ganglia degenerate, patients lose the ability to control movements, leading to chorea. The disease also affects the cerebral cortex, contributing to cognitive decline. Over time, the brain undergoes significant atrophy.",
    treatments:
      "There is currently no cure for Huntington's disease and no treatment that can slow its progression. Management focuses on treating symptoms: tetrabenazine and deutetrabenazine can help control chorea; antidepressants and antipsychotics address psychiatric symptoms; physical therapy helps maintain mobility. A genetic test is available that can definitively determine whether someone carries the mutation, even before symptoms appear. This raises complex ethical considerations for at-risk individuals.",
    keyFacts: [
      'Caused by CAG trinucleotide repeat expansion in the huntingtin gene',
      'More than 36 CAG repeats causes disease; more repeats = earlier onset',
      'Primarily damages the basal ganglia (caudate and putamen)',
      'Chorea (involuntary movements) is a hallmark symptom',
      'Genetic test available; autosomal dominant inheritance (50% chance)',
    ],
  },

  // ============================================================
  // NEUROLOGICAL DISORDERS (Chapter 14)
  // ============================================================
  {
    id: 'epilepsy',
    name: 'Epilepsy',
    category: 'neurological',
    chapter: 14,
    icon: '\u{26A1}',
    whatIsIt:
      "Epilepsy is a neurological disorder characterized by recurring, unprovoked seizures caused by abnormal bursts of electrical activity in the brain. It affects approximately 1% of the population. Seizures occur when groups of neurons fire excessively and synchronously, disrupting normal brain function. Epilepsy is not a single disease but rather a group of disorders with many different causes and seizure types. It can develop at any age but most commonly begins in childhood or after age 60.",
    symptoms: [
      'Recurring seizures (the defining feature)',
      'Temporary confusion after a seizure',
      'Staring spells (absence seizures)',
      'Uncontrollable jerking of arms and legs (tonic-clonic seizures)',
      'Loss of consciousness or awareness',
      'Psychic symptoms (fear, anxiety, deja vu)',
      'Temporary loss of muscle control',
    ],
    causes:
      "Epilepsy can result from many different causes including genetic factors, brain injury, stroke, brain tumors, infections, and developmental abnormalities. In many cases, the exact cause is unknown (idiopathic epilepsy). Seizures reflect an imbalance between excitatory and inhibitory neurotransmission in the brain. Some forms of epilepsy run in families and involve mutations in ion channel genes, which affect how neurons fire.",
    brainChanges:
      "During a seizure, large groups of neurons fire in abnormal, excessive, and synchronized patterns. In focal (partial) seizures, this abnormal activity starts in one specific area of the brain and may or may not spread. In generalized seizures, abnormal activity involves both hemispheres from the beginning. Absence seizures involve brief lapses in consciousness, while tonic-clonic seizures (formerly called grand mal) involve loss of consciousness with violent muscle contractions. Repeated, prolonged seizures can damage neurons.",
    treatments:
      "Antiepileptic drugs (AEDs) can control seizures in the majority of patients. There are many different AEDs available, and the choice depends on seizure type and individual factors. For patients whose seizures are not controlled by medication, surgery to remove the seizure focus may be an option. The ketogenic diet (a high-fat, low-carbohydrate diet) has been shown to help control seizures in some children. Vagus nerve stimulation is another option for drug-resistant cases.",
    keyFacts: [
      'Recurring seizures caused by abnormal electrical activity in the brain',
      'Affects approximately 1% of the population',
      'Two main types: generalized (absence, tonic-clonic) and focal/partial',
      'Antiepileptic drugs control seizures in most patients',
      'Ketogenic diet can help some children with drug-resistant epilepsy',
    ],
  },

  {
    id: 'stroke',
    name: 'Stroke',
    category: 'injury',
    chapter: 14,
    icon: '\u{1FA78}',
    whatIsIt:
      "A stroke occurs when blood supply to a part of the brain is interrupted or severely reduced, depriving brain tissue of oxygen and nutrients. Within minutes, brain cells begin to die. There are two main types: ischemic stroke (about 87% of cases), where a blood clot blocks a blood vessel in the brain, and hemorrhagic stroke, where a blood vessel in the brain ruptures and bleeds. Stroke is a leading cause of death and long-term disability. Quick treatment is essential, captured by the phrase 'Time is Brain.'",
    symptoms: [
      'Sudden numbness or weakness, especially on one side of the body',
      'Sudden confusion or trouble speaking',
      'Sudden vision problems in one or both eyes',
      'Sudden severe headache with no known cause',
      'Sudden difficulty walking, dizziness, or loss of coordination',
      'Symptoms depend on which brain area is affected',
    ],
    causes:
      "Ischemic strokes are caused by blood clots that block arteries supplying the brain. These clots can form in the brain's blood vessels (thrombotic stroke) or travel from elsewhere in the body, often the heart (embolic stroke). Hemorrhagic strokes occur when a weakened blood vessel ruptures, often due to high blood pressure or aneurysms. Risk factors include high blood pressure, diabetes, high cholesterol, smoking, obesity, heart disease, and atrial fibrillation.",
    brainChanges:
      "When blood flow is cut off, neurons in the affected area are deprived of oxygen and glucose and begin to die within minutes. The area of dead tissue is called an infarct. Surrounding the infarct is a region called the penumbra, where cells are damaged but not yet dead - this is the target for emergency treatment. The specific neurological deficits depend on which brain region is affected. For example, a stroke in the left hemisphere may cause language problems, while one in the motor cortex causes paralysis.",
    treatments:
      "For ischemic stroke, tPA (tissue plasminogen activator) is a clot-dissolving drug that can restore blood flow if given within a few hours of symptom onset. Mechanical thrombectomy can physically remove large clots. Time is critical - every minute of delay means more brain cells die, hence the saying 'Time is Brain.' Hemorrhagic strokes may require surgery to stop bleeding. Rehabilitation including physical, occupational, and speech therapy is essential for recovery. The brain can partially compensate through neuroplasticity.",
    keyFacts: [
      'Ischemic strokes (~87% of cases) caused by blood clots; hemorrhagic by vessel rupture',
      'tPA (tissue plasminogen activator) can dissolve clots in ischemic stroke',
      'Must be treated rapidly - "Time is Brain"',
      'Deficits depend on which brain area loses blood supply',
      'Rehabilitation relies on neuroplasticity for recovery',
    ],
  },

  {
    id: 'tbi-concussion',
    name: 'TBI / Concussion',
    category: 'injury',
    chapter: 14,
    icon: '\u{1F6D1}',
    whatIsIt:
      "Traumatic brain injury (TBI) results from an external mechanical force to the head that disrupts normal brain function. TBI ranges from mild (concussion) to severe. A concussion is a mild TBI caused by a bump, blow, or jolt to the head that temporarily affects how the brain works. Repeated concussions, especially common in contact sports, can lead to chronic traumatic encephalopathy (CTE), a progressive degenerative brain disease. TBI is a major cause of death and disability.",
    symptoms: [
      'Headache',
      'Confusion and disorientation',
      'Memory problems, especially around the event',
      'Dizziness and balance problems',
      'Nausea or vomiting',
      'Sensitivity to light and noise',
      'Mood changes, irritability',
      'Sleep disturbances',
      'In severe cases: prolonged unconsciousness or coma',
    ],
    causes:
      "TBI is caused by an external force applied to the head, such as from falls, vehicle accidents, sports injuries, or blasts. The brain, which floats in cerebrospinal fluid inside the skull, can be bruised when it strikes the inside of the skull (coup-contrecoup injury). The force can also stretch and tear axons (diffuse axonal injury), damage blood vessels causing bleeding, and trigger swelling. Repeated mild TBIs (concussions) are of particular concern in contact sports like football.",
    brainChanges:
      "TBI can cause bruising (contusion) of brain tissue, tearing of nerve fibers (diffuse axonal injury), and bleeding (hemorrhage). The initial impact causes primary injury, followed by secondary injury from swelling, inflammation, and chemical changes that can worsen damage over hours and days. Repeated concussions can lead to CTE, characterized by accumulation of abnormal tau protein, brain atrophy, and progressive cognitive and behavioral decline seen in some athletes.",
    treatments:
      "Mild TBI (concussion) is treated primarily with rest, both physical and cognitive, to allow the brain to heal. Severe TBI may require emergency surgery to reduce pressure, remove blood clots, or repair skull fractures. Rehabilitation is critical for moderate-to-severe cases and may include physical, occupational, and speech therapy. There is growing emphasis on prevention through helmets and rule changes in sports. Return-to-play protocols are important after sports concussions.",
    keyFacts: [
      'Concussion is a mild TBI caused by external force to the head',
      'Can cause bruising, bleeding, and axonal shearing in the brain',
      'Repeated concussions can lead to CTE (chronic traumatic encephalopathy)',
      'CTE involves abnormal tau protein buildup, seen in contact sport athletes',
      'Rest is the primary treatment for concussion; severe TBI may need surgery',
    ],
  },

  {
    id: 'brain-tumors',
    name: 'Brain Tumors',
    category: 'injury',
    chapter: 14,
    icon: '\u{1F9E0}',
    whatIsIt:
      "Brain tumors are abnormal growths of cells within the brain or surrounding membranes. They can be primary (originating in the brain) or metastatic (spreading from cancer elsewhere in the body). Primary brain tumors are classified by the type of cell they arise from. Gliomas arise from glial cells and include glioblastoma, the most common malignant brain tumor. Meningiomas arise from the meninges and are the most common primary brain tumor overall, but they are usually benign.",
    symptoms: [
      'Headaches, often worse in the morning',
      'Seizures',
      'Nausea and vomiting',
      'Vision or hearing changes',
      'Personality or behavior changes',
      'Difficulty with balance or coordination',
      'Speech problems',
      'Cognitive difficulties',
      'Symptoms vary based on tumor location',
    ],
    causes:
      "The causes of most brain tumors are not well understood. They result from abnormal cell growth where cells multiply uncontrollably. Risk factors may include exposure to ionizing radiation and certain genetic conditions. Most brain tumors are not inherited. Gliomas arise from the uncontrolled growth of glial cells (astrocytes, oligodendrocytes, or ependymal cells). The tumor's location, size, and growth rate determine the symptoms and prognosis.",
    brainChanges:
      "Brain tumors cause damage by compressing surrounding brain tissue as they grow, increasing pressure inside the skull, and infiltrating and destroying normal brain tissue. They can also disrupt blood supply and cause swelling (edema). Glioblastoma is particularly aggressive because its cells infiltrate surrounding brain tissue, making complete surgical removal difficult. Meningiomas grow from the meninges and compress the brain from outside but generally do not invade brain tissue.",
    treatments:
      "Treatment depends on tumor type, location, and grade. Surgery aims to remove as much tumor as possible while preserving brain function. Radiation therapy uses high-energy beams to kill cancer cells. Chemotherapy drugs like temozolomide are used for certain gliomas. Targeted therapies that attack specific molecular features of tumor cells are an area of active research. For benign meningiomas, observation or surgery may be appropriate.",
    keyFacts: [
      'Gliomas arise from glial cells; glioblastoma is the most common malignant type',
      'Meningioma is the most common primary brain tumor and is usually benign',
      'Meningiomas arise from the meninges (brain coverings)',
      'Treatment includes surgery, radiation, chemotherapy, and targeted therapies',
      'Symptoms depend on the tumor location in the brain',
    ],
  },

  // ============================================================
  // PSYCHIATRIC / MENTAL HEALTH DISORDERS (Chapter 12)
  // ============================================================
  {
    id: 'schizophrenia',
    name: 'Schizophrenia',
    category: 'psychiatric',
    chapter: 12,
    icon: '\u{1F576}\u{FE0F}',
    whatIsIt:
      "Schizophrenia is a chronic and severe mental disorder that affects how a person thinks, feels, and behaves. It is characterized by psychosis, meaning patients may lose contact with reality. People with schizophrenia may experience hallucinations (usually hearing voices), delusions (false beliefs), disorganized thinking, flat or blunted emotions, and cognitive impairment. It affects approximately 1% of the population worldwide and typically has its onset in late teens to early 20s.",
    symptoms: [
      'Hallucinations (most commonly hearing voices)',
      'Delusions (false, fixed beliefs)',
      'Disorganized speech and thinking',
      'Flat or blunted emotional expression',
      'Social withdrawal and apathy',
      'Difficulty with attention and memory',
      'Impaired executive function',
      'Reduced motivation',
    ],
    causes:
      "Schizophrenia results from a complex interplay of genetic and environmental factors. It has a strong genetic component, with heritability estimates around 80%, but no single gene causes it - rather, many genes each contribute small effects. Environmental risk factors include prenatal infections, birth complications, childhood adversity, and cannabis use during adolescence. The dopamine hypothesis suggests that overactivity of dopamine signaling in certain brain pathways contributes to psychotic symptoms.",
    brainChanges:
      "Schizophrenia involves dysregulation of the dopamine system, particularly overactivity in the mesolimbic pathway (linked to positive symptoms like hallucinations) and underactivity in the mesocortical pathway (linked to negative symptoms and cognitive deficits). Brain imaging studies show enlarged ventricles and reduced gray matter volume, particularly in the prefrontal cortex and temporal lobe. There are also abnormalities in glutamate neurotransmission and disrupted connectivity between brain regions.",
    treatments:
      "Antipsychotic medications are the primary treatment. Typical (first-generation) antipsychotics like haloperidol primarily block dopamine D2 receptors and are effective against hallucinations and delusions but can cause movement side effects. Atypical (second-generation) antipsychotics like clozapine and risperidone also affect serotonin receptors and generally have fewer motor side effects. Psychosocial treatments, cognitive behavioral therapy, and supported employment programs are important complementary approaches.",
    keyFacts: [
      'Affects ~1% of the population; onset typically in late teens/early 20s',
      'Involves both positive symptoms (hallucinations, delusions) and negative symptoms (flat affect, withdrawal)',
      'Dopamine system dysregulation is central to the disease',
      'Both typical and atypical antipsychotic medications are used',
      'Strong genetic component with environmental triggers',
    ],
  },

  {
    id: 'major-depression',
    name: 'Major Depression',
    category: 'psychiatric',
    chapter: 12,
    icon: '\u{1F327}\u{FE0F}',
    whatIsIt:
      "Major depressive disorder (MDD) is more than just feeling sad. It is a serious medical condition characterized by persistent feelings of sadness, hopelessness, and loss of interest or pleasure in activities. It affects how a person thinks, feels, and handles daily activities. Depression can affect anyone regardless of age, gender, or background, though it is more common in women. It is one of the leading causes of disability worldwide.",
    symptoms: [
      'Persistent sadness, emptiness, or hopelessness',
      'Loss of interest or pleasure in activities once enjoyed',
      'Changes in appetite (weight loss or gain)',
      'Sleep disturbances (insomnia or oversleeping)',
      'Fatigue and loss of energy',
      'Feelings of worthlessness or excessive guilt',
      'Difficulty concentrating, thinking, or making decisions',
      'Restlessness or feeling slowed down',
      'Thoughts of death or suicide',
    ],
    causes:
      "Depression involves imbalances in neurotransmitter systems, particularly serotonin, norepinephrine, and dopamine. The monoamine hypothesis suggests that depression results from deficient signaling by one or more of these neurotransmitters. However, the causes are complex and involve genetic predisposition, brain chemistry, hormonal factors, stress, and life experiences. Chronic stress elevates cortisol levels, which can damage hippocampal neurons and reduce neurogenesis.",
    brainChanges:
      "Research has shown that the hippocampus is smaller in people with depression, possibly due to chronic stress and elevated cortisol damaging hippocampal neurons and reducing neurogenesis (the birth of new neurons). The prefrontal cortex may show reduced activity, affecting decision-making and emotional regulation. The amygdala may be overactive, contributing to the negativity bias seen in depression. Reduced levels of brain-derived neurotrophic factor (BDNF), which supports neuron health, have been observed.",
    treatments:
      "SSRIs (selective serotonin reuptake inhibitors) such as fluoxetine (Prozac) are the most commonly prescribed antidepressants. They work by blocking the reuptake of serotonin, increasing its availability in the synapse. Other antidepressants target norepinephrine and dopamine as well. Cognitive behavioral therapy (CBT) is an effective psychotherapy for depression and can be as effective as medication for mild-to-moderate cases. Combination of medication and therapy is often most effective. Exercise has also been shown to have antidepressant effects.",
    keyFacts: [
      'Involves imbalances in serotonin, norepinephrine, and dopamine',
      'Hippocampus is smaller in depressed patients',
      'SSRIs (like fluoxetine/Prozac) are primary pharmacological treatment',
      'Cognitive behavioral therapy (CBT) is effective as treatment',
      'More common in women; can affect anyone at any age',
    ],
  },

  {
    id: 'bipolar-disorder',
    name: 'Bipolar Disorder',
    category: 'psychiatric',
    chapter: 12,
    icon: '\u{1F503}',
    whatIsIt:
      "Bipolar disorder is a mental health condition characterized by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression). During manic episodes, a person may feel euphoric, full of energy, or unusually irritable. During depressive episodes, they experience symptoms of major depression. These mood shifts affect sleep, energy, activity, judgment, behavior, and the ability to think clearly. It affects approximately 2.8% of US adults.",
    symptoms: [
      'Manic episodes: elevated mood, increased energy, decreased need for sleep',
      'Racing thoughts and rapid speech during mania',
      'Impulsive or risky behavior during mania',
      'Grandiose beliefs during mania',
      'Depressive episodes: sadness, hopelessness, fatigue',
      'Loss of interest in activities during depression',
      'Sleep and appetite changes',
      'Alternation between manic and depressive states',
    ],
    causes:
      "Bipolar disorder has a significant genetic component, with heritability estimates among the highest of psychiatric disorders. Multiple genes are involved, each contributing small effects. The disorder involves dysregulation of neurotransmitter systems and disrupted neural circuits involved in mood regulation. Environmental factors such as stress, sleep disruption, and substance use can trigger episodes. The exact mechanisms underlying the mood cycling are still being researched.",
    brainChanges:
      "Brain imaging studies show differences in the size and activity of brain structures involved in emotion regulation. The prefrontal cortex, which helps regulate emotions and impulses, may show reduced activity. The amygdala, which processes emotions, may be overactive. There are also changes in white matter connectivity between brain regions. Neurotransmitter systems including serotonin, norepinephrine, dopamine, and glutamate are all implicated in the disorder.",
    treatments:
      "Lithium is the classic mood stabilizer and remains one of the most effective treatments for bipolar disorder, particularly for preventing manic episodes. How lithium works is not fully understood, but it affects multiple neurotransmitter systems and intracellular signaling pathways. Anticonvulsant medications (such as valproate and lamotrigine) are also used as mood stabilizers. Atypical antipsychotics may be used for acute mania. Psychotherapy and regular sleep-wake schedules are important adjuncts to medication.",
    keyFacts: [
      'Characterized by alternating episodes of mania and depression',
      'Lithium is the classic and highly effective mood stabilizer',
      'Affects approximately 2.8% of US adults',
      'Strong genetic component; multiple genes involved',
      'Anticonvulsants and atypical antipsychotics are also used',
    ],
  },

  {
    id: 'ptsd',
    name: 'PTSD',
    category: 'psychiatric',
    chapter: 12,
    icon: '\u{1F6A8}',
    whatIsIt:
      "Post-traumatic stress disorder (PTSD) is a mental health condition that can develop after experiencing or witnessing a terrifying, life-threatening, or deeply traumatic event. While it is natural to feel afraid during and after a traumatic situation, people with PTSD continue to feel stressed and frightened long after the danger has passed. Importantly, not everyone who experiences trauma develops PTSD - resilience factors and individual differences play a role in who is affected.",
    symptoms: [
      'Flashbacks - reliving the traumatic event',
      'Nightmares about the trauma',
      'Severe emotional distress when reminded of the event',
      'Hypervigilance and being easily startled',
      'Avoidance of places, people, or situations that are reminders',
      'Negative changes in thoughts and mood',
      'Emotional numbness or detachment',
      'Difficulty sleeping and concentrating',
      'Irritability and angry outbursts',
    ],
    causes:
      "PTSD develops after exposure to a traumatic event such as combat, sexual assault, natural disaster, serious accident, or violence. Not everyone exposed to trauma develops PTSD, suggesting individual vulnerability plays a role. Risk factors include the severity and duration of the trauma, prior trauma exposure, pre-existing mental health conditions, lack of social support, and genetic predisposition. The disorder reflects a failure of the normal stress recovery process.",
    brainChanges:
      "PTSD involves hyperactivation of the amygdala, the brain's fear center, which becomes overly sensitive to potential threats, leading to the hypervigilance and exaggerated startle response. The hippocampus, important for contextualizing memories, may be smaller and less active, contributing to the inability to distinguish between past trauma and present safety. The prefrontal cortex, which normally regulates the amygdala's fear response, shows reduced activity, making it harder to control fear and anxiety responses.",
    treatments:
      "Effective treatments include psychotherapy and medication. Exposure therapy helps patients gradually and safely face their trauma-related memories and situations they have been avoiding. Eye Movement Desensitization and Reprocessing (EMDR) combines exposure with guided eye movements to help process traumatic memories. Cognitive behavioral therapy helps patients identify and change negative thought patterns. SSRIs are the primary medication used. Combination approaches are often most effective.",
    keyFacts: [
      'Develops after traumatic events, but not everyone with trauma gets PTSD',
      'Amygdala is hyperactive (excessive fear response)',
      'Hippocampus and prefrontal cortex show reduced function',
      'Treatment includes exposure therapy, EMDR, and SSRIs',
      'Involves flashbacks, nightmares, and hypervigilance',
    ],
  },

  {
    id: 'ocd',
    name: 'OCD',
    category: 'psychiatric',
    chapter: 12,
    icon: '\u{1F504}',
    whatIsIt:
      "Obsessive-compulsive disorder (OCD) is a chronic condition in which a person has uncontrollable, recurring thoughts (obsessions) and/or repetitive behaviors (compulsions) that they feel driven to perform. The obsessions cause significant anxiety, and the compulsions are performed in an attempt to reduce that anxiety, creating a cycle that is very difficult to break. OCD affects approximately 1-2% of the population and can be severely debilitating.",
    symptoms: [
      'Obsessions: intrusive, unwanted recurring thoughts or urges',
      'Common obsessions: contamination fears, need for symmetry, forbidden thoughts',
      'Compulsions: repetitive behaviors performed to reduce anxiety',
      'Common compulsions: excessive handwashing, checking, counting, ordering',
      'Significant time spent on rituals (often more than an hour per day)',
      'Recognition that behaviors are excessive but inability to stop',
      'Distress when rituals are prevented',
    ],
    causes:
      "OCD involves dysfunction in brain circuits that connect the frontal cortex to the basal ganglia (particularly the caudate nucleus) and the thalamus. This circuit normally helps filter and prioritize thoughts and actions. When it malfunctions, intrusive thoughts cannot be properly dismissed, leading to obsessions, and the behavioral routines controlled by the basal ganglia become repetitive and difficult to stop, leading to compulsions. Both genetic and environmental factors contribute to OCD.",
    brainChanges:
      "Brain imaging shows overactivity in the circuit between the orbitofrontal cortex, the caudate nucleus (part of the basal ganglia), and the thalamus. This cortico-striato-thalamo-cortical loop normally helps filter thoughts and guide behavior. In OCD, this circuit is hyperactive, as if the brain's error detection system is stuck in the 'on' position, constantly signaling that something is wrong. Abnormalities in serotonin neurotransmission are also implicated.",
    treatments:
      "SSRIs (selective serotonin reuptake inhibitors) are the first-line pharmacological treatment, often at higher doses than used for depression. Cognitive behavioral therapy, specifically Exposure and Response Prevention (ERP), is highly effective. In ERP, patients are gradually exposed to their feared obsessions while refraining from performing compulsions, which helps break the OCD cycle. Combination of medication and CBT is often the most effective approach. For severe, treatment-resistant cases, deep brain stimulation is being investigated.",
    keyFacts: [
      'Characterized by obsessions (intrusive thoughts) and compulsions (repetitive behaviors)',
      'Involves dysfunctional circuits between frontal cortex and basal ganglia',
      'Affects approximately 1-2% of the population',
      'SSRIs and cognitive behavioral therapy (ERP) are primary treatments',
      'Orbitofrontal cortex-caudate-thalamus circuit is hyperactive',
    ],
  },

  {
    id: 'panic-disorder',
    name: 'Panic Disorder',
    category: 'psychiatric',
    chapter: 12,
    icon: '\u{1F4A8}',
    whatIsIt:
      "Panic disorder is an anxiety disorder characterized by recurrent, unexpected panic attacks - sudden episodes of intense fear that trigger severe physical reactions when there is no real danger or apparent cause. Panic attacks can be very frightening, and people with panic disorder often live in fear of the next attack. The disorder involves the amygdala and autonomic nervous system becoming inappropriately activated, triggering the fight-or-flight response without an actual threat.",
    symptoms: [
      'Sudden episodes of intense fear or discomfort',
      'Racing or pounding heart (palpitations)',
      'Sweating and trembling',
      'Shortness of breath or feeling of choking',
      'Chest pain or discomfort',
      'Nausea or stomach distress',
      'Dizziness or lightheadedness',
      'Fear of losing control or dying',
      'Tingling or numbness',
      'Chills or hot flashes',
    ],
    causes:
      "Panic disorder involves the amygdala and autonomic nervous system being overly reactive, triggering the body's fight-or-flight response without an appropriate threat. The exact cause is not fully understood but involves a combination of genetic predisposition, brain chemistry, temperament, and stressful life events. The disorder may involve misinterpretation of normal bodily sensations as threatening, which triggers a cascade of anxiety and further physical symptoms.",
    brainChanges:
      "The amygdala, which processes fear and threat signals, is hyperactive in panic disorder. It inappropriately triggers the autonomic nervous system's fight-or-flight response, causing the cascade of physical symptoms. The sympathetic nervous system releases adrenaline, increasing heart rate, blood pressure, and breathing rate. The prefrontal cortex, which should help regulate this fear response, may not adequately suppress the amygdala's overreaction.",
    treatments:
      "Treatment includes both medication and psychotherapy. SSRIs are the first-line medication for panic disorder. Benzodiazepines can provide rapid relief during acute panic attacks but carry risks of dependence and are generally used short-term. Cognitive behavioral therapy (CBT) is highly effective and teaches patients to understand and change the thought patterns that trigger panic attacks. CBT also includes exposure techniques to gradually reduce the fear of panic symptoms themselves.",
    keyFacts: [
      'Sudden episodes of intense fear with physical symptoms like racing heart',
      'Involves hyperactivation of the amygdala and autonomic nervous system',
      'Fight-or-flight response triggered without actual danger',
      'SSRIs, benzodiazepines (short-term), and CBT are treatments',
      'Physical symptoms include heart racing, sweating, shortness of breath',
    ],
  },

  // ============================================================
  // CHILDHOOD / DEVELOPMENTAL DISORDERS (Chapter 11)
  // ============================================================
  {
    id: 'adhd',
    name: 'ADHD',
    category: 'childhood',
    chapter: 11,
    icon: '\u{1F3C3}',
    whatIsIt:
      "Attention deficit hyperactivity disorder (ADHD) is a neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with daily functioning and development. It is one of the most common childhood neurodevelopmental disorders, affecting about 5-11% of children. ADHD often persists into adulthood. It is not simply a matter of willpower or discipline - it reflects differences in brain development and function, particularly in the prefrontal cortex and dopamine pathways.",
    symptoms: [
      'Difficulty sustaining attention on tasks',
      'Easily distracted by unrelated stimuli',
      'Difficulty organizing tasks and activities',
      'Forgetfulness in daily activities',
      'Fidgeting, squirming, or inability to sit still',
      'Excessive talking',
      'Difficulty waiting turns',
      'Impulsive decision-making',
      'Often losing things necessary for tasks',
    ],
    causes:
      "ADHD involves the prefrontal cortex and dopamine pathways. The prefrontal cortex, which is responsible for attention, planning, impulse control, and executive function, develops more slowly and may function differently in individuals with ADHD. Dopamine signaling in the prefrontal cortex is reduced, which impairs the ability to maintain focus and regulate behavior. ADHD has a strong genetic component, with heritability estimates around 70-80%. Environmental factors like prenatal exposure to toxins may also play a role.",
    brainChanges:
      "The prefrontal cortex, critical for executive functions like attention, planning, and impulse control, shows reduced activity and may be slightly smaller in children with ADHD. The dopamine and norepinephrine neurotransmitter systems are underactive in the prefrontal cortex. Brain maturation, particularly of the prefrontal cortex, is typically delayed by about 2-3 years in children with ADHD. The reward system may also be altered, making it harder to sustain motivation for non-immediately rewarding tasks.",
    treatments:
      "Stimulant medications such as methylphenidate (Ritalin) and amphetamine-based medications (Adderall) are the most common and effective treatments. Paradoxically, these stimulants help by increasing dopamine and norepinephrine levels in the prefrontal cortex, improving attention and reducing impulsivity. Non-stimulant medications like atomoxetine are alternatives. Behavioral therapy, organizational skills training, and educational accommodations are important complementary approaches. Regular exercise also appears to help symptoms.",
    keyFacts: [
      'Involves the prefrontal cortex and dopamine pathways',
      'Affects about 5-11% of children; often persists into adulthood',
      'Stimulant medications (methylphenidate/Ritalin, amphetamine) are primary treatment',
      'Stimulants increase dopamine in the prefrontal cortex to improve attention',
      'Prefrontal cortex maturation is delayed in ADHD',
    ],
  },

  {
    id: 'autism',
    name: 'Autism Spectrum Disorder',
    category: 'childhood',
    chapter: 11,
    icon: '\u{267E}\u{FE0F}',
    whatIsIt:
      "Autism spectrum disorder (ASD) is a neurodevelopmental condition characterized by difficulties with social communication and interaction, along with restricted, repetitive patterns of behavior, interests, or activities. It is called a 'spectrum' because it encompasses a wide range of severity, from individuals who need substantial support to those who are highly independent. ASD is more common in males, with approximately a 4:1 male-to-female ratio. Genetic factors play a major role.",
    symptoms: [
      'Difficulty with social communication and interaction',
      'Reduced eye contact and difficulty reading social cues',
      'Delayed or atypical language development',
      'Repetitive behaviors (hand flapping, rocking, spinning)',
      'Restricted and intense interests',
      'Insistence on sameness and difficulty with changes in routine',
      'Sensory sensitivities (over- or under-reactive to stimuli)',
      'Wide range of intellectual abilities',
    ],
    causes:
      "ASD has a strong genetic basis, with hundreds of genes implicated. It is highly heritable, and many different genetic variations can contribute. Some cases involve identifiable genetic mutations, but most involve complex interactions among many genes. Environmental factors during prenatal development may also play a role. The disorder reflects differences in how the brain develops and forms connections, particularly in circuits involved in social cognition and communication. Advanced parental age is a risk factor.",
    brainChanges:
      "ASD affects brain connectivity - the way different brain regions communicate with each other. Some studies show overconnectivity within local brain regions and underconnectivity between distant brain regions. Early brain overgrowth has been observed in some children with ASD, followed by a period of slowed growth. Areas involved in social processing, including the fusiform face area, amygdala, and mirror neuron system, may function differently. Differences in the balance of excitatory and inhibitory neurotransmission have also been reported.",
    treatments:
      "Early intervention is important and can significantly improve outcomes. Applied Behavior Analysis (ABA) is one of the most widely used therapies. Speech and language therapy, occupational therapy, and social skills training are common interventions. There is no medication that treats the core symptoms of ASD, though medications may be used to manage co-occurring conditions like anxiety, ADHD, or irritability. Each individual with ASD has unique strengths and challenges, and treatment should be tailored to their specific needs.",
    keyFacts: [
      'Characterized by social communication difficulties and repetitive behaviors',
      'A spectrum with wide range of severity',
      'More common in males (~4:1 ratio)',
      'Strong genetic basis with many genes involved',
      'Early intervention is critical for improving outcomes',
    ],
  },

  {
    id: 'down-syndrome',
    name: 'Down Syndrome',
    category: 'childhood',
    chapter: 11,
    icon: '\u{1F9EC}',
    whatIsIt:
      "Down syndrome is a genetic condition caused by the presence of an extra copy of chromosome 21, known as trisomy 21. It is the most common chromosomal cause of intellectual disability. Individuals with Down syndrome have characteristic facial features, varying degrees of intellectual disability, and increased risk for certain medical conditions. Notably, people with Down syndrome have a significantly increased risk of developing early-onset Alzheimer's disease, likely because the gene for amyloid precursor protein is located on chromosome 21.",
    symptoms: [
      'Intellectual disability (mild to moderate)',
      'Characteristic facial features (flat facial profile, upward eye slant)',
      'Low muscle tone (hypotonia) in infancy',
      'Short stature',
      'Single crease across the palm',
      'Increased risk of congenital heart defects',
      'Delayed speech and language development',
      'Increased susceptibility to infections',
    ],
    causes:
      "Down syndrome is caused by trisomy 21 - having three copies of chromosome 21 instead of the usual two. This occurs due to a random error in cell division (nondisjunction) during the formation of egg or sperm cells, or very early in embryonic development. The extra chromosome leads to overexpression of genes on chromosome 21, disrupting normal development. The risk of having a baby with Down syndrome increases with maternal age. It is not caused by anything parents did or did not do.",
    brainChanges:
      "The extra copy of chromosome 21 affects brain development, resulting in fewer neurons and reduced synaptic connections compared to typical development. The brain tends to be smaller overall with particular reductions in the hippocampus and cerebellum. Critically, the amyloid precursor protein (APP) gene is on chromosome 21, meaning people with Down syndrome produce more APP. This leads to increased amyloid-beta production and a very high risk of developing Alzheimer's-type plaques and tangles, often beginning in their 40s.",
    treatments:
      "There is no cure for Down syndrome, but early intervention programs including physical therapy, speech therapy, occupational therapy, and educational support can significantly improve outcomes and quality of life. Medical management of associated conditions (heart defects, thyroid problems, hearing and vision issues) is important. Life expectancy has increased dramatically with improved medical care, now averaging about 60 years. Ongoing monitoring for early signs of Alzheimer's disease is recommended as individuals age.",
    keyFacts: [
      'Caused by trisomy 21 (extra copy of chromosome 21)',
      'Most common chromosomal cause of intellectual disability',
      'Increased risk of early-onset Alzheimer\'s due to APP gene on chromosome 21',
      'Risk increases with maternal age',
      'Early intervention significantly improves outcomes',
    ],
  },

  {
    id: 'dyslexia',
    name: 'Dyslexia',
    category: 'childhood',
    chapter: 11,
    icon: '\u{1F4D6}',
    whatIsIt:
      "Dyslexia is a specific learning disability that affects reading ability. It is not related to intelligence, vision problems, or lack of educational opportunity - people with dyslexia can be very intelligent. The core difficulty is with phonological processing, meaning the ability to recognize and manipulate the sounds of language. This makes it hard to decode words, spell, and read fluently. Dyslexia is the most common learning disability and has a neurological basis involving the language processing areas of the brain.",
    symptoms: [
      'Difficulty learning to read despite adequate intelligence',
      'Trouble recognizing and manipulating sounds in words (phonological awareness)',
      'Slow or inaccurate reading',
      'Poor spelling',
      'Difficulty with rhyming',
      'Trouble learning the alphabet and letter-sound associations',
      'Difficulty reading aloud',
      'Avoidance of reading activities',
    ],
    causes:
      "Dyslexia has a strong genetic component and tends to run in families. It involves differences in the brain areas responsible for language processing, particularly in the left hemisphere. The core deficit is in phonological processing - the ability to break words down into their component sounds (phonemes) and map them to letters. This is not due to hearing or vision problems but rather how the brain processes written and spoken language. Several genes associated with brain development and neural migration have been linked to dyslexia.",
    brainChanges:
      "Brain imaging studies show that people with dyslexia have reduced activity in the left temporoparietal region (involved in phonological processing and mapping sounds to letters) and the left occipitotemporal region (the 'visual word form area' that enables rapid, automatic word recognition). There may be increased activity in the right hemisphere and frontal regions as the brain compensates. Structural differences in white matter tracts connecting language areas have also been found.",
    treatments:
      "Dyslexia cannot be cured, but it can be effectively managed with specialized reading instruction. Evidence-based interventions focus on systematic, explicit instruction in phonological awareness and phonics - teaching the relationships between sounds and letters. The earlier intervention begins, the better the outcomes. Multisensory approaches that engage visual, auditory, and kinesthetic learning simultaneously are particularly effective. Accommodations such as extra time on tests and audiobooks can help in school settings.",
    keyFacts: [
      'Reading difficulty not related to intelligence or vision',
      'Core problem is with phonological processing (sound-letter mapping)',
      'Involves language processing areas of the left hemisphere',
      'Strong genetic component',
      'Specialized, systematic reading instruction is the primary intervention',
    ],
  },

  // ============================================================
  // ADDICTION (Chapter 13)
  // ============================================================
  {
    id: 'addiction-opioids',
    name: 'Opioid Addiction',
    category: 'addiction',
    chapter: 13,
    icon: '\u{1F48A}',
    whatIsIt:
      "Opioid addiction (opioid use disorder) involves the compulsive use of opioid drugs despite harmful consequences. Opioids include heroin, morphine, fentanyl, and prescription painkillers like oxycodone and hydrocodone. These drugs bind to the brain's natural opioid receptors (the same receptors used by endorphins, the body's natural painkillers) and produce powerful pain relief and euphoria. They are extremely addictive because they hijack the brain's reward system. Tolerance develops quickly, requiring higher doses for the same effect.",
    symptoms: [
      'Compulsive drug seeking and use despite consequences',
      'Intense cravings for opioids',
      'Tolerance (needing more drug for the same effect)',
      'Physical dependence and withdrawal symptoms',
      'Withdrawal: muscle aches, nausea, vomiting, diarrhea, insomnia',
      'Constricted pupils',
      'Drowsiness and nodding off',
      'Risk of fatal respiratory depression (overdose)',
    ],
    causes:
      "Opioids bind to mu-opioid receptors, the same receptors that naturally respond to endorphins. This produces intense pain relief and euphoria by triggering a massive release of dopamine in the nucleus accumbens (reward center). The brain quickly adapts by reducing its natural endorphin production and decreasing the number of opioid receptors (tolerance). This means the person needs more drug to feel normal and experiences painful withdrawal without it. The transition from voluntary use to compulsive addiction involves lasting changes in brain reward and stress circuits.",
    brainChanges:
      "Opioids flood the reward system with dopamine, producing a much stronger signal than natural rewards. With repeated use, the brain reduces dopamine receptor sensitivity and natural endorphin production, creating tolerance and dependence. The prefrontal cortex, responsible for judgment and impulse control, becomes impaired. Stress circuits in the amygdala become sensitized, driving negative emotions during withdrawal. These brain changes can persist long after drug use stops, which is why relapse is common.",
    treatments:
      "Naloxone (Narcan) is a life-saving medication that rapidly reverses opioid overdose by blocking opioid receptors. For treatment of addiction, medication-assisted treatment (MAT) is the gold standard. Methadone is a long-acting opioid agonist that reduces cravings and withdrawal without producing a high at proper doses. Buprenorphine is a partial opioid agonist that also reduces cravings with lower overdose risk. Naltrexone is an opioid antagonist that blocks the effects of opioids. Behavioral therapies are used alongside medication.",
    keyFacts: [
      'Opioids bind to endorphin/opioid receptors in the brain',
      'Include heroin, morphine, fentanyl, and prescription painkillers',
      'Tolerance develops quickly, increasing overdose risk',
      'Naloxone (Narcan) reverses opioid overdose',
      'Methadone and buprenorphine are used for medication-assisted treatment',
    ],
  },

  {
    id: 'addiction-alcohol',
    name: 'Alcohol Addiction',
    category: 'addiction',
    chapter: 13,
    icon: '\u{1F37A}',
    whatIsIt:
      "Alcohol use disorder (alcoholism) is a chronic condition characterized by compulsive alcohol use, loss of control over intake, and a negative emotional state when not drinking. Alcohol is a central nervous system depressant that affects the brain by enhancing the effects of the inhibitory neurotransmitter GABA and reducing the effects of the excitatory neurotransmitter glutamate. Chronic heavy drinking causes widespread brain damage and can lead to serious medical consequences. Alcohol withdrawal can be medically dangerous and even fatal.",
    symptoms: [
      'Inability to control or stop drinking',
      'Increasing tolerance (needing more to feel effects)',
      'Withdrawal symptoms when not drinking (tremors, sweating, anxiety)',
      'Spending excessive time obtaining, using, or recovering from alcohol',
      'Neglecting responsibilities due to drinking',
      'Continuing to drink despite social or health problems',
      'Severe withdrawal: seizures, hallucinations, delirium tremens',
    ],
    causes:
      "Alcohol enhances GABAergic (inhibitory) neurotransmission and reduces glutamatergic (excitatory) neurotransmission, producing its sedating and anxiety-reducing effects. With chronic use, the brain compensates by increasing glutamate activity and decreasing GABA sensitivity. This is why sudden cessation can cause dangerous hyperexcitability (withdrawal seizures). Alcohol also triggers dopamine release in the reward pathway, reinforcing drinking behavior. Genetic factors account for about 50% of the risk for alcoholism.",
    brainChanges:
      "Chronic alcohol use damages multiple brain structures. The cerebellum is affected, impairing coordination and balance. The hippocampus is damaged, causing memory problems and contributing to alcohol-related blackouts. The frontal cortex thins, reducing judgment and impulse control. The corpus callosum can be damaged. In extreme cases, thiamine (vitamin B1) deficiency from alcoholism causes Wernicke-Korsakoff syndrome, with severe memory impairment. Prenatal alcohol exposure causes fetal alcohol spectrum disorders (FASD), resulting in brain damage and developmental problems in children.",
    treatments:
      "Medical detoxification may be needed because alcohol withdrawal can be life-threatening. Benzodiazepines are used to manage withdrawal symptoms. Medications include naltrexone (reduces cravings), acamprosate (restores glutamate balance), and disulfiram (causes unpleasant reaction to alcohol). Behavioral therapies including cognitive behavioral therapy, motivational enhancement therapy, and 12-step programs are important components of treatment. Recovery is possible but requires ongoing support.",
    keyFacts: [
      'Enhances GABA (inhibitory) and reduces glutamate (excitatory) neurotransmission',
      'Damages cerebellum (coordination) and hippocampus (memory)',
      'Alcohol withdrawal can be dangerous and life-threatening',
      'Fetal alcohol spectrum disorders (FASD) from prenatal exposure',
      'Medications include naltrexone, acamprosate, and disulfiram',
    ],
  },

  {
    id: 'addiction-nicotine',
    name: 'Nicotine Addiction',
    category: 'addiction',
    chapter: 13,
    icon: '\u{1F6AD}',
    whatIsIt:
      "Nicotine addiction is dependence on nicotine, the primary addictive substance in tobacco products. Nicotine is one of the most addictive substances known. It binds to nicotinic acetylcholine receptors in the brain, mimicking the neurotransmitter acetylcholine. This stimulates the release of dopamine in the nucleus accumbens (reward center), producing pleasure and reinforcing the behavior. Tobacco use remains a leading cause of preventable death worldwide.",
    symptoms: [
      'Strong cravings for nicotine',
      'Inability to stop using tobacco despite wanting to',
      'Withdrawal symptoms: irritability, anxiety, difficulty concentrating',
      'Withdrawal symptoms: increased appetite, restlessness',
      'Tolerance (needing more for the same effect)',
      'Continued use despite health consequences',
      'Using tobacco within minutes of waking',
    ],
    causes:
      "Nicotine binds to nicotinic acetylcholine receptors, which are found throughout the brain. When nicotine binds to these receptors, it stimulates the release of multiple neurotransmitters, most importantly dopamine in the nucleus accumbens. This dopamine surge creates a pleasurable sensation that reinforces smoking behavior. With repeated exposure, the brain increases the number of nicotinic receptors (upregulation), which means more nicotine is needed to achieve the same effect and withdrawal symptoms occur when receptors are empty.",
    brainChanges:
      "Nicotine causes the release of dopamine in the nucleus accumbens, the brain's reward center, creating a powerful positive reinforcement signal. The brain adapts by upregulating nicotinic acetylcholine receptors, meaning it creates more receptors. When nicotine is absent, these extra receptors are unstimulated, causing craving and withdrawal symptoms. Nicotine also affects the prefrontal cortex, enhancing attention and cognitive performance, which is why smokers often report that cigarettes help them think and concentrate.",
    treatments:
      "Nicotine replacement therapy (NRT) is a primary treatment approach, providing nicotine through patches, gum, lozenges, inhalers, or nasal spray to reduce cravings and withdrawal symptoms while the person breaks the behavioral habit. Medications include bupropion (Zyban), which affects dopamine and norepinephrine, and varenicline (Chantix), which partially stimulates nicotinic receptors to reduce cravings and block nicotine's rewarding effects. Behavioral counseling combined with medication is the most effective approach.",
    keyFacts: [
      'Nicotine binds to nicotinic acetylcholine receptors',
      'One of the most addictive substances known',
      'Stimulates dopamine release in the nucleus accumbens (reward center)',
      'Brain upregulates nicotinic receptors with chronic use',
      'Nicotine replacement therapy is a primary cessation treatment',
    ],
  },

  {
    id: 'addiction-marijuana',
    name: 'Marijuana / Cannabis',
    category: 'addiction',
    chapter: 13,
    icon: '\u{1F33F}',
    whatIsIt:
      "Marijuana (cannabis) contains the psychoactive compound THC (delta-9-tetrahydrocannabinol), which binds to cannabinoid receptors (CB1 receptors) in the brain. These are the same receptors that respond to the brain's natural endocannabinoids, which play roles in pain modulation, mood, appetite, and memory. While marijuana is less acutely dangerous than many other drugs, the developing brain is especially vulnerable to its effects. Cannabis also contains cannabidiol (CBD), which does not produce a high and may have medical applications.",
    symptoms: [
      'Altered sense of time and perception',
      'Impaired short-term memory',
      'Difficulty with thinking, concentrating, and problem-solving',
      'Impaired coordination and reaction time',
      'Increased appetite',
      'Anxiety or paranoia (in some users)',
      'With chronic use: possible dependence and withdrawal',
      'Withdrawal: irritability, sleep difficulty, cravings',
    ],
    causes:
      "THC, the primary psychoactive component of marijuana, binds to CB1 cannabinoid receptors found throughout the brain, particularly in the hippocampus, cerebellum, basal ganglia, and cerebral cortex. This mimics and disrupts the natural endocannabinoid system, which normally uses endocannabinoids like anandamide to fine-tune neural signaling. THC produces its effects by overstimulating this system, leading to the characteristic high as well as impairments in memory, coordination, and judgment.",
    brainChanges:
      "THC affects CB1 receptors concentrated in areas important for memory (hippocampus), coordination (cerebellum), judgment (prefrontal cortex), and reward (nucleus accumbens). In the hippocampus, THC disrupts short-term memory formation. In the cerebellum and basal ganglia, it impairs motor coordination. The developing brain is especially vulnerable because the endocannabinoid system plays a role in brain maturation. Adolescent use may affect brain development, potentially impacting cognitive function, and may increase the risk of psychiatric conditions in vulnerable individuals.",
    treatments:
      "There are currently no FDA-approved medications specifically for cannabis use disorder. Treatment primarily involves behavioral interventions including cognitive behavioral therapy, motivational enhancement therapy, and contingency management. CBD (cannabidiol), the non-psychoactive compound in cannabis, is being researched for various medical applications including treatment of certain forms of epilepsy and may have anti-anxiety properties. Education about risks, particularly for adolescents, is an important prevention strategy.",
    keyFacts: [
      'THC binds to CB1 cannabinoid receptors throughout the brain',
      'Affects memory (hippocampus), coordination (cerebellum), and judgment',
      'Developing brain is especially vulnerable to effects',
      'Contains CBD (cannabidiol), which may have medical uses',
      'Endocannabinoid system normally uses anandamide for neural signaling',
    ],
  },

  {
    id: 'addiction-psychostimulants',
    name: 'Psychostimulant Addiction',
    category: 'addiction',
    chapter: 13,
    icon: '\u{26A1}',
    whatIsIt:
      "Psychostimulant addiction involves compulsive use of stimulant drugs like cocaine and amphetamines. These drugs produce their effects by dramatically increasing dopamine levels in the brain's reward pathway. Cocaine works by blocking the dopamine transporter, preventing dopamine from being recycled back into the presynaptic neuron (reuptake). Amphetamines not only block reuptake but also increase dopamine release. Both cause a massive surge of dopamine in the reward pathway, producing intense euphoria and high addiction potential.",
    symptoms: [
      'Intense euphoria followed by crash',
      'Increased energy, alertness, and confidence',
      'Decreased appetite and need for sleep',
      'Agitation, anxiety, and paranoia',
      'Rapid heart rate and elevated blood pressure',
      'Compulsive drug seeking despite negative consequences',
      'Severe cravings',
      'Cardiovascular problems (heart attack, stroke)',
      'Psychosis with heavy use',
    ],
    causes:
      "Cocaine blocks the dopamine transporter (DAT), preventing dopamine reuptake from the synaptic cleft. This causes dopamine to accumulate, producing an intense reward signal. Amphetamines both block the transporter and reverse it, actively pumping dopamine out of the presynaptic neuron into the synapse. Both mechanisms cause a dopamine surge far greater than any natural reward, which powerfully reinforces drug-taking behavior. With repeated use, the brain reduces its dopamine receptors and production, leading to tolerance and anhedonia (inability to feel pleasure without the drug).",
    brainChanges:
      "The massive dopamine surge in the nucleus accumbens and other reward areas creates a powerful reinforcement signal that drives addiction. With chronic use, the brain adapts by reducing dopamine D2 receptors, making normal pleasures less satisfying (anhedonia). The prefrontal cortex is impaired, reducing impulse control and judgment. Stress systems become sensitized, contributing to negative mood during withdrawal. These brain changes can persist for months or years after stopping use. Chronic stimulant use can also cause neurotoxicity and cardiovascular damage.",
    treatments:
      "There are currently no FDA-approved medications specifically for cocaine or methamphetamine addiction, making treatment challenging. Behavioral therapies are the primary approach, including cognitive behavioral therapy and contingency management (providing tangible rewards for staying drug-free). Research continues on potential pharmacological treatments. Recovery requires addressing the underlying brain changes in reward, motivation, and impulse control systems. Support groups and long-term follow-up are important for maintaining sobriety.",
    keyFacts: [
      'Cocaine blocks dopamine reuptake; amphetamines also increase dopamine release',
      'Both cause massive dopamine surge in the reward pathway',
      'Highly addictive due to intense reward signal',
      'Can cause serious cardiovascular problems (heart attack, stroke)',
      'No FDA-approved medications for stimulant addiction',
    ],
  },

  // ============================================================
  // SLEEP DISORDERS (Chapter 9)
  // ============================================================
  {
    id: 'narcolepsy',
    name: 'Narcolepsy',
    category: 'sleep',
    chapter: 9,
    icon: '\u{1F634}',
    whatIsIt:
      "Narcolepsy is a chronic sleep disorder characterized by overwhelming daytime drowsiness and sudden attacks of sleep. It is caused by the loss of neurons in the hypothalamus that produce the neuropeptide orexin (also called hypocretin), which is critical for maintaining wakefulness. Without orexin, the brain cannot properly regulate the sleep-wake cycle, leading to intrusions of sleep into waking hours and waking-state phenomena into sleep. The destruction of orexin neurons is suspected to be autoimmune in nature.",
    symptoms: [
      'Excessive daytime sleepiness',
      'Sudden, uncontrollable sleep attacks',
      'Cataplexy (sudden loss of muscle tone triggered by emotions, especially laughter)',
      'Sleep paralysis (inability to move when falling asleep or waking)',
      'Hypnagogic hallucinations (vivid, dream-like experiences at sleep onset)',
      'Disrupted nighttime sleep',
      'Automatic behaviors (continuing activities without awareness)',
    ],
    causes:
      "Narcolepsy (type 1, with cataplexy) is caused by the loss of orexin/hypocretin-producing neurons in the lateral hypothalamus. These neurons normally promote wakefulness and suppress REM sleep at inappropriate times. Their destruction is believed to be caused by an autoimmune process, where the immune system mistakenly attacks and destroys these specific neurons. Certain genetic factors (particularly HLA-DQB1*06:02) increase susceptibility. The link to autoimmunity is supported by evidence of immune activation and associations with certain infections.",
    brainChanges:
      "The defining brain change is the selective destruction of orexin/hypocretin-producing neurons in the lateral hypothalamus. Normally, about 70,000 of these neurons help maintain wakefulness by sending excitatory signals throughout the brain. In narcolepsy, 85-95% of these neurons are destroyed. Without orexin signaling, the brain cannot maintain stable boundaries between wake, NREM sleep, and REM sleep. This leads to REM sleep features (muscle paralysis, dreaming) intruding into wakefulness, explaining cataplexy, sleep paralysis, and hypnagogic hallucinations.",
    treatments:
      "Treatment manages symptoms since the orexin neurons cannot be replaced. Stimulant medications (modafinil, amphetamines) combat excessive daytime sleepiness. Sodium oxybate (Xyrem) taken at night can improve nighttime sleep and reduce cataplexy. Antidepressants (particularly SNRIs and SSRIs) can help control cataplexy, sleep paralysis, and hallucinations by suppressing REM sleep. Scheduled naps and good sleep hygiene are helpful non-pharmacological approaches. Orexin receptor agonists are being developed as targeted therapies.",
    keyFacts: [
      'Caused by loss of orexin/hypocretin-producing neurons in the hypothalamus',
      'Autoimmune destruction of orexin neurons is the suspected cause',
      'Key symptoms: excessive sleepiness, cataplexy, sleep paralysis',
      'Cataplexy = sudden muscle weakness triggered by emotions',
      'Treatment includes stimulants for sleepiness and sodium oxybate for cataplexy',
    ],
  },

  {
    id: 'sleep-apnea',
    name: 'Sleep Apnea',
    category: 'sleep',
    chapter: 9,
    icon: '\u{1F4A4}',
    whatIsIt:
      "Sleep apnea is a serious sleep disorder in which breathing repeatedly stops and starts during sleep. The most common form is obstructive sleep apnea (OSA), where the muscles in the back of the throat relax excessively during sleep, causing the airway to narrow or close. Each breathing interruption (apnea) can last from a few seconds to over a minute, and these events can occur dozens or even hundreds of times per night. The repeated oxygen drops and sleep disruptions have significant health consequences.",
    symptoms: [
      'Loud, chronic snoring',
      'Episodes of breathing cessation during sleep (witnessed by others)',
      'Gasping or choking during sleep',
      'Excessive daytime sleepiness and fatigue',
      'Morning headaches',
      'Difficulty concentrating',
      'Irritability and mood changes',
      'Dry mouth or sore throat upon waking',
    ],
    causes:
      "Obstructive sleep apnea occurs when the muscles that support the soft tissues in the throat, including the tongue and soft palate, relax too much during sleep, narrowing or blocking the airway. Risk factors include obesity (excess tissue around the airway), large neck circumference, being male, older age, family history, use of alcohol or sedatives (which relax airway muscles), and certain anatomical features. Central sleep apnea, a less common form, occurs when the brainstem does not properly signal the breathing muscles.",
    brainChanges:
      "Repeated breathing interruptions cause drops in blood oxygen levels, which can damage brain cells over time. The fragmented sleep prevents normal passage through sleep stages, particularly reducing restorative slow-wave sleep and REM sleep. Chronic sleep disruption affects cognitive function, memory consolidation, and emotional regulation. Untreated sleep apnea is associated with increased cardiovascular risk including hypertension, heart disease, stroke, and atrial fibrillation. There is also an increased risk of metabolic problems and daytime accidents.",
    treatments:
      "Continuous positive airway pressure (CPAP) is the gold standard treatment for obstructive sleep apnea. A CPAP machine delivers a steady stream of air pressure through a mask to keep the airway open during sleep. Lifestyle changes including weight loss can significantly improve or even resolve mild cases. Oral appliances that reposition the jaw and tongue may help in mild-to-moderate cases. Surgery to remove excess tissue or reposition the jaw is an option for some patients. Positional therapy (avoiding sleeping on the back) can help in some cases.",
    keyFacts: [
      'Repeated breathing interruptions during sleep',
      'Obstructive sleep apnea (airway blocked) is the most common form',
      'Causes daytime sleepiness and increased cardiovascular risk',
      'CPAP (continuous positive airway pressure) is the primary treatment',
      'Risk factors include obesity, being male, and older age',
    ],
  },
];

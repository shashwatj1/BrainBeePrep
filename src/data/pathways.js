export const pathways = [
  {
    id: 'visual',
    title: 'Visual Pathway',
    description: 'How light becomes sight',
    color: '#4C6EF5',
    icon: '\uD83D\uDC41\uFE0F',
    steps: [
      {
        id: 1,
        label: 'Light enters the eye',
        description:
          'Light passes through the cornea and lens, which bend and focus it onto the retina at the back of the eye, creating an inverted image.',
        region: 'Eye',
      },
      {
        id: 2,
        label: 'Photoreceptors transduce light',
        description:
          'Rods (sensitive to dim light, no color) and cones (color vision, three types for red, green, blue) in the retina convert light energy into electrical signals through a chemical cascade involving photopigments.',
        region: 'Retina',
      },
      {
        id: 3,
        label: 'Retinal processing',
        description:
          'Signals pass through three layers of retinal neurons: photoreceptors to bipolar cells to retinal ganglion cells. Horizontal and amacrine cells provide lateral processing, enhancing contrast and detecting edges.',
        region: 'Retina',
      },
      {
        id: 4,
        label: 'Optic nerve carries signals',
        description:
          'Axons of retinal ganglion cells bundle together to form the optic nerve, which exits the eye at the blind spot (no photoreceptors there) and carries visual information toward the brain.',
        region: 'Optic Nerve',
      },
      {
        id: 5,
        label: 'Partial crossing at optic chiasm',
        description:
          'At the optic chiasm, fibers from the nasal half of each retina cross to the opposite side, while temporal fibers stay on the same side. This ensures each hemisphere receives information from the opposite visual field.',
        region: 'Optic Chiasm',
      },
      {
        id: 6,
        label: 'Thalamus relay (LGN)',
        description:
          'Visual signals reach the lateral geniculate nucleus (LGN) of the thalamus, which organizes and relays them to the visual cortex. The LGN has six layers that keep information from each eye separate.',
        region: 'Thalamus',
      },
      {
        id: 7,
        label: 'Primary visual cortex (V1)',
        description:
          'The primary visual cortex in the occipital lobe processes basic visual features: edges, orientations, and simple shapes. Neurons are organized into columns that respond to specific orientations.',
        region: 'Visual Cortex',
      },
      {
        id: 8,
        label: 'Two processing streams',
        description:
          'From V1, visual information splits into two streams: the ventral stream ("what" pathway) goes to the temporal lobe for object and face recognition, and the dorsal stream ("where" pathway) goes to the parietal lobe for spatial location and motion.',
        region: 'Cerebral Cortex',
      },
    ],
  },
  {
    id: 'pain',
    title: 'Pain Pathway',
    description: 'How the body detects and responds to harmful stimuli',
    color: '#FA5252',
    icon: '\uD83E\uDE79',
    steps: [
      {
        id: 1,
        label: 'Tissue damage activates nociceptors',
        description:
          'When tissue is damaged, specialized pain receptors called nociceptors are activated by intense mechanical, thermal, or chemical stimuli. Damaged cells release chemicals like prostaglandins and bradykinin that sensitize nociceptors.',
        region: 'Peripheral Nervous System',
      },
      {
        id: 2,
        label: 'Two types of pain fibers',
        description:
          'A-delta fibers are myelinated and carry fast, sharp, well-localized pain (first pain). C fibers are unmyelinated and carry slow, dull, aching, poorly localized pain (second pain). This explains the two waves of pain you feel after an injury.',
        region: 'Peripheral Nerves',
      },
      {
        id: 3,
        label: 'Signals enter the spinal cord',
        description:
          'Pain fibers enter the dorsal horn of the spinal cord, where they synapse with second-order neurons. Here, the gate control theory applies: non-painful touch signals can inhibit pain transmission, explaining why rubbing an injury helps.',
        region: 'Spinal Cord',
      },
      {
        id: 4,
        label: 'Ascending to the brain',
        description:
          'Second-order neurons cross to the opposite side of the spinal cord and ascend via the spinothalamic tract to the brain. Some fibers also go to the brainstem reticular formation, contributing to the alerting and autonomic responses to pain.',
        region: 'Spinal Cord',
      },
      {
        id: 5,
        label: 'Thalamus relay',
        description:
          'Pain signals reach the thalamus, which relays them to multiple cortical areas. The thalamus acts as a central hub, distributing pain information to regions responsible for the sensory, emotional, and cognitive aspects of pain.',
        region: 'Thalamus',
      },
      {
        id: 6,
        label: 'Conscious pain perception',
        description:
          'The somatosensory cortex processes the location and intensity of pain (sensory component). The anterior cingulate cortex and insula process the emotional unpleasantness (affective component). This is why pain has both a physical and an emotional dimension.',
        region: 'Somatosensory Cortex',
      },
      {
        id: 7,
        label: 'Brain modulates pain',
        description:
          'The brain can reduce pain through descending pathways. The periaqueductal gray in the midbrain activates neurons that release endorphins (natural opioids) and serotonin, which inhibit pain signals in the spinal cord. This explains pain relief during stress or exercise.',
        region: 'Brainstem',
      },
    ],
  },
  {
    id: 'auditory',
    title: 'Auditory Pathway',
    description: 'How sound waves become hearing',
    color: '#E8590C',
    icon: '\uD83D\uDC42',
    steps: [
      {
        id: 1,
        label: 'Sound waves enter the outer ear',
        description:
          'The pinna (outer ear) funnels sound waves into the ear canal. The shape of the pinna helps determine the direction of sounds, especially whether they come from above or below.',
        region: 'Outer Ear',
      },
      {
        id: 2,
        label: 'Eardrum vibrates',
        description:
          'Sound waves strike the tympanic membrane (eardrum), causing it to vibrate. The eardrum converts airborne sound waves into mechanical vibrations, matching the frequency and amplitude of the incoming sound.',
        region: 'Middle Ear',
      },
      {
        id: 3,
        label: 'Middle ear bones amplify',
        description:
          'Three tiny bones (ossicles) \u2014 the malleus, incus, and stapes \u2014 transmit and amplify vibrations from the eardrum to the oval window of the cochlea. They amplify sound pressure about 20-fold to overcome the impedance of fluid in the inner ear.',
        region: 'Middle Ear',
      },
      {
        id: 4,
        label: 'Cochlea converts to neural signals',
        description:
          'Vibrations at the oval window create waves in the cochlear fluid that travel along the basilar membrane. Different frequencies cause maximum vibration at different points: high frequencies near the base, low frequencies near the apex (tonotopic organization).',
        region: 'Cochlea',
      },
      {
        id: 5,
        label: 'Hair cells transduce signals',
        description:
          'Inner hair cells on the basilar membrane have tiny stereocilia that bend when the membrane vibrates. This bending opens ion channels, generating electrical signals. Outer hair cells amplify weak sounds by actively changing their length.',
        region: 'Organ of Corti',
      },
      {
        id: 6,
        label: 'Auditory nerve to brainstem',
        description:
          'Hair cells release neurotransmitter onto auditory nerve fibers, which carry signals to the cochlear nuclei in the brainstem. The brainstem processes timing differences between the two ears to help localize sound sources.',
        region: 'Brainstem',
      },
      {
        id: 7,
        label: 'Auditory cortex processes sound',
        description:
          'After relay through the thalamus (medial geniculate nucleus), signals reach the primary auditory cortex in the temporal lobe. It is organized tonotopically, with different areas responding to different frequencies.',
        region: 'Auditory Cortex',
      },
      {
        id: 8,
        label: 'Higher-order processing',
        description:
          'Higher auditory areas process complex features such as pitch, rhythm, melody, and speech sounds. Wernicke\u2019s area in the left hemisphere is specialized for comprehending the meaning of spoken language.',
        region: 'Temporal Lobe',
      },
    ],
  },
  {
    id: 'reward',
    title: 'Reward / Dopamine Circuit',
    description: 'How the brain processes pleasure and drives motivation',
    color: '#FF922B',
    icon: '\u2B50',
    steps: [
      {
        id: 1,
        label: 'Rewarding stimulus occurs',
        description:
          'A natural reward (food, social interaction, achievement) or an addictive substance activates the brain\u2019s reward circuit. The stimulus is evaluated by multiple brain regions for its rewarding properties.',
        region: 'Sensory Systems',
      },
      {
        id: 2,
        label: 'VTA neurons activated',
        description:
          'Dopamine-producing neurons in the ventral tegmental area (VTA) in the midbrain are activated. These neurons fire especially strongly for unexpected rewards, encoding a "reward prediction error" signal that drives learning.',
        region: 'Ventral Tegmental Area',
      },
      {
        id: 3,
        label: 'Dopamine released to nucleus accumbens',
        description:
          'VTA neurons release dopamine into the nucleus accumbens via the mesolimbic pathway. This produces feelings of pleasure and reinforces the behavior that led to the reward, motivating its repetition.',
        region: 'Nucleus Accumbens',
      },
      {
        id: 4,
        label: 'Prefrontal cortex involved',
        description:
          'Dopamine also reaches the prefrontal cortex via the mesocortical pathway, influencing decision-making, planning, and the conscious evaluation of rewards. This helps prioritize behaviors based on expected outcomes.',
        region: 'Prefrontal Cortex',
      },
      {
        id: 5,
        label: 'Amygdala adds emotional associations',
        description:
          'The amygdala receives dopamine signals and creates emotional associations with the rewarding experience. This helps form memories linking specific cues (sights, sounds, places) with the reward, driving future behavior.',
        region: 'Amygdala',
      },
      {
        id: 6,
        label: 'Drugs hijack the circuit',
        description:
          'Addictive drugs produce a dopamine surge far greater than natural rewards. Cocaine blocks dopamine reuptake, amphetamines reverse the transporter, and opioids disinhibit VTA neurons. This unnatural flood overwhelms the circuit.',
        region: 'Nucleus Accumbens',
      },
      {
        id: 7,
        label: 'Tolerance and dependence develop',
        description:
          'With repeated drug use, the brain reduces its dopamine receptors (downregulation) and produces less natural dopamine. More drug is needed for the same effect (tolerance). Without the drug, the person feels worse than baseline (withdrawal).',
        region: 'Reward Circuit',
      },
    ],
  },
  {
    id: 'stress',
    title: 'Stress Response (HPA Axis)',
    description: 'How the brain and body respond to threat and stress',
    color: '#E64980',
    icon: '\u26A1',
    steps: [
      {
        id: 1,
        label: 'Threat is perceived',
        description:
          'The amygdala evaluates sensory information and detects a potential threat. It can trigger a rapid stress response even before the cortex has fully processed the situation, prioritizing speed over accuracy for survival.',
        region: 'Amygdala',
      },
      {
        id: 2,
        label: 'Hypothalamus releases CRH',
        description:
          'The amygdala signals the hypothalamus, which releases corticotropin-releasing hormone (CRH) into the portal blood system connecting it to the pituitary gland. This initiates the HPA (hypothalamic-pituitary-adrenal) axis.',
        region: 'Hypothalamus',
      },
      {
        id: 3,
        label: 'Pituitary releases ACTH',
        description:
          'CRH stimulates the anterior pituitary gland to release adrenocorticotropic hormone (ACTH) into the bloodstream. ACTH travels through the blood to the adrenal glands sitting on top of the kidneys.',
        region: 'Pituitary Gland',
      },
      {
        id: 4,
        label: 'Adrenal glands release cortisol',
        description:
          'ACTH stimulates the adrenal cortex to release cortisol, the primary stress hormone. The adrenal medulla also releases epinephrine (adrenaline) and norepinephrine for the immediate fight-or-flight response.',
        region: 'Adrenal Glands',
      },
      {
        id: 5,
        label: 'Cortisol mobilizes energy',
        description:
          'Cortisol increases blood glucose levels, suppresses the immune system, enhances the brain\u2019s use of glucose, and increases the availability of substances for tissue repair. It redirects energy from long-term functions to immediate survival.',
        region: 'Body-Wide',
      },
      {
        id: 6,
        label: 'Negative feedback shuts off response',
        description:
          'Cortisol feeds back to the hypothalamus and pituitary, suppressing further CRH and ACTH release. This negative feedback loop ensures the stress response is turned off once the threat has passed, restoring homeostasis.',
        region: 'Hypothalamus',
      },
      {
        id: 7,
        label: 'Chronic stress damages the brain',
        description:
          'When stress is chronic, the feedback mechanism fails and cortisol remains elevated. Prolonged cortisol exposure shrinks dendrites in the hippocampus, impairing memory. It also strengthens amygdala circuits, increasing anxiety and creating a vicious cycle.',
        region: 'Hippocampus',
      },
    ],
  },
  {
    id: 'synapse',
    title: 'Neurotransmission at the Synapse',
    description: 'How neurons communicate across the synaptic gap',
    color: '#7950F2',
    icon: '\uD83D\uDD2C',
    steps: [
      {
        id: 1,
        label: 'Action potential travels down axon',
        description:
          'An electrical signal (action potential) propagates down the axon in an all-or-nothing fashion. Voltage-gated sodium channels open sequentially along the axon, creating a wave of depolarization. In myelinated axons, the signal jumps between nodes of Ranvier (saltatory conduction).',
        region: 'Axon',
      },
      {
        id: 2,
        label: 'Signal reaches axon terminal',
        description:
          'The action potential arrives at the axon terminal (synaptic bouton), the specialized ending of the neuron that forms a synapse with the next cell. The terminal contains mitochondria and many small vesicles filled with neurotransmitter molecules.',
        region: 'Axon Terminal',
      },
      {
        id: 3,
        label: 'Calcium channels open',
        description:
          'The depolarization from the action potential opens voltage-sensitive calcium channels in the axon terminal membrane. Calcium ions (Ca\u00B2\u207A) flow into the terminal from the extracellular space down their concentration gradient.',
        region: 'Axon Terminal',
      },
      {
        id: 4,
        label: 'Vesicles fuse and release neurotransmitter',
        description:
          'Calcium ions bind to proteins on synaptic vesicles, triggering them to fuse with the presynaptic membrane. Neurotransmitter molecules are released into the synaptic cleft (the tiny gap between neurons) through exocytosis.',
        region: 'Synaptic Cleft',
      },
      {
        id: 5,
        label: 'Neurotransmitter binds receptors',
        description:
          'Neurotransmitter molecules diffuse across the synaptic cleft and bind to specific receptors on the postsynaptic membrane. Ionotropic receptors directly open ion channels for fast signaling. Metabotropic receptors activate intracellular signaling cascades for slower, longer-lasting effects.',
        region: 'Postsynaptic Neuron',
      },
      {
        id: 6,
        label: 'Postsynaptic response generated',
        description:
          'Receptor activation changes ion flow across the postsynaptic membrane, creating either an excitatory postsynaptic potential (EPSP, bringing the cell closer to firing) or an inhibitory postsynaptic potential (IPSP, making firing less likely).',
        region: 'Postsynaptic Neuron',
      },
      {
        id: 7,
        label: 'Signal integration',
        description:
          'A single neuron receives thousands of excitatory and inhibitory inputs simultaneously. The neuron sums all these inputs at the axon hillock. If the net depolarization exceeds the threshold, a new action potential fires (spatial and temporal summation).',
        region: 'Postsynaptic Neuron',
      },
      {
        id: 8,
        label: 'Neurotransmitter cleared from synapse',
        description:
          'Neurotransmitter is rapidly removed from the synaptic cleft by three mechanisms: reuptake into the presynaptic neuron via transporter proteins, enzymatic breakdown (e.g., acetylcholinesterase breaks down acetylcholine), or diffusion away from the synapse.',
        region: 'Synaptic Cleft',
      },
    ],
  },
  {
    id: 'sleep',
    title: 'Sleep-Wake Cycle',
    description: 'How the brain regulates sleep and wakefulness',
    color: '#5C7CFA',
    icon: '\uD83C\uDF19',
    steps: [
      {
        id: 1,
        label: 'SCN receives light information',
        description:
          'Specialized retinal ganglion cells containing the photopigment melanopsin detect light levels and send signals directly to the suprachiasmatic nucleus (SCN) in the hypothalamus. This synchronizes the internal clock with the external light-dark cycle.',
        region: 'Suprachiasmatic Nucleus',
      },
      {
        id: 2,
        label: 'Circadian rhythm set',
        description:
          'The SCN generates a roughly 24-hour circadian rhythm through a molecular clock involving transcription-translation feedback loops of clock genes. It coordinates timing signals throughout the body, influencing hormone release, body temperature, and alertness.',
        region: 'Suprachiasmatic Nucleus',
      },
      {
        id: 3,
        label: 'Melatonin released in darkness',
        description:
          'As darkness falls, the SCN signals the pineal gland to produce melatonin. Melatonin levels rise in the evening and remain high during the night, promoting sleepiness. Light exposure suppresses melatonin production.',
        region: 'Pineal Gland',
      },
      {
        id: 4,
        label: 'Adenosine builds sleep pressure',
        description:
          'During wakefulness, adenosine (a byproduct of cellular energy use) accumulates in the brain. It binds to receptors that promote sleepiness, creating increasing sleep pressure the longer you are awake. Caffeine works by blocking adenosine receptors.',
        region: 'Basal Forebrain',
      },
      {
        id: 5,
        label: 'Non-REM sleep stages',
        description:
          'Sleep begins with non-REM stages: Stage 1 (light sleep, easily awakened), Stage 2 (sleep spindles and K-complexes, body temperature drops), and Stage 3 (deep slow-wave sleep with large delta waves, hardest to wake from, most restorative).',
        region: 'Thalamus',
      },
      {
        id: 6,
        label: 'REM sleep',
        description:
          'About 90 minutes into sleep, REM (rapid eye movement) sleep occurs. The brain becomes highly active (similar to waking), vivid dreaming occurs, and voluntary muscles are paralyzed (atonia) by brainstem circuits to prevent acting out dreams.',
        region: 'Pons',
      },
      {
        id: 7,
        label: 'Glymphatic system clears waste',
        description:
          'During deep sleep, the glymphatic system becomes highly active. Cerebrospinal fluid flows through brain tissue along channels surrounding blood vessels, washing away metabolic waste products including amyloid-beta, a protein implicated in Alzheimer\u2019s disease.',
        region: 'Brain-Wide',
      },
      {
        id: 8,
        label: 'Memory consolidation occurs',
        description:
          'Sleep is critical for memory consolidation. During slow-wave sleep, the hippocampus replays newly learned information and gradually transfers it to the neocortex for long-term storage. REM sleep helps consolidate emotional and procedural memories.',
        region: 'Hippocampus',
      },
    ],
  },
  {
    id: 'memory',
    title: 'Memory Consolidation',
    description: 'How experiences become lasting memories',
    color: '#FAB005',
    icon: '\uD83E\uDDE0',
    steps: [
      {
        id: 1,
        label: 'Experience is perceived',
        description:
          'Sensory information from an experience is processed in the relevant cortical areas: visual cortex for sights, auditory cortex for sounds, and somatosensory cortex for touch. The prefrontal cortex directs attention to important information.',
        region: 'Cerebral Cortex',
      },
      {
        id: 2,
        label: 'Hippocampus rapidly encodes',
        description:
          'The hippocampus quickly binds together the different sensory components of an experience into a unified memory trace. It acts as a rapid learning system, capturing information from a single experience through pattern separation and completion.',
        region: 'Hippocampus',
      },
      {
        id: 3,
        label: 'Synaptic strengthening (early LTP)',
        description:
          'At the synaptic level, long-term potentiation (LTP) occurs: when two connected neurons fire together repeatedly, their connection strengthens. NMDA receptors detect coincident activity and trigger the insertion of more AMPA receptors, making the synapse more responsive.',
        region: 'Hippocampus',
      },
      {
        id: 4,
        label: 'Emotional tagging by amygdala',
        description:
          'The amygdala evaluates the emotional significance of experiences. Emotionally charged events trigger stress hormones and amygdala activation that enhance hippocampal encoding, which is why emotional memories are often stronger and more vivid.',
        region: 'Amygdala',
      },
      {
        id: 5,
        label: 'Sleep replay in slow-wave sleep',
        description:
          'During slow-wave (deep) sleep, the hippocampus spontaneously replays patterns of neural activity from recent experiences. These replay events, occurring during sharp wave ripples, gradually train the neocortex to store the memory independently.',
        region: 'Hippocampus',
      },
      {
        id: 6,
        label: 'Transfer to neocortex',
        description:
          'Over days to weeks, through repeated sleep-dependent replay, memories are gradually transferred from the hippocampus to distributed networks in the neocortex. The neocortex learns slowly, integrating new memories with existing knowledge (systems consolidation).',
        region: 'Cerebral Cortex',
      },
      {
        id: 7,
        label: 'Permanent molecular changes',
        description:
          'For memories to become truly long-lasting, late-phase LTP requires new protein synthesis. The transcription factor CREB activates genes that produce proteins needed for structural changes at synapses, creating permanent alterations in neural connections.',
        region: 'Synapses',
      },
      {
        id: 8,
        label: 'Long-term storage and retrieval',
        description:
          'Once consolidated, long-term memories are stored across distributed cortical networks. Retrieval reactivates these networks. Each retrieval makes the memory labile again (reconsolidation), allowing it to be updated or strengthened before being re-stored.',
        region: 'Cerebral Cortex',
      },
    ],
  },
];

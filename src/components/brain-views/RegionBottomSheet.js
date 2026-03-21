import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../utils/theme';
import { brainRegions } from '../../data/brainRegions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = 320;

// Extended info for Brain Bee study
const REGION_EXTRA_INFO = {
  frontal_lobe: {
    facts: [
      'Contains about 40% of the cerebral cortex surface area',
      'The prefrontal cortex is the last brain region to fully mature, around age 25',
      'Phineas Gage\'s frontal lobe injury in 1848 first demonstrated its role in personality',
    ],
  },
  parietal_lobe: {
    facts: [
      'Contains the somatosensory cortex which maps touch sensation from the entire body',
      'Damage can cause hemispatial neglect — patients ignore one side of space',
      'The body map in the somatosensory cortex is distorted — hands and lips are overrepresented',
    ],
  },
  temporal_lobe: {
    facts: [
      'Contains Wernicke\'s area critical for language comprehension',
      'The hippocampus in the temporal lobe is essential for forming new memories',
      'Temporal lobe epilepsy is the most common form of epilepsy in adults',
    ],
  },
  occipital_lobe: {
    facts: [
      'Processes about 80% of sensory information — vision dominates the brain',
      'Contains the primary visual cortex (V1) which maps the visual field retinotopically',
      'Damage causes cortical blindness — eyes work but brain cannot process the images',
    ],
  },
  cerebellum: {
    facts: [
      'Contains more neurons than the rest of the brain combined (~69 billion)',
      'Crucial for motor learning — damage impairs coordination (ataxia)',
      'Recent research shows it also plays roles in cognition and emotion',
    ],
  },
  brainstem: {
    facts: [
      'Controls vital functions: breathing, heart rate, blood pressure, and consciousness',
      'Contains the reticular activating system that regulates wakefulness',
      'All information between brain and body passes through the brainstem',
    ],
  },
  corpus_callosum: {
    facts: [
      'Largest white matter structure with ~200 million axon fibers',
      'Split-brain patients (severed corpus callosum) show fascinating lateralization effects',
      'It continues to develop through adolescence',
    ],
  },
  thalamus: {
    facts: [
      'Relay station for all sensory information except smell',
      'The pulvinar nucleus is involved in visual attention',
      'Damage can cause thalamic pain syndrome — chronic burning pain',
    ],
  },
  hypothalamus: {
    facts: [
      'Only about the size of an almond but controls homeostasis',
      'Regulates the HPA axis stress response',
      'Contains the suprachiasmatic nucleus — the master circadian clock',
    ],
  },
  hippocampus: {
    facts: [
      'Named for its seahorse shape (Greek: hippos = horse, kampos = sea monster)',
      'Patient H.M.\'s bilateral hippocampal removal proved its role in memory formation',
      'London taxi drivers have enlarged hippocampi from spatial navigation training',
    ],
  },
  amygdala: {
    facts: [
      'Almond-shaped structure critical for fear conditioning and emotional memory',
      'Processes emotional significance of stimuli in milliseconds',
      'Overactivity is linked to anxiety disorders and PTSD',
    ],
  },
  prefrontal_cortex: {
    facts: [
      'Executive function hub — planning, decision-making, impulse control',
      'Last region to myelinate, explaining adolescent risk-taking behavior',
      'Working memory depends on sustained prefrontal cortex activity',
    ],
  },
  motor_cortex: {
    facts: [
      'Contains the motor homunculus — a distorted body map for movement control',
      'Upper motor neurons here project down to the spinal cord',
      'Each hemisphere controls the opposite side of the body (contralateral)',
    ],
  },
  visual_cortex: {
    facts: [
      'The primary visual cortex (V1) has the highest neuron density in the cortex',
      'Contains orientation-selective columns discovered by Hubel and Wiesel',
      'Organized retinotopically — adjacent retinal points map to adjacent cortex points',
    ],
  },
  brocas_area: {
    facts: [
      'Located in the left inferior frontal gyrus (area 44/45)',
      'Damage causes expressive/non-fluent aphasia — can understand but not produce speech',
      'Named after Paul Broca who described it in 1861',
    ],
  },
  wernickes_area: {
    facts: [
      'Located in the left posterior superior temporal gyrus',
      'Damage causes receptive/fluent aphasia — speech is fluent but meaningless',
      'Connected to Broca\'s area via the arcuate fasciculus',
    ],
  },
  basal_ganglia: {
    facts: [
      'Includes caudate, putamen, globus pallidus, and substantia nigra',
      'Critical for movement initiation — degeneration causes Parkinson\'s disease',
      'Also involved in reward learning and habit formation',
    ],
  },
  somatosensory_cortex: {
    facts: [
      'Located in the postcentral gyrus, just behind the central sulcus',
      'Maps touch, pressure, temperature, and pain from the body',
      'The sensory homunculus shows hands and face have the largest representation',
    ],
  },
  auditory_cortex: {
    facts: [
      'Located in the superior temporal gyrus (Heschl\'s gyrus)',
      'Organized tonotopically — different frequencies map to different locations',
      'Bilateral damage causes cortical deafness',
    ],
  },
  ventricles: {
    facts: [
      'Four interconnected cavities filled with cerebrospinal fluid (CSF)',
      'Produce about 500ml of CSF daily through the choroid plexus',
      'Enlarged ventricles can indicate hydrocephalus or brain atrophy',
    ],
  },
  pituitary: {
    facts: [
      'The "master gland" — controls thyroid, adrenals, gonads, and growth',
      'Anterior pituitary releases ACTH, TSH, GH, FSH, LH, prolactin',
      'Connected to hypothalamus via the infundibulum (pituitary stalk)',
    ],
  },
};

export default function RegionBottomSheet({ regionId, onClose }) {
  const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  useEffect(() => {
    if (regionId) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 10,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SHEET_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [regionId]);

  if (!regionId) return null;

  const region = brainRegions.find((r) => r.id === regionId);
  const extraInfo = REGION_EXTRA_INFO[regionId];

  const displayName = region?.name || regionId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const functions = region?.functions || [];
  const diseases = region?.diseases || [];
  const facts = extraInfo?.facts || [];

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Handle bar */}
      <View style={styles.handleBar} />

      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Region name */}
        <View style={styles.header}>
          <View style={[styles.colorDot, { backgroundColor: region?.color || COLORS.electricBlue }]} />
          <Text style={styles.regionName}>{displayName}</Text>
        </View>

        {/* Functions */}
        {functions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Functions</Text>
            {functions.map((func, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>{func}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Associated Diseases */}
        {diseases.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Associated Conditions</Text>
            <View style={styles.chipRow}>
              {diseases.map((disease, i) => (
                <View key={i} style={styles.chip}>
                  <Text style={styles.chipText}>{disease}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Brain Bee Facts */}
        {facts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Brain Bee Facts</Text>
            {facts.map((fact, i) => (
              <View key={i} style={styles.factCard}>
                <Text style={styles.factNumber}>{i + 1}</Text>
                <Text style={styles.factText}>{fact}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: COLORS.deepNavy,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.cardBorder,
    zIndex: 100,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textMuted,
    alignSelf: 'center',
    marginTop: SPACING.sm,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.lg,
    zIndex: 10,
    padding: SPACING.sm,
  },
  closeText: {
    color: COLORS.textMuted,
    fontSize: 18,
    fontWeight: FONTS.weights.bold,
  },
  scrollView: {
    flex: 1,
    marginTop: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: SPACING.md,
  },
  regionName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.extrabold,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionLabel: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textMuted,
    marginTop: 6,
    marginRight: SPACING.sm,
  },
  bulletText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  chip: {
    backgroundColor: COLORS.purple + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.purple + '40',
  },
  chipText: {
    color: COLORS.purple,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
  },
  factCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  factNumber: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginRight: SPACING.md,
    marginTop: 1,
  },
  factText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
    flex: 1,
  },
});

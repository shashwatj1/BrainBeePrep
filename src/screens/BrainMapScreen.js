import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import BrainScanExplorer from '../components/brain-views/BrainScanExplorer';
import LabelQuiz from '../components/LabelQuiz';

// Diagrams
import NeuronDiagram, { NEURON_PARTS } from '../components/diagrams/NeuronDiagram';
import SynapseDiagram, { SYNAPSE_PARTS } from '../components/diagrams/SynapseDiagram';
import RetinaDiagram, { RETINA_PARTS } from '../components/diagrams/RetinaDiagram';
import EarDiagram, { EAR_PARTS } from '../components/diagrams/EarDiagram';
import StressResponseDiagram, { STRESS_PARTS } from '../components/diagrams/StressResponseDiagram';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DIAGRAMS = [
  {
    id: 'neuron',
    title: 'The Neuron',
    subtitle: 'Cell body, axon, dendrites & synapse',
    icon: '🔬',
    color: COLORS.electricBlue,
    Component: NeuronDiagram,
    parts: NEURON_PARTS,
  },
  {
    id: 'synapse',
    title: 'The Synapse',
    subtitle: 'Neurotransmitter release & reception',
    icon: '⚡',
    color: COLORS.purple,
    Component: SynapseDiagram,
    parts: SYNAPSE_PARTS,
  },
  {
    id: 'retina',
    title: 'The Retina',
    subtitle: 'Rods, cones & visual processing',
    icon: '👁️',
    color: COLORS.cyan,
    Component: RetinaDiagram,
    parts: RETINA_PARTS,
  },
  {
    id: 'ear',
    title: 'The Ear & Cochlea',
    subtitle: 'Sound processing from pinna to hair cells',
    icon: '👂',
    color: COLORS.orange,
    Component: EarDiagram,
    parts: EAR_PARTS,
  },
  {
    id: 'stress',
    title: 'Stress Response (HPA Axis)',
    subtitle: 'Hypothalamus → Pituitary → Adrenal cascade',
    icon: '⚖️',
    color: COLORS.red,
    Component: StressResponseDiagram,
    parts: STRESS_PARTS,
  },
];

export default function BrainMapScreen() {
  const [expandedDiagram, setExpandedDiagram] = useState(null);
  const [activeSection, setActiveSection] = useState('brain');

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Brain Map</Text>
          <Text style={styles.headerSubtitle}>
            Explore anatomical brain views and study detailed diagrams
          </Text>
        </View>

        {/* Section Tabs */}
        <View style={styles.sectionTabs}>
          <TouchableOpacity
            style={[styles.sectionTab, activeSection === 'brain' && styles.sectionTabActive]}
            onPress={() => setActiveSection('brain')}
            activeOpacity={0.7}
          >
            <Text style={[styles.sectionTabText, activeSection === 'brain' && styles.sectionTabTextActive]}>
              🧠 Brain Atlas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sectionTab, activeSection === 'diagrams' && styles.sectionTabActive]}
            onPress={() => setActiveSection('diagrams')}
            activeOpacity={0.7}
          >
            <Text style={[styles.sectionTabText, activeSection === 'diagrams' && styles.sectionTabTextActive]}>
              🔬 Zoom In
            </Text>
          </TouchableOpacity>
        </View>

        {activeSection === 'brain' ? (
          <>
            {/* Brain Scan Explorer — anatomical SVG views */}
            <View style={styles.brainSection}>
              <BrainScanExplorer />
            </View>
          </>
        ) : (
          <>
            {/* Diagrams Section */}
            <View style={styles.diagramsSection}>
              <Text style={styles.diagramsSectionTitle}>Zoom In</Text>
              <Text style={styles.diagramsSectionSubtitle}>
                Detailed labeled diagrams with quiz mode
              </Text>

              {DIAGRAMS.map((diagram) => {
                const isExpanded = expandedDiagram === diagram.id;

                return (
                  <View key={diagram.id} style={styles.diagramCard}>
                    <TouchableOpacity
                      style={styles.diagramCardHeader}
                      onPress={() => setExpandedDiagram(isExpanded ? null : diagram.id)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.diagramIconBox, { backgroundColor: diagram.color + '20' }]}>
                        <Text style={styles.diagramIcon}>{diagram.icon}</Text>
                      </View>
                      <View style={styles.diagramTextWrap}>
                        <Text style={styles.diagramTitle}>{diagram.title}</Text>
                        <Text style={styles.diagramSubtitle}>{diagram.subtitle}</Text>
                      </View>
                      <Text style={[styles.expandArrow, { color: diagram.color }]}>
                        {isExpanded ? '▲' : '▼'}
                      </Text>
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={styles.diagramContent}>
                        <LabelQuiz
                          parts={diagram.parts}
                          DiagramComponent={diagram.Component}
                          diagramProps={{ width: SCREEN_WIDTH - SPACING.xl * 4, height: 300 }}
                          title={diagram.title}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl,
  },

  // Header
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.extrabold,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },

  // Section tabs
  sectionTabs: {
    flexDirection: 'row',
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: 3,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
  },
  sectionTabActive: {
    backgroundColor: COLORS.electricBlue,
  },
  sectionTabText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  sectionTabTextActive: {
    color: COLORS.textPrimary,
  },

  // Brain Atlas
  brainSection: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },

  // Diagrams
  diagramsSection: {
    paddingHorizontal: SPACING.xl,
  },
  diagramsSectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.xs,
  },
  diagramsSectionSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.lg,
  },
  diagramCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  diagramCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  diagramIconBox: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  diagramIcon: {
    fontSize: 24,
  },
  diagramTextWrap: {
    flex: 1,
  },
  diagramTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  diagramSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  expandArrow: {
    fontSize: 12,
    marginLeft: SPACING.sm,
  },
  diagramContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },

  bottomSpacer: {
    height: SPACING.xxxl,
  },
});

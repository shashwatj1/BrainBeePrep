import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { diseases } from '../data/diseases';
import ScreenWrapper from '../components/ScreenWrapper';

const SECTION_COLORS = {
  whatIsIt: COLORS.electricBlue,
  symptoms: COLORS.orange,
  causes: COLORS.purple,
  brainChanges: COLORS.cyan,
  treatments: COLORS.green,
  keyFacts: COLORS.yellow,
};

const CATEGORY_COLORS = {
  neurodegenerative: COLORS.red,
  psychiatric: COLORS.purple,
  childhood: COLORS.cyan,
  addiction: COLORS.orange,
  injury: COLORS.yellow,
  neurological: COLORS.teal,
  sleep: COLORS.pink,
};

function getCategoryLabel(key) {
  const labels = {
    neurodegenerative: 'Neurodegenerative',
    psychiatric: 'Psychiatric',
    childhood: 'Childhood',
    addiction: 'Addiction',
    injury: 'Injury',
    neurological: 'Neurological',
    sleep: 'Sleep',
  };
  return labels[key] || key;
}

function Section({ title, borderColor, children }) {
  return (
    <View style={[styles.section, { borderLeftColor: borderColor }]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function DiseaseDetailScreen({ route, navigation }) {
  const { diseaseId } = route.params;
  const disease = diseases.find((d) => d.id === diseaseId);

  if (!disease) {
    return (
      <ScreenWrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Disease not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const catColor = CATEGORY_COLORS[disease.category] || COLORS.electricBlue;

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'‹'}</Text>
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIconContainer, { backgroundColor: catColor + '20' }]}>
            <Text style={styles.headerIcon}>{disease.icon}</Text>
          </View>
          <Text style={styles.headerTitle}>{disease.name}</Text>
          <View style={[styles.headerBadge, { backgroundColor: catColor + '20' }]}>
            <Text style={[styles.headerBadgeText, { color: catColor }]}>
              {getCategoryLabel(disease.category)}
            </Text>
          </View>
        </View>

        {/* What Is It */}
        {disease.whatIsIt && (
          <Section title="What Is It?" borderColor={SECTION_COLORS.whatIsIt}>
            <Text style={styles.bodyText}>{disease.whatIsIt}</Text>
          </Section>
        )}

        {/* Symptoms */}
        {disease.symptoms && disease.symptoms.length > 0 && (
          <Section title="Symptoms" borderColor={SECTION_COLORS.symptoms}>
            {disease.symptoms.map((symptom, index) => (
              <View key={index} style={styles.bulletRow}>
                <View style={[styles.bullet, { backgroundColor: SECTION_COLORS.symptoms }]} />
                <Text style={styles.bulletText}>{symptom}</Text>
              </View>
            ))}
          </Section>
        )}

        {/* Causes */}
        {disease.causes && (
          <Section title="Causes" borderColor={SECTION_COLORS.causes}>
            <Text style={styles.bodyText}>{disease.causes}</Text>
          </Section>
        )}

        {/* Brain Changes */}
        {disease.brainChanges && (
          <Section title="What Happens in the Brain" borderColor={SECTION_COLORS.brainChanges}>
            <Text style={styles.bodyText}>{disease.brainChanges}</Text>
          </Section>
        )}

        {/* Treatments */}
        {disease.treatments && (
          <Section title="Treatments" borderColor={SECTION_COLORS.treatments}>
            <Text style={styles.bodyText}>{disease.treatments}</Text>
          </Section>
        )}

        {/* Key Facts for Brain Bee */}
        {disease.keyFacts && disease.keyFacts.length > 0 && (
          <View style={styles.keyFactsSection}>
            <Text style={styles.keyFactsSectionTitle}>Key Facts for Brain Bee</Text>
            {disease.keyFacts.map((fact, index) => (
              <View key={index} style={styles.keyFactCard}>
                <View style={[styles.keyFactNumber, { backgroundColor: SECTION_COLORS.keyFacts + '30' }]}>
                  <Text style={[styles.keyFactNumberText, { color: SECTION_COLORS.keyFacts }]}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={styles.keyFactText}>{fact}</Text>
              </View>
            ))}
          </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.lg,
  },

  // Back
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  backArrow: {
    color: COLORS.electricBlue,
    fontSize: 28,
    fontWeight: FONTS.weights.bold,
    marginRight: SPACING.xs,
  },
  backLabel: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerIcon: {
    fontSize: 40,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.extrabold,
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: SPACING.sm,
  },
  headerBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
  },
  headerBadgeText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Sections
  section: {
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderLeftWidth: 4,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
  },
  bodyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 24,
    letterSpacing: 0.2,
  },

  // Bullet list
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: SPACING.md,
  },
  bulletText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
    flex: 1,
  },

  // Key Facts
  keyFactsSection: {
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  keyFactsSectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
  },
  keyFactCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  keyFactNumber: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    flexShrink: 0,
  },
  keyFactNumberText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  keyFactText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
    flex: 1,
  },

  bottomSpacer: {
    height: SPACING.xxl,
  },
});

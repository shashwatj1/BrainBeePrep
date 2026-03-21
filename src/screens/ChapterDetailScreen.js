import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { chapters } from '../data/chapters';
import ScreenWrapper from '../components/ScreenWrapper';

export default function ChapterDetailScreen({ route, navigation }) {
  const { chapterId } = route.params;
  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return (
      <ScreenWrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Chapter not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

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
          <View style={[styles.headerIconContainer, { backgroundColor: (chapter.color || COLORS.electricBlue) + '20' }]}>
            <Text style={styles.headerIcon}>{chapter.icon}</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.chapterLabel}>Chapter {chapter.id}</Text>
            <Text style={styles.headerTitle}>{chapter.title}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: (chapter.color || COLORS.electricBlue) + '40' }]} />

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.summaryText}>{chapter.summary}</Text>
        </View>

        {/* Key Facts */}
        {chapter.keyFacts && chapter.keyFacts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Facts</Text>
            <View style={styles.factsContainer}>
              {chapter.keyFacts.map((fact, index) => (
                <View key={index} style={styles.factRow}>
                  <View style={[styles.bulletDot, { backgroundColor: chapter.color || COLORS.electricBlue }]} />
                  <Text style={styles.factText}>{fact}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Did You Know */}
        {chapter.didYouKnow && chapter.didYouKnow.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Did You Know?</Text>
            {chapter.didYouKnow.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.didYouKnowCard,
                  { borderLeftColor: chapter.color || COLORS.electricBlue },
                ]}
              >
                <Text style={styles.didYouKnowIcon}>💡</Text>
                <Text style={styles.didYouKnowText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: chapter.color || COLORS.electricBlue }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Flashcards', { deckId: `chapter_${chapter.id}` })}
          >
            <Text style={styles.primaryButtonIcon}>📚</Text>
            <Text style={styles.primaryButtonText}>Start Studying</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ChapterQuiz', { chapterId: chapter.id })}
          >
            <Text style={styles.secondaryButtonIcon}>🧪</Text>
            <Text style={styles.secondaryButtonText}>Take Quiz</Text>
          </TouchableOpacity>
        </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  headerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  headerIcon: {
    fontSize: 32,
  },
  headerTextContainer: {
    flex: 1,
  },
  chapterLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.extrabold,
    letterSpacing: -0.3,
  },

  divider: {
    height: 2,
    marginHorizontal: SPACING.xl,
    borderRadius: 1,
    marginBottom: SPACING.lg,
  },

  // Sections
  section: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
  },
  summaryText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 24,
    letterSpacing: 0.2,
  },

  // Key Facts
  factsContainer: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: SPACING.md,
  },
  factText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
    flex: 1,
  },

  // Did You Know
  didYouKnowCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  didYouKnowIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
    marginTop: 2,
  },
  didYouKnowText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
    flex: 1,
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  primaryButtonIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  primaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  secondaryButtonIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  secondaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },

  bottomSpacer: {
    height: SPACING.xxl,
  },
});

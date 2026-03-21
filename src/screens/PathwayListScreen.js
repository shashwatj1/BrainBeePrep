import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { pathways } from '../data/pathways';
import ScreenWrapper from '../components/ScreenWrapper';

export default function PathwayListScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'‹'}</Text>
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Pathway Visualizer</Text>
          <Text style={styles.headerSubtitle}>
            Trace neural signals step by step through the brain
          </Text>
        </View>

        <View style={styles.cardList}>
          {pathways.map((pathway) => (
            <TouchableOpacity
              key={pathway.id}
              style={styles.pathwayCard}
              onPress={() =>
                navigation.navigate('PathwayDetail', { pathwayId: pathway.id })
              }
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.cardAccent,
                  { backgroundColor: pathway.color },
                ]}
              />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: pathway.color + '20' },
                    ]}
                  >
                    <Text style={styles.iconText}>{pathway.icon}</Text>
                  </View>
                  <View style={styles.cardTitleBlock}>
                    <Text style={styles.cardTitle}>{pathway.title}</Text>
                    <Text style={styles.cardDescription}>
                      {pathway.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View
                    style={[
                      styles.stepsBadge,
                      { backgroundColor: pathway.color + '20' },
                    ]}
                  >
                    <Text
                      style={[styles.stepsBadgeText, { color: pathway.color }]}
                    >
                      {pathway.steps.length} steps
                    </Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </View>

                {/* Mini step preview */}
                <View style={styles.stepsPreview}>
                  {pathway.steps.slice(0, 4).map((step, index) => (
                    <View key={step.id} style={styles.stepDot}>
                      <View
                        style={[
                          styles.dot,
                          { backgroundColor: pathway.color },
                        ]}
                      />
                      {index < Math.min(pathway.steps.length - 1, 3) && (
                        <View
                          style={[
                            styles.dotLine,
                            { backgroundColor: pathway.color + '40' },
                          ]}
                        />
                      )}
                    </View>
                  ))}
                  {pathway.steps.length > 4 && (
                    <Text style={styles.moreSteps}>
                      +{pathway.steps.length - 4} more
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SPACING.xxxl,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
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
  headerContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: FONTS.sizes.title,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    lineHeight: 22,
  },

  cardList: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
  },

  pathwayCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardAccent: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  iconText: {
    fontSize: 24,
  },
  cardTitleBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  stepsBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
  },
  stepsBadgeText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.surfaceLighter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textSecondary,
  },

  // Mini step preview
  stepsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  stepDot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotLine: {
    width: 20,
    height: 2,
    marginHorizontal: 2,
  },
  moreSteps: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
    marginLeft: SPACING.sm,
  },
});

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { pathways } from '../data/pathways';
import ScreenWrapper from '../components/ScreenWrapper';

export default function PathwayDetailScreen({ route, navigation }) {
  const { pathwayId } = route.params;
  const pathway = pathways.find((p) => p.id === pathwayId);
  const [currentStep, setCurrentStep] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!pathway) return;
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  if (!pathway) {
    return (
      <ScreenWrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Pathway not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const steps = pathway.steps;
  const step = steps[currentStep];

  const goToStep = (direction) => {
    const nextIndex = currentStep + direction;
    if (nextIndex < 0 || nextIndex >= steps.length) return;

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(nextIndex);
    });
  };

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'‹'}</Text>
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View
              style={[
                styles.headerIcon,
                { backgroundColor: pathway.color + '20' },
              ]}
            >
              <Text style={styles.headerIconText}>{pathway.icon}</Text>
            </View>
            <View style={styles.headerTitleBlock}>
              <Text style={styles.headerTitle}>{pathway.title}</Text>
              <Text style={styles.headerDescription}>
                {pathway.description}
              </Text>
            </View>
          </View>
        </View>

        {/* View toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !viewAll && [styles.toggleButtonActive, { backgroundColor: pathway.color + '25' }],
            ]}
            onPress={() => setViewAll(false)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.toggleText,
                !viewAll && [styles.toggleTextActive, { color: pathway.color }],
              ]}
            >
              Step by Step
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewAll && [styles.toggleButtonActive, { backgroundColor: pathway.color + '25' }],
            ]}
            onPress={() => setViewAll(true)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.toggleText,
                viewAll && [styles.toggleTextActive, { color: pathway.color }],
              ]}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {viewAll ? (
          /* ===== VIEW ALL MODE ===== */
          <View style={styles.timelineContainer}>
            {steps.map((s, index) => (
              <View key={s.id} style={styles.timelineItem}>
                {/* Vertical line + circle */}
                <View style={styles.timelineTrack}>
                  <View
                    style={[
                      styles.timelineCircle,
                      { backgroundColor: pathway.color, borderColor: pathway.color },
                    ]}
                  >
                    <Text style={styles.timelineCircleText}>{index + 1}</Text>
                  </View>
                  {index < steps.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        { backgroundColor: pathway.color + '40' },
                      ]}
                    />
                  )}
                </View>

                {/* Step content */}
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineLabel}>{s.label}</Text>
                  <Text style={styles.timelineDescription}>
                    {s.description}
                  </Text>
                  <View
                    style={[
                      styles.regionTag,
                      { backgroundColor: pathway.color + '15' },
                    ]}
                  >
                    <Text
                      style={[styles.regionTagText, { color: pathway.color }]}
                    >
                      {s.region}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          /* ===== STEP BY STEP MODE ===== */
          <View style={styles.stepByStepContainer}>
            {/* Step indicator */}
            <Text style={styles.stepIndicator}>
              Step {currentStep + 1} of {steps.length}
            </Text>

            {/* Progress dots */}
            <View style={styles.progressDots}>
              {steps.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Animated.timing(fadeAnim, {
                      toValue: 0,
                      duration: 150,
                      useNativeDriver: true,
                    }).start(() => {
                      setCurrentStep(index);
                    });
                  }}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.progressDot,
                      index === currentStep
                        ? { backgroundColor: pathway.color, width: 24 }
                        : index < currentStep
                        ? { backgroundColor: pathway.color + '60' }
                        : { backgroundColor: COLORS.cardBorder },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Connecting line above */}
            <View style={styles.connectingLineContainer}>
              {currentStep > 0 && (
                <>
                  <View
                    style={[
                      styles.connectingDot,
                      { backgroundColor: pathway.color + '60' },
                    ]}
                  />
                  <View
                    style={[
                      styles.connectingLine,
                      { backgroundColor: pathway.color + '30' },
                    ]}
                  />
                  <View
                    style={[
                      styles.connectingDot,
                      { backgroundColor: pathway.color + '60' },
                    ]}
                  />
                  <View
                    style={[
                      styles.connectingLine,
                      { backgroundColor: pathway.color + '30' },
                    ]}
                  />
                </>
              )}
              <View
                style={[
                  styles.connectingDotLarge,
                  { backgroundColor: pathway.color },
                ]}
              />
              {currentStep < steps.length - 1 && (
                <>
                  <View
                    style={[
                      styles.connectingLine,
                      { backgroundColor: pathway.color + '30' },
                    ]}
                  />
                  <View
                    style={[
                      styles.connectingDot,
                      { backgroundColor: pathway.color + '60' },
                    ]}
                  />
                  <View
                    style={[
                      styles.connectingLine,
                      { backgroundColor: pathway.color + '30' },
                    ]}
                  />
                  <View
                    style={[
                      styles.connectingDot,
                      { backgroundColor: pathway.color + '60' },
                    ]}
                  />
                </>
              )}
            </View>

            {/* Step card */}
            <Animated.View
              style={[styles.stepCard, { opacity: fadeAnim }]}
            >
              <View style={styles.stepCardHeader}>
                <View
                  style={[
                    styles.stepNumberCircle,
                    { backgroundColor: pathway.color },
                  ]}
                >
                  <Text style={styles.stepNumberText}>
                    {currentStep + 1}
                  </Text>
                </View>
                <View
                  style={[
                    styles.stepRegionBadge,
                    { backgroundColor: pathway.color + '15' },
                  ]}
                >
                  <Text
                    style={[
                      styles.stepRegionText,
                      { color: pathway.color },
                    ]}
                  >
                    {step.region}
                  </Text>
                </View>
              </View>

              <Text style={styles.stepLabel}>{step.label}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </Animated.View>

            {/* Navigation buttons */}
            <View style={styles.navButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  currentStep === 0 && styles.navButtonDisabled,
                ]}
                onPress={() => goToStep(-1)}
                disabled={currentStep === 0}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.navButtonText,
                    currentStep === 0 && styles.navButtonTextDisabled,
                  ]}
                >
                  ← Previous
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.navButton,
                  styles.navButtonPrimary,
                  { backgroundColor: pathway.color },
                  currentStep === steps.length - 1 && styles.navButtonDisabled,
                ]}
                onPress={() => goToStep(1)}
                disabled={currentStep === steps.length - 1}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.navButtonText,
                    styles.navButtonPrimaryText,
                    currentStep === steps.length - 1 &&
                      styles.navButtonTextDisabled,
                  ]}
                >
                  Next →
                </Text>
              </TouchableOpacity>
            </View>

            {/* Completion message */}
            {currentStep === steps.length - 1 && (
              <View style={styles.completionContainer}>
                <Text style={styles.completionIcon}>✓</Text>
                <Text style={styles.completionText}>
                  Pathway complete! You've traced the full {pathway.title}.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SPACING.xxxl * 2,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textMuted,
  },

  // Back
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

  // Header
  headerContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  headerIconText: {
    fontSize: 28,
  },
  headerTitleBlock: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },
  headerDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  // Toggle
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.lg,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: 3,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
  },
  toggleButtonActive: {
    borderWidth: 0,
  },
  toggleText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textMuted,
  },
  toggleTextActive: {
    fontWeight: FONTS.weights.bold,
  },

  // ===== VIEW ALL (Timeline) =====
  timelineContainer: {
    paddingHorizontal: SPACING.lg,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 100,
  },
  timelineTrack: {
    alignItems: 'center',
    width: 40,
    marginRight: SPACING.md,
  },
  timelineCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineCircleText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },
  timelineLine: {
    width: 3,
    flex: 1,
    borderRadius: 1.5,
    minHeight: 20,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: SPACING.xl,
  },
  timelineLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  timelineDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  regionTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.round,
  },
  regionTagText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
  },

  // ===== STEP BY STEP =====
  stepByStepContainer: {
    paddingHorizontal: SPACING.lg,
  },
  stepIndicator: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },

  // Progress dots
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xl,
  },
  progressDot: {
    height: 6,
    width: 6,
    borderRadius: 3,
  },

  // Connecting line
  connectingLineContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  connectingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  connectingDotLarge: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  connectingLine: {
    width: 2,
    height: 16,
  },

  // Step card
  stepCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  stepCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  stepNumberCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.extrabold,
    color: COLORS.textPrimary,
  },
  stepRegionBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
  },
  stepRegionText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },
  stepLabel: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    lineHeight: 28,
  },
  stepDescription: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },

  // Nav buttons
  navButtonsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  navButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  navButtonPrimary: {
    borderWidth: 0,
  },
  navButtonDisabled: {
    opacity: 0.35,
  },
  navButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textSecondary,
  },
  navButtonPrimaryText: {
    color: COLORS.textPrimary,
  },
  navButtonTextDisabled: {
    color: COLORS.textMuted,
  },

  // Completion
  completionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success + '15',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
  },
  completionIcon: {
    fontSize: 20,
    color: COLORS.success,
    marginRight: SPACING.md,
    fontWeight: FONTS.weights.bold,
  },
  completionText: {
    flex: 1,
    fontSize: FONTS.sizes.sm,
    color: COLORS.success,
    lineHeight: 20,
  },
});

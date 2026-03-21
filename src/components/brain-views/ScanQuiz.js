import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../utils/theme';

const QUIZ_STRUCTURES = [
  { id: 'corpus_callosum', name: 'Corpus Callosum' },
  { id: 'hippocampus', name: 'Hippocampus' },
  { id: 'thalamus', name: 'Thalamus' },
  { id: 'hypothalamus', name: 'Hypothalamus' },
  { id: 'cerebellum', name: 'Cerebellum' },
  { id: 'brainstem', name: 'Brainstem' },
  { id: 'ventricles', name: 'Ventricles' },
  { id: 'frontal_lobe', name: 'Frontal Lobe' },
  { id: 'parietal_lobe', name: 'Parietal Lobe' },
  { id: 'temporal_lobe', name: 'Temporal Lobe' },
  { id: 'occipital_lobe', name: 'Occipital Lobe' },
  { id: 'amygdala', name: 'Amygdala' },
  { id: 'basal_ganglia', name: 'Basal Ganglia' },
];

// Quiz uses the diagram component passed in, with numbered arrows
export default function ScanQuiz({ DiagramComponent, diagramProps, regions }) {
  const [answers, setAnswers] = useState({});
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Pick structures that exist in the diagram's regions
  const quizItems = useMemo(() => {
    const available = regions.filter((r) =>
      QUIZ_STRUCTURES.some((qs) => qs.id === r.id)
    );
    // Take up to 10 for quiz
    return available.slice(0, 10).map((r, i) => ({
      number: i + 1,
      ...r,
      correctName: QUIZ_STRUCTURES.find((qs) => qs.id === r.id)?.name || r.name,
    }));
  }, [regions]);

  const shuffledOptions = useMemo(() => {
    return [...quizItems].sort(() => Math.random() - 0.5);
  }, [quizItems, showResults]);

  const handleNumberPress = (number) => {
    if (showResults) return;
    setSelectedNumber(number === selectedNumber ? null : number);
  };

  const handleOptionPress = (itemId) => {
    if (showResults || selectedNumber === null) return;
    setAnswers((prev) => ({ ...prev, [selectedNumber]: itemId }));
    setSelectedNumber(null);
  };

  const checkAnswers = () => setShowResults(true);

  const resetQuiz = () => {
    setAnswers({});
    setSelectedNumber(null);
    setShowResults(false);
  };

  const score = showResults
    ? quizItems.filter((item) => answers[item.number] === item.id).length
    : 0;

  const isOptionUsed = (id) => Object.values(answers).includes(id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Label the Scan</Text>
      <Text style={styles.subtitle}>
        Identify numbered structures on the brain diagram
      </Text>

      {/* Diagram with numbered hotspots */}
      <View style={styles.diagramWrap}>
        <DiagramComponent
          {...diagramProps}
          showLabels={false}
          highlightedRegion={
            selectedNumber
              ? quizItems.find((q) => q.number === selectedNumber)?.id
              : null
          }
        />
        {/* Number overlays */}
        {quizItems.map((item) => {
          const status = showResults
            ? answers[item.number] === item.id
              ? 'correct'
              : answers[item.number]
              ? 'incorrect'
              : 'unanswered'
            : answers[item.number]
            ? 'answered'
            : 'empty';

          return (
            <TouchableOpacity
              key={item.number}
              style={[
                styles.numberBubble,
                {
                  left: `${item.x - 3}%`,
                  top: `${item.y - 3}%`,
                },
                selectedNumber === item.number && styles.numberBubbleSelected,
                status === 'correct' && styles.numberBubbleCorrect,
                status === 'incorrect' && styles.numberBubbleIncorrect,
                status === 'answered' && styles.numberBubbleAnswered,
              ]}
              onPress={() => handleNumberPress(item.number)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.numberText,
                  (status === 'correct' || status === 'incorrect') && styles.numberTextResult,
                ]}
              >
                {item.number}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Results */}
      {showResults && (
        <View style={styles.scoreCard}>
          <Text style={styles.scoreText}>
            {score}/{quizItems.length} correct ({Math.round((score / quizItems.length) * 100)}%)
          </Text>
          <TouchableOpacity style={styles.retryBtn} onPress={resetQuiz}>
            <Text style={styles.retryBtnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Answer slots */}
      <View style={styles.slotsSection}>
        <Text style={styles.slotsTitle}>
          {selectedNumber
            ? `Select the structure for #${selectedNumber}`
            : 'Tap a number, then pick the matching structure'}
        </Text>

        {quizItems.map((item) => {
          const answeredId = answers[item.number];
          const answeredName = answeredId
            ? quizItems.find((q) => q.id === answeredId)?.correctName || answeredId
            : null;
          const status = showResults
            ? answers[item.number] === item.id
              ? 'correct'
              : 'incorrect'
            : null;

          return (
            <TouchableOpacity
              key={item.number}
              style={[
                styles.slot,
                selectedNumber === item.number && styles.slotActive,
                status === 'correct' && styles.slotCorrect,
                status === 'incorrect' && styles.slotIncorrect,
              ]}
              onPress={() => handleNumberPress(item.number)}
              activeOpacity={0.7}
            >
              <View style={styles.slotNum}>
                <Text style={styles.slotNumText}>{item.number}</Text>
              </View>
              <Text style={[styles.slotAnswer, answeredName && styles.slotAnswerFilled]}>
                {answeredName || '—'}
              </Text>
              {status === 'incorrect' && (
                <Text style={styles.slotCorrection}>{item.correctName}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Options */}
      {!showResults && (
        <View style={styles.optionsSection}>
          <Text style={styles.optionsLabel}>Structures</Text>
          <View style={styles.optionsWrap}>
            {shuffledOptions.map((item) => {
              const used = isOptionUsed(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.optionChip,
                    used && styles.optionUsed,
                    selectedNumber && !used && styles.optionHighlight,
                  ]}
                  onPress={() => handleOptionPress(item.id)}
                  disabled={used || !selectedNumber}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionText, used && styles.optionTextUsed]}>
                    {item.correctName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* Check button */}
      {!showResults && Object.keys(answers).length > 0 && (
        <TouchableOpacity
          style={[
            styles.checkBtn,
            Object.keys(answers).length === quizItems.length && styles.checkBtnReady,
          ]}
          onPress={checkAnswers}
        >
          <Text style={styles.checkBtnText}>
            Check ({Object.keys(answers).length}/{quizItems.length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.xxl,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.lg,
  },
  diagramWrap: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  numberBubble: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.electricBlue + '90',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.electricBlue,
    zIndex: 10,
  },
  numberBubbleSelected: {
    backgroundColor: COLORS.electricBlue,
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.2 }],
  },
  numberBubbleCorrect: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  numberBubbleIncorrect: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  numberBubbleAnswered: {
    backgroundColor: COLORS.electricBlue + 'CC',
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: FONTS.weights.bold,
  },
  numberTextResult: {
    color: '#FFFFFF',
  },
  scoreCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.electricBlue + '40',
  },
  scoreText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.extrabold,
  },
  retryBtn: {
    backgroundColor: COLORS.electricBlue,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
  slotsSection: {
    marginBottom: SPACING.lg,
  },
  slotsTitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontStyle: 'italic',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  slotActive: {
    borderColor: COLORS.electricBlue,
    backgroundColor: COLORS.electricBlue + '10',
  },
  slotCorrect: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.green + '10',
  },
  slotIncorrect: {
    borderColor: COLORS.red,
    backgroundColor: COLORS.red + '10',
  },
  slotNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceLighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  slotNumText: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  slotAnswer: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    flex: 1,
  },
  slotAnswerFilled: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.medium,
  },
  slotCorrection: {
    color: COLORS.green,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
  },
  optionsSection: {
    marginBottom: SPACING.lg,
  },
  optionsLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  optionChip: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  optionUsed: {
    opacity: 0.3,
  },
  optionHighlight: {
    borderColor: COLORS.electricBlue + '60',
  },
  optionText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  optionTextUsed: {
    textDecorationLine: 'line-through',
  },
  checkBtn: {
    backgroundColor: COLORS.surfaceLight,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  checkBtnReady: {
    backgroundColor: COLORS.electricBlue,
    borderColor: COLORS.electricBlue,
  },
  checkBtnText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
});

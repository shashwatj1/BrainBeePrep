import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';

export default function LabelQuiz({ parts, DiagramComponent, diagramProps = {}, title }) {
  const [mode, setMode] = useState('study'); // 'study' or 'quiz'
  const [answers, setAnswers] = useState({});
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Shuffle parts for quiz
  const shuffledOptions = useMemo(() => {
    return [...parts].sort(() => Math.random() - 0.5);
  }, [mode]);

  // Map part index to quiz number
  const quizNumbers = useMemo(() => {
    const map = {};
    parts.forEach((part, i) => {
      map[part.id] = i + 1;
    });
    return map;
  }, [parts]);

  const handleOptionPress = (partId) => {
    if (showResults) return;
    if (selectedNumber !== null) {
      // Assign this option to the selected number
      const numberPartId = parts[selectedNumber - 1].id;
      setAnswers((prev) => ({ ...prev, [numberPartId]: partId }));
      setSelectedNumber(null);
    }
  };

  const handleNumberPress = (number) => {
    if (showResults) return;
    setSelectedNumber(number === selectedNumber ? null : number);
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setSelectedNumber(null);
    setShowResults(false);
    setMode('quiz');
  };

  const score = showResults
    ? parts.filter((part) => answers[part.id] === part.id).length
    : 0;

  const isOptionUsed = (partId) => {
    return Object.values(answers).includes(partId);
  };

  const getAnswerStatus = (partId) => {
    if (!showResults) return null;
    if (answers[partId] === partId) return 'correct';
    if (answers[partId]) return 'incorrect';
    return 'unanswered';
  };

  return (
    <View style={styles.container}>
      {/* Mode toggle */}
      <View style={styles.modeToggle}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'study' && styles.modeButtonActive]}
          onPress={() => { setMode('study'); setShowResults(false); setAnswers({}); }}
          activeOpacity={0.7}
        >
          <Text style={[styles.modeButtonText, mode === 'study' && styles.modeButtonTextActive]}>
            Study
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'quiz' && styles.modeButtonActive]}
          onPress={() => resetQuiz()}
          activeOpacity={0.7}
        >
          <Text style={[styles.modeButtonText, mode === 'quiz' && styles.modeButtonTextActive]}>
            Quiz
          </Text>
        </TouchableOpacity>
      </View>

      {/* Diagram */}
      <View style={styles.diagramContainer}>
        <DiagramComponent
          {...diagramProps}
          showLabels={mode === 'study'}
          highlightedParts={selectedNumber ? [parts[selectedNumber - 1].id] : []}
          onPartPress={(partId) => {
            if (mode === 'quiz') {
              const number = quizNumbers[partId];
              if (number) handleNumberPress(number);
            }
          }}
        />
      </View>

      {mode === 'study' ? (
        /* Study mode: show part descriptions */
        <View style={styles.partsListStudy}>
          {parts.map((part) => (
            <View key={part.id} style={styles.partItemStudy}>
              <View style={[styles.partDot, { backgroundColor: COLORS.electricBlue }]} />
              <View style={styles.partTextWrap}>
                <Text style={styles.partName}>{part.name}</Text>
                <Text style={styles.partDesc}>{part.description}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        /* Quiz mode: matching interface */
        <View style={styles.quizContainer}>
          {showResults && (
            <View style={styles.scoreCard}>
              <Text style={styles.scoreText}>
                {score}/{parts.length} correct
              </Text>
              <Text style={styles.scorePercent}>
                {Math.round((score / parts.length) * 100)}%
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={resetQuiz}>
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.quizInstruction}>
            {selectedNumber
              ? `Select the term for #${selectedNumber}`
              : 'Tap a number on the diagram, then select the matching term'}
          </Text>

          {/* Answer slots */}
          <View style={styles.slotsContainer}>
            {parts.map((part, index) => {
              const number = index + 1;
              const answeredPartId = answers[part.id];
              const answeredPart = answeredPartId
                ? parts.find((p) => p.id === answeredPartId)
                : null;
              const status = getAnswerStatus(part.id);

              return (
                <TouchableOpacity
                  key={part.id}
                  style={[
                    styles.slot,
                    selectedNumber === number && styles.slotSelected,
                    status === 'correct' && styles.slotCorrect,
                    status === 'incorrect' && styles.slotIncorrect,
                  ]}
                  onPress={() => handleNumberPress(number)}
                  activeOpacity={0.7}
                >
                  <View style={styles.slotNumber}>
                    <Text style={styles.slotNumberText}>{number}</Text>
                  </View>
                  <Text
                    style={[
                      styles.slotText,
                      answeredPart && styles.slotTextFilled,
                    ]}
                    numberOfLines={1}
                  >
                    {answeredPart ? answeredPart.name : '— tap to assign —'}
                  </Text>
                  {status === 'incorrect' && (
                    <Text style={styles.correctAnswer} numberOfLines={1}>
                      Correct: {part.name}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Options to choose from */}
          {!showResults && (
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsTitle}>Terms</Text>
              <View style={styles.optionsWrap}>
                {shuffledOptions.map((part) => {
                  const used = isOptionUsed(part.id);
                  return (
                    <TouchableOpacity
                      key={part.id}
                      style={[
                        styles.optionChip,
                        used && styles.optionChipUsed,
                        selectedNumber && !used && styles.optionChipHighlight,
                      ]}
                      onPress={() => handleOptionPress(part.id)}
                      disabled={used || !selectedNumber}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.optionChipText,
                          used && styles.optionChipTextUsed,
                        ]}
                        numberOfLines={1}
                      >
                        {part.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Check answers button */}
          {!showResults && Object.keys(answers).length > 0 && (
            <TouchableOpacity
              style={[
                styles.checkButton,
                Object.keys(answers).length === parts.length && styles.checkButtonReady,
              ]}
              onPress={checkAnswers}
              activeOpacity={0.7}
            >
              <Text style={styles.checkButtonText}>
                Check Answers ({Object.keys(answers).length}/{parts.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xxl,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: 3,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  modeButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
  },
  modeButtonActive: {
    backgroundColor: COLORS.electricBlue,
  },
  modeButtonText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },
  modeButtonTextActive: {
    color: COLORS.textPrimary,
  },
  diagramContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  // Study mode
  partsListStudy: {
    gap: SPACING.md,
  },
  partItemStudy: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  partDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
    marginRight: SPACING.md,
  },
  partTextWrap: {
    flex: 1,
  },
  partName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginBottom: 2,
  },
  partDesc: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
  },
  // Quiz mode
  quizContainer: {
    gap: SPACING.md,
  },
  scoreCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.electricBlue + '40',
  },
  scoreText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.extrabold,
  },
  scorePercent: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginTop: SPACING.xs,
  },
  retryButton: {
    backgroundColor: COLORS.electricBlue,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
  },
  retryButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
  quizInstruction: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Slots
  slotsContainer: {
    gap: SPACING.sm,
  },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  slotSelected: {
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
  slotNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  slotNumberText: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  slotText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    flex: 1,
  },
  slotTextFilled: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.medium,
  },
  correctAnswer: {
    color: COLORS.green,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  // Options
  optionsContainer: {
    marginTop: SPACING.sm,
  },
  optionsTitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
  optionChipUsed: {
    opacity: 0.3,
  },
  optionChipHighlight: {
    borderColor: COLORS.electricBlue + '60',
  },
  optionChipText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  optionChipTextUsed: {
    textDecorationLine: 'line-through',
  },
  // Check button
  checkButton: {
    backgroundColor: COLORS.surfaceLight,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginTop: SPACING.sm,
  },
  checkButtonReady: {
    backgroundColor: COLORS.electricBlue,
    borderColor: COLORS.electricBlue,
  },
  checkButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
});

import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { neurotransmitters } from '../data/neurotransmitters';
import ScreenWrapper from '../components/ScreenWrapper';
import storage from '../utils/storage';

const ROUNDS = [
  { key: 'function', label: 'Primary Function', emoji: '⚙️', field: 'primaryFunction' },
  { key: 'disorder', label: 'Associated Disorder', emoji: '🏥', field: 'tooLittle' },
  { key: 'region', label: 'Active Brain Region', emoji: '🧠', field: 'activeRegions' },
  { key: 'drug', label: 'Drug That Affects It', emoji: '💊', field: 'drugs' },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getFieldValue(nt, field) {
  const val = nt[field];
  if (Array.isArray(val)) return val[0];
  return val;
}

function generateRoundQuestions(roundConfig) {
  const { field } = roundConfig;
  const shuffledNTs = shuffle(neurotransmitters);

  return shuffledNTs.map((nt) => {
    const correctAnswer = getFieldValue(nt, field);
    const others = neurotransmitters.filter((n) => n.id !== nt.id);
    const wrongNTs = shuffle(others).slice(0, 3);
    const wrongAnswers = wrongNTs.map((w) => getFieldValue(w, field));

    const options = shuffle([
      { text: correctAnswer, isCorrect: true },
      ...wrongAnswers.map((w) => ({ text: w, isCorrect: false })),
    ]);

    return {
      nt,
      options,
      correctAnswer,
    };
  });
}

export default function NTMatcherScreen({ navigation }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [roundAnswers, setRoundAnswers] = useState([]);
  const [allRoundResults, setAllRoundResults] = useState([]);
  const [isRoundComplete, setIsRoundComplete] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [started, setStarted] = useState(false);

  const roundQuestions = useMemo(() => {
    if (!started) return [];
    return generateRoundQuestions(ROUNDS[currentRound]);
  }, [currentRound, started]);

  const startGame = () => {
    setStarted(true);
    setCurrentRound(0);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setRoundAnswers([]);
    setAllRoundResults([]);
    setIsRoundComplete(false);
    setIsGameComplete(false);
    storage.updateStreak();
  };

  const handleAnswer = (optionIndex) => {
    if (showResult) return;
    const option = roundQuestions[currentQ].options[optionIndex];
    setSelectedAnswer(optionIndex);
    setShowResult(true);
    setRoundAnswers((prev) => [
      ...prev,
      { questionIndex: currentQ, selected: optionIndex, isCorrect: option.isCorrect },
    ]);
    storage.incrementQuestions(1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= roundQuestions.length) {
      const score = roundAnswers.filter((a) => a.isCorrect).length;
      setAllRoundResults((prev) => [
        ...prev,
        { round: currentRound, score, total: roundQuestions.length, answers: roundAnswers },
      ]);
      setIsRoundComplete(true);
    } else {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const nextRound = () => {
    if (currentRound + 1 >= ROUNDS.length) {
      // Game complete
      const totalScore = allRoundResults.reduce((sum, r) => sum + r.score, 0);
      const totalQuestions = allRoundResults.reduce((sum, r) => sum + r.total, 0);
      storage.saveQuizScore('nt_matcher', totalScore, totalQuestions);
      setIsGameComplete(true);
    } else {
      setCurrentRound(currentRound + 1);
      setCurrentQ(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setRoundAnswers([]);
      setIsRoundComplete(false);
    }
  };

  // Start Screen
  if (!started) {
    return (
      <ScreenWrapper>
        <View style={styles.startContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>{'<'} Back</Text>
          </TouchableOpacity>

          <Text style={styles.startEmoji}>🧪</Text>
          <Text style={styles.startTitle}>NT Matcher</Text>
          <Text style={styles.startSubtitle}>
            Match neurotransmitters to their properties across 4 rounds
          </Text>

          <View style={styles.roundPreview}>
            {ROUNDS.map((round, idx) => (
              <View key={round.key} style={styles.roundPreviewItem}>
                <View style={[styles.roundPreviewBadge, { backgroundColor: COLORS.cyan + '20' }]}>
                  <Text style={styles.roundPreviewEmoji}>{round.emoji}</Text>
                </View>
                <View style={styles.roundPreviewInfo}>
                  <Text style={styles.roundPreviewLabel}>Round {idx + 1}</Text>
                  <Text style={styles.roundPreviewTitle}>{round.label}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.startBtn} onPress={startGame}>
            <Text style={styles.startBtnText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  // Game Complete
  if (isGameComplete) {
    const totalScore = allRoundResults.reduce((sum, r) => sum + r.score, 0);
    const totalQuestions = allRoundResults.reduce((sum, r) => sum + r.total, 0);
    const pct = Math.round((totalScore / totalQuestions) * 100);
    const gradeColor = pct >= 80 ? COLORS.green : pct >= 60 ? COLORS.yellow : COLORS.red;

    return (
      <ScreenWrapper>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.resultsContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsEmoji}>
              {pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '🧪'}
            </Text>
            <Text style={styles.resultsTitle}>Game Complete!</Text>
            <Text style={styles.resultsSubtitle}>NT Matcher Results</Text>
          </View>

          <View style={styles.totalScoreCard}>
            <Text style={[styles.totalScoreNumber, { color: gradeColor }]}>{pct}%</Text>
            <Text style={styles.totalScoreDetail}>
              {totalScore} of {totalQuestions} correct
            </Text>
          </View>

          {/* Round breakdown */}
          {allRoundResults.map((result, idx) => {
            const roundPct = Math.round((result.score / result.total) * 100);
            const rc = roundPct >= 80 ? COLORS.green : roundPct >= 60 ? COLORS.yellow : COLORS.red;
            return (
              <View key={idx} style={styles.roundResultCard}>
                <View style={styles.roundResultHeader}>
                  <Text style={styles.roundResultEmoji}>{ROUNDS[idx].emoji}</Text>
                  <Text style={styles.roundResultLabel}>{ROUNDS[idx].label}</Text>
                  <Text style={[styles.roundResultScore, { color: rc }]}>
                    {result.score}/{result.total}
                  </Text>
                </View>
                <View style={styles.roundResultBar}>
                  <View
                    style={[
                      styles.roundResultBarFill,
                      { width: `${roundPct}%`, backgroundColor: rc },
                    ]}
                  />
                </View>
              </View>
            );
          })}

          <TouchableOpacity style={styles.primaryBtn} onPress={startGame}>
            <Text style={styles.primaryBtnText}>Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, { marginBottom: SPACING.xxxl }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryBtnText}>Back to Quizzes</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenWrapper>
    );
  }

  // Round Complete
  if (isRoundComplete) {
    const latestResult = allRoundResults[allRoundResults.length - 1];
    const roundPct = Math.round((latestResult.score / latestResult.total) * 100);

    return (
      <ScreenWrapper>
        <View style={styles.roundCompleteContainer}>
          <Text style={styles.roundCompleteEmoji}>{ROUNDS[currentRound].emoji}</Text>
          <Text style={styles.roundCompleteTitle}>Round {currentRound + 1} Complete!</Text>
          <Text style={styles.roundCompleteLabel}>{ROUNDS[currentRound].label}</Text>

          <View style={styles.roundScoreBox}>
            <Text
              style={[
                styles.roundScoreText,
                {
                  color:
                    roundPct >= 80 ? COLORS.green : roundPct >= 60 ? COLORS.yellow : COLORS.red,
                },
              ]}
            >
              {latestResult.score} / {latestResult.total}
            </Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={nextRound}>
            <Text style={styles.primaryBtnText}>
              {currentRound + 1 >= ROUNDS.length ? 'See Final Results' : `Round ${currentRound + 2}: ${ROUNDS[currentRound + 1].label}`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  // Quiz Screen
  if (roundQuestions.length === 0) return null;
  const question = roundQuestions[currentQ];
  const round = ROUNDS[currentRound];

  return (
    <ScreenWrapper>
      <View style={styles.quizContainer}>
        {/* Header */}
        <View style={styles.quizHeader}>
          <View style={styles.roundBadge}>
            <Text style={styles.roundBadgeText}>
              Round {currentRound + 1}/{ROUNDS.length}
            </Text>
          </View>
          <Text style={styles.quizHeaderTitle}>{round.label}</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQ + 1) / roundQuestions.length) * 100}%`,
                  backgroundColor: COLORS.cyan,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentQ + 1} / {roundQuestions.length}
          </Text>
        </View>

        <ScrollView
          style={styles.questionScrollView}
          contentContainerStyle={styles.questionContent}
          showsVerticalScrollIndicator={false}
        >
          {/* NT Card */}
          <View style={[styles.ntCard, { borderColor: question.nt.color + '60' }]}>
            <Text style={styles.ntEmoji}>{question.nt.icon}</Text>
            <Text style={[styles.ntName, { color: question.nt.color }]}>{question.nt.name}</Text>
            <Text style={styles.ntType}>{question.nt.type}</Text>
          </View>

          <Text style={styles.matchLabel}>Match the {round.label.toLowerCase()}:</Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              let optStyle = [styles.option];
              let textStyle = [styles.optionText];

              if (showResult) {
                if (option.isCorrect) {
                  optStyle.push(styles.optionCorrect);
                  textStyle.push({ color: COLORS.green });
                } else if (index === selectedAnswer && !option.isCorrect) {
                  optStyle.push(styles.optionWrong);
                  textStyle.push({ color: COLORS.red });
                } else {
                  optStyle.push(styles.optionDimmed);
                  textStyle.push({ color: COLORS.textMuted });
                }
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={optStyle}
                  activeOpacity={showResult ? 1 : 0.7}
                  onPress={() => handleAnswer(index)}
                >
                  <Text style={textStyle} numberOfLines={3}>
                    {option.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Next */}
        {showResult && (
          <View style={styles.nextContainer}>
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>
                {currentQ + 1 >= roundQuestions.length ? 'Finish Round' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  // Start Screen
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  backBtn: {
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.lg,
    alignSelf: 'flex-start',
  },
  backBtnText: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  startEmoji: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  startTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.extrabold,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  startSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
    lineHeight: 22,
  },
  roundPreview: {
    marginBottom: SPACING.xxl,
  },
  roundPreviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  roundPreviewBadge: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  roundPreviewEmoji: {
    fontSize: 22,
  },
  roundPreviewInfo: {
    flex: 1,
  },
  roundPreviewLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 1,
  },
  roundPreviewTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  startBtn: {
    backgroundColor: COLORS.cyan,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  startBtnText: {
    color: COLORS.darkNavy,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },

  // Quiz
  quizContainer: {
    flex: 1,
  },
  quizHeader: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.sm,
    alignItems: 'center',
  },
  roundBadge: {
    backgroundColor: COLORS.cyan + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    marginBottom: SPACING.xs,
  },
  roundBadgeText: {
    color: COLORS.cyan,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 1,
  },
  quizHeaderTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },

  // Progress
  progressRow: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  progressTrack: {
    height: 6,
    backgroundColor: COLORS.surfaceLighter,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: 6,
    borderRadius: BORDER_RADIUS.round,
  },
  progressText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
  },

  // Question
  questionScrollView: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  questionContent: {
    paddingBottom: SPACING.xxl,
  },
  ntCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 2,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  ntEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  ntName: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.extrabold,
    marginBottom: SPACING.xs,
  },
  ntType: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
  },
  matchLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.md,
  },
  optionsContainer: {
    gap: SPACING.sm,
  },
  option: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
  },
  optionCorrect: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.green + '15',
  },
  optionWrong: {
    borderColor: COLORS.red,
    backgroundColor: COLORS.red + '15',
  },
  optionDimmed: {
    opacity: 0.5,
  },
  optionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
  },

  // Next
  nextContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    backgroundColor: COLORS.darkNavy,
  },
  nextBtn: {
    backgroundColor: COLORS.cyan,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  nextBtnText: {
    color: COLORS.darkNavy,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },

  // Round Complete
  roundCompleteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  roundCompleteEmoji: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  roundCompleteTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.extrabold,
    marginBottom: SPACING.xs,
  },
  roundCompleteLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    marginBottom: SPACING.xxl,
  },
  roundScoreBox: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.xxxl,
    marginBottom: SPACING.xxl,
  },
  roundScoreText: {
    fontSize: 40,
    fontWeight: FONTS.weights.extrabold,
    textAlign: 'center',
  },

  // Results
  resultsContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  resultsEmoji: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  resultsTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.extrabold,
  },
  resultsSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },
  totalScoreCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.xxl,
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  totalScoreNumber: {
    fontSize: 56,
    fontWeight: FONTS.weights.extrabold,
    marginBottom: SPACING.xs,
  },
  totalScoreDetail: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  roundResultCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  roundResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  roundResultEmoji: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  roundResultLabel: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    flex: 1,
  },
  roundResultScore: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  roundResultBar: {
    height: 6,
    backgroundColor: COLORS.surfaceLighter,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  roundResultBarFill: {
    height: 6,
    borderRadius: BORDER_RADIUS.round,
  },

  // Buttons
  primaryBtn: {
    backgroundColor: COLORS.cyan,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  primaryBtnText: {
    color: COLORS.darkNavy,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  secondaryBtn: {
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  secondaryBtnText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
});

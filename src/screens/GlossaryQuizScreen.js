import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import glossary from '../data/glossary';
import ScreenWrapper from '../components/ScreenWrapper';
import ProgressBar from '../components/ProgressBar';
import storage from '../utils/storage';

const NUM_QUESTIONS = 20;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(mode) {
  const shuffled = shuffle(glossary);
  const selected = shuffled.slice(0, NUM_QUESTIONS);

  return selected.map((term) => {
    // Pick 3 wrong answers from other terms
    const others = glossary.filter((g) => g.id !== term.id);
    const wrongAnswers = shuffle(others).slice(0, 3);

    let question, correctAnswer, options;

    if (mode === 'definition') {
      // Given term, pick definition
      question = term.term;
      correctAnswer = term.definition;
      options = shuffle([
        { text: term.definition, isCorrect: true },
        ...wrongAnswers.map((w) => ({ text: w.definition, isCorrect: false })),
      ]);
    } else {
      // Given definition, pick term
      question = term.definition;
      correctAnswer = term.term;
      options = shuffle([
        { text: term.term, isCorrect: true },
        ...wrongAnswers.map((w) => ({ text: w.term, isCorrect: false })),
      ]);
    }

    return {
      id: term.id,
      question,
      options,
      correctAnswer,
      term: term.term,
      definition: term.definition,
    };
  });
}

export default function GlossaryQuizScreen({ navigation }) {
  const [mode, setMode] = useState(null); // 'definition' | 'reverse'
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const startQuiz = (selectedMode) => {
    setMode(selectedMode);
    setQuestions(generateQuestions(selectedMode));
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setIsComplete(false);
    storage.updateStreak();
  };

  const handleAnswer = (optionIndex) => {
    if (showResult) return;
    const option = questions[currentQ].options[optionIndex];
    setSelectedAnswer(optionIndex);
    setShowResult(true);
    setAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentQ,
        selected: optionIndex,
        isCorrect: option.isCorrect,
      },
    ]);
    storage.incrementQuestions(1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      const score = answers.filter((a) => a.isCorrect).length;
      storage.saveQuizScore(`glossary_${mode}`, score, questions.length);
      setIsComplete(true);
    } else {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  // Mode Selection Screen
  if (!mode) {
    return (
      <ScreenWrapper>
        <View style={styles.modeContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>{'<'} Back</Text>
          </TouchableOpacity>

          <Text style={styles.modeEmoji}>📖</Text>
          <Text style={styles.modeTitle}>Glossary Quiz</Text>
          <Text style={styles.modeSubtitle}>Choose your challenge mode</Text>

          <TouchableOpacity
            style={styles.modeCard}
            activeOpacity={0.7}
            onPress={() => startQuiz('definition')}
          >
            <View style={[styles.modeCardIcon, { backgroundColor: COLORS.electricBlue + '20' }]}>
              <Text style={styles.modeCardEmoji}>📝</Text>
            </View>
            <View style={styles.modeCardInfo}>
              <Text style={styles.modeCardTitle}>Definition Match</Text>
              <Text style={styles.modeCardDesc}>
                Given a term, pick the correct definition
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeCard}
            activeOpacity={0.7}
            onPress={() => startQuiz('reverse')}
          >
            <View style={[styles.modeCardIcon, { backgroundColor: COLORS.purple + '20' }]}>
              <Text style={styles.modeCardEmoji}>🔄</Text>
            </View>
            <View style={styles.modeCardInfo}>
              <Text style={styles.modeCardTitle}>Reverse Match</Text>
              <Text style={styles.modeCardDesc}>
                Given a definition, pick the correct term
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.modeInfo}>{NUM_QUESTIONS} questions per session</Text>
        </View>
      </ScreenWrapper>
    );
  }

  // Results Screen
  if (isComplete) {
    const score = answers.filter((a) => a.isCorrect).length;
    const pct = Math.round((score / questions.length) * 100);
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
              {pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}
            </Text>
            <Text style={styles.resultsTitle}>Quiz Complete!</Text>
            <Text style={styles.resultsSubtitle}>
              {mode === 'definition' ? 'Definition Match' : 'Reverse Match'}
            </Text>
          </View>

          <View style={styles.scoreCard}>
            <Text style={[styles.scoreNumber, { color: gradeColor }]}>{pct}%</Text>
            <Text style={styles.scoreDetail}>
              {score} of {questions.length} correct
            </Text>
            <View style={styles.scoreBarContainer}>
              <ProgressBar progress={pct / 100} color={gradeColor} height={10} />
            </View>
          </View>

          <Text style={styles.reviewTitle}>Review</Text>
          {questions.map((q, idx) => {
            const answer = answers[idx];
            const wasCorrect = answer?.isCorrect;
            return (
              <View
                key={q.id + '_' + idx}
                style={[styles.reviewCard, { borderLeftColor: wasCorrect ? COLORS.green : COLORS.red }]}
              >
                <View style={styles.reviewRow}>
                  <Text style={styles.reviewIndicator}>{wasCorrect ? '✓' : '✗'}</Text>
                  <View style={styles.reviewContent}>
                    <Text style={styles.reviewTerm}>{q.term}</Text>
                    <Text style={styles.reviewDefinition} numberOfLines={3}>
                      {q.definition}
                    </Text>
                    {!wasCorrect && (
                      <Text style={styles.reviewWrongAnswer}>
                        You chose: {q.options[answer?.selected]?.text?.substring(0, 80)}...
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            );
          })}

          <TouchableOpacity style={styles.primaryBtn} onPress={() => startQuiz(mode)}>
            <Text style={styles.primaryBtnText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setMode(null)}>
            <Text style={styles.secondaryBtnText}>Change Mode</Text>
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

  // Quiz Screen
  const question = questions[currentQ];

  return (
    <ScreenWrapper>
      <View style={styles.quizContainer}>
        {/* Header */}
        <View style={styles.quizHeader}>
          <TouchableOpacity onPress={() => setMode(null)} style={styles.backBtn}>
            <Text style={styles.backBtnText}>{'<'} Back</Text>
          </TouchableOpacity>
          <Text style={styles.quizHeaderTitle}>
            {mode === 'definition' ? 'Definition Match' : 'Reverse Match'}
          </Text>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={(currentQ + 1) / questions.length}
            color={COLORS.purple}
            height={6}
          />
          <Text style={styles.progressText}>
            {currentQ + 1} of {questions.length}
          </Text>
        </View>

        {/* Question */}
        <ScrollView
          style={styles.questionScrollView}
          contentContainerStyle={styles.questionContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.questionBox}>
            <Text style={styles.questionLabel}>
              {mode === 'definition' ? 'TERM' : 'DEFINITION'}
            </Text>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>

          <Text style={styles.pickLabel}>
            {mode === 'definition' ? 'Pick the correct definition:' : 'Pick the correct term:'}
          </Text>

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
                  <Text style={textStyle} numberOfLines={mode === 'definition' ? 4 : 2}>
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
                {currentQ + 1 >= questions.length ? 'See Results' : 'Next'}
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

  // Mode Selection
  modeContainer: {
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
  modeEmoji: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  modeTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.extrabold,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  modeSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    marginBottom: SPACING.xxxl,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  modeCardIcon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  modeCardEmoji: {
    fontSize: 28,
  },
  modeCardInfo: {
    flex: 1,
  },
  modeCardTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.xs,
  },
  modeCardDesc: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 19,
  },
  modeInfo: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },

  // Quiz
  quizContainer: {
    flex: 1,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.sm,
  },
  quizHeaderTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  progressText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  questionScrollView: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  questionContent: {
    paddingBottom: SPACING.xxl,
  },
  questionBox: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.purple + '40',
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  questionLabel: {
    color: COLORS.purple,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 2,
    marginBottom: SPACING.sm,
  },
  questionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.medium,
    lineHeight: 26,
  },
  pickLabel: {
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
    backgroundColor: COLORS.purple,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  nextBtnText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
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
  scoreCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.xxl,
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  scoreNumber: {
    fontSize: 56,
    fontWeight: FONTS.weights.extrabold,
    marginBottom: SPACING.xs,
  },
  scoreDetail: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    marginBottom: SPACING.lg,
  },
  scoreBarContainer: {
    width: '100%',
  },
  reviewTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.lg,
  },
  reviewCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reviewIndicator: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginRight: SPACING.sm,
    marginTop: 1,
  },
  reviewContent: {
    flex: 1,
  },
  reviewTerm: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.xs,
  },
  reviewDefinition: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 19,
  },
  reviewWrongAnswer: {
    color: COLORS.red,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
  },

  // Buttons
  primaryBtn: {
    backgroundColor: COLORS.purple,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  primaryBtnText: {
    color: COLORS.textPrimary,
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

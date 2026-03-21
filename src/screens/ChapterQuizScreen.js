import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { quizQuestions } from '../data/quizQuestions';
import { chapters } from '../data/chapters';
import ScreenWrapper from '../components/ScreenWrapper';
import ProgressBar from '../components/ProgressBar';
import storage from '../utils/storage';

const NUM_QUESTIONS = 10;

export default function ChapterQuizScreen({ route, navigation }) {
  const { chapterId } = route.params;
  const allQuestions = quizQuestions[chapterId] || [];
  const chapter = chapters.find((c) => c.id === chapterId);

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]); // { questionIndex, selected, correct }
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Shuffle and pick NUM_QUESTIONS
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, NUM_QUESTIONS));
    storage.updateStreak();
  }, []);

  const handleAnswer = (optionIndex) => {
    if (showExplanation) return;
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    const question = questions[currentQ];
    setAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentQ,
        selected: optionIndex,
        correct: question.correct,
        isCorrect: optionIndex === question.correct,
      },
    ]);

    storage.incrementQuestions(1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      // Quiz complete
      const score = answers.filter((a) => a.isCorrect).length + (selectedAnswer === questions[currentQ]?.correct ? 0 : 0);
      // Score already tracked in answers, save it
      const finalScore = [...answers].filter((a) => a.isCorrect).length;
      storage.saveQuizScore(chapterId, finalScore, questions.length);
      setIsComplete(true);
    } else {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getOptionStyle = (index) => {
    if (!showExplanation) {
      return styles.option;
    }
    const question = questions[currentQ];
    if (index === question.correct) {
      return [styles.option, styles.optionCorrect];
    }
    if (index === selectedAnswer && index !== question.correct) {
      return [styles.option, styles.optionWrong];
    }
    return [styles.option, styles.optionDimmed];
  };

  const getOptionTextStyle = (index) => {
    if (!showExplanation) return styles.optionText;
    const question = questions[currentQ];
    if (index === question.correct) return [styles.optionText, { color: COLORS.green }];
    if (index === selectedAnswer && index !== question.correct)
      return [styles.optionText, { color: COLORS.red }];
    return [styles.optionText, { color: COLORS.textMuted }];
  };

  if (questions.length === 0) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No questions available for this chapter.</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

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
          {/* Results Header */}
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsEmoji}>
              {pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}
            </Text>
            <Text style={styles.resultsTitle}>Quiz Complete!</Text>
            <Text style={styles.resultsChapter}>{chapter?.title || `Chapter ${chapterId}`}</Text>
          </View>

          {/* Score Card */}
          <View style={styles.scoreCard}>
            <Text style={[styles.scoreNumber, { color: gradeColor }]}>{pct}%</Text>
            <Text style={styles.scoreDetail}>
              {score} of {questions.length} correct
            </Text>
            <View style={styles.scoreBarContainer}>
              <ProgressBar progress={pct / 100} color={gradeColor} height={10} />
            </View>
          </View>

          {/* Review */}
          <Text style={styles.reviewTitle}>Review</Text>
          {questions.map((q, idx) => {
            const answer = answers[idx];
            const wasCorrect = answer?.isCorrect;
            return (
              <View
                key={q.id || idx}
                style={[
                  styles.reviewCard,
                  { borderLeftColor: wasCorrect ? COLORS.green : COLORS.red },
                ]}
              >
                <View style={styles.reviewQuestionRow}>
                  <Text style={styles.reviewIndicator}>{wasCorrect ? '✓' : '✗'}</Text>
                  <Text style={styles.reviewQuestion}>{q.question}</Text>
                </View>
                {!wasCorrect && (
                  <View style={styles.reviewAnswers}>
                    <Text style={styles.reviewYourAnswer}>
                      Your answer: {q.options[answer?.selected]}
                    </Text>
                    <Text style={styles.reviewCorrectAnswer}>
                      Correct: {q.options[q.correct]}
                    </Text>
                  </View>
                )}
                <Text style={styles.reviewExplanation}>{q.explanation}</Text>
              </View>
            );
          })}

          {/* Actions */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => {
              const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
              setQuestions(shuffled.slice(0, NUM_QUESTIONS));
              setCurrentQ(0);
              setSelectedAnswer(null);
              setShowExplanation(false);
              setAnswers([]);
              setIsComplete(false);
            }}
          >
            <Text style={styles.primaryBtnText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnText}>Back to Quizzes</Text>
          </TouchableOpacity>

          <View style={{ height: SPACING.xxxl }} />
        </ScrollView>
      </ScreenWrapper>
    );
  }

  const question = questions[currentQ];

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
            <Text style={styles.headerBackText}>{'<'} Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {chapter?.title || `Chapter ${chapterId}`}
          </Text>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={(currentQ + 1) / questions.length}
            color={COLORS.electricBlue}
            height={6}
          />
          <Text style={styles.progressText}>
            Question {currentQ + 1} of {questions.length}
          </Text>
        </View>

        {/* Question */}
        <ScrollView
          style={styles.questionScrollView}
          contentContainerStyle={styles.questionScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.questionText}>{question.question}</Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={getOptionStyle(index)}
                activeOpacity={showExplanation ? 1 : 0.7}
                onPress={() => handleAnswer(index)}
              >
                <View style={styles.optionLetterBox}>
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={getOptionTextStyle(index)}>{option}</Text>
                {showExplanation && index === question.correct && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
                {showExplanation &&
                  index === selectedAnswer &&
                  index !== question.correct && <Text style={styles.crossMark}>✗</Text>}
              </TouchableOpacity>
            ))}
          </View>

          {/* Explanation */}
          {showExplanation && (
            <View style={styles.explanationBox}>
              <Text style={styles.explanationLabel}>
                {selectedAnswer === question.correct ? '🎉 Correct!' : '💡 Explanation'}
              </Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}
        </ScrollView>

        {/* Next Button */}
        {showExplanation && (
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.lg,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  scrollView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.sm,
  },
  headerBackBtn: {
    paddingRight: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  headerBackText: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    flex: 1,
  },

  // Progress
  progressContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  progressText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },

  // Question
  questionScrollView: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  questionScrollContent: {
    paddingBottom: SPACING.xxl,
  },
  questionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.semibold,
    lineHeight: 28,
    marginBottom: SPACING.xl,
  },

  // Options
  optionsContainer: {
    gap: SPACING.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
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
  optionLetterBox: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.surfaceLighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  optionLetter: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  optionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    flex: 1,
    lineHeight: 22,
  },
  checkMark: {
    color: COLORS.green,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginLeft: SPACING.sm,
  },
  crossMark: {
    color: COLORS.red,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginLeft: SPACING.sm,
  },

  // Explanation
  explanationBox: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  explanationLabel: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
  },
  explanationText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
  },

  // Next button
  nextButtonContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    backgroundColor: COLORS.darkNavy,
  },
  nextButton: {
    backgroundColor: COLORS.electricBlue,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  nextButtonText: {
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
  resultsChapter: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },

  // Score card
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

  // Review
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
  reviewQuestionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  reviewIndicator: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginRight: SPACING.sm,
    marginTop: 1,
  },
  reviewQuestion: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    flex: 1,
    lineHeight: 22,
  },
  reviewAnswers: {
    marginLeft: SPACING.xxl,
    marginBottom: SPACING.sm,
  },
  reviewYourAnswer: {
    color: COLORS.red,
    fontSize: FONTS.sizes.sm,
    marginBottom: 2,
  },
  reviewCorrectAnswer: {
    color: COLORS.green,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },
  reviewExplanation: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginLeft: SPACING.xxl,
    lineHeight: 19,
  },

  // Buttons
  primaryBtn: {
    backgroundColor: COLORS.electricBlue,
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

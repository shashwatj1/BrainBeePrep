import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { oralQuestions } from '../data/oralQuestions';
import { chapters } from '../data/chapters';
import ScreenWrapper from '../components/ScreenWrapper';
import ProgressBar from '../components/ProgressBar';
import storage from '../utils/storage';

const QUESTION_COUNTS = [10, 20, 50];
const TIMER_DURATION = 10;

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function OralSimulatorScreen({ navigation }) {
  // Session config
  const [phase, setPhase] = useState('start'); // 'start' | 'question' | 'countdown' | 'reveal' | 'report'
  const [questionCount, setQuestionCount] = useState(20);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Timer
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const timerRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Results
  const [results, setResults] = useState([]); // { question, grade: 'got_it'|'close'|'missed' }

  const currentQuestion = questions[currentIndex] || null;

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startSession = () => {
    const count = questionCount === 'all' ? oralQuestions.length : questionCount;
    const shuffled = shuffleArray(oralQuestions).slice(0, count);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setResults([]);
    setPhase('question');
  };

  const startCountdown = () => {
    setTimeLeft(TIMER_DURATION);
    setPhase('countdown');

    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          pulseAnim.stopAnimation();
          pulseAnim.setValue(1);
          setPhase('reveal');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const revealAnswer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
    setPhase('reveal');
  };

  const gradeAndNext = (grade) => {
    const newResults = [...results, { question: currentQuestion, grade }];
    setResults(newResults);

    if (currentIndex + 1 >= questions.length) {
      // Session complete
      setPhase('report');
      saveResults(newResults);
    } else {
      setCurrentIndex(currentIndex + 1);
      setPhase('question');
    }
  };

  const saveResults = async (finalResults) => {
    const gotIt = finalResults.filter((r) => r.grade === 'got_it').length;
    const close = finalResults.filter((r) => r.grade === 'close').length;
    const missed = finalResults.filter((r) => r.grade === 'missed').length;
    const total = finalResults.length;
    const score = gotIt + close * 0.5;

    await storage.saveOralScore({
      total,
      gotIt,
      close,
      missed,
      score,
      percentage: Math.round((score / total) * 100),
    });
    await storage.incrementQuestions(total);
    await storage.updateStreak();
  };

  const getTimerColor = () => {
    if (timeLeft > 6) return COLORS.green;
    if (timeLeft > 3) return COLORS.yellow;
    return COLORS.red;
  };

  // Compute report data
  const reportData = (() => {
    if (phase !== 'report') return null;
    const gotIt = results.filter((r) => r.grade === 'got_it').length;
    const close = results.filter((r) => r.grade === 'close').length;
    const missed = results.filter((r) => r.grade === 'missed').length;
    const total = results.length;
    const score = gotIt + close * 0.5;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    // Weak area analysis
    const missedByChapter = {};
    results
      .filter((r) => r.grade === 'missed')
      .forEach((r) => {
        const ch = r.question.chapter;
        if (!missedByChapter[ch]) missedByChapter[ch] = 0;
        missedByChapter[ch]++;
      });

    const weakChapters = Object.entries(missedByChapter)
      .sort((a, b) => b[1] - a[1])
      .map(([chId, count]) => {
        const chapter = chapters.find((c) => c.id === parseInt(chId));
        return {
          chapterId: parseInt(chId),
          title: chapter ? `Ch. ${chapter.id}: ${chapter.title}` : `Chapter ${chId}`,
          missedCount: count,
          color: chapter ? chapter.color : COLORS.electricBlue,
        };
      });

    return { gotIt, close, missed, total, score, percentage, weakChapters };
  })();

  // === RENDER PHASES ===

  // START SCREEN
  if (phase === 'start') {
    return (
      <ScreenWrapper>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>{'<'}</Text>
            <Text style={styles.backLabel}>Back</Text>
          </TouchableOpacity>

          <View style={styles.startContainer}>
            {/* Title */}
            <View style={styles.startIconBox}>
              <Text style={styles.startIcon}>🎤</Text>
            </View>
            <Text style={styles.startTitle}>Brain Bee Oral Simulator</Text>
            <Text style={styles.startDescription}>
              Practice for the oral round of the Brain Bee competition. You will be shown a question,
              then have 10 seconds to formulate your answer before it is revealed. Grade yourself
              honestly to track your progress.
            </Text>

            {/* Format info */}
            <View style={styles.formatCard}>
              <Text style={styles.formatTitle}>Competition Format</Text>
              <View style={styles.formatRow}>
                <View style={[styles.formatDot, { backgroundColor: COLORS.cyan }]} />
                <Text style={styles.formatText}>Read the question carefully</Text>
              </View>
              <View style={styles.formatRow}>
                <View style={[styles.formatDot, { backgroundColor: COLORS.yellow }]} />
                <Text style={styles.formatText}>10-second countdown to answer</Text>
              </View>
              <View style={styles.formatRow}>
                <View style={[styles.formatDot, { backgroundColor: COLORS.green }]} />
                <Text style={styles.formatText}>Self-grade: Got It, Close, or Missed</Text>
              </View>
              <View style={styles.formatRow}>
                <View style={[styles.formatDot, { backgroundColor: COLORS.purple }]} />
                <Text style={styles.formatText}>Review performance at the end</Text>
              </View>
            </View>

            {/* Question count selector */}
            <Text style={styles.selectLabel}>Number of Questions</Text>
            <View style={styles.countRow}>
              {QUESTION_COUNTS.map((count) => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.countButton,
                    questionCount === count && styles.countButtonActive,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setQuestionCount(count)}
                >
                  <Text
                    style={[
                      styles.countButtonText,
                      questionCount === count && styles.countButtonTextActive,
                    ]}
                  >
                    {count}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[
                  styles.countButton,
                  questionCount === 'all' && styles.countButtonActive,
                ]}
                activeOpacity={0.7}
                onPress={() => setQuestionCount('all')}
              >
                <Text
                  style={[
                    styles.countButtonText,
                    questionCount === 'all' && styles.countButtonTextActive,
                  ]}
                >
                  All ({oralQuestions.length})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Start Button */}
            <TouchableOpacity
              style={styles.startButton}
              activeOpacity={0.8}
              onPress={startSession}
            >
              <Text style={styles.startButtonText}>Start Session</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenWrapper>
    );
  }

  // QUESTION / COUNTDOWN / REVEAL PHASE
  if (phase === 'question' || phase === 'countdown' || phase === 'reveal') {
    const progress = questions.length > 0 ? (currentIndex + 1) / questions.length : 0;

    return (
      <ScreenWrapper>
        <View style={styles.sessionContainer}>
          {/* Top bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => {
                if (timerRef.current) clearInterval(timerRef.current);
                setPhase('start');
              }}
            >
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
            <Text style={styles.questionCounter}>
              {currentIndex + 1} / {questions.length}
            </Text>
            <View style={styles.topBarRight}>
              <Text style={styles.scorePreview}>
                {results.filter((r) => r.grade === 'got_it').length} correct
              </Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBarWrap}>
            <ProgressBar progress={progress} color={COLORS.electricBlue} height={4} />
          </View>

          {/* Question area */}
          <ScrollView
            style={styles.questionScroll}
            contentContainerStyle={styles.questionScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Difficulty badge */}
            {currentQuestion && (
              <View style={styles.difficultyRow}>
                <View
                  style={[
                    styles.difficultyBadge,
                    {
                      backgroundColor:
                        currentQuestion.difficulty === 'hard'
                          ? COLORS.red + '20'
                          : currentQuestion.difficulty === 'medium'
                          ? COLORS.yellow + '20'
                          : COLORS.green + '20',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      {
                        color:
                          currentQuestion.difficulty === 'hard'
                            ? COLORS.red
                            : currentQuestion.difficulty === 'medium'
                            ? COLORS.yellow
                            : COLORS.green,
                      },
                    ]}
                  >
                    {currentQuestion.difficulty.toUpperCase()}
                  </Text>
                </View>
                {currentQuestion.chapter && (
                  <Text style={styles.chapterLabel}>
                    Chapter {currentQuestion.chapter}
                  </Text>
                )}
              </View>
            )}

            {/* Question text */}
            <Text style={styles.questionText}>
              {currentQuestion ? currentQuestion.question : ''}
            </Text>

            {/* COUNTDOWN TIMER */}
            {phase === 'countdown' && (
              <View style={styles.timerSection}>
                <Animated.View
                  style={[
                    styles.timerCircle,
                    {
                      borderColor: getTimerColor(),
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                >
                  <Text style={[styles.timerNumber, { color: getTimerColor() }]}>
                    {timeLeft}
                  </Text>
                  <Text style={styles.timerLabel}>seconds</Text>
                </Animated.View>

                <TouchableOpacity
                  style={styles.revealEarlyButton}
                  activeOpacity={0.7}
                  onPress={revealAnswer}
                >
                  <Text style={styles.revealEarlyText}>Reveal Answer</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* READY BUTTON */}
            {phase === 'question' && (
              <View style={styles.readySection}>
                <Text style={styles.readyHint}>
                  When you are ready, start the 10-second countdown
                </Text>
                <TouchableOpacity
                  style={styles.readyButton}
                  activeOpacity={0.8}
                  onPress={startCountdown}
                >
                  <Text style={styles.readyButtonText}>I'm Ready</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* ANSWER REVEAL */}
            {phase === 'reveal' && currentQuestion && (
              <View style={styles.answerSection}>
                <View style={styles.answerCard}>
                  <Text style={styles.answerLabel}>CORRECT ANSWER</Text>
                  <Text style={styles.answerText}>{currentQuestion.answer}</Text>
                  {currentQuestion.detail && (
                    <Text style={styles.answerDetail}>{currentQuestion.detail}</Text>
                  )}
                </View>

                {/* Grade buttons */}
                <Text style={styles.gradePrompt}>How did you do?</Text>
                <View style={styles.gradeRow}>
                  <TouchableOpacity
                    style={[styles.gradeButton, { backgroundColor: COLORS.green + '20', borderColor: COLORS.green }]}
                    activeOpacity={0.8}
                    onPress={() => gradeAndNext('got_it')}
                  >
                    <Text style={[styles.gradeEmoji]}>&#10003;</Text>
                    <Text style={[styles.gradeButtonText, { color: COLORS.green }]}>Got It</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.gradeButton, { backgroundColor: COLORS.yellow + '20', borderColor: COLORS.yellow }]}
                    activeOpacity={0.8}
                    onPress={() => gradeAndNext('close')}
                  >
                    <Text style={[styles.gradeEmoji]}>~</Text>
                    <Text style={[styles.gradeButtonText, { color: COLORS.yellow }]}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.gradeButton, { backgroundColor: COLORS.red + '20', borderColor: COLORS.red }]}
                    activeOpacity={0.8}
                    onPress={() => gradeAndNext('missed')}
                  >
                    <Text style={[styles.gradeEmoji]}>&#10007;</Text>
                    <Text style={[styles.gradeButtonText, { color: COLORS.red }]}>Missed</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </ScreenWrapper>
    );
  }

  // REPORT PHASE
  if (phase === 'report' && reportData) {
    const { gotIt, close, missed, total, score, percentage, weakChapters } = reportData;

    const getGradeLabel = (pct) => {
      if (pct >= 90) return 'Outstanding!';
      if (pct >= 75) return 'Great Job!';
      if (pct >= 60) return 'Good Effort';
      if (pct >= 40) return 'Keep Practicing';
      return 'Needs Work';
    };

    const getGradeColor = (pct) => {
      if (pct >= 75) return COLORS.green;
      if (pct >= 50) return COLORS.yellow;
      return COLORS.red;
    };

    return (
      <ScreenWrapper>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.reportContainer}>
            {/* Title */}
            <Text style={styles.reportTitle}>Performance Report</Text>
            <Text style={styles.reportSubtitle}>Oral Simulator Session Complete</Text>

            {/* Score circle */}
            <View style={styles.scoreCircleWrap}>
              <View
                style={[styles.scoreCircle, { borderColor: getGradeColor(percentage) }]}
              >
                <Text style={[styles.scorePercent, { color: getGradeColor(percentage) }]}>
                  {percentage}%
                </Text>
                <Text style={styles.scoreLabel}>{getGradeLabel(percentage)}</Text>
              </View>
            </View>

            {/* Score breakdown */}
            <View style={styles.breakdownCard}>
              <Text style={styles.breakdownTitle}>Score Breakdown</Text>

              <View style={styles.breakdownRow}>
                <View style={[styles.breakdownDot, { backgroundColor: COLORS.green }]} />
                <Text style={styles.breakdownLabel}>Got It</Text>
                <Text style={[styles.breakdownCount, { color: COLORS.green }]}>{gotIt}</Text>
              </View>
              <View style={styles.breakdownDivider} />

              <View style={styles.breakdownRow}>
                <View style={[styles.breakdownDot, { backgroundColor: COLORS.yellow }]} />
                <Text style={styles.breakdownLabel}>Close</Text>
                <Text style={[styles.breakdownCount, { color: COLORS.yellow }]}>{close}</Text>
              </View>
              <View style={styles.breakdownDivider} />

              <View style={styles.breakdownRow}>
                <View style={[styles.breakdownDot, { backgroundColor: COLORS.red }]} />
                <Text style={styles.breakdownLabel}>Missed</Text>
                <Text style={[styles.breakdownCount, { color: COLORS.red }]}>{missed}</Text>
              </View>
              <View style={styles.breakdownDivider} />

              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Total Questions</Text>
                <Text style={styles.breakdownTotal}>{total}</Text>
              </View>
            </View>

            {/* Weak Areas */}
            {weakChapters.length > 0 && (
              <View style={styles.weakSection}>
                <Text style={styles.weakTitle}>Areas to Review</Text>
                <Text style={styles.weakSubtitle}>
                  Focus on these chapters to improve your score
                </Text>
                {weakChapters.map((ch) => (
                  <TouchableOpacity
                    key={ch.chapterId}
                    style={styles.weakCard}
                    activeOpacity={0.7}
                    onPress={() => {
                      try {
                        navigation.navigate('ChapterDetail', { chapterId: ch.chapterId });
                      } catch (e) {}
                    }}
                  >
                    <View
                      style={[
                        styles.weakColorBar,
                        { backgroundColor: ch.color || COLORS.electricBlue },
                      ]}
                    />
                    <View style={styles.weakContent}>
                      <Text style={styles.weakChapterTitle}>{ch.title}</Text>
                      <Text style={styles.weakMissedCount}>
                        {ch.missedCount} question{ch.missedCount > 1 ? 's' : ''} missed
                      </Text>
                    </View>
                    <Text style={styles.chevron}>{'>'}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Missed Questions List */}
            {results.filter((r) => r.grade === 'missed').length > 0 && (
              <View style={styles.missedSection}>
                <Text style={styles.missedTitle}>Missed Questions</Text>
                {results
                  .filter((r) => r.grade === 'missed')
                  .map((r, i) => (
                    <View key={i} style={styles.missedCard}>
                      <Text style={styles.missedQuestion}>{r.question.question}</Text>
                      <View style={styles.missedAnswerRow}>
                        <Text style={styles.missedAnswerLabel}>Answer:</Text>
                        <Text style={styles.missedAnswer}>{r.question.answer}</Text>
                      </View>
                    </View>
                  ))}
              </View>
            )}

            {/* Action buttons */}
            <View style={styles.reportActions}>
              {weakChapters.length > 0 && (
                <TouchableOpacity
                  style={styles.studyWeakButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    try {
                      navigation.navigate('ChapterDetail', {
                        chapterId: weakChapters[0].chapterId,
                      });
                    } catch (e) {}
                  }}
                >
                  <Text style={styles.studyWeakText}>Study Weak Areas</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.retryButton}
                activeOpacity={0.8}
                onPress={() => setPhase('start')}
              >
                <Text style={styles.retryText}>New Session</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.doneButton}
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </ScreenWrapper>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl,
  },

  // Back
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.sm,
  },
  backArrow: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginRight: SPACING.sm,
  },
  backLabel: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },

  // ========== START SCREEN ==========
  startContainer: {
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    paddingTop: SPACING.xl,
  },
  startIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.orange + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  startIcon: {
    fontSize: 40,
  },
  startTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.extrabold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  startDescription: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  formatCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: SPACING.xxl,
  },
  formatTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
  },
  formatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  formatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.md,
  },
  formatText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  selectLabel: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    marginBottom: SPACING.md,
    alignSelf: 'flex-start',
  },
  countRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.xxl,
    width: '100%',
  },
  countButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  countButtonActive: {
    backgroundColor: COLORS.electricBlue + '20',
    borderColor: COLORS.electricBlue,
  },
  countButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  countButtonTextActive: {
    color: COLORS.electricBlue,
  },
  startButton: {
    backgroundColor: COLORS.electricBlue,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: BORDER_RADIUS.lg,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.electricBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },

  // ========== SESSION SCREEN ==========
  sessionContainer: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  exitText: {
    color: COLORS.red,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  questionCounter: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  topBarRight: {
    alignItems: 'flex-end',
  },
  scorePreview: {
    color: COLORS.green,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },
  progressBarWrap: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
  },

  // Question
  questionScroll: {
    flex: 1,
  },
  questionScrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  difficultyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.sm,
  },
  difficultyText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 1,
  },
  chapterLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
  },
  questionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.semibold,
    lineHeight: 30,
    marginBottom: SPACING.xxl,
  },

  // Ready
  readySection: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  readyHint: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  readyButton: {
    backgroundColor: COLORS.electricBlue,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxxl * 1.5,
    borderRadius: BORDER_RADIUS.xl,
    shadowColor: COLORS.electricBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  readyButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },

  // Timer
  timerSection: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkNavy,
    marginBottom: SPACING.xl,
  },
  timerNumber: {
    fontSize: 48,
    fontWeight: FONTS.weights.extrabold,
  },
  timerLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: -2,
  },
  revealEarlyButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  revealEarlyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },

  // Answer
  answerSection: {
    marginTop: SPACING.md,
  },
  answerCard: {
    backgroundColor: COLORS.electricBlue + '10',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.electricBlue + '30',
    marginBottom: SPACING.xl,
  },
  answerLabel: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 1.5,
    marginBottom: SPACING.sm,
  },
  answerText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
  },
  answerDetail: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
  },
  gradePrompt: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  gradeRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  gradeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
  },
  gradeEmoji: {
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    fontWeight: FONTS.weights.bold,
  },
  gradeButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },

  // ========== REPORT SCREEN ==========
  reportContainer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
  },
  reportTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.extrabold,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  reportSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    marginTop: SPACING.xs,
    marginBottom: SPACING.xxl,
  },

  // Score circle
  scoreCircleWrap: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkNavy,
  },
  scorePercent: {
    fontSize: 40,
    fontWeight: FONTS.weights.extrabold,
  },
  scoreLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    marginTop: 2,
  },

  // Breakdown
  breakdownCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: SPACING.xxl,
  },
  breakdownTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.lg,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  breakdownDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: SPACING.md,
  },
  breakdownLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    flex: 1,
  },
  breakdownCount: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  breakdownTotal: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
  },

  // Weak areas
  weakSection: {
    marginBottom: SPACING.xxl,
  },
  weakTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.xs,
  },
  weakSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.lg,
  },
  weakCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  weakColorBar: {
    width: 4,
    height: 36,
    borderRadius: 2,
    marginRight: SPACING.md,
  },
  weakContent: {
    flex: 1,
  },
  weakChapterTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  weakMissedCount: {
    color: COLORS.red,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  chevron: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginLeft: SPACING.sm,
  },

  // Missed questions
  missedSection: {
    marginBottom: SPACING.xxl,
  },
  missedTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.lg,
  },
  missedCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.red,
  },
  missedQuestion: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  missedAnswerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  missedAnswerLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginRight: SPACING.xs,
  },
  missedAnswer: {
    color: COLORS.green,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    flex: 1,
  },

  // Actions
  reportActions: {
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  studyWeakButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    shadowColor: COLORS.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  studyWeakText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  retryButton: {
    backgroundColor: COLORS.electricBlue,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  retryText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  doneButton: {
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  doneText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },

  bottomSpacer: {
    height: SPACING.xxxl,
  },
});

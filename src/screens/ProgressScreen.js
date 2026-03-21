import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { chapters } from '../data/chapters';
import ScreenWrapper from '../components/ScreenWrapper';
import ProgressBar from '../components/ProgressBar';
import storage from '../utils/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = SPACING.md;
const CARD_WIDTH = (SCREEN_WIDTH - SPACING.xl * 2 - CARD_GAP) / 2;
const CIRCLE_SIZE = 160;
const CIRCLE_BORDER = 10;
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getChapterBestScore(scores, chapterId) {
  const attempts = scores[chapterId];
  if (!attempts || attempts.length === 0) return 0;
  let best = 0;
  for (const a of attempts) {
    const pct = a.total > 0 ? Math.round((a.score / a.total) * 100) : 0;
    if (pct > best) best = pct;
  }
  return best;
}

function formatStudyTime(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function ProgressScreen({ navigation }) {
  const [quizScores, setQuizScores] = useState({});
  const [streak, setStreak] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [masteredCards, setMasteredCards] = useState(0);
  const [dailyActivity, setDailyActivity] = useState({});

  const loadData = useCallback(async () => {
    try {
      const [scores, s, tq, tst, mc, da] = await Promise.all([
        storage.getQuizScores(),
        storage.getStreak(),
        storage.getTotalQuestions(),
        storage.getTotalStudyTime(),
        storage.getMasteredCards(),
        storage.getDailyActivity(),
      ]);
      setQuizScores(scores);
      setStreak(s);
      setTotalQuestions(tq);
      setTotalStudyTime(tst);
      setMasteredCards(mc);
      setDailyActivity(da);
    } catch (e) {
      console.warn('ProgressScreen load error:', e);
    }
  }, []);

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation, loadData]);

  // Calculate overall readiness
  const chapterScores = chapters.map((ch) => ({
    ...ch,
    bestScore: getChapterBestScore(quizScores, ch.id),
  }));
  const avgScore = chapterScores.length > 0
    ? Math.round(chapterScores.reduce((sum, c) => sum + c.bestScore, 0) / chapterScores.length)
    : 0;

  // Weakest topics (3 lowest scoring)
  const weakest = [...chapterScores].sort((a, b) => a.bestScore - b.bestScore).slice(0, 3);

  // Weekly activity data
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().split('T')[0];
    const dayIndex = d.getDay();
    last7Days.push({
      key,
      label: DAY_LABELS[dayIndex === 0 ? 6 : dayIndex - 1],
      count: dailyActivity[key] || 0,
    });
  }
  const maxActivity = Math.max(1, ...last7Days.map((d) => d.count));

  // Readiness ring color
  const ringColor = avgScore >= 70 ? COLORS.green : avgScore >= 40 ? COLORS.yellow : COLORS.red;

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Progress</Text>
          <Text style={styles.headerSubtitle}>Track your Brain Bee readiness</Text>
        </View>

        {/* Readiness Circle */}
        <View style={styles.circleContainer}>
          <View style={[styles.circleOuter, { borderColor: ringColor }]}>
            <View style={styles.circleInner}>
              <Text style={[styles.circleScore, { color: ringColor }]}>{avgScore}%</Text>
              <Text style={styles.circleLabel}>Readiness</Text>
            </View>
          </View>
        </View>

        {/* Streak */}
        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakCount}>{streak}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{masteredCards}</Text>
            <Text style={styles.statLabel}>Cards{'\n'}Mastered</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Questions{'\n'}Answered</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatStudyTime(totalStudyTime)}</Text>
            <Text style={styles.statLabel}>Study{'\n'}Time</Text>
          </View>
        </View>

        {/* Chapter Mastery Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Chapter Mastery</Text>
          <Text style={styles.sectionCount}>{chapters.length} chapters</Text>
        </View>

        <View style={styles.chapterGrid}>
          {chapterScores.map((ch) => (
            <View key={ch.id} style={styles.chapterCard}>
              <View style={styles.chapterCardTop}>
                <View style={[styles.chapterIconWrap, { backgroundColor: (ch.color || COLORS.electricBlue) + '20' }]}>
                  <Text style={styles.chapterIcon}>{ch.icon}</Text>
                </View>
                <Text style={styles.chapterScoreText}>{ch.bestScore}%</Text>
              </View>
              <Text style={styles.chapterTitle} numberOfLines={1}>{ch.title}</Text>
              <ProgressBar
                progress={ch.bestScore / 100}
                color={ch.color || COLORS.electricBlue}
                height={6}
              />
            </View>
          ))}
        </View>

        {/* Weakest Topics */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weakest Topics</Text>
        </View>

        {weakest.map((ch) => (
          <TouchableOpacity
            key={ch.id}
            style={styles.weakCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ChapterDetail', { chapterId: ch.id })}
          >
            <View style={styles.weakLeft}>
              <View style={[styles.weakIconWrap, { backgroundColor: (ch.color || COLORS.electricBlue) + '20' }]}>
                <Text style={styles.weakIcon}>{ch.icon}</Text>
              </View>
              <View style={styles.weakInfo}>
                <Text style={styles.weakTitle} numberOfLines={1}>{ch.title}</Text>
                <Text style={styles.weakScore}>Best: {ch.bestScore}%</Text>
              </View>
            </View>
            <View style={styles.studyNowBadge}>
              <Text style={styles.studyNowText}>Study Now</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Weekly Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.barChart}>
            {last7Days.map((day) => (
              <View key={day.key} style={styles.barColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: `${Math.max(day.count > 0 ? 10 : 0, (day.count / maxActivity) * 100)}%`,
                        backgroundColor: day.count > 0 ? COLORS.electricBlue : COLORS.surfaceLighter,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{day.label}</Text>
              </View>
            ))}
          </View>
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
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.lg,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.extrabold,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },

  // Readiness Circle
  circleContainer: {
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  circleOuter: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: CIRCLE_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.card,
  },
  circleInner: {
    alignItems: 'center',
  },
  circleScore: {
    fontSize: 42,
    fontWeight: FONTS.weights.extrabold,
    letterSpacing: -1,
  },
  circleLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    marginTop: 2,
  },

  // Streak
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  streakEmoji: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  streakCount: {
    color: COLORS.orange,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.extrabold,
    marginRight: SPACING.xs,
  },
  streakLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.xxl,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginTop: SPACING.xs,
    lineHeight: 15,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.cardBorder,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  sectionCount: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
  },

  // Chapter Mastery Grid
  chapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.xl,
    gap: CARD_GAP,
    marginBottom: SPACING.xxl,
  },
  chapterCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.md,
  },
  chapterCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  chapterIconWrap: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterIcon: {
    fontSize: 18,
  },
  chapterScoreText: {
    color: COLORS.textAccent,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },
  chapterTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    marginBottom: SPACING.sm,
  },

  // Weakest Topics
  weakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.lg,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  weakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.md,
  },
  weakIconWrap: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  weakIcon: {
    fontSize: 20,
  },
  weakInfo: {
    flex: 1,
  },
  weakTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  weakScore: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  studyNowBadge: {
    backgroundColor: COLORS.electricBlue + '20',
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  studyNowText: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },

  // Weekly Activity
  activityCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginHorizontal: SPACING.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barTrack: {
    width: 24,
    height: 100,
    backgroundColor: COLORS.surfaceLighter,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  barLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
  },

  bottomSpacer: {
    height: SPACING.xxl,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { chapters } from '../data/chapters';
import ScreenWrapper from '../components/ScreenWrapper';
import storage from '../utils/storage';

const specialModes = [
  {
    key: 'glossary',
    title: 'Glossary Quiz',
    subtitle: 'Match terms with definitions',
    icon: '📖',
    color: COLORS.purple,
    route: 'GlossaryQuiz',
  },
  {
    key: 'nt_matcher',
    title: 'NT Matcher',
    subtitle: 'Match neurotransmitters to properties',
    icon: '🧪',
    color: COLORS.cyan,
    route: 'NTMatcher',
  },
  {
    key: 'oral_sim',
    title: 'Oral Simulator',
    subtitle: 'Practice Brain Bee oral rounds',
    icon: '🎤',
    color: COLORS.orange,
    route: 'OralSimulator',
  },
];

const flashcardCategories = [
  {
    key: 'by_chapter',
    title: 'By Chapter',
    subtitle: '18 chapter-specific decks',
    icon: '📚',
    color: COLORS.electricBlue,
    route: 'FlashcardDeckPicker',
    params: { filter: 'chapter' },
  },
  {
    key: 'by_topic',
    title: 'By Topic',
    subtitle: 'Diseases, NTs, Regions, Research',
    icon: '🏷️',
    color: COLORS.teal,
    route: 'FlashcardDeckPicker',
    params: { filter: 'topic' },
  },
  {
    key: 'full_deck',
    title: 'Full Brain Bee Deck',
    subtitle: 'All cards combined',
    icon: '🧠',
    color: COLORS.pink,
    route: 'Flashcards',
    params: { deckId: 'full_deck' },
  },
];

export default function QuizScreen({ navigation }) {
  const [quizScores, setQuizScores] = useState({});

  useEffect(() => {
    const loadScores = async () => {
      const scores = await storage.getQuizScores();
      setQuizScores(scores || {});
    };
    loadScores();
    const unsubscribe = navigation.addListener('focus', loadScores);
    return unsubscribe;
  }, [navigation]);

  const getBestScore = (chapterId) => {
    const scores = quizScores[chapterId];
    if (!scores || scores.length === 0) return null;
    let best = 0;
    scores.forEach((s) => {
      const pct = s.total > 0 ? (s.score / s.total) * 100 : 0;
      if (pct > best) best = pct;
    });
    return Math.round(best);
  };

  const getScoreColor = (pct) => {
    if (pct >= 80) return COLORS.green;
    if (pct >= 60) return COLORS.yellow;
    return COLORS.red;
  };

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quiz & Practice</Text>
          <Text style={styles.headerSubtitle}>Test your neuroscience knowledge</Text>
        </View>

        {/* Chapter Quizzes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Chapter Quizzes</Text>
          <Text style={styles.sectionCount}>{chapters.length} chapters</Text>
        </View>

        {chapters.map((chapter) => {
          const best = getBestScore(chapter.id);
          return (
            <TouchableOpacity
              key={chapter.id}
              style={styles.chapterRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ChapterQuiz', { chapterId: chapter.id })}
            >
              <View
                style={[
                  styles.chapterIconBox,
                  { backgroundColor: (chapter.color || COLORS.electricBlue) + '20' },
                ]}
              >
                <Text style={styles.chapterIconText}>{chapter.icon}</Text>
              </View>
              <View style={styles.chapterInfo}>
                <Text style={styles.chapterTitle} numberOfLines={1}>
                  Ch. {chapter.id}: {chapter.title}
                </Text>
                <Text style={styles.chapterSubtitle}>10 questions</Text>
              </View>
              {best !== null ? (
                <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(best) + '20' }]}>
                  <Text style={[styles.scoreBadgeText, { color: getScoreColor(best) }]}>
                    {best}%
                  </Text>
                </View>
              ) : (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Flashcard Decks */}
        <View style={[styles.sectionHeader, { marginTop: SPACING.xl }]}>
          <Text style={styles.sectionTitle}>Flashcard Decks</Text>
        </View>

        {flashcardCategories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={styles.modeCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(cat.route, cat.params || {})}
          >
            <View style={[styles.modeIconBox, { backgroundColor: cat.color + '20' }]}>
              <Text style={styles.modeIconText}>{cat.icon}</Text>
            </View>
            <View style={styles.modeInfo}>
              <Text style={styles.modeTitle}>{cat.title}</Text>
              <Text style={styles.modeSubtitle}>{cat.subtitle}</Text>
            </View>
            <Text style={styles.chevron}>{'>'}</Text>
          </TouchableOpacity>
        ))}

        {/* Special Modes */}
        <View style={[styles.sectionHeader, { marginTop: SPACING.xl }]}>
          <Text style={styles.sectionTitle}>Special Modes</Text>
        </View>

        {specialModes.map((mode) => (
          <TouchableOpacity
            key={mode.key}
            style={styles.modeCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(mode.route)}
          >
            <View style={[styles.modeIconBox, { backgroundColor: mode.color + '20' }]}>
              <Text style={styles.modeIconText}>{mode.icon}</Text>
            </View>
            <View style={styles.modeInfo}>
              <Text style={styles.modeTitle}>{mode.title}</Text>
              <Text style={styles.modeSubtitle}>{mode.subtitle}</Text>
            </View>
            <Text style={styles.chevron}>{'>'}</Text>
          </TouchableOpacity>
        ))}

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

  // Section
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

  // Chapter rows
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.sm,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  chapterIconBox: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  chapterIconText: {
    fontSize: 20,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  chapterSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 1,
  },
  scoreBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    minWidth: 48,
    alignItems: 'center',
  },
  scoreBadgeText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  newBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.electricBlue + '20',
    minWidth: 48,
    alignItems: 'center',
  },
  newBadgeText: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 1,
  },

  // Mode cards
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  modeIconBox: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  modeIconText: {
    fontSize: 24,
  },
  modeInfo: {
    flex: 1,
  },
  modeTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
  modeSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  chevron: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginLeft: SPACING.sm,
  },

  bottomSpacer: {
    height: SPACING.xxxl,
  },
});

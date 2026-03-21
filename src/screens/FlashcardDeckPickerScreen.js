import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { flashcardDecks } from '../data/flashcards';
import ScreenWrapper from '../components/ScreenWrapper';
import Card from '../components/Card';
import storage from '../utils/storage';

const chapterDeckIds = Array.from({ length: 18 }, (_, i) => `chapter_${i + 1}`);
const topicDeckIds = ['topic_diseases', 'topic_neurotransmitters', 'topic_brain_regions', 'topic_research'];

const topicIcons = {
  topic_diseases: { icon: '🦠', color: COLORS.red },
  topic_neurotransmitters: { icon: '🧪', color: COLORS.cyan },
  topic_brain_regions: { icon: '🧠', color: COLORS.purple },
  topic_research: { icon: '🔬', color: COLORS.teal },
};

const chapterIcons = [
  '🧠', '👁️', '🏃', '💡', '🗣️', '🌱', '👶', '🧓', '😴', '⚖️',
  '👧', '🧩', '💊', '🤕', '🔬', '📊', '🧪', '🌍',
];

export default function FlashcardDeckPickerScreen({ route, navigation }) {
  const filter = route?.params?.filter; // 'chapter' | 'topic' | undefined (show all)
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const loadProgress = async () => {
      const p = await storage.getFlashcardProgress();
      setProgress(p || {});
    };
    loadProgress();
    const unsubscribe = navigation.addListener('focus', loadProgress);
    return unsubscribe;
  }, [navigation]);

  const getMasteredCount = (deckId) => {
    const deckProgress = progress[deckId];
    if (!deckProgress) return 0;
    let mastered = 0;
    Object.values(deckProgress).forEach((card) => {
      if (card.easy >= 3) mastered++;
    });
    return mastered;
  };

  const navigateToDeck = (deckId) => {
    navigation.navigate('Flashcards', { deckId });
  };

  const renderDeckRow = (deckId, icon, color) => {
    const deck = flashcardDecks[deckId];
    if (!deck) return null;
    const cardCount = deck.cards?.length || 0;
    const mastered = getMasteredCount(deckId);

    return (
      <TouchableOpacity
        key={deckId}
        style={styles.deckRow}
        activeOpacity={0.7}
        onPress={() => navigateToDeck(deckId)}
      >
        <View style={[styles.deckIcon, { backgroundColor: (color || COLORS.electricBlue) + '20' }]}>
          <Text style={styles.deckEmoji}>{icon}</Text>
        </View>
        <View style={styles.deckInfo}>
          <Text style={styles.deckTitle} numberOfLines={1}>{deck.title}</Text>
          <Text style={styles.deckSubtitle}>
            {cardCount} cards{mastered > 0 ? ` · ${mastered} mastered` : ''}
          </Text>
        </View>
        {mastered > 0 && (
          <View style={styles.masteredBadge}>
            <View style={styles.masteredBarTrack}>
              <View
                style={[
                  styles.masteredBarFill,
                  { width: `${cardCount > 0 ? (mastered / cardCount) * 100 : 0}%` },
                ]}
              />
            </View>
            <Text style={styles.masteredText}>
              {cardCount > 0 ? Math.round((mastered / cardCount) * 100) : 0}%
            </Text>
          </View>
        )}
        <Text style={styles.chevron}>{'>'}</Text>
      </TouchableOpacity>
    );
  };

  const showChapters = !filter || filter === 'chapter';
  const showTopics = !filter || filter === 'topic';
  const showFull = !filter;

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>{'<'} Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Flashcard Decks</Text>
          <Text style={styles.headerSubtitle}>Choose a deck to study</Text>
        </View>

        {/* Full Deck */}
        {showFull && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Full Deck</Text>
            </View>
            <TouchableOpacity
              style={styles.fullDeckCard}
              activeOpacity={0.7}
              onPress={() => navigateToDeck('full_deck')}
            >
              <View style={styles.fullDeckTop}>
                <Text style={styles.fullDeckEmoji}>🧠</Text>
                <View style={styles.fullDeckInfo}>
                  <Text style={styles.fullDeckTitle}>Full Brain Bee Deck</Text>
                  <Text style={styles.fullDeckSubtitle}>
                    {flashcardDecks.full_deck?.cards?.length || 0} cards - Complete collection
                  </Text>
                </View>
              </View>
              {getMasteredCount('full_deck') > 0 && (
                <View style={styles.fullDeckProgress}>
                  <View style={styles.fullDeckProgressTrack}>
                    <View
                      style={[
                        styles.fullDeckProgressFill,
                        {
                          width: `${
                            (getMasteredCount('full_deck') /
                              (flashcardDecks.full_deck?.cards?.length || 1)) *
                            100
                          }%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.fullDeckProgressText}>
                    {getMasteredCount('full_deck')} mastered
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}

        {/* By Chapter */}
        {showChapters && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>By Chapter</Text>
              <Text style={styles.sectionCount}>{chapterDeckIds.length} decks</Text>
            </View>
            {chapterDeckIds.map((id, idx) =>
              renderDeckRow(id, chapterIcons[idx] || '📘', COLORS.electricBlue)
            )}
          </>
        )}

        {/* By Topic */}
        {showTopics && (
          <>
            <View style={[styles.sectionHeader, { marginTop: SPACING.xl }]}>
              <Text style={styles.sectionTitle}>By Topic</Text>
              <Text style={styles.sectionCount}>{topicDeckIds.length} decks</Text>
            </View>
            {topicDeckIds.map((id) => {
              const meta = topicIcons[id] || { icon: '📋', color: COLORS.electricBlue };
              return renderDeckRow(id, meta.icon, meta.color);
            })}
          </>
        )}

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

  // Header
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.lg,
  },
  backBtn: {
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.sm,
    alignSelf: 'flex-start',
  },
  backBtnText: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
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
    marginBottom: SPACING.md,
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

  // Full Deck Card
  fullDeckCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1.5,
    borderColor: COLORS.electricBlue + '40',
    padding: SPACING.xl,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  fullDeckTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullDeckEmoji: {
    fontSize: 40,
    marginRight: SPACING.lg,
  },
  fullDeckInfo: {
    flex: 1,
  },
  fullDeckTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  fullDeckSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  fullDeckProgress: {
    marginTop: SPACING.lg,
  },
  fullDeckProgressTrack: {
    height: 6,
    backgroundColor: COLORS.surfaceLighter,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  fullDeckProgressFill: {
    height: 6,
    backgroundColor: COLORS.green,
    borderRadius: BORDER_RADIUS.round,
  },
  fullDeckProgressText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },

  // Deck rows
  deckRow: {
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
  deckIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  deckEmoji: {
    fontSize: 20,
  },
  deckInfo: {
    flex: 1,
  },
  deckTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  deckSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 1,
  },
  masteredBadge: {
    alignItems: 'flex-end',
    marginRight: SPACING.sm,
    width: 56,
  },
  masteredBarTrack: {
    width: 48,
    height: 4,
    backgroundColor: COLORS.surfaceLighter,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: 2,
  },
  masteredBarFill: {
    height: 4,
    backgroundColor: COLORS.green,
    borderRadius: BORDER_RADIUS.round,
  },
  masteredText: {
    color: COLORS.green,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  chevron: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },

  bottomSpacer: {
    height: SPACING.xxxl,
  },
});

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { flashcardDecks } from '../data/flashcards';
import ScreenWrapper from '../components/ScreenWrapper';
import storage from '../utils/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - SPACING.xl * 2;
const CARD_HEIGHT = 340;

export default function FlashcardScreen({ route, navigation }) {
  const { deckId } = route.params;
  const deck = flashcardDecks[deckId];

  const [queue, setQueue] = useState(() => [...(deck?.cards || [])]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ easy: 0, good: 0, hard: 0 });
  const [totalStudied, setTotalStudied] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    storage.updateStreak();
  }, []);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (isComplete) return;
    const toValue = isFlipped ? 0 : 180;
    Animated.spring(flipAnim, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const resetFlip = (callback) => {
    if (isFlipped) {
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsFlipped(false);
        callback();
      });
    } else {
      callback();
    }
  };

  const handleRating = (rating) => {
    const card = queue[currentIndex];
    if (!card) return;

    // Save progress
    storage.updateFlashcardProgress(deckId, card.id, rating);
    storage.incrementQuestions(1);

    const newStats = { ...stats, [rating]: stats[rating] + 1 };
    setStats(newStats);
    setTotalStudied(totalStudied + 1);

    resetFlip(() => {
      if (rating === 'hard') {
        // Re-add hard cards to end of queue
        const newQueue = [...queue];
        newQueue.push({ ...card });
        setQueue(newQueue);
      }

      const nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length && rating !== 'hard') {
        // Check if adding the hard card means there are more
        setIsComplete(true);
      } else if (nextIndex >= queue.length) {
        // Hard card was added, but we still check
        if (nextIndex >= queue.length + (rating === 'hard' ? 1 : 0)) {
          setIsComplete(true);
        } else {
          setCurrentIndex(nextIndex);
        }
      } else {
        setCurrentIndex(nextIndex);
      }
    });
  };

  // Fix completion check: after updating queue for hard cards
  useEffect(() => {
    if (currentIndex >= queue.length && queue.length > 0 && !isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, queue.length]);

  if (!deck) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Deck not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  if (isComplete) {
    const total = stats.easy + stats.good + stats.hard;
    return (
      <ScreenWrapper>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryEmoji}>🎉</Text>
          <Text style={styles.summaryTitle}>Deck Complete!</Text>
          <Text style={styles.summarySubtitle}>{deck.title}</Text>

          <View style={styles.summaryStatsRow}>
            <View style={styles.summaryStatBox}>
              <Text style={styles.summaryStatNumber}>{total}</Text>
              <Text style={styles.summaryStatLabel}>Cards Studied</Text>
            </View>
          </View>

          <View style={styles.summaryBreakdown}>
            <View style={styles.summaryBreakdownItem}>
              <View style={[styles.summaryDot, { backgroundColor: COLORS.green }]} />
              <Text style={styles.summaryBreakdownLabel}>Easy</Text>
              <Text style={styles.summaryBreakdownValue}>{stats.easy}</Text>
            </View>
            <View style={styles.summaryBreakdownItem}>
              <View style={[styles.summaryDot, { backgroundColor: COLORS.yellow }]} />
              <Text style={styles.summaryBreakdownLabel}>Good</Text>
              <Text style={styles.summaryBreakdownValue}>{stats.good}</Text>
            </View>
            <View style={styles.summaryBreakdownItem}>
              <View style={[styles.summaryDot, { backgroundColor: COLORS.red }]} />
              <Text style={styles.summaryBreakdownLabel}>Hard</Text>
              <Text style={styles.summaryBreakdownValue}>{stats.hard}</Text>
            </View>
          </View>

          <View style={styles.summaryProgressContainer}>
            <View style={styles.summaryProgressTrack}>
              <View
                style={[
                  styles.summaryProgressFill,
                  {
                    width: `${total > 0 ? ((stats.easy + stats.good) / total) * 100 : 0}%`,
                    backgroundColor: COLORS.green,
                  },
                ]}
              />
            </View>
            <Text style={styles.summaryProgressText}>
              {total > 0 ? Math.round(((stats.easy + stats.good) / total) * 100) : 0}% mastery
            </Text>
          </View>

          <TouchableOpacity
            style={styles.summaryPrimaryButton}
            onPress={() => {
              setQueue([...(deck.cards || [])]);
              setCurrentIndex(0);
              setStats({ easy: 0, good: 0, hard: 0 });
              setTotalStudied(0);
              setIsComplete(false);
              flipAnim.setValue(0);
              setIsFlipped(false);
            }}
          >
            <Text style={styles.summaryPrimaryButtonText}>Study Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.summarySecondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.summarySecondaryButtonText}>Back to Decks</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  const card = queue[currentIndex];
  const progress = deck.cards ? (currentIndex + 1) : 0;
  const totalCards = queue.length;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
            <Text style={styles.headerBackText}>{'<'} Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{deck.title}</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            Card {currentIndex + 1} of {totalCards}
          </Text>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0}%` },
              ]}
            />
          </View>
        </View>

        {/* Flashcard */}
        <TouchableOpacity activeOpacity={1} onPress={flipCard} style={styles.cardTouchable}>
          <View style={styles.cardContainer}>
            {/* Front */}
            <Animated.View
              style={[
                styles.card,
                styles.cardFront,
                { transform: [{ rotateY: frontInterpolate }] },
              ]}
            >
              <Text style={styles.cardLabel}>QUESTION</Text>
              <Text style={styles.cardText}>{card?.front}</Text>
              <Text style={styles.tapHint}>Tap to flip</Text>
            </Animated.View>

            {/* Back */}
            <Animated.View
              style={[
                styles.card,
                styles.cardBack,
                { transform: [{ rotateY: backInterpolate }] },
              ]}
            >
              <Text style={styles.cardLabel}>ANSWER</Text>
              <Text style={styles.cardText}>{card?.back}</Text>
              <Text style={styles.tapHint}>Rate your knowledge below</Text>
            </Animated.View>
          </View>
        </TouchableOpacity>

        {/* Rating Buttons */}
        <View style={styles.ratingRow}>
          <TouchableOpacity
            style={[styles.ratingButton, styles.ratingHard]}
            onPress={() => handleRating('hard')}
          >
            <Text style={styles.ratingEmoji}>😓</Text>
            <Text style={[styles.ratingLabel, { color: COLORS.red }]}>Hard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ratingButton, styles.ratingGood]}
            onPress={() => handleRating('good')}
          >
            <Text style={styles.ratingEmoji}>🤔</Text>
            <Text style={[styles.ratingLabel, { color: COLORS.yellow }]}>Good</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ratingButton, styles.ratingEasy]}
            onPress={() => handleRating('easy')}
          >
            <Text style={styles.ratingEmoji}>😎</Text>
            <Text style={[styles.ratingLabel, { color: COLORS.green }]}>Easy</Text>
          </TouchableOpacity>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <Text style={styles.statsText}>
            E: {stats.easy}  G: {stats.good}  H: {stats.hard}
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.lg,
  },
  backButton: {
    backgroundColor: COLORS.electricBlue,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.md,
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
  progressRow: {
    marginBottom: SPACING.lg,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: COLORS.surfaceLighter,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    backgroundColor: COLORS.electricBlue,
    borderRadius: BORDER_RADIUS.round,
  },

  // Card
  cardTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardFront: {
    backgroundColor: COLORS.navy,
    borderWidth: 2,
    borderColor: COLORS.electricBlue,
  },
  cardBack: {
    backgroundColor: COLORS.mediumNavy,
    borderWidth: 2,
    borderColor: COLORS.cyan,
  },
  cardLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 2,
    marginBottom: SPACING.lg,
    position: 'absolute',
    top: SPACING.xl,
  },
  cardText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.medium,
    textAlign: 'center',
    lineHeight: 26,
  },
  tapHint: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    position: 'absolute',
    bottom: SPACING.lg,
  },

  // Rating buttons
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  ratingButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  ratingHard: {
    backgroundColor: COLORS.red + '15',
    borderColor: COLORS.red + '40',
  },
  ratingGood: {
    backgroundColor: COLORS.yellow + '15',
    borderColor: COLORS.yellow + '40',
  },
  ratingEasy: {
    backgroundColor: COLORS.green + '15',
    borderColor: COLORS.green + '40',
  },
  ratingEmoji: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  ratingLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },

  // Stats
  statsRow: {
    alignItems: 'center',
    paddingBottom: SPACING.xxl,
  },
  statsText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
  },

  // Summary
  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  summaryEmoji: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  summaryTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.extrabold,
    marginBottom: SPACING.sm,
  },
  summarySubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    marginBottom: SPACING.xxxl,
  },
  summaryStatsRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xxl,
  },
  summaryStatBox: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxxl,
  },
  summaryStatNumber: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.extrabold,
  },
  summaryStatLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
  },
  summaryBreakdown: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  summaryBreakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  summaryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.md,
  },
  summaryBreakdownLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    flex: 1,
  },
  summaryBreakdownValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  summaryProgressContainer: {
    width: '100%',
    marginBottom: SPACING.xxl,
  },
  summaryProgressTrack: {
    height: 8,
    backgroundColor: COLORS.surfaceLighter,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  summaryProgressFill: {
    height: 8,
    borderRadius: BORDER_RADIUS.round,
  },
  summaryProgressText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
  },
  summaryPrimaryButton: {
    backgroundColor: COLORS.electricBlue,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: BORDER_RADIUS.lg,
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  summaryPrimaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  summarySecondaryButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: BORDER_RADIUS.lg,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  summarySecondaryButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
});

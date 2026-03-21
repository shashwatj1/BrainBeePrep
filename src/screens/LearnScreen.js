import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { chapters } from '../data/chapters';
import ScreenWrapper from '../components/ScreenWrapper';
import Card from '../components/Card';

const quickLinks = [
  { key: 'diseases', label: 'Disease Library', icon: '🦠', color: COLORS.red, route: 'DiseaseLibrary' },
  { key: 'glossary', label: 'Glossary', icon: '📖', color: COLORS.purple, route: 'GlossaryBrowser' },
  { key: 'pathways', label: 'Pathways', icon: '🔗', color: COLORS.teal, route: 'PathwayList' },
];

export default function LearnScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn</Text>
          <Text style={styles.headerSubtitle}>Explore the Brain Facts Book</Text>
        </View>

        {/* Quick Links */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickLinksContainer}
          style={styles.quickLinksScroll}
        >
          {quickLinks.map((link) => (
            <TouchableOpacity
              key={link.key}
              style={styles.quickLinkCard}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(link.route)}
            >
              <View style={[styles.quickLinkIcon, { backgroundColor: link.color + '20' }]}>
                <Text style={styles.quickLinkEmoji}>{link.icon}</Text>
              </View>
              <Text style={styles.quickLinkLabel}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Chapters Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Chapters</Text>
          <Text style={styles.sectionCount}>{chapters.length} chapters</Text>
        </View>

        {chapters.map((chapter) => (
          <TouchableOpacity
            key={chapter.id}
            style={styles.chapterCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ChapterDetail', { chapterId: chapter.id })}
          >
            <View style={[styles.chapterIconContainer, { backgroundColor: (chapter.color || COLORS.electricBlue) + '20' }]}>
              <Text style={styles.chapterIcon}>{chapter.icon}</Text>
            </View>
            <View style={styles.chapterContent}>
              <Text style={styles.chapterTitle} numberOfLines={1}>{chapter.title}</Text>
              <Text style={styles.chapterDescription} numberOfLines={2}>{chapter.description}</Text>
            </View>
            <View style={[styles.chapterBadge, { backgroundColor: (chapter.color || COLORS.electricBlue) + '30' }]}>
              <Text style={[styles.chapterBadgeText, { color: chapter.color || COLORS.electricBlue }]}>
                {chapter.id}
              </Text>
            </View>
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

  // Quick Links
  quickLinksScroll: {
    marginBottom: SPACING.xl,
  },
  quickLinksContainer: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },
  quickLinkCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    minWidth: 110,
  },
  quickLinkIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  quickLinkEmoji: {
    fontSize: 24,
  },
  quickLinkLabel: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
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

  // Chapter Cards
  chapterCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  chapterIcon: {
    fontSize: 24,
  },
  chapterContent: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  chapterTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
  chapterDescription: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
    lineHeight: 18,
  },
  chapterBadge: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterBadgeText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },

  bottomSpacer: {
    height: SPACING.xxl,
  },
});

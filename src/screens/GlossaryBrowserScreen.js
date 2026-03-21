import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import glossary from '../data/glossary';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchBar from '../components/SearchBar';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const CATEGORIES = [
  { key: 'all', label: 'All', color: COLORS.electricBlue },
  { key: 'basics', label: 'Basics', color: COLORS.brightBlue },
  { key: 'cells', label: 'Cells', color: COLORS.cyan },
  { key: 'chemistry', label: 'Chemistry', color: COLORS.teal },
  { key: 'senses', label: 'Senses', color: COLORS.purple },
  { key: 'movement', label: 'Movement', color: COLORS.orange },
  { key: 'memory', label: 'Memory', color: COLORS.yellow },
  { key: 'development', label: 'Development', color: COLORS.green },
  { key: 'disorders', label: 'Disorders', color: COLORS.red },
  { key: 'research', label: 'Research', color: COLORS.pink },
];

function getCategoryColor(categoryKey) {
  const cat = CATEGORIES.find((c) => c.key === categoryKey);
  return cat ? cat.color : COLORS.electricBlue;
}

function getCategoryLabel(categoryKey) {
  const cat = CATEGORIES.find((c) => c.key === categoryKey);
  return cat ? cat.label : categoryKey;
}

export default function GlossaryBrowserScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const sectionListRef = React.useRef(null);

  const filteredSections = useMemo(() => {
    let filtered = glossary;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.term.toLowerCase().includes(query) ||
          item.definition.toLowerCase().includes(query)
      );
    }

    const grouped = {};
    filtered.forEach((item) => {
      const letter = item.term.charAt(0).toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(item);
    });

    const sections = Object.keys(grouped)
      .sort()
      .map((letter) => ({
        title: letter,
        data: grouped[letter].sort((a, b) => a.term.localeCompare(b.term)),
      }));

    return sections;
  }, [searchQuery, selectedCategory]);

  const handleAlphabetPress = useCallback(
    (letter) => {
      const sectionIndex = filteredSections.findIndex((s) => s.title === letter);
      if (sectionIndex !== -1 && sectionListRef.current) {
        sectionListRef.current.scrollToLocation({
          sectionIndex,
          itemIndex: 0,
          animated: true,
          viewOffset: 0,
        });
      }
    },
    [filteredSections]
  );

  const handleTermPress = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const renderSectionHeader = useCallback(({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
      <View style={styles.sectionHeaderLine} />
    </View>
  ), []);

  const renderItem = useCallback(
    ({ item }) => {
      const isExpanded = expandedId === item.id;
      const catColor = getCategoryColor(item.category);

      return (
        <TouchableOpacity
          style={[styles.termCard, isExpanded && styles.termCardExpanded]}
          onPress={() => handleTermPress(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.termHeader}>
            <View style={styles.termTitleRow}>
              <Text style={styles.termName}>{item.term}</Text>
              <View style={[styles.categoryBadge, { backgroundColor: catColor + '25' }]}>
                <Text style={[styles.categoryBadgeText, { color: catColor }]}>
                  {getCategoryLabel(item.category)}
                </Text>
              </View>
            </View>
            <View style={styles.termMeta}>
              <Text style={styles.chapterLabel}>Ch. {item.chapter}</Text>
              <Text style={styles.expandIcon}>{isExpanded ? '\u25B2' : '\u25BC'}</Text>
            </View>
          </View>

          {!isExpanded && (
            <Text style={styles.definitionPreview} numberOfLines={1}>
              {item.definition}
            </Text>
          )}

          {isExpanded && (
            <View style={styles.expandedContent}>
              <View style={styles.expandedSection}>
                <Text style={styles.expandedLabel}>Definition</Text>
                <Text style={styles.expandedText}>{item.definition}</Text>
              </View>

              {item.pronunciation && (
                <View style={styles.expandedSection}>
                  <Text style={styles.expandedLabel}>Pronunciation</Text>
                  <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
                </View>
              )}

              {item.context && (
                <View style={styles.expandedSection}>
                  <Text style={styles.expandedLabel}>Context</Text>
                  <Text style={styles.contextText}>{item.context}</Text>
                </View>
              )}

              <View style={styles.expandedSection}>
                <Text style={styles.expandedLabel}>Chapter</Text>
                <Text style={styles.expandedText}>Chapter {item.chapter}</Text>
              </View>

              <TouchableOpacity
                style={styles.quizButton}
                onPress={() =>
                  navigation.navigate('GlossaryQuiz', { termId: item.id })
                }
                activeOpacity={0.7}
              >
                <Text style={styles.quizButtonText}>Quiz me on this term</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [expandedId, handleTermPress, navigation]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <ScreenWrapper>
      <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>{'‹'}</Text>
        <Text style={styles.backLabel}>Back</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Glossary</Text>
        <Text style={styles.headerSubtitle}>
          {glossary.length} neuroscience terms
        </Text>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search terms or definitions..."
      />

      {/* Alphabet quick-jump bar */}
      <View style={styles.alphabetContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.alphabetScroll}
        >
          {ALPHABET.map((letter) => {
            const hasTerms = filteredSections.some((s) => s.title === letter);
            return (
              <TouchableOpacity
                key={letter}
                style={[
                  styles.alphabetLetter,
                  hasTerms && styles.alphabetLetterActive,
                ]}
                onPress={() => handleAlphabetPress(letter)}
                disabled={!hasTerms}
                activeOpacity={0.6}
              >
                <Text
                  style={[
                    styles.alphabetLetterText,
                    hasTerms && styles.alphabetLetterTextActive,
                  ]}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Category filter chips */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryChip,
                  isSelected && { backgroundColor: cat.color + '30', borderColor: cat.color },
                ]}
                onPress={() => setSelectedCategory(cat.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isSelected && { color: cat.color },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Terms list */}
      <SectionList
        ref={sectionListRef}
        sections={filteredSections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No terms found</Text>
            <Text style={styles.emptySubtext}>
              Try a different search or category
            </Text>
          </View>
        }
        getItemLayout={undefined}
        onScrollToIndexFailed={() => {}}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  backArrow: {
    color: COLORS.electricBlue,
    fontSize: 28,
    fontWeight: FONTS.weights.bold,
    marginRight: SPACING.xs,
  },
  backLabel: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },
  headerContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONTS.sizes.title,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },

  // Alphabet bar
  alphabetContainer: {
    marginBottom: SPACING.sm,
  },
  alphabetScroll: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.xs,
  },
  alphabetLetter: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alphabetLetterActive: {
    backgroundColor: COLORS.surfaceLighter,
  },
  alphabetLetterText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textMuted,
  },
  alphabetLetterTextActive: {
    color: COLORS.electricBlue,
  },

  // Category chips
  categoryContainer: {
    marginBottom: SPACING.md,
  },
  categoryScroll: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  categoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.surfaceLight,
  },
  categoryChipText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    color: COLORS.textSecondary,
  },

  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  sectionHeaderText: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.electricBlue,
    marginRight: SPACING.md,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.cardBorder,
  },

  // Term cards
  listContent: {
    paddingBottom: SPACING.xxxl,
  },
  termCard: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.xs,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.lg,
  },
  termCardExpanded: {
    borderColor: COLORS.electricBlue,
    backgroundColor: COLORS.surfaceLight,
  },
  termHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  termTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  termName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },
  categoryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.round,
  },
  categoryBadgeText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
  },
  termMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  chapterLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
    fontWeight: FONTS.weights.medium,
  },
  expandIcon: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  definitionPreview: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    lineHeight: 18,
  },

  // Expanded content
  expandedContent: {
    marginTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingTop: SPACING.lg,
  },
  expandedSection: {
    marginBottom: SPACING.md,
  },
  expandedLabel: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    color: COLORS.electricBlue,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  expandedText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  pronunciationText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.cyan,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  contextText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
    backgroundColor: COLORS.surfaceLighter,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.electricBlue,
  },
  quizButton: {
    backgroundColor: COLORS.electricBlue,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  quizButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  emptyText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textSecondary,
  },
  emptySubtext: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
});

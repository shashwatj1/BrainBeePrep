import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { diseases } from '../data/diseases';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchBar from '../components/SearchBar';

const CATEGORIES = [
  { key: 'all', label: 'All', color: COLORS.electricBlue },
  { key: 'neurodegenerative', label: 'Neurodegenerative', color: COLORS.red },
  { key: 'psychiatric', label: 'Psychiatric', color: COLORS.purple },
  { key: 'childhood', label: 'Childhood', color: COLORS.cyan },
  { key: 'addiction', label: 'Addiction', color: COLORS.orange },
  { key: 'injury', label: 'Injury', color: COLORS.yellow },
  { key: 'neurological', label: 'Neurological', color: COLORS.teal },
  { key: 'sleep', label: 'Sleep', color: COLORS.pink },
];

function getCategoryColor(categoryKey) {
  const cat = CATEGORIES.find((c) => c.key === categoryKey);
  return cat ? cat.color : COLORS.electricBlue;
}

function getCategoryLabel(categoryKey) {
  const cat = CATEGORIES.find((c) => c.key === categoryKey);
  return cat ? cat.label : categoryKey;
}

export default function DiseaseLibraryScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDiseases = useMemo(() => {
    let result = diseases;

    if (selectedCategory !== 'all') {
      result = result.filter((d) => d.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const renderDiseaseCard = ({ item }) => {
    const catColor = getCategoryColor(item.category);
    return (
      <TouchableOpacity
        style={styles.diseaseCard}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('DiseaseDetail', { diseaseId: item.id })}
      >
        <View style={[styles.diseaseIconContainer, { backgroundColor: catColor + '20' }]}>
          <Text style={styles.diseaseIcon}>{item.icon}</Text>
        </View>
        <View style={styles.diseaseContent}>
          <Text style={styles.diseaseName} numberOfLines={1}>{item.name}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: catColor + '20' }]}>
            <Text style={[styles.categoryBadgeText, { color: catColor }]}>
              {getCategoryLabel(item.category)}
            </Text>
          </View>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      {/* Back Button */}
      <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>{'‹'}</Text>
        <Text style={styles.backLabel}>Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Disease Library</Text>
        <Text style={styles.headerSubtitle}>
          {diseases.length} conditions to study
        </Text>
      </View>

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search diseases..."
      />

      {/* Category Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
        style={styles.chipsScroll}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.chip,
                isSelected && { backgroundColor: cat.color + '30', borderColor: cat.color },
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && { color: cat.color },
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Disease List */}
      <FlatList
        data={filteredDiseases}
        renderItem={renderDiseaseCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No diseases found</Text>
            <Text style={styles.emptySubtext}>Try a different search or category</Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  // Back
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
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

  // Header
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
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

  // Chips
  chipsScroll: {
    minHeight: 40,
    maxHeight: 44,
    marginBottom: SPACING.md,
  },
  chipsContainer: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },

  // Disease Cards
  listContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  diseaseCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  diseaseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  diseaseIcon: {
    fontSize: 24,
  },
  diseaseContent: {
    flex: 1,
  },
  diseaseName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    marginBottom: SPACING.xs,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  categoryBadgeText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chevron: {
    color: COLORS.textMuted,
    fontSize: 24,
    fontWeight: FONTS.weights.bold,
    marginLeft: SPACING.sm,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingTop: SPACING.xxxl * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
  emptySubtext: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },
});

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { neurotransmitters } from '../data/neurotransmitters';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchBar from '../components/SearchBar';

function InfoRow({ label, value, color }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, color ? { color } : null]}>{value}</Text>
    </View>
  );
}

function BulletList({ items, color }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item, i) => (
        <View key={i} style={styles.bulletItem}>
          <View style={[styles.bulletDot, { backgroundColor: color || COLORS.electricBlue }]} />
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function NTCard({ nt }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: nt.color, borderLeftWidth: 3 }]}
      activeOpacity={0.8}
      onPress={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <View style={[styles.ntIconWrap, { backgroundColor: nt.color + '20' }]}>
            <Text style={styles.ntIcon}>{nt.icon}</Text>
          </View>
          <View style={styles.cardHeaderInfo}>
            <Text style={styles.ntName}>{nt.name}</Text>
            <Text style={styles.ntFunction} numberOfLines={expanded ? undefined : 1}>
              {nt.primaryFunction}
            </Text>
          </View>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: nt.color + '20' }]}>
          <Text style={[styles.typeBadgeText, { color: nt.color }]}>{nt.type}</Text>
        </View>
      </View>

      {/* Expanded Content */}
      {expanded && (
        <View style={styles.expandedContent}>
          {/* Functions */}
          <Text style={styles.expandedSectionTitle}>Functions</Text>
          <BulletList items={nt.functions} color={nt.color} />

          {/* Effects */}
          <View style={styles.effectsRow}>
            <View style={[styles.effectCard, { borderColor: COLORS.red + '40' }]}>
              <Text style={styles.effectLabel}>Too Much</Text>
              <Text style={styles.effectText}>{nt.tooMuch}</Text>
            </View>
            <View style={[styles.effectCard, { borderColor: COLORS.yellow + '40' }]}>
              <Text style={styles.effectLabel}>Too Little</Text>
              <Text style={styles.effectText}>{nt.tooLittle}</Text>
            </View>
          </View>

          {/* Brain Regions */}
          <Text style={styles.expandedSectionTitle}>Active Brain Regions</Text>
          <BulletList items={nt.activeRegions} color={COLORS.cyan} />

          {/* Drugs */}
          <Text style={styles.expandedSectionTitle}>Drugs That Affect It</Text>
          <BulletList items={nt.drugs} color={COLORS.purple} />

          {/* Brain Bee Key Facts */}
          <View style={styles.keyFactsBox}>
            <Text style={styles.keyFactsTitle}>🎯 Brain Bee Key Facts</Text>
            <Text style={styles.keyFactsText}>{nt.brainBeeFactors}</Text>
          </View>
        </View>
      )}

      {/* Expand indicator */}
      <View style={styles.expandIndicator}>
        <Text style={styles.expandArrow}>{expanded ? '▲' : '▼'}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function NTGuideScreen() {
  const [search, setSearch] = useState('');

  const filtered = neurotransmitters.filter((nt) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      nt.name.toLowerCase().includes(q) ||
      nt.type.toLowerCase().includes(q) ||
      nt.primaryFunction.toLowerCase().includes(q)
    );
  });

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Neurotransmitter Guide</Text>
          <Text style={styles.headerSubtitle}>
            {neurotransmitters.length} neurotransmitters
          </Text>
        </View>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search neurotransmitters..."
        />

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No neurotransmitters found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        ) : (
          filtered.map((nt) => <NTCard key={nt.id} nt={nt} />)
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
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
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

  // Card
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.sm,
  },
  ntIconWrap: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  ntIcon: {
    fontSize: 22,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  ntName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  ntFunction: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
    lineHeight: 18,
  },
  typeBadge: {
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    marginTop: 2,
  },
  typeBadgeText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
  },

  // Expanded Content
  expandedContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  expandedSectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },

  // Bullet List
  bulletList: {
    marginLeft: SPACING.xs,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: SPACING.sm,
  },
  bulletText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    flex: 1,
    lineHeight: 20,
  },

  // Effects Row
  effectsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  effectCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    padding: SPACING.md,
  },
  effectLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  effectText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
  },

  // Info Row
  infoRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  infoLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    width: 100,
  },
  infoValue: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    flex: 1,
  },

  // Key Facts Box
  keyFactsBox: {
    backgroundColor: COLORS.electricBlue + '10',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.electricBlue + '30',
    padding: SPACING.lg,
    marginTop: SPACING.lg,
  },
  keyFactsTitle: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
  },
  keyFactsText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
  },

  // Expand Indicator
  expandIndicator: {
    alignItems: 'center',
    paddingBottom: SPACING.sm,
  },
  expandArrow: {
    color: COLORS.textMuted,
    fontSize: 10,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl * 2,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
  emptySubtext: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },

  bottomSpacer: {
    height: SPACING.xxl,
  },
});

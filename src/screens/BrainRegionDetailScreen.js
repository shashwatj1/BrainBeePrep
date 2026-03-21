import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import { brainRegions } from '../data/brainRegions';
import ScreenWrapper from '../components/ScreenWrapper';

export default function BrainRegionDetailScreen({ route, navigation }) {
  const { regionId } = route.params;
  const region = brainRegions.find((r) => r.id === regionId);

  if (!region) {
    return (
      <ScreenWrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Region not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backLabel}>Brain Map</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={[styles.colorIndicator, { backgroundColor: region.color }]} />
            <View style={styles.headerTextWrap}>
              <Text style={styles.regionName}>{region.name}</Text>
              <View style={[styles.sizeBadge, { backgroundColor: region.color + '20' }]}>
                <Text style={[styles.sizeBadgeText, { color: region.color }]}>
                  {region.size} region
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.headerAccent, { backgroundColor: region.color }]} />
        </View>

        {/* Functions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: COLORS.electricBlue + '20' }]}>
              <Text style={styles.sectionIconText}>&#9881;</Text>
            </View>
            <Text style={styles.sectionTitle}>Functions</Text>
          </View>
          <View style={styles.sectionContent}>
            {region.functions.map((func, index) => (
              <View key={index} style={styles.bulletRow}>
                <View style={[styles.bulletDot, { backgroundColor: region.color }]} />
                <Text style={styles.bulletText}>{func}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* When Damaged Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: COLORS.red + '20' }]}>
              <Text style={styles.sectionIconText}>&#9888;</Text>
            </View>
            <Text style={styles.sectionTitle}>When Damaged</Text>
          </View>
          <View style={styles.damageCard}>
            <Text style={styles.damageText}>{region.damage}</Text>
          </View>
        </View>

        {/* Associated Diseases Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: COLORS.purple + '20' }]}>
              <Text style={styles.sectionIconText}>&#128138;</Text>
            </View>
            <Text style={styles.sectionTitle}>Associated Diseases</Text>
          </View>
          <View style={styles.diseaseChipsWrap}>
            {region.diseases.map((disease, index) => (
              <TouchableOpacity
                key={index}
                style={styles.diseaseChip}
                activeOpacity={0.7}
                onPress={() => {
                  // Try to navigate to disease detail if route exists
                  try {
                    navigation.navigate('DiseaseLibrary');
                  } catch (e) {
                    // silently ignore if route doesn't exist
                  }
                }}
              >
                <Text style={styles.diseaseChipText}>{disease}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Key Facts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: COLORS.yellow + '20' }]}>
              <Text style={styles.sectionIconText}>&#9733;</Text>
            </View>
            <Text style={styles.sectionTitle}>Key Facts</Text>
          </View>
          {region.keyFacts.map((fact, index) => (
            <View key={index} style={[styles.factCard, { borderLeftColor: region.color }]}>
              <View style={styles.factNumber}>
                <Text style={[styles.factNumberText, { color: region.color }]}>{index + 1}</Text>
              </View>
              <Text style={styles.factText}>{fact}</Text>
            </View>
          ))}
        </View>

        {/* Navigation Links */}
        <View style={styles.navSection}>
          <TouchableOpacity
            style={styles.navCard}
            activeOpacity={0.7}
            onPress={() => {
              try {
                navigation.navigate('DiseaseLibrary');
              } catch (e) {}
            }}
          >
            <View style={[styles.navIconBox, { backgroundColor: COLORS.purple + '20' }]}>
              <Text style={styles.navIconText}>&#128218;</Text>
            </View>
            <View style={styles.navTextWrap}>
              <Text style={styles.navTitle}>Explore Related Diseases</Text>
              <Text style={styles.navSubtitle}>
                {region.diseases.length} associated conditions
              </Text>
            </View>
            <Text style={styles.chevron}>{'>'}</Text>
          </TouchableOpacity>
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

  // Error
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.lg,
    marginBottom: SPACING.lg,
  },
  backButton: {
    backgroundColor: COLORS.electricBlue,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
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

  // Header
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.lg,
  },
  headerTextWrap: {
    flex: 1,
  },
  regionName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.extrabold,
    letterSpacing: -0.3,
    marginBottom: SPACING.xs,
  },
  sizeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  sizeBadgeText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerAccent: {
    height: 3,
    borderRadius: 2,
    marginTop: SPACING.lg,
  },

  // Sections
  section: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  sectionIconText: {
    fontSize: 16,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  sectionContent: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  // Bullet list
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: SPACING.md,
  },
  bulletText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
    flex: 1,
  },

  // Damage
  damageCard: {
    backgroundColor: COLORS.red + '10',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.red + '30',
  },
  damageText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
  },

  // Disease chips
  diseaseChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  diseaseChip: {
    backgroundColor: COLORS.purple + '20',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.purple + '40',
  },
  diseaseChipText: {
    color: COLORS.purple,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },

  // Key Facts
  factCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  factNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginTop: 1,
  },
  factNumberText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  factText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
    flex: 1,
  },

  // Navigation
  navSection: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xxl,
  },
  navCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIconBox: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  navIconText: {
    fontSize: 22,
  },
  navTextWrap: {
    flex: 1,
  },
  navTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  navSubtitle: {
    color: COLORS.textMuted,
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

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';
import ScreenWrapper from '../components/ScreenWrapper';

const studyTools = [
  { key: 'diseases', label: 'Disease Library', icon: '🦠', route: 'DiseaseLibrary', color: COLORS.red },
  { key: 'glossary', label: 'Glossary', icon: '📖', route: 'GlossaryBrowser', color: COLORS.purple },
  { key: 'pathways', label: 'Pathway Visualizer', icon: '🔗', route: 'PathwayList', color: COLORS.teal },
  { key: 'ntguide', label: 'Neurotransmitter Guide', icon: '🧪', route: 'NTGuide', color: COLORS.cyan },
];

export default function MoreScreen({ navigation }) {
  const handleResetProgress = () => {
    Alert.alert(
      'Reset All Progress',
      'This will erase all quiz scores, flashcard progress, streaks, and study data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Done', 'All progress has been reset.');
            } catch (e) {
              Alert.alert('Error', 'Failed to reset progress.');
            }
          },
        },
      ],
    );
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
          <Text style={styles.headerTitle}>More</Text>
        </View>

        {/* Study Tools */}
        <Text style={styles.sectionLabel}>STUDY TOOLS</Text>
        <View style={styles.sectionCard}>
          {studyTools.map((tool, index) => (
            <React.Fragment key={tool.key}>
              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(tool.route)}
              >
                <View style={[styles.menuIconWrap, { backgroundColor: tool.color + '20' }]}>
                  <Text style={styles.menuIcon}>{tool.icon}</Text>
                </View>
                <Text style={styles.menuLabel}>{tool.label}</Text>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
              {index < studyTools.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* About */}
        <Text style={styles.sectionLabel}>ABOUT</Text>
        <View style={styles.sectionCard}>
          <View style={styles.aboutBlock}>
            <View style={styles.aboutHeader}>
              <Text style={styles.aboutEmoji}>🧠</Text>
              <Text style={styles.aboutTitle}>About This App</Text>
            </View>
            <Text style={styles.aboutText}>
              Brain Bee Study App - Built for high school students preparing for the National Brain Bee competition. All content sourced from Brain Facts (Society for Neuroscience, 8th Edition).
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.aboutBlock}>
            <View style={styles.aboutHeader}>
              <Text style={styles.aboutEmoji}>🏆</Text>
              <Text style={styles.aboutTitle}>About Brain Bee</Text>
            </View>
            <Text style={styles.aboutText}>
              The Brain Bee is a neuroscience competition for high school students. Local winners advance to the National Brain Bee held annually at the Society for Neuroscience meeting.
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.aboutBlock}>
            <View style={styles.aboutHeader}>
              <Text style={styles.aboutEmoji}>📚</Text>
              <Text style={styles.aboutTitle}>Source Attribution</Text>
            </View>
            <Text style={styles.aboutText}>
              Content from Brain Facts: A Primer on the Brain and Nervous System, 8th Edition, Society for Neuroscience, 2018.
            </Text>
          </View>
        </View>

        {/* Data */}
        <Text style={styles.sectionLabel}>DATA</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={handleResetProgress}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: COLORS.red + '20' }]}>
              <Text style={styles.menuIcon}>🗑️</Text>
            </View>
            <Text style={[styles.menuLabel, { color: COLORS.red }]}>Reset All Progress</Text>
            <Text style={styles.menuArrow}>›</Text>
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

  // Section Label
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
    letterSpacing: 1,
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.sm,
    marginTop: SPACING.lg,
  },

  // Section Card
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginHorizontal: SPACING.xl,
    overflow: 'hidden',
  },

  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuLabel: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },
  menuArrow: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.medium,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginLeft: SPACING.lg + 36 + SPACING.md,
  },

  // About Block
  aboutBlock: {
    padding: SPACING.lg,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  aboutEmoji: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  aboutTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  aboutText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
  },

  bottomSpacer: {
    height: SPACING.xxl,
  },
});

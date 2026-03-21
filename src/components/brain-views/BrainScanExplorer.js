import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../utils/theme';

import LateralView, { LATERAL_REGIONS } from './LateralView';
import MedialView, { MEDIAL_REGIONS } from './MedialView';
import SuperiorView, { SUPERIOR_REGIONS } from './SuperiorView';
import SliceViewer from './SliceViewer';
import BilateralView from './BilateralView';
import ScanQuiz from './ScanQuiz';
import ZoomableView from './ZoomableView';
import RegionBottomSheet from './RegionBottomSheet';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const VIEW_TABS = [
  { id: 'lateral', label: 'Lateral', icon: '🧠' },
  { id: 'medial', label: 'Medial', icon: '🔪' },
  { id: 'superior', label: 'Superior', icon: '⬇️' },
  { id: 'slices', label: 'MRI Slices', icon: '🩻' },
  { id: 'bilateral', label: 'Bilateral', icon: '🪞' },
  { id: 'quiz', label: 'Quiz', icon: '✏️' },
];

export default function BrainScanExplorer() {
  const [activeView, setActiveView] = useState('lateral');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const diagramWidth = SCREEN_WIDTH - SPACING.xl * 2;
  const diagramHeight = 320;

  const handleHotspotPress = useCallback((regionId) => {
    setSelectedRegion(regionId);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setSelectedRegion(null);
  }, []);

  const getQuizDiagramComponent = () => {
    // Use lateral view for the quiz by default
    return LateralView;
  };

  const getQuizRegions = () => {
    // Combine regions from lateral and medial views for comprehensive quiz
    const combined = [...LATERAL_REGIONS];
    MEDIAL_REGIONS.forEach((mr) => {
      if (!combined.find((r) => r.id === mr.id)) {
        combined.push(mr);
      }
    });
    return combined;
  };

  const renderDiagram = () => {
    switch (activeView) {
      case 'lateral':
        return (
          <ZoomableView width={diagramWidth} height={diagramHeight}>
            <LateralView
              width={diagramWidth}
              height={diagramHeight}
              showLabels={true}
              onHotspotPress={handleHotspotPress}
              highlightedRegion={selectedRegion}
            />
          </ZoomableView>
        );

      case 'medial':
        return (
          <ZoomableView width={diagramWidth} height={diagramHeight}>
            <MedialView
              width={diagramWidth}
              height={diagramHeight}
              showLabels={true}
              onHotspotPress={handleHotspotPress}
              highlightedRegion={selectedRegion}
            />
          </ZoomableView>
        );

      case 'superior':
        return (
          <ZoomableView width={diagramWidth} height={diagramHeight}>
            <SuperiorView
              width={diagramWidth}
              height={diagramHeight}
              showLabels={true}
              onHotspotPress={handleHotspotPress}
              highlightedRegion={selectedRegion}
            />
          </ZoomableView>
        );

      case 'slices':
        return (
          <SliceViewer
            width={diagramWidth}
            height={diagramHeight + 80}
          />
        );

      case 'bilateral':
        return (
          <BilateralView
            width={diagramWidth}
            height={240}
            onHotspotPress={handleHotspotPress}
            highlightedRegion={selectedRegion}
          />
        );

      case 'quiz':
        return (
          <ScanQuiz
            DiagramComponent={getQuizDiagramComponent()}
            diagramProps={{
              width: diagramWidth,
              height: diagramHeight,
              showLabels: false,
            }}
            regions={getQuizRegions()}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Brain Scan Explorer</Text>
      <Text style={styles.subtitle}>
        Anatomical views with tappable regions — pinch to zoom
      </Text>

      {/* View Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
        style={styles.tabsScroll}
      >
        {VIEW_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeView === tab.id && styles.tabActive,
            ]}
            onPress={() => {
              setActiveView(tab.id);
              setSelectedRegion(null);
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabText,
                activeView === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Diagram Area */}
      <View style={styles.diagramArea}>
        {renderDiagram()}
      </View>

      {/* Region Info Bottom Sheet */}
      <RegionBottomSheet
        regionId={selectedRegion}
        onClose={handleCloseSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    minHeight: 500,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.lg,
  },
  tabsScroll: {
    marginBottom: SPACING.lg,
    flexGrow: 0,
  },
  tabsContainer: {
    gap: SPACING.sm,
    paddingRight: SPACING.md,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 6,
  },
  tabActive: {
    backgroundColor: COLORS.electricBlue,
    borderColor: COLORS.electricBlue,
  },
  tabIcon: {
    fontSize: 14,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },
  tabTextActive: {
    color: COLORS.textPrimary,
  },
  diagramArea: {
    alignItems: 'center',
    minHeight: 320,
  },
});

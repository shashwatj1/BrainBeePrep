import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Platform, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';

// 3D brain using Canvas for web, simplified interactive view for mobile
// We use a pure JS approach with projected 3D points for cross-platform compatibility

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BRAIN_REGIONS_3D = [
  { id: 'frontal_lobe', name: 'Frontal Lobe', x: -0.3, y: 0.3, z: 0.6, color: '#4C6EF5', size: 18 },
  { id: 'parietal_lobe', name: 'Parietal Lobe', x: 0.0, y: 0.5, z: 0.0, color: '#22D3EE', size: 16 },
  { id: 'temporal_lobe', name: 'Temporal Lobe', x: -0.5, y: -0.1, z: 0.2, color: '#4ADE80', size: 15 },
  { id: 'occipital_lobe', name: 'Occipital Lobe', x: 0.0, y: 0.2, z: -0.6, color: '#F472B6', size: 14 },
  { id: 'cerebellum', name: 'Cerebellum', x: 0.0, y: -0.3, z: -0.5, color: '#FB923C', size: 14 },
  { id: 'brainstem', name: 'Brainstem', x: 0.0, y: -0.5, z: -0.1, color: '#A78BFA', size: 12 },
  { id: 'thalamus', name: 'Thalamus', x: 0.0, y: 0.1, z: 0.0, color: '#FBBF24', size: 10 },
  { id: 'hypothalamus', name: 'Hypothalamus', x: 0.0, y: -0.1, z: 0.15, color: '#F87171', size: 9 },
  { id: 'hippocampus', name: 'Hippocampus', x: -0.3, y: -0.1, z: -0.1, color: '#2DD4BF', size: 9 },
  { id: 'amygdala', name: 'Amygdala', x: -0.35, y: -0.2, z: 0.1, color: '#E879F9', size: 8 },
  { id: 'corpus_callosum', name: 'Corpus Callosum', x: 0.0, y: 0.25, z: 0.0, color: '#38BDF8', size: 11 },
  { id: 'prefrontal_cortex', name: 'Prefrontal Cortex', x: -0.2, y: 0.35, z: 0.7, color: '#818CF8', size: 12 },
];

// Brain surface points for rendering the brain outline
const BRAIN_SURFACE = [];
for (let phi = 0; phi < Math.PI; phi += 0.15) {
  for (let theta = 0; theta < 2 * Math.PI; theta += 0.15) {
    // Ellipsoid shape with brain-like deformation
    const r = 1.0;
    const x = r * 0.55 * Math.sin(phi) * Math.cos(theta);
    const y = r * 0.65 * Math.cos(phi) - 0.05;
    const z = r * 0.7 * Math.sin(phi) * Math.sin(theta);
    // Flatten bottom
    const yAdjusted = y < -0.4 ? -0.4 + (y + 0.4) * 0.3 : y;
    // Slight indent at top for central sulcus
    const centralSulcus = Math.abs(theta - Math.PI) < 0.15 && phi > 0.3 && phi < 1.5 ? -0.03 : 0;
    BRAIN_SURFACE.push({ x, y: yAdjusted + centralSulcus, z });
  }
}

function rotateY(point, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos,
  };
}

function rotateX(point, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
}

function project(point3d, centerX, centerY, scale) {
  const fov = 2.5;
  const z = point3d.z + fov;
  const factor = fov / z;
  return {
    x: centerX + point3d.x * scale * factor,
    y: centerY - point3d.y * scale * factor,
    z: point3d.z,
    scale: factor,
  };
}

export default function Brain3DView({ onRegionPress, width, height }) {
  const viewWidth = width || SCREEN_WIDTH - 40;
  const viewHeight = height || 320;
  const [rotY, setRotY] = useState(-0.3);
  const [rotX, setRotX] = useState(0.15);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const lastTouch = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0.15, y: -0.3 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 5 || Math.abs(gs.dy) > 5,
      onPanResponderGrant: (evt) => {
        lastTouch.current = { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY };
        rotRef.current = { x: rotX, y: rotY };
      },
      onPanResponderMove: (evt) => {
        const dx = evt.nativeEvent.pageX - lastTouch.current.x;
        const dy = evt.nativeEvent.pageY - lastTouch.current.y;
        setRotY(rotRef.current.y + dx * 0.008);
        setRotX(Math.max(-0.8, Math.min(0.8, rotRef.current.x + dy * 0.008)));
      },
    })
  ).current;

  const centerX = viewWidth / 2;
  const centerY = viewHeight / 2;
  const scale = viewWidth * 0.35;

  // Project brain surface points
  const projectedSurface = BRAIN_SURFACE.map((p) => {
    const r1 = rotateY(p, rotY);
    const r2 = rotateX(r1, rotX);
    return project(r2, centerX, centerY, scale);
  }).filter((p) => p.z > -1.5);

  // Project region hotspots
  const projectedRegions = BRAIN_REGIONS_3D.map((region) => {
    const r1 = rotateY(region, rotY);
    const r2 = rotateX(r1, rotX);
    const p = project(r2, centerX, centerY, scale);
    return { ...region, px: p.x, py: p.y, pz: r2.z, pScale: p.scale };
  })
    .filter((r) => r.pz > -0.8) // Only show front-facing regions
    .sort((a, b) => a.pz - b.pz); // Render back-to-front

  const handleRegionPress = (region) => {
    setSelectedRegion(region.id === selectedRegion ? null : region.id);
    if (onRegionPress) {
      onRegionPress(region.id);
    }
  };

  const viewLabel = (() => {
    const normalizedY = ((rotY % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    if (normalizedY < 0.8 || normalizedY > 5.5) return 'Left Side';
    if (normalizedY >= 0.8 && normalizedY < 2.3) return 'Back View';
    if (normalizedY >= 2.3 && normalizedY < 4.0) return 'Right Side';
    return 'Front View';
  })();

  return (
    <View style={styles.container}>
      <View style={styles.viewLabelRow}>
        <Text style={styles.viewLabel}>{viewLabel}</Text>
        <Text style={styles.dragHint}>Drag to rotate</Text>
      </View>

      <View
        style={[styles.brainCanvas, { width: viewWidth, height: viewHeight }]}
        {...panResponder.panHandlers}
      >
        {/* Brain surface dots */}
        {projectedSurface.map((p, i) => (
          <View
            key={`s${i}`}
            style={[
              styles.surfaceDot,
              {
                left: p.x - 1.5,
                top: p.y - 1.5,
                width: 3,
                height: 3,
                opacity: 0.15 + (p.z + 1.5) * 0.12,
                backgroundColor: '#4C6EF5',
              },
            ]}
          />
        ))}

        {/* Region hotspots */}
        {projectedRegions.map((region) => {
          const isSelected = selectedRegion === region.id;
          const dotSize = region.size * region.pScale * 0.7;
          const clampedSize = Math.max(8, Math.min(dotSize, 24));
          return (
            <TouchableOpacity
              key={region.id}
              style={[
                styles.regionDot,
                {
                  left: region.px - clampedSize / 2,
                  top: region.py - clampedSize / 2,
                  width: clampedSize,
                  height: clampedSize,
                  borderRadius: clampedSize / 2,
                  backgroundColor: region.color + (isSelected ? 'FF' : '90'),
                  borderWidth: isSelected ? 2 : 0,
                  borderColor: '#FFFFFF',
                  shadowColor: region.color,
                  shadowOpacity: isSelected ? 0.8 : 0.4,
                  shadowRadius: isSelected ? 8 : 4,
                  elevation: isSelected ? 8 : 3,
                },
              ]}
              onPress={() => handleRegionPress(region)}
              activeOpacity={0.7}
            />
          );
        })}

        {/* Labels for visible regions */}
        {projectedRegions.map((region) => {
          const isSelected = selectedRegion === region.id;
          if (!isSelected && region.pScale < 0.7) return null;
          const dotSize = Math.max(8, Math.min(region.size * region.pScale * 0.7, 24));
          return (
            <View
              key={`label-${region.id}`}
              style={[
                styles.regionLabel,
                {
                  left: region.px + dotSize / 2 + 4,
                  top: region.py - 8,
                  opacity: isSelected ? 1 : 0.7,
                },
              ]}
              pointerEvents="none"
            >
              <Text
                style={[
                  styles.regionLabelText,
                  {
                    color: isSelected ? '#FFFFFF' : region.color,
                    fontWeight: isSelected ? '700' : '500',
                    fontSize: isSelected ? 11 : 9,
                  },
                ]}
                numberOfLines={1}
              >
                {region.name}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Selected region info */}
      {selectedRegion && (
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View
              style={[
                styles.infoDot,
                {
                  backgroundColor:
                    BRAIN_REGIONS_3D.find((r) => r.id === selectedRegion)?.color || COLORS.electricBlue,
                },
              ]}
            />
            <Text style={styles.infoTitle}>
              {BRAIN_REGIONS_3D.find((r) => r.id === selectedRegion)?.name}
            </Text>
          </View>
          <Text style={styles.infoHint}>Tap the region in the list below for details</Text>
        </View>
      )}

      {/* Rotation controls */}
      <View style={styles.controlsRow}>
        {['Front', 'Left', 'Back', 'Right', 'Top'].map((view) => {
          const angles = {
            Front: { x: 0, y: Math.PI },
            Left: { x: 0, y: -0.3 },
            Back: { x: 0, y: 0 },
            Right: { x: 0, y: Math.PI + 0.3 },
            Top: { x: 0.8, y: -0.3 },
          };
          return (
            <TouchableOpacity
              key={view}
              style={styles.controlButton}
              onPress={() => {
                setRotX(angles[view].x);
                setRotY(angles[view].y);
                rotRef.current = angles[view];
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonText}>{view}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  viewLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  viewLabel: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dragHint: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontStyle: 'italic',
  },
  brainCanvas: {
    backgroundColor: COLORS.deepNavy,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
    position: 'relative',
  },
  surfaceDot: {
    position: 'absolute',
    borderRadius: 2,
  },
  regionDot: {
    position: 'absolute',
    zIndex: 10,
  },
  regionLabel: {
    position: 'absolute',
    zIndex: 20,
    maxWidth: 120,
  },
  regionLabelText: {
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    width: '100%',
    marginHorizontal: SPACING.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  infoTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  infoHint: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  controlButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.semibold,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../utils/theme';
import LateralView from './LateralView';

// Side-by-side left and right hemisphere views
export default function BilateralView({ width = 360, height = 300, onHotspotPress, highlightedRegion }) {
  const halfWidth = (width - 12) / 2; // 12px gap
  const viewHeight = height;

  return (
    <View style={styles.container}>
      <View style={styles.hemisphereRow}>
        {/* Left hemisphere */}
        <View style={styles.hemisphere}>
          <Text style={styles.label}>Left Hemisphere</Text>
          <View style={styles.diagramBox}>
            <LateralView
              width={halfWidth}
              height={viewHeight}
              showLabels={false}
              onHotspotPress={onHotspotPress}
              highlightedRegion={highlightedRegion}
            />
          </View>
        </View>

        {/* Right hemisphere (mirrored) */}
        <View style={styles.hemisphere}>
          <Text style={styles.label}>Right Hemisphere</Text>
          <View style={[styles.diagramBox, styles.mirrored]}>
            <LateralView
              width={halfWidth}
              height={viewHeight}
              showLabels={false}
              onHotspotPress={onHotspotPress}
              highlightedRegion={highlightedRegion}
            />
          </View>
        </View>
      </View>

      <Text style={styles.note}>
        Both hemispheres share the same structures but specialize differently.
        Left: language, logic. Right: spatial, creativity.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  hemisphereRow: {
    flexDirection: 'row',
    gap: 12,
  },
  hemisphere: {
    alignItems: 'center',
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  diagramBox: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },
  mirrored: {
    transform: [{ scaleX: -1 }],
  },
  note: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    lineHeight: 16,
  },
});

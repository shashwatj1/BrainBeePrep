import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';

export default function ProgressBar({ progress = 0, color = COLORS.electricBlue, height = 8, showLabel = false, label = '' }) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.percentage}>{Math.round(clampedProgress * 100)}%</Text>
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <View
          style={[
            styles.fill,
            { width: `${clampedProgress * 100}%`, backgroundColor: color, height },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  percentage: {
    color: COLORS.textAccent,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },
  track: {
    backgroundColor: COLORS.surfaceLighter,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BORDER_RADIUS.round,
  },
});

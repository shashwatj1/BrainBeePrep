import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';

export default function SearchBar({ value, onChangeText, placeholder = 'Search...' }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        selectionColor={COLORS.electricBlue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
});

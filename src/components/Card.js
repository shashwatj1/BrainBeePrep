import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../utils/theme';

export default function Card({ title, subtitle, icon, color, onPress, children, style }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: (color || COLORS.electricBlue) + '20' }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
      )}
      <View style={styles.content}>
        {title && <Text style={styles.title} numberOfLines={2}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>}
        {children}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
});

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/utils/theme';

const navTheme = {
  dark: true,
  colors: {
    primary: COLORS.electricBlue,
    background: COLORS.darkNavy,
    card: COLORS.deepNavy,
    text: COLORS.textPrimary,
    border: COLORS.cardBorder,
    notification: COLORS.electricBlue,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}

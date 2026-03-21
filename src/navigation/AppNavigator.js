import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../utils/theme';

// Screens
import LearnScreen from '../screens/LearnScreen';
import ChapterDetailScreen from '../screens/ChapterDetailScreen';
import DiseaseLibraryScreen from '../screens/DiseaseLibraryScreen';
import DiseaseDetailScreen from '../screens/DiseaseDetailScreen';
import GlossaryBrowserScreen from '../screens/GlossaryBrowserScreen';
import PathwayListScreen from '../screens/PathwayListScreen';
import PathwayDetailScreen from '../screens/PathwayDetailScreen';

import QuizScreen from '../screens/QuizScreen';
import ChapterQuizScreen from '../screens/ChapterQuizScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import FlashcardDeckPickerScreen from '../screens/FlashcardDeckPickerScreen';
import GlossaryQuizScreen from '../screens/GlossaryQuizScreen';
import NTMatcherScreen from '../screens/NTMatcherScreen';
import OralSimulatorScreen from '../screens/OralSimulatorScreen';

import BrainMapScreen from '../screens/BrainMapScreen';
import BrainRegionDetailScreen from '../screens/BrainRegionDetailScreen';

import ProgressScreen from '../screens/ProgressScreen';

import MoreScreen from '../screens/MoreScreen';
import NTGuideScreen from '../screens/NTGuideScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

function TabIcon({ label, icon, focused }) {
  return (
    <View style={tabStyles.iconContainer}>
      <Text style={[tabStyles.icon, focused && tabStyles.iconFocused]}>{icon}</Text>
      <Text style={[tabStyles.label, focused && tabStyles.labelFocused]} numberOfLines={1}>{label}</Text>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    width: 60,
  },
  icon: {
    fontSize: 22,
    opacity: 0.5,
  },
  iconFocused: {
    opacity: 1,
  },
  label: {
    fontSize: 9,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '500',
    textAlign: 'center',
  },
  labelFocused: {
    color: COLORS.electricBlue,
    fontWeight: '600',
  },
});

// Learn Stack
function LearnStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="LearnHome" component={LearnScreen} />
      <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
      <Stack.Screen name="DiseaseLibrary" component={DiseaseLibraryScreen} />
      <Stack.Screen name="DiseaseDetail" component={DiseaseDetailScreen} />
      <Stack.Screen name="GlossaryBrowser" component={GlossaryBrowserScreen} />
      <Stack.Screen name="GlossaryQuiz" component={GlossaryQuizScreen} />
      <Stack.Screen name="PathwayList" component={PathwayListScreen} />
      <Stack.Screen name="PathwayDetail" component={PathwayDetailScreen} />
      <Stack.Screen name="Flashcards" component={FlashcardScreen} />
      <Stack.Screen name="ChapterQuiz" component={ChapterQuizScreen} />
    </Stack.Navigator>
  );
}

// Quiz Stack
function QuizStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="QuizHome" component={QuizScreen} />
      <Stack.Screen name="ChapterQuiz" component={ChapterQuizScreen} />
      <Stack.Screen name="Flashcards" component={FlashcardScreen} />
      <Stack.Screen name="FlashcardDeckPicker" component={FlashcardDeckPickerScreen} />
      <Stack.Screen name="GlossaryQuiz" component={GlossaryQuizScreen} />
      <Stack.Screen name="NTMatcher" component={NTMatcherScreen} />
      <Stack.Screen name="OralSimulator" component={OralSimulatorScreen} />
    </Stack.Navigator>
  );
}

// Brain Map Stack
function BrainMapStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="BrainMapHome" component={BrainMapScreen} />
      <Stack.Screen name="BrainRegionDetail" component={BrainRegionDetailScreen} />
      <Stack.Screen name="DiseaseLibrary" component={DiseaseLibraryScreen} />
      <Stack.Screen name="DiseaseDetail" component={DiseaseDetailScreen} />
    </Stack.Navigator>
  );
}

// Progress Stack
function ProgressStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ProgressHome" component={ProgressScreen} />
      <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
      <Stack.Screen name="Flashcards" component={FlashcardScreen} />
    </Stack.Navigator>
  );
}

// More Stack
function MoreStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MoreHome" component={MoreScreen} />
      <Stack.Screen name="DiseaseLibrary" component={DiseaseLibraryScreen} />
      <Stack.Screen name="DiseaseDetail" component={DiseaseDetailScreen} />
      <Stack.Screen name="GlossaryBrowser" component={GlossaryBrowserScreen} />
      <Stack.Screen name="GlossaryQuiz" component={GlossaryQuizScreen} />
      <Stack.Screen name="PathwayList" component={PathwayListScreen} />
      <Stack.Screen name="PathwayDetail" component={PathwayDetailScreen} />
      <Stack.Screen name="NTGuide" component={NTGuideScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.deepNavy,
          borderTopColor: COLORS.cardBorder,
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.electricBlue,
        tabBarInactiveTintColor: COLORS.textMuted,
      }}
    >
      <Tab.Screen
        name="Learn"
        component={LearnStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Learn" icon="📚" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Quiz" icon="✏️" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="BrainMap"
        component={BrainMapStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Brain" icon="🧠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Stats" icon="📊" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="More" icon="⚙️" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

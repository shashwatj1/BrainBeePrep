import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import App from './App';

// Suppress non-critical warnings that can cause TurboModule crashes on iPad
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  'Sending `onAnimatedValueUpdate`',
]);

// Global error handler to prevent native crashes from unhandled JS errors
const originalHandler = ErrorUtils.getGlobalHandler();
ErrorUtils.setGlobalHandler((error, isFatal) => {
  // Log but don't crash on non-fatal errors
  if (!isFatal) {
    console.warn('Non-fatal error caught:', error?.message || error);
    return;
  }
  // For fatal errors, call the original handler
  if (originalHandler) {
    originalHandler(error, isFatal);
  }
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

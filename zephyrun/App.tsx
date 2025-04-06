import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from './src/hooks/useAuth';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { RegisterScreen } from './src/screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/auth/ForgotPasswordScreen';
import { MainNavigator } from './src/navigation/MainNavigator';
import { checkEnvVariables } from './src/utils/env';
import { View, Text } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [envError, setEnvError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    async function prepare() {
      try {
        // Check if environment variables are configured
        const envCheck = checkEnvVariables();
        if (!envCheck.isConfigured) {
          setEnvError(envCheck.errorMessage);
          await SplashScreen.hideAsync();
          setIsReady(true);
          return;
        }

        // Wait for auth to be ready
        if (!authLoading) {
          await SplashScreen.hideAsync();
          setIsReady(true);
        }
      } catch (e) {
        console.warn('Error during app preparation:', e);
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    }

    prepare();
  }, [authLoading]);

  if (!isReady || authLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-base text-foreground">Loading...</Text>
      </View>
    );
  }

  if (envError) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-6">
        <Text className="mb-4 text-xl font-bold text-destructive">
          Environment Configuration Error
        </Text>
        <Text className="text-center text-base text-muted-foreground">
          {envError}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' },
          }}
        >
          {(!user && !__DEV__) ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            </>
          ) : (
            <Stack.Screen name="Main" component={MainNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

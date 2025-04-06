import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setError(null);
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDevBypass = () => {
    // @ts-ignore - Ignore type checking for dev navigation
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 py-12">
            {/* App Name and Tagline */}
            <View className="items-center mb-12">
              <View className="w-24 h-24 rounded-full bg-primary-100 items-center justify-center mb-4">
                <LogIn size={48} color={theme.colors.primary[600]} />
              </View>
              <Text className="text-4xl font-bold text-primary-600">
                Zephyrun
              </Text>
              <Text className="text-base text-secondary-500 mt-2 text-center">
                Your AI-Powered Running Companion
              </Text>
            </View>

            {/* Error Message */}
            {error && (
              <View className="flex-row items-center bg-error-50 p-3 rounded-md mb-6">
                <AlertCircle size={20} color={theme.colors.error[500]} className="mr-2" />
                <Text className="text-error-700 flex-1">{error}</Text>
              </View>
            )}

            {/* Login Form */}
            <View className="space-y-6">
              <View className="space-y-2">
                <Text className="text-sm font-medium text-secondary-700">
                  Email
                </Text>
                <View className="relative">
                  <Mail 
                    className="absolute left-3 top-3.5" 
                    size={20} 
                    color={theme.colors.secondary[400]}
                  />
                  <Input
                    className="pl-10 bg-white border-secondary-200"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setError(null);
                    }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor={theme.colors.secondary[400]}
                    accessibilityLabel="Email input field"
                    accessibilityHint="Enter your email address to sign in"
                  />
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-secondary-700">
                  Password
                </Text>
                <View className="relative">
                  <Lock 
                    className="absolute left-3 top-3.5" 
                    size={20} 
                    color={theme.colors.secondary[400]}
                  />
                  <Input
                    className="pl-10 bg-white border-secondary-200"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setError(null);
                    }}
                    secureTextEntry
                    placeholderTextColor={theme.colors.secondary[400]}
                    accessibilityLabel="Password input field"
                    accessibilityHint="Enter your password to sign in"
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                className="self-end"
                accessibilityLabel="Forgot password link"
                accessibilityHint="Navigate to forgot password screen"
              >
                <Text className="text-sm font-medium text-primary-600">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <Button
                onPress={handleLogin}
                disabled={loading}
                className="w-full bg-primary-600 h-12"
                accessibilityLabel="Sign in button"
                accessibilityHint="Press to sign in with your credentials"
              >
                <View className="flex-row items-center justify-center">
                  <LogIn size={20} color="white" className="mr-2" />
                  <Text className="text-white font-medium text-base">
                    {loading ? 'Signing in...' : 'Sign in'}
                  </Text>
                </View>
              </Button>

              {/* Development bypass button */}
              {__DEV__ && (
                <Button
                  onPress={handleDevBypass}
                  variant="outline"
                  className="w-full border-error-500 h-12 mt-4"
                  accessibilityLabel="Development mode bypass button"
                  accessibilityHint="Skip authentication for development purposes"
                >
                  <Text className="text-error-500 font-medium">
                    Dev Mode: Skip Auth
                  </Text>
                </Button>
              )}
            </View>

            {/* Sign Up Link */}
            <View className="mt-8 flex-row justify-center space-x-1">
              <Text className="text-sm text-secondary-500">
                Don't have an account?
              </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
                accessibilityLabel="Create account link"
                accessibilityHint="Navigate to registration screen"
              >
                <Text className="text-sm font-medium text-primary-600">
                  Create one
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 
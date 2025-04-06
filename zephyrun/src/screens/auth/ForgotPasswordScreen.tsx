import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react-native';

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      // TODO: Implement password reset logic
      setSuccess(true);
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background p-6">
      <View className="flex-1 justify-center space-y-6">
        <View className="space-y-2">
          <Text className="text-4xl font-bold tracking-tight text-foreground">
            Reset Password
          </Text>
          <Text className="text-base text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </View>

        {success ? (
          <View className="space-y-4">
            <Text className="text-center text-base text-muted-foreground">
              Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
            </Text>
            <Button
              variant="outline"
              onPress={() => navigation.navigate('Login')}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to login
            </Button>
          </View>
        ) : (
          <View className="space-y-4">
            <View className="space-y-2">
              <Text className="text-sm font-medium text-foreground">Email</Text>
              <View className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <Button
              onPress={handleResetPassword}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Sending link...' : 'Send reset link'}
              {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>

            <View className="flex-row justify-center space-x-1">
              <Text className="text-sm text-muted-foreground">
                Remember your password?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-sm font-medium text-primary">
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
} 
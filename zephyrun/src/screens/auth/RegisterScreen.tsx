import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, User, ArrowRight } from 'lucide-react-native';

export function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      setLoading(true);
      await signUp(email, password);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background p-6">
      <View className="flex-1 justify-center space-y-6">
        <View className="space-y-2">
          <Text className="text-4xl font-bold tracking-tight text-foreground">
            Create Account
          </Text>
          <Text className="text-base text-muted-foreground">
            Enter your details to create your account
          </Text>
        </View>

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

          <View className="space-y-2">
            <Text className="text-sm font-medium text-foreground">Password</Text>
            <View className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Choose a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        <Button
          onPress={handleRegister}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creating account...' : 'Create account'}
          {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
        </Button>

        <View className="flex-row justify-center space-x-1">
          <Text className="text-sm text-muted-foreground">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-sm font-medium text-primary">
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
} 
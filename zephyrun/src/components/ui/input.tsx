import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface InputProps extends TextInputProps {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(
        'flex h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground',
        'placeholder:text-muted-foreground',
        'focus:border-primary focus:outline-none',
        className
      )}
      placeholderTextColor="#6B7280"
      {...props}
    />
  );
} 
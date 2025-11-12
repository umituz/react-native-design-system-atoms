/**
 * AtomicFormError - Universal Form Error Component
 *
 * Provides consistent error message display for forms
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Display validation error messages
 *
 * Usage:
 * - Form field validation errors
 * - Global form error messages
 * - API error display
 * - Input validation feedback
 */

import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { AtomicText } from './AtomicText';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { withAlpha } from '@umituz/react-native-theme';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AtomicFormErrorProps {
  /** Error message to display */
  message: string | null | undefined;
  /** Error display variant */
  variant?: 'global' | 'field';
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Custom text style */
  textStyle?: StyleProp<TextStyle>;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicFormError: React.FC<AtomicFormErrorProps> = ({
  message,
  variant = 'field',
  style,
  textStyle,
}) => {
  const tokens = useAppDesignTokens();

  if (!message) {
    return null;
  }

  if (variant === 'global') {
    return (
      <View
        style={[
          {
            padding: tokens.spacing.md,
            borderRadius: tokens.borders.radius.md,
            marginBottom: tokens.spacing.sm,
            backgroundColor: withAlpha(tokens.colors.error, 0.15),
          },
          style,
        ]}
      >
        <AtomicText
          type="bodySmall"
          color="error"
          style={StyleSheet.flatten([
            {
              textAlign: 'center',
              fontWeight: tokens.typography.medium,
            },
            textStyle,
          ])}
        >
          {message}
        </AtomicText>
      </View>
    );
  }

  return (
    <AtomicText
      type="bodySmall"
      color="error"
      style={StyleSheet.flatten([
        {
          marginTop: tokens.spacing.xs,
          marginLeft: tokens.spacing.xs,
        },
        textStyle,
      ])}
    >
      {message}
    </AtomicText>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default AtomicFormError;

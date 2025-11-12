/**
 * AtomicTextArea Component
 *
 * A multiline text input component with pure React Native implementation
 * for longer text entry with consistent styling.
 *
 * Features:
 * - Pure React Native TextInput with multiline
 * - Outlined/filled/flat variants
 * - Error, success, disabled states
 * - Character counter with max length
 * - Helper text for guidance or errors
 * - Configurable rows for height
 * - Theme-aware styling
 * - Full accessibility support
 *
 * Usage:
 * ```tsx
 * const [description, setDescription] = useState('');
 *
 * <AtomicTextArea
 *   value={description}
 *   onChangeText={setDescription}
 *   label="Description"
 *   placeholder="Enter description..."
 *   maxLength={500}
 *   showCharacterCount
 *   rows={6}
 *   helperText="Provide a detailed description"
 * />
 * ```
 */

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { AtomicText } from './AtomicText';

export type AtomicTextAreaVariant = 'outlined' | 'filled' | 'flat';
export type AtomicTextAreaState = 'default' | 'error' | 'success' | 'disabled';
export type AtomicTextAreaSize = 'sm' | 'md' | 'lg';

export interface AtomicTextAreaProps {
  /** Textarea label */
  label?: string;
  /** Current textarea value */
  value?: string;
  /** Value change callback */
  onChangeText?: (text: string) => void;
  /** Textarea variant (outlined, filled, flat) */
  variant?: AtomicTextAreaVariant;
  /** Textarea state (default, error, success, disabled) */
  state?: AtomicTextAreaState;
  /** Textarea size (sm, md, lg) */
  size?: AtomicTextAreaSize;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below textarea */
  helperText?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Show character counter */
  showCharacterCount?: boolean;
  /** Number of visible text rows */
  rows?: number;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Auto-capitalize */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Auto-correct */
  autoCorrect?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Input text style */
  inputStyle?: StyleProp<TextStyle>;
  /** Test ID for E2E testing */
  testID?: string;
  /** Blur callback */
  onBlur?: () => void;
  /** Focus callback */
  onFocus?: () => void;
}

/**
 * AtomicTextArea - Pure React Native Multiline Text Input
 */
export const AtomicTextArea: React.FC<AtomicTextAreaProps> = ({
  variant = 'outlined',
  state = 'default',
  size = 'md',
  label,
  value = '',
  onChangeText,
  placeholder,
  helperText,
  maxLength,
  showCharacterCount = false,
  rows = 4,
  minHeight,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  disabled = false,
  style,
  inputStyle,
  testID,
  onBlur,
  onFocus,
}) => {
  const tokens = useAppDesignTokens();
  const [isFocused, setIsFocused] = useState(false);
  const isDisabled = state === 'disabled' || disabled;
  const characterCount = value?.toString().length || 0;
  const hasError = state === 'error';
  const hasSuccess = state === 'success';

  // Size configuration
  const sizeConfig = {
    sm: {
      paddingVertical: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.sm,
      fontSize: tokens.typography.bodySmall.fontSize,
      lineHeight: 20,
    },
    md: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      fontSize: tokens.typography.bodyMedium.fontSize,
      lineHeight: 24,
    },
    lg: {
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
      fontSize: tokens.typography.bodyLarge.fontSize,
      lineHeight: 28,
    },
  };

  const config = sizeConfig[size];

  // Calculate height based on rows
  const getTextAreaHeight = () => {
    if (minHeight) return minHeight;
    const paddingVertical = config.paddingVertical * 2;
    return (rows * config.lineHeight) + paddingVertical;
  };

  // Get variant styles
  const getVariantStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.md,
    };

    let borderColor = tokens.colors.border;
    if (isFocused) borderColor = tokens.colors.primary;
    if (hasError) borderColor = tokens.colors.error;
    if (hasSuccess) borderColor = tokens.colors.success;
    if (isDisabled) borderColor = tokens.colors.borderDisabled;

    switch (variant) {
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: isFocused ? 2 : 1,
          borderColor,
        };

      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: tokens.colors.surfaceSecondary,
          borderWidth: 0,
          borderBottomWidth: isFocused ? 2 : 1,
          borderBottomColor: borderColor,
        };

      case 'flat':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
          borderRadius: 0,
        };

      default:
        return baseStyle;
    }
  };

  // Get text color based on state
  const getTextColor = () => {
    if (isDisabled) return tokens.colors.textDisabled;
    if (hasError) return tokens.colors.error;
    if (hasSuccess) return tokens.colors.success;
    return tokens.colors.textPrimary;
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    getVariantStyle(),
    {
      paddingVertical: config.paddingVertical,
      paddingHorizontal: config.paddingHorizontal,
      height: getTextAreaHeight(),
      opacity: isDisabled ? 0.5 : 1,
    },
    style,
  ];

  const textInputStyle: StyleProp<TextStyle> = [
    styles.input,
    {
      fontSize: config.fontSize,
      lineHeight: config.lineHeight,
      color: getTextColor(),
    },
    inputStyle,
  ];

  return (
    <View testID={testID}>
      {label && (
        <AtomicText
          type="labelMedium"
          color={hasError ? 'error' : hasSuccess ? 'success' : 'secondary'}
          style={styles.label}
        >
          {label}
        </AtomicText>
      )}

      <View style={containerStyle}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={tokens.colors.textSecondary}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={!isDisabled}
          multiline={true}
          numberOfLines={rows}
          textAlignVertical="top"
          style={textInputStyle}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          testID={testID ? `${testID}-input` : undefined}
        />
      </View>

      {(helperText || showCharacterCount) && (
        <View style={styles.helperRow}>
          {helperText && (
            <AtomicText
              type="bodySmall"
              color={hasError ? 'error' : 'secondary'}
              style={styles.helperText}
              testID={testID ? `${testID}-helper` : undefined}
            >
              {helperText}
            </AtomicText>
          )}
          {showCharacterCount && maxLength && (
            <AtomicText
              type="bodySmall"
              color="secondary"
              style={styles.characterCount}
              testID={testID ? `${testID}-count` : undefined}
            >
              {characterCount}/{maxLength}
            </AtomicText>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  input: {
    flex: 1,
  },
  label: {
    marginBottom: 4,
  },
  helperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  helperText: {
    flex: 1,
  },
  characterCount: {
    marginLeft: 8,
  },
});

export type { AtomicTextAreaProps as TextAreaProps };

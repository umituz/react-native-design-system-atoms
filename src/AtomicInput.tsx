import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { AtomicIcon } from './AtomicIcon';
import { AtomicText } from './AtomicText';
import type { AtomicIconName, AtomicIconSize } from './AtomicIcon';

export type AtomicInputVariant = 'outlined' | 'filled' | 'flat';
export type AtomicInputState = 'default' | 'error' | 'success' | 'disabled';
export type AtomicInputSize = 'sm' | 'md' | 'lg';

export interface AtomicInputProps {
  /** Input label */
  label?: string;
  /** Current input value */
  value?: string;
  /** Value change callback */
  onChangeText?: (text: string) => void;
  /** Input variant (outlined, filled, flat) */
  variant?: AtomicInputVariant;
  /** Input state (default, error, success, disabled) */
  state?: AtomicInputState;
  /** Input size (sm, md, lg) */
  size?: AtomicInputSize;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below input */
  helperText?: string;
  /** Leading icon (Lucide icon name) */
  leadingIcon?: AtomicIconName;
  /** Trailing icon (Lucide icon name) */
  trailingIcon?: AtomicIconName;
  /** Callback when trailing icon is pressed */
  onTrailingIconPress?: () => void;
  /** Show password toggle for secure inputs */
  showPasswordToggle?: boolean;
  /** Secure text entry (password field) */
  secureTextEntry?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Show character counter */
  showCharacterCount?: boolean;
  /** Keyboard type */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url' | 'number-pad' | 'decimal-pad';
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
 * AtomicInput - Pure React Native Text Input
 *
 * Features:
 * - Pure React Native implementation (no Paper dependency)
 * - Lucide icons for password toggle and custom icons
 * - Outlined/filled/flat variants
 * - Error, success, disabled states
 * - Character counter
 * - Responsive sizing
 * - Full accessibility support
 */
export const AtomicInput: React.FC<AtomicInputProps> = ({
  variant = 'outlined',
  state = 'default',
  size = 'md',
  label,
  value = '',
  onChangeText,
  placeholder,
  helperText,
  leadingIcon,
  trailingIcon,
  onTrailingIconPress,
  showPasswordToggle = false,
  secureTextEntry = false,
  maxLength,
  showCharacterCount = false,
  keyboardType = 'default',
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
      iconSize: 16,
      minHeight: 40,
    },
    md: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      fontSize: tokens.typography.bodyMedium.fontSize,
      iconSize: 20,
      minHeight: 48,
    },
    lg: {
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
      fontSize: tokens.typography.bodyLarge.fontSize,
      iconSize: 24,
      minHeight: 56,
    },
  };

  const config = sizeConfig[size] ?? sizeConfig.md;
  
  // Ensure config is always defined with safe fallbacks
  const fontSize = config?.fontSize ?? tokens.typography.bodyMedium?.fontSize ?? 16;
  const iconSize = config?.iconSize ?? 20;
  const paddingVertical = config?.paddingVertical ?? tokens.spacing?.sm ?? 8;
  const paddingHorizontal = config?.paddingHorizontal ?? tokens.spacing?.md ?? 12;
  const minHeight = config?.minHeight ?? 48;

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

  const iconColor = isDisabled ? tokens.colors.textDisabled : tokens.colors.textSecondary;

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    getVariantStyle(),
    {
      paddingTop: paddingVertical,
      paddingBottom: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      minHeight: minHeight,
      justifyContent: 'center',
      opacity: isDisabled ? 0.5 : 1,
    },
    style,
  ];

  const textInputStyle: StyleProp<TextStyle> = [
    styles.input,
    {
      fontSize: fontSize,
      lineHeight: fontSize * 1.2, // Tighter lineHeight to prevent text clipping
      color: getTextColor(),
      paddingVertical: 0, // Remove vertical padding to prevent clipping
    },
    leadingIcon ? { paddingLeft: iconSize + 8 } : undefined,
    (trailingIcon || showPasswordToggle) ? { paddingRight: iconSize + 8 } : undefined,
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
        {leadingIcon && (
          <View style={styles.leadingIcon}>
            <AtomicIcon
              name={leadingIcon}
              customSize={iconSize}
              customColor={iconColor}
            />
          </View>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={tokens.colors.textSecondary}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={!isDisabled}
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

        {(showPasswordToggle && secureTextEntry) && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.trailingIcon}
          >
            <AtomicIcon
              name={isPasswordVisible ? "EyeOff" : "Eye"}
              customSize={iconSize}
              customColor={iconColor}
            />
          </Pressable>
        )}

        {trailingIcon && !showPasswordToggle && (
          <Pressable
            onPress={onTrailingIconPress}
            style={styles.trailingIcon}
            disabled={!onTrailingIconPress}
          >
            <AtomicIcon
              name={trailingIcon}
              customSize={iconSize}
              customColor={iconColor}
            />
          </Pressable>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  label: {
    marginBottom: 4,
  },
  leadingIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  trailingIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
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

export type { AtomicInputProps as InputProps };

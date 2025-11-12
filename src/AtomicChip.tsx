/**
 * AtomicChip - Universal Chip/Tag Component
 *
 * Displays small tags, labels, or status indicators
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Tag and label display
 *
 * Usage:
 * - Category tags
 * - Status indicators
 * - Filter chips
 * - Skill labels
 * - Badge displays
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { AtomicText } from './AtomicText';
import { AtomicIcon } from './AtomicIcon';
import { useAppDesignTokens } from '@umituz/react-native-theme';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AtomicChipProps {
  /** Text content of the chip */
  children: React.ReactNode;
  /** Chip variant */
  variant?: 'filled' | 'outlined' | 'soft';
  /** Chip size */
  size?: 'sm' | 'md' | 'lg';
  /** Chip color theme */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Custom background color */
  backgroundColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Leading icon */
  leadingIcon?: string;
  /** Trailing icon */
  trailingIcon?: string;
  /** Whether the chip is clickable */
  clickable?: boolean;
  /** Click handler */
  onPress?: () => void;
  /** Whether the chip is selected */
  selected?: boolean;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Style overrides */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicChip: React.FC<AtomicChipProps> = ({
  children,
  variant = 'filled',
  size = 'md',
  color = 'primary',
  backgroundColor,
  textColor,
  borderColor,
  leadingIcon,
  trailingIcon,
  clickable = false,
  onPress,
  selected = false,
  disabled = false,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Size mapping
  const sizeMap = {
    sm: { 
      paddingHorizontal: tokens.spacing.sm, 
      paddingVertical: tokens.spacing.xs, 
      fontSize: tokens.typography.bodySmall.fontSize, 
      iconSize: 'xs' as const 
    },
    md: { 
      paddingHorizontal: tokens.spacing.md, 
      paddingVertical: tokens.spacing.sm, 
      fontSize: tokens.typography.bodyMedium.fontSize, 
      iconSize: 'sm' as const 
    },
    lg: { 
      paddingHorizontal: tokens.spacing.md, 
      paddingVertical: tokens.spacing.sm, 
      fontSize: tokens.typography.bodyLarge.fontSize, 
      iconSize: 'sm' as const 
    },
  };

  const sizeConfig = sizeMap[size];

  // Color mapping
  const colorMap = {
    primary: {
      filled: { bg: tokens.colors.primary, text: tokens.colors.onPrimary, border: tokens.colors.primary },
      outlined: { bg: 'transparent', text: tokens.colors.primary, border: tokens.colors.primary },
      soft: { bg: tokens.colors.primaryContainer, text: tokens.colors.onPrimaryContainer, border: 'transparent' },
    },
    secondary: {
      filled: { bg: tokens.colors.secondary, text: tokens.colors.onSecondary, border: tokens.colors.secondary },
      outlined: { bg: 'transparent', text: tokens.colors.secondary, border: tokens.colors.secondary },
      soft: { bg: tokens.colors.secondaryContainer, text: tokens.colors.onSecondaryContainer, border: 'transparent' },
    },
    success: {
      filled: { bg: tokens.colors.success, text: tokens.colors.onSuccess, border: tokens.colors.success },
      outlined: { bg: 'transparent', text: tokens.colors.success, border: tokens.colors.success },
      soft: { bg: tokens.colors.successContainer, text: tokens.colors.onSuccessContainer, border: 'transparent' },
    },
    warning: {
      filled: { bg: tokens.colors.warning, text: tokens.colors.onWarning, border: tokens.colors.warning },
      outlined: { bg: 'transparent', text: tokens.colors.warning, border: tokens.colors.warning },
      soft: { bg: tokens.colors.warningContainer, text: tokens.colors.onWarningContainer, border: 'transparent' },
    },
    error: {
      filled: { bg: tokens.colors.error, text: tokens.colors.onError, border: tokens.colors.error },
      outlined: { bg: 'transparent', text: tokens.colors.error, border: tokens.colors.error },
      soft: { bg: tokens.colors.errorContainer, text: tokens.colors.onErrorContainer, border: 'transparent' },
    },
    info: {
      filled: { bg: tokens.colors.info, text: tokens.colors.onInfo, border: tokens.colors.info },
      outlined: { bg: 'transparent', text: tokens.colors.info, border: tokens.colors.info },
      soft: { bg: tokens.colors.infoContainer, text: tokens.colors.onInfoContainer, border: 'transparent' },
    },
  };

  const colorConfig = colorMap[color][variant];

  // Apply custom colors if provided
  const finalBackgroundColor = backgroundColor || colorConfig.bg;
  const finalTextColor = textColor || colorConfig.text;
  const finalBorderColor = borderColor || colorConfig.border;

  // Handle disabled state
  const isDisabled = disabled || (!clickable && !onPress);
  const opacity = isDisabled ? 0.5 : 1;

  // Handle selected state
  const selectedStyle = selected ? {
    borderWidth: tokens.borders.width.medium,
    borderColor: tokens.colors.primary,
  } : {};

  const chipStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizeConfig.paddingHorizontal,
    paddingVertical: sizeConfig.paddingVertical,
    backgroundColor: finalBackgroundColor,
    borderRadius: tokens.borders.radius.xl,
    borderWidth: variant === 'outlined' ? 1 : 0,
    borderColor: finalBorderColor,
    opacity,
    ...selectedStyle,
  };

  const textStyle = {
    fontSize: sizeConfig.fontSize,
    fontWeight: tokens.typography.medium,
  };

  const iconColor = finalTextColor;

  const content = (
    <View style={[chipStyle, style]} testID={testID}>
      {leadingIcon && (
        <AtomicIcon
          name={leadingIcon}
          size={sizeConfig.iconSize}
          customColor={iconColor}
          style={{ marginRight: tokens.spacing.xs }}
        />
      )}
      <AtomicText
        type="labelMedium"
        color={finalTextColor}
        style={textStyle}
      >
        {children}
      </AtomicText>
      {trailingIcon && (
        <AtomicIcon
          name={trailingIcon}
          size={sizeConfig.iconSize}
          customColor={iconColor}
          style={{ marginLeft: tokens.spacing.xs }}
        />
      )}
    </View>
  );

  if (clickable && onPress && !disabled) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

// =============================================================================
// EXPORTS
// =============================================================================

export default AtomicChip;

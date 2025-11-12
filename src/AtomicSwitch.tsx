/**
 * AtomicSwitch - Universal Switch Component
 *
 * Provides consistent switch/toggle functionality with theme integration
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Basic switch/toggle input
 *
 * Usage:
 * - Settings toggles
 * - Feature enable/disable
 * - Boolean preferences
 * - Form inputs
 */

import React from 'react';
import { Switch, SwitchProps, StyleSheet, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AtomicSwitchProps extends Omit<SwitchProps, 'style'> {
  /** Switch value */
  value: boolean;
  /** Value change handler */
  onValueChange: (value: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Disabled state */
  disabled?: boolean;
  /** Container style override */
  style?: ViewStyle;
  /** Track color override */
  trackColor?: { false: string; true: string };
  /** Thumb color override */
  thumbColor?: string;
  /** iOS specific props */
  ios_backgroundColor?: string;
}

// =============================================================================
// SIZE CONFIGURATION
// =============================================================================

const SIZE_CONFIG = {
  sm: { scaleX: 0.8, scaleY: 0.8 },
  md: { scaleX: 1, scaleY: 1 },
  lg: { scaleX: 1.2, scaleY: 1.2 },
} as const;

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicSwitch: React.FC<AtomicSwitchProps> = ({
  value,
  onValueChange,
  size = 'md',
  variant = 'primary',
  disabled = false,
  style,
  trackColor,
  thumbColor,
  ios_backgroundColor,
  ...props
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  const sizeConfig = SIZE_CONFIG[size as 'sm' | 'md' | 'lg'];
  const colors = getVariantColors(tokens, variant as 'primary' | 'secondary' | 'success' | 'warning' | 'error');

  const defaultTrackColor = trackColor || {
    false: colors.trackFalse,
    true: colors.trackTrue,
  };

  const defaultThumbColor = thumbColor || colors.thumb;
  const defaultIosBackgroundColor = ios_backgroundColor || colors.trackFalse;

  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={defaultTrackColor}
      thumbColor={defaultThumbColor}
      ios_backgroundColor={defaultIosBackgroundColor}
      style={[
        styles.switch,
        {
          transform: [{ scaleX: sizeConfig.scaleX }, { scaleY: sizeConfig.scaleY }],
        },
        style,
      ]}
      {...props}
    />
  );
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getVariantColors = (tokens: ReturnType<typeof useAppDesignTokens>, variant: AtomicSwitchProps['variant']) => {
  switch (variant) {
    case 'primary':
      return {
        trackFalse: tokens.colors.surfaceSecondary,
        trackTrue: tokens.colors.primary,
        thumb: tokens.colors.surface,
      };
    case 'secondary':
      return {
        trackFalse: tokens.colors.surfaceSecondary,
        trackTrue: tokens.colors.secondary,
        thumb: tokens.colors.surface,
      };
    case 'success':
      return {
        trackFalse: tokens.colors.surfaceSecondary,
        trackTrue: tokens.colors.success,
        thumb: tokens.colors.surface,
      };
    case 'warning':
      return {
        trackFalse: tokens.colors.surfaceSecondary,
        trackTrue: tokens.colors.warning,
        thumb: tokens.colors.surface,
      };
    case 'error':
      return {
        trackFalse: tokens.colors.surfaceSecondary,
        trackTrue: tokens.colors.error,
        thumb: tokens.colors.surface,
      };
    default:
      return {
        trackFalse: tokens.colors.surfaceSecondary,
        trackTrue: tokens.colors.primary,
        thumb: tokens.colors.surface,
      };
  }
};

// =============================================================================
// STYLES
// =============================================================================

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    switch: {
      // Default switch styling is handled by platform
    },
  });

// =============================================================================
// EXPORTS
// =============================================================================

export default AtomicSwitch;

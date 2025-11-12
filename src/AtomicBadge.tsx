/**
 * AtomicBadge - Universal Badge Component
 *
 * Provides consistent badge/notification count display
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Display counts, notifications, status indicators
 *
 * Usage:
 * - Notification counts
 * - Cart item counts
 * - Status indicators
 * - Achievement badges
 */

import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { AtomicText } from './AtomicText';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import type { DesignTokens } from '@umituz/react-native-theme';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AtomicBadgeProps {
  /** Badge content (number, text, or custom element) */
  children: React.ReactNode;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Shape variant */
  shape?: 'circle' | 'rounded' | 'square';
  /** Maximum value to display (e.g., 99+) */
  max?: number;
  /** Show badge even when count is 0 */
  showZero?: boolean;
  /** Container style override */
  style?: StyleProp<ViewStyle>;
  /** Text style override */
  textStyle?: StyleProp<TextStyle>;
  /** Minimum width */
  minWidth?: number;
  /** Maximum width */
  maxWidth?: number;
}

// =============================================================================
// SIZE CONFIGURATION
// =============================================================================

const getSizeConfig = (tokens: DesignTokens) => ({
  xs: {
    minHeight: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.xs,
    fontSize: tokens.typography.labelSmall.fontSize,
    borderRadius: tokens.borders.radius.sm,
  },
  sm: {
    minHeight: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.sm,
    fontSize: tokens.typography.bodySmall.fontSize,
    borderRadius: tokens.borders.radius.md,
  },
  md: {
    minHeight: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.sm,
    fontSize: tokens.typography.bodyMedium.fontSize,
    borderRadius: tokens.borders.radius.md,
  },
  lg: {
    minHeight: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing.md,
    fontSize: tokens.typography.bodyLarge.fontSize,
    borderRadius: tokens.borders.radius.lg,
  },
});

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicBadge: React.FC<AtomicBadgeProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  shape = 'circle',
  max,
  showZero = false,
  style,
  textStyle,
  minWidth,
  maxWidth,
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  const sizeConfig = getSizeConfig(tokens)[size as 'xs' | 'sm' | 'md' | 'lg'];
  const colors = getVariantColors(tokens, variant as 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info');
  const borderRadius = getBorderRadius(shape as 'circle' | 'rounded' | 'square', sizeConfig.borderRadius, tokens);

  // Handle max value display
  const displayValue = React.useMemo(() => {
    if (typeof children === 'number') {
      if (max && children > max) {
        return `${max}+`;
      }
      return children.toString();
    }
    return children;
  }, [children, max]);

  // Don't render if count is 0 and showZero is false
  if (typeof children === 'number' && children === 0 && !showZero) {
    return null;
  }

  const containerStyle = [
    styles.container,
    {
      minHeight: sizeConfig.minHeight,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      borderRadius,
      backgroundColor: colors.background,
      minWidth: minWidth || sizeConfig.minHeight,
      maxWidth,
    },
    style,
  ];

  const textStyleFinal = StyleSheet.flatten([
    styles.text,
    {
      fontSize: sizeConfig.fontSize,
    },
    textStyle,
  ]);

  return (
    <View style={containerStyle}>
      <AtomicText
        type="bodySmall"
        color={colors.text}
        style={textStyleFinal}
        numberOfLines={1}
      >
        {displayValue}
      </AtomicText>
    </View>
  );
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getVariantColors = (tokens: ReturnType<typeof useAppDesignTokens>, variant: AtomicBadgeProps['variant']) => {
  switch (variant) {
    case 'primary':
      return {
        background: tokens.colors.primary,
        text: tokens.colors.textInverse,
      };
    case 'secondary':
      return {
        background: tokens.colors.secondary,
        text: tokens.colors.textInverse,
      };
    case 'success':
      return {
        background: tokens.colors.success,
        text: tokens.colors.textInverse,
      };
    case 'warning':
      return {
        background: tokens.colors.warning,
        text: tokens.colors.textInverse,
      };
    case 'error':
      return {
        background: tokens.colors.error,
        text: tokens.colors.textInverse,
      };
    case 'info':
      return {
        background: tokens.colors.info,
        text: tokens.colors.textInverse,
      };
    default:
      return {
        background: tokens.colors.primary,
        text: tokens.colors.textInverse,
      };
  }
};

const getBorderRadius = (shape: AtomicBadgeProps['shape'], defaultRadius: number, tokens: ReturnType<typeof useAppDesignTokens>): number => {
  switch (shape) {
    case 'circle':
      return tokens.borders.radius.full; // Very large radius for circle
    case 'square':
      return tokens.borders.radius.sm;
    case 'rounded':
    default:
      return defaultRadius;
  }
};

// =============================================================================
// STYLES
// =============================================================================

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    text: {
      fontWeight: tokens.typography.semibold,
      textAlign: 'center',
    },
  });

// =============================================================================
// EXPORTS
// =============================================================================

export default AtomicBadge;

import { ViewStyle } from 'react-native';
import { FabVariant, FabSize, FabVariantConfig, FabSizeConfig } from '../types';
import type { DesignTokens } from '@umituz/react-native-theme';

/**
 * Material Design 3 FAB size configurations
 */
export const FAB_SIZES: Record<FabSize, FabSizeConfig> = {
  sm: {
    width: 40,
    height: 40,
    borderRadius: 20, // Perfect circle
  },
  md: {
    width: 56,
    height: 56,
    borderRadius: 28, // Perfect circle (Material Design 3 standard)
  },
  lg: {
    width: 72,
    height: 72,
    borderRadius: 36, // Perfect circle
  },
};

/**
 * Get FAB variant styles based on design tokens
 * Note: Icon colors are handled via customColor in AtomicIcon
 */
export const getFabVariants = (tokens: DesignTokens): Record<FabVariant, FabVariantConfig> => ({
  primary: {
    backgroundColor: tokens.colors.primary,
    iconColor: tokens.colors.onPrimary,
  },
  secondary: {
    backgroundColor: tokens.colors.secondary,
    iconColor: tokens.colors.onSecondary,
  },
  surface: {
    backgroundColor: tokens.colors.surface,
    iconColor: tokens.colors.onSurface,
  },
});

/**
 * Get icon size based on FAB size
 * Returns AtomicIconSize type ('sm', 'md', 'lg')
 */
export const getFabIconSize = (size: FabSize): 'sm' | 'md' | 'lg' => {
  switch (size) {
    case 'sm':
      return 'sm';
    case 'md':
      return 'md';
    case 'lg':
      return 'lg';
    default:
      return 'md';
  }
};

/**
 * Get FAB border for depth (shadows removed per CLAUDE.md)
 * Subtle border provides visual elevation without shadow issues
 */
export const getFabBorder = (tokens: DesignTokens): ViewStyle => ({
  borderWidth: 1,
  borderColor: tokens.colors.outline,
});

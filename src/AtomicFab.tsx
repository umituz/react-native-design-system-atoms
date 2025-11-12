import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { useResponsive } from '@umituz/react-native-design-system-responsive';
import { AtomicIcon } from './AtomicIcon';
import { AtomicFabProps } from './fab/types';
import {
  FAB_SIZES,
  getFabVariants,
  getFabIconSize,
  getFabBorder,
} from './fab/styles/fabStyles';

export type { FabSize, FabVariant, FabVariantConfig, FabSizeConfig, AtomicFabProps } from './fab/types';
export { FAB_SIZES, getFabVariants, getFabIconSize, getFabBorder };

/**
 * AtomicFab - Floating Action Button Component
 *
 * A Material Design 3 compliant FAB component for primary actions.
 * Follows CLAUDE.md standards for responsive positioning.
 *
 * @example
 * ```tsx
 * // IMPORTANT: FAB must be used at screen level, NOT inside ScrollView
 * <ScreenLayout>
 *   <ScrollView>
 *     {/* Your content *\/}
 *   </ScrollView>
 *   <AtomicFab
 *     icon="add"
 *     onPress={handleAddItem}
 *     variant="primary"
 *     size="md"
 *   />
 * </ScreenLayout>
 * ```
 *
 * Features:
 * - Material Design 3 sizes (sm: 40px, md: 56px, lg: 72px)
 * - Three variants: primary, secondary, surface
 * - Responsive positioning (above tab bar, safe area aware)
 * - Disabled state with opacity
 * - Theme-aware colors from design tokens
 * - Border for depth (no shadows per CLAUDE.md)
 */
export const AtomicFab: React.FC<AtomicFabProps> = ({
  icon,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  testID,
  accessibilityLabel,
}) => {
  const tokens = useAppDesignTokens();
  const responsive = useResponsive();
  const isDisabled = disabled;

  // Get configurations
  const sizeConfig = FAB_SIZES[size as 'sm' | 'md' | 'lg'];
  const variants = getFabVariants(tokens);
  const variantConfig = variants[variant as 'primary' | 'secondary' | 'surface'];
  const iconSize = getFabIconSize(size as 'sm' | 'md' | 'lg');

  // Combine styles
  const fabStyle = StyleSheet.flatten([
    {
      position: 'absolute' as const,
      bottom: responsive.fabPosition.bottom,
      right: responsive.fabPosition.right,
      width: sizeConfig.width,
      height: sizeConfig.height,
      borderRadius: sizeConfig.borderRadius,
      backgroundColor: variantConfig.backgroundColor,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    getFabBorder(tokens),
    isDisabled ? { opacity: tokens.opacity.disabled } : undefined,
    style, // Custom style override
  ]);

  return (
    <TouchableOpacity
      style={fabStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      testID={testID}
      accessibilityLabel={accessibilityLabel || `${icon} button`}
      accessibilityRole="button"
    >
      <AtomicIcon name={icon} size={iconSize} customColor={variantConfig.iconColor} />
    </TouchableOpacity>
  );
};

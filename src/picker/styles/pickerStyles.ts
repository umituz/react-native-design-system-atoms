import { ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens, type DesignTokens } from '@umituz/react-native-theme';
import { PickerSize } from '../types';
import { IOS_HIG, getMinTouchTarget } from '../../../utils/platformConstants';

/**
 * Picker container styles with iOS HIG compliance
 *
 * All picker sizes meet Apple's minimum touch target requirement of 44pt.
 * @see https://developer.apple.com/design/human-interface-guidelines/layout
 */
export const getPickerContainerStyles = (tokens: DesignTokens) => ({
  base: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    borderWidth: tokens.borders.width.thin,
    borderColor: tokens.colors.border,
    backgroundColor: tokens.colors.surface,
  },
  size: {
    // ✅ iOS HIG Compliant: All sizes >= 44pt minimum touch target
    sm: {
      height: IOS_HIG.MIN_TOUCH_TARGET,  // 44pt - iOS minimum
      paddingHorizontal: tokens.spacing.sm,
      borderRadius: tokens.borders.radius.sm,
    },
    md: {
      height: getMinTouchTarget('input'),  // 48pt - Recommended
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.borders.radius.md,
    },
    lg: {
      height: 56,  // 56pt - Large touch target
      paddingHorizontal: tokens.spacing.lg,
      borderRadius: tokens.borders.radius.md,
    },
  },
  state: {
    error: {
      borderColor: tokens.colors.error,
      borderWidth: tokens.borders.width.medium,
    },
    disabled: {
      backgroundColor: tokens.colors.surfaceDisabled,
      opacity: 0.6,
    },
  },
});

export const getPickerLabelStyles = (tokens: DesignTokens): {
  base: TextStyle;
  size: { sm: TextStyle; md: TextStyle; lg: TextStyle };
} => ({
  base: {
    marginBottom: tokens.spacing.xs,
    color: tokens.colors.textPrimary,
    fontWeight: '600' as const,
  },
  size: {
    sm: tokens.typography.bodySmall,
    md: tokens.typography.bodyMedium,
    lg: tokens.typography.bodyLarge,
  },
});

export const getPickerPlaceholderStyles = (tokens: DesignTokens): {
  base: TextStyle;
  size: { sm: TextStyle; md: TextStyle; lg: TextStyle };
} => ({
  base: {
    color: tokens.colors.textSecondary,
  },
  size: {
    sm: tokens.typography.bodySmall,
    md: tokens.typography.bodyMedium,
    lg: tokens.typography.bodyLarge,
  },
});

export const getPickerValueStyles = (tokens: DesignTokens): {
  base: TextStyle;
  size: { sm: TextStyle; md: TextStyle; lg: TextStyle };
} => ({
  base: {
    flex: 1,
    color: tokens.colors.textPrimary,
  },
  size: {
    sm: tokens.typography.bodySmall,
    md: tokens.typography.bodyMedium,
    lg: tokens.typography.bodyLarge,
  },
});

export const getPickerErrorStyles = (tokens: DesignTokens): TextStyle => ({
  marginTop: tokens.spacing.xs,
  color: tokens.colors.error,
  ...tokens.typography.bodySmall,
});

export const getModalOverlayStyles = (tokens: DesignTokens): ViewStyle => ({
  flex: 1,
  backgroundColor: tokens.colors.overlayMedium,
  justifyContent: 'flex-end',
});

export const getModalContainerStyles = (tokens: DesignTokens, maxHeight: number): ViewStyle => ({
  backgroundColor: tokens.colors.backgroundPrimary,
  borderTopLeftRadius: tokens.borders.radius.lg,
  borderTopRightRadius: tokens.borders.radius.lg,
  maxHeight: maxHeight,
  paddingBottom: tokens.spacing.lg,
});

export const getModalHeaderStyles = (tokens: DesignTokens): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: tokens.spacing.lg,
  paddingVertical: tokens.spacing.md,
  borderBottomWidth: tokens.borders.width.thin,
  borderBottomColor: tokens.colors.border,
});

export const getModalTitleStyles = (tokens: DesignTokens): TextStyle => ({
  ...tokens.typography.titleLarge,
  color: tokens.colors.textPrimary,
  fontWeight: '600',
});

export const getSearchContainerStyles = (tokens: DesignTokens): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: tokens.colors.surfaceVariant,
  paddingHorizontal: tokens.spacing.md,
  paddingVertical: tokens.spacing.sm,
  marginHorizontal: tokens.spacing.lg,
  marginTop: tokens.spacing.md,
  borderRadius: tokens.borders.radius.md,
});

export const getSearchInputStyles = (tokens: DesignTokens): TextStyle => ({
  flex: 1,
  marginLeft: tokens.spacing.sm,
  ...tokens.typography.bodyMedium,
  color: tokens.colors.textPrimary,
});

export const getOptionContainerStyles = (tokens: DesignTokens, isSelected: boolean, isDisabled: boolean): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: tokens.spacing.lg,
  paddingVertical: tokens.spacing.md,
  backgroundColor: isSelected ? tokens.colors.primaryContainer : 'transparent',
  opacity: isDisabled ? 0.5 : 1,
});

export const getOptionTextStyles = (tokens: DesignTokens, isSelected: boolean): TextStyle => ({
  flex: 1,
  marginLeft: tokens.spacing.sm,
  ...tokens.typography.bodyLarge,
  color: isSelected ? tokens.colors.primary : tokens.colors.textPrimary,
  fontWeight: isSelected ? '600' : '400',
});

export const getOptionDescriptionStyles = (tokens: DesignTokens): TextStyle => ({
  ...tokens.typography.bodySmall,
  color: tokens.colors.textSecondary,
  marginLeft: tokens.spacing.sm,
  marginTop: tokens.spacing.xs,
});

export const getEmptyStateStyles = (tokens: DesignTokens): ViewStyle => ({
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: tokens.spacing.xxl,
});

export const getEmptyStateTextStyles = (tokens: DesignTokens): TextStyle => ({
  ...tokens.typography.bodyLarge,
  color: tokens.colors.textSecondary,
  textAlign: 'center',
  marginTop: tokens.spacing.md,
});

export const getChipContainerStyles = (tokens: DesignTokens): ViewStyle => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: tokens.spacing.xs,
  marginTop: tokens.spacing.xs,
});

export const getChipStyles = (tokens: DesignTokens): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: tokens.colors.primaryContainer,
  paddingHorizontal: tokens.spacing.sm,
  paddingVertical: tokens.spacing.xs,
  borderRadius: tokens.borders.radius.sm,
});

export const getChipTextStyles = (tokens: DesignTokens): TextStyle => ({
  ...tokens.typography.bodySmall,
  color: tokens.colors.primary,
  marginRight: tokens.spacing.xs,
});

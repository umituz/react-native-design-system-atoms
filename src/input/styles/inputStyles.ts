import { ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { AtomicInputVariant, AtomicInputSize, AtomicInputState } from '../types';

type DesignTokens = ReturnType<typeof useAppDesignTokens>;

export const getContainerVariantStyles = (tokens: DesignTokens): Record<AtomicInputVariant, ViewStyle> => ({
  outlined: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: tokens.colors.outline,
  },
  filled: {
    backgroundColor: tokens.colors.surfaceVariant,
    borderRadius: 12,
    borderBottomWidth: 2,
    borderBottomColor: tokens.colors.outline,
  },
  underlined: {
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.outline,
    backgroundColor: 'transparent',
  },
});

export const containerSizeStyles: Record<AtomicInputSize, ViewStyle> = {
  sm: { height: 40, paddingHorizontal: 12, paddingVertical: 8 },
  md: { height: 56, paddingHorizontal: 16, paddingVertical: 16 },
  lg: { height: 64, paddingHorizontal: 24, paddingVertical: 20 },
};

export const getInputSizeStyles = (tokens: DesignTokens): Record<AtomicInputSize, TextStyle> => ({
  sm: { fontSize: tokens.typography.bodyMedium.fontSize },
  md: { fontSize: tokens.typography.bodyLarge.fontSize },
  lg: { fontSize: tokens.typography.bodyLarge.fontSize },
});

export const getLabelSizeStyles = (tokens: DesignTokens): Record<AtomicInputSize, TextStyle> => ({
  sm: { fontSize: tokens.typography.bodySmall.fontSize },
  md: { fontSize: tokens.typography.bodyMedium.fontSize },
  lg: { fontSize: tokens.typography.bodyLarge.fontSize },
});

export const getStateStyles = (tokens: DesignTokens): Record<AtomicInputState, ViewStyle> => ({
  default: {},
  error: { borderColor: tokens.colors.error },
  success: { borderColor: tokens.colors.success },
  disabled: {
    backgroundColor: tokens.colors.surfaceDisabled,
    borderColor: tokens.colors.outlineDisabled,
  },
});

export const getFocusStyles = (tokens: DesignTokens): Record<AtomicInputVariant, ViewStyle> => ({
  outlined: { borderColor: tokens.colors.primary, borderWidth: 2 },
  filled: { borderBottomColor: tokens.colors.primary, borderBottomWidth: 2 },
  underlined: { borderBottomColor: tokens.colors.primary, borderBottomWidth: 2 },
});

export const getStateColor = (tokens: DesignTokens, state: AtomicInputState, isFocused: boolean, isDisabled: boolean): string => {
  if (isDisabled) return tokens.colors.onSurfaceDisabled;
  if (state === 'error') return tokens.colors.error;
  if (state === 'success') return tokens.colors.success;
  if (isFocused) return tokens.colors.primary;
  return tokens.colors.surfaceVariant;
};

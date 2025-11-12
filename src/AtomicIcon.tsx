/**
 * AtomicIcon - Atomic Design System Icon Component
 *
 * Direct implementation using lucide-react-native
 * No unnecessary abstraction layer - simple and efficient
 */

import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'onSurface'
  | 'surfaceVariant'
  | 'onPrimary'
  | 'onSecondary'
  | 'textInverse';

// IconName type: Accepts both Lucide icon names and string for flexibility
// Runtime validation ensures only valid Lucide icons are used
export type IconName = string;

const ICON_SIZES: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
};

export interface IconProps {
  /** Lucide icon name (PascalCase) */
  name: IconName;
  /** Semantic size */
  size?: IconSize;
  /** Custom size in pixels (overrides size) */
  customSize?: number;
  /** Semantic color */
  color?: IconColor;
  /** Custom color (overrides color) */
  customColor?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Add background circle */
  withBackground?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Test ID */
  testID?: string;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
}

/**
 * AtomicIcon Component
 *
 * @example
 * ```tsx
 * import { AtomicIcon } from '@umituz/react-native-design-system';
 *
 * // Basic usage
 * <AtomicIcon name="Settings" size="md" color="primary" />
 *
 * // Custom size and color
 * <AtomicIcon name="Heart" customSize={32} customColor="#FF0000" />
 *
 * // With background
 * <AtomicIcon name="Info" size="lg" withBackground backgroundColor="#667eea" />
 * ```
 */
export const AtomicIcon: React.FC<IconProps> = ({
  name,
  size = 'md',
  customSize,
  color,
  customColor,
  strokeWidth,
  withBackground = false,
  backgroundColor,
  accessibilityLabel,
  testID,
  style,
}) => {
  const tokens = useAppDesignTokens();

  // Get icon component from Lucide
  // Use type assertion to handle string index access
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    style?: StyleProp<ViewStyle>;
  }>>)[name];

  if (!IconComponent) {
    /* eslint-disable-next-line no-console */
    if (__DEV__) {
      console.warn(`Icon "${name}" not found in Lucide icons`);
    }
    return null;
  }

  // Calculate icon size
  const iconSize = customSize ?? ICON_SIZES[size];

  // Calculate icon color
  let iconColor = customColor;
  if (!iconColor && color) {
    const colorMap: Record<IconColor, string> = {
      primary: tokens.colors.primary,
      secondary: tokens.colors.secondary,
      success: tokens.colors.success,
      warning: tokens.colors.warning,
      error: tokens.colors.error,
      info: tokens.colors.info,
      onSurface: tokens.colors.onSurface,
      surfaceVariant: tokens.colors.surfaceVariant,
      onPrimary: tokens.colors.onPrimary,
      onSecondary: tokens.colors.onSecondary,
      textInverse: tokens.colors.textInverse,
    };
    iconColor = colorMap[color] || tokens.colors.textPrimary;
  }

  // Default color if none specified
  if (!iconColor) {
    iconColor = tokens.colors.textPrimary;
  }

  // IconComponent props - Lucide icons don't accept accessibilityLabel directly
  const iconElement = (
    <IconComponent
      size={iconSize}
      color={iconColor}
      strokeWidth={strokeWidth}
      style={!withBackground ? style : undefined}
    />
  );

  if (withBackground) {
    const bgColor = backgroundColor || tokens.colors.surfaceVariant;
    return (
      <View
        style={[
          styles.backgroundContainer,
          {
            width: iconSize + 16,
            height: iconSize + 16,
            borderRadius: (iconSize + 16) / 2,
            backgroundColor: bgColor,
          },
          style,
        ]}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      >
        {iconElement}
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={style}
    >
      {iconElement}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Re-export types with Atomic naming convention for backward compatibility
export type AtomicIconProps = IconProps;
export type AtomicIconSize = IconSize;
export type AtomicIconColor = IconColor;
// IconName is the standard type - AtomicIconName removed for consistency

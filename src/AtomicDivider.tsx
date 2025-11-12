/**
 * AtomicDivider - Universal Divider Component
 *
 * Displays horizontal or vertical dividers for content separation
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Content separation and visual hierarchy
 *
 * Usage:
 * - Section separators
 * - List item dividers
 * - Card separators
 * - Menu dividers
 * - Form field separators
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AtomicDividerProps {
  /** Divider orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Divider thickness */
  thickness?: 'thin' | 'medium' | 'thick';
  /** Divider color */
  color?: string;
  /** Divider length (for horizontal: width, for vertical: height) */
  length?: number | string;
  /** Margin around the divider */
  margin?: number;
  /** Margin top */
  marginTop?: number;
  /** Margin bottom */
  marginBottom?: number;
  /** Margin left */
  marginLeft?: number;
  /** Margin right */
  marginRight?: number;
  /** Style overrides */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicDivider: React.FC<AtomicDividerProps> = ({
  orientation = 'horizontal',
  thickness = 'thin',
  color,
  length,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Thickness mapping
  const thicknessMap = {
    thin: 1,
    medium: 2,
    thick: 4,
  };

  const dividerThickness = thicknessMap[thickness];
  const dividerColor = color || tokens.colors.border;

  // Compute final length values with proper type handling
  const finalLength = length !== undefined ? length : (orientation === 'horizontal' ? '100%' : 20);

  // Base styles for all dividers
  const baseStyle: ViewStyle = {
    backgroundColor: dividerColor,
    margin: margin,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginLeft: marginLeft,
    marginRight: marginRight,
  };

  // Orientation-specific styles with explicit type casting
  const orientationStyle: ViewStyle = (orientation === 'horizontal' ? {
    width: finalLength as ViewStyle['width'],
    height: dividerThickness,
  } : {
    width: dividerThickness,
    height: finalLength as ViewStyle['height'],
  }) as ViewStyle;

  return (
    <View
      style={[baseStyle, orientationStyle, style]}
      testID={testID}
    />
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default AtomicDivider;

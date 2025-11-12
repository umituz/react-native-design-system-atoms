/**
 * AtomicAvatarGroup - Universal Avatar Group Component
 *
 * Displays multiple avatars in a group with overlap and overflow handling
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Multiple avatar display with group behavior
 *
 * Usage:
 * - Team member avatars
 * - Group chat participants
 * - Project collaborators
 * - Event attendees
 * - Social connections
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { AtomicAvatar, AtomicAvatarProps } from './AtomicAvatar';
import { AtomicText } from './AtomicText';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AvatarData {
  id: string;
  source?: { uri: string } | number;
  name?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface AtomicAvatarGroupProps {
  /** Array of avatar data */
  avatars: AvatarData[];
  /** Maximum number of avatars to show */
  maxVisible?: number;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  /** Custom avatar size */
  customSize?: number;
  /** Spacing between avatars */
  spacing?: number;
  /** Whether to show overflow count */
  showOverflow?: boolean;
  /** Overflow count background color */
  overflowBackgroundColor?: string;
  /** Overflow count text color */
  overflowTextColor?: string;
  /** Avatar border width */
  borderWidth?: number;
  /** Avatar border color */
  borderColor?: string;
  /** Style overrides */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicAvatarGroup: React.FC<AtomicAvatarGroupProps> = ({
  avatars,
  maxVisible = 3,
  size = 'md',
  customSize,
  spacing = -8,
  showOverflow = true,
  overflowBackgroundColor,
  overflowTextColor,
  borderWidth = 2,
  borderColor,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Calculate visible avatars and overflow count
  const visibleAvatars = avatars.slice(0, maxVisible);
  const overflowCount = avatars.length - maxVisible;

  // Size mapping for overflow text
  const sizeMap = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
  };

  const textSize = sizeMap[size];

  // Default colors for overflow
  const defaultOverflowBackground = overflowBackgroundColor || tokens.colors.surfaceVariant;
  const defaultOverflowText = overflowTextColor || tokens.colors.textPrimary;

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  const avatarStyle: ViewStyle = {
    marginLeft: spacing,
    borderWidth,
    borderColor: borderColor || tokens.colors.surface,
  };

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {visibleAvatars.map((avatar, index) => (
        <AtomicAvatar
          key={avatar.id}
          source={avatar.source}
          name={avatar.name}
          size={size}
          customSize={customSize}
          backgroundColor={avatar.backgroundColor}
          textColor={avatar.textColor}
          borderWidth={borderWidth}
          borderColor={borderColor}
          style={[
            avatarStyle,
            ...(index === 0 ? [{ marginLeft: 0 }] : []), // First avatar has no left margin
          ]}
        />
      ))}
      {showOverflow && overflowCount > 0 && (
        <View
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              width: customSize || 40,
              height: customSize || 40,
              borderRadius: (customSize || 40) / 2,
              backgroundColor: defaultOverflowBackground,
              borderWidth,
              borderColor: borderColor || tokens.colors.surface,
              marginLeft: spacing,
            },
          ]}
        >
          <AtomicText
            type="labelMedium"
            color={defaultOverflowText}
            style={{
              fontWeight: tokens.typography.semibold,
              fontSize: textSize,
            }}
          >
            +{overflowCount}
          </AtomicText>
        </View>
      )}
    </View>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default AtomicAvatarGroup;

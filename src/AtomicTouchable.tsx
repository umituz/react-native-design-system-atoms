import React from 'react';
import { Pressable } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { AtomicTouchableProps, TouchableFeedback, FeedbackStrength } from './touchable/types';
import {
  getOpacityValue,
  getTouchableContainerStyle,
  getDisabledStyle,
  normalizeHitSlop,
} from './touchable/styles/touchableStyles';

export type {
  AtomicTouchableProps,
  TouchableFeedback,
  FeedbackStrength,
  HitSlop,
} from './touchable/types';

export {
  getOpacityValue,
  getTouchableContainerStyle,
  getDisabledStyle,
  normalizeHitSlop,
} from './touchable/styles/touchableStyles';

/**
 * AtomicTouchable - Unified Touchable Component
 *
 * A modern, accessible touchable wrapper using React Native's Pressable API.
 * Provides consistent behavior across iOS, Android, and Web.
 *
 * Features:
 * - Multiple feedback variants (opacity, highlight, ripple, none)
 * - Configurable feedback strength (subtle, normal, strong)
 * - Disabled state with visual feedback
 * - Hit slop customization for small touch targets
 * - Minimum 48x48 touch target (iOS HIG compliance)
 * - Full accessibility support
 * - Theme-aware ripple colors
 *
 * @example
 * ```tsx
 * // Basic usage with opacity feedback
 * <AtomicTouchable onPress={handlePress}>
 *   <AtomicText>Press Me</AtomicText>
 * </AtomicTouchable>
 *
 * // With custom hit slop (extends touch area)
 * <AtomicTouchable
 *   onPress={handlePress}
 *   hitSlop={8}
 *   feedback="ripple"
 * >
 *   <AtomicIcon name="X" size="sm" />
 * </AtomicTouchable>
 * ```
 */
export const AtomicTouchable: React.FC<AtomicTouchableProps> = ({
  children,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  feedback = 'opacity',
  strength = 'normal',
  disabled = false,
  hitSlop,
  style,
  pressedStyle,
  disabledStyle,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  testID,
  delayLongPress = 500,
  rippleColor,
  rippleRadius = 0,
}) => {
  const tokens = useAppDesignTokens();

  // Determine if touchable should be disabled
  const isDisabled = disabled;

  // Get opacity value based on strength
  const opacityValue = getOpacityValue(strength as 'subtle' | 'normal' | 'strong');

  // Normalize hit slop
  const normalizedHitSlop = normalizeHitSlop(hitSlop);

  // Default ripple color (theme primary with alpha)
  const defaultRippleColor = tokens.colors.primary + '40'; // 40 = 25% opacity in hex

  /**
   * Get style based on pressed state
   */
  const getPressedStyle = ({ pressed }: { pressed: boolean }) => {
    const baseStyle = [
      getTouchableContainerStyle(),
      style,
    ];

    if (isDisabled) {
      return [...baseStyle, getDisabledStyle(), disabledStyle];
    }

    if (pressed) {
      // Apply feedback based on variant
      switch (feedback) {
        case 'opacity':
          return [...baseStyle, { opacity: opacityValue }, pressedStyle];
        case 'highlight':
          return [
            ...baseStyle,
            { backgroundColor: tokens.colors.surfaceVariant },
            pressedStyle,
          ];
        case 'none':
          return [...baseStyle, pressedStyle];
        case 'ripple':
          // Ripple is handled by android_ripple prop
          return [...baseStyle, pressedStyle];
        default:
          return [...baseStyle, pressedStyle];
      }
    }

    return baseStyle;
  };

  /**
   * Android ripple configuration
   * Used when feedback='ripple'
   * Pressable automatically ignores this prop on iOS/Web
   */
  const androidRippleConfig = feedback === 'ripple'
    ? {
        color: rippleColor || defaultRippleColor,
        borderless: false,
        radius: rippleRadius,
      }
    : undefined;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      onPressIn={isDisabled ? undefined : onPressIn}
      onPressOut={isDisabled ? undefined : onPressOut}
      onLongPress={isDisabled ? undefined : onLongPress}
      delayLongPress={delayLongPress}
      disabled={isDisabled}
      hitSlop={normalizedHitSlop}
      style={getPressedStyle}
      android_ripple={androidRippleConfig}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        disabled: isDisabled,
      }}
      testID={testID}
    >
      {children}
    </Pressable>
  );
};

/**
 * Preset touchable configurations for common use cases
 */
export const TouchablePresets = {
  /**
   * iOS-style opacity feedback (default)
   */
  ios: {
    feedback: 'opacity' as TouchableFeedback,
    strength: 'normal' as FeedbackStrength,
  },

  /**
   * Android-style ripple feedback
   */
  android: {
    feedback: 'ripple' as TouchableFeedback,
    strength: 'normal' as FeedbackStrength,
  },

  /**
   * Subtle feedback for secondary actions
   */
  subtle: {
    feedback: 'opacity' as TouchableFeedback,
    strength: 'subtle' as FeedbackStrength,
  },

  /**
   * Strong feedback for primary actions
   */
  strong: {
    feedback: 'opacity' as TouchableFeedback,
    strength: 'strong' as FeedbackStrength,
  },

  /**
   * No visual feedback (use sparingly)
   */
  none: {
    feedback: 'none' as TouchableFeedback,
  },
};

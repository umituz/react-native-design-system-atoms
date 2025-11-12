import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

/**
 * Touchable feedback variant
 * - opacity: iOS-style opacity feedback (default)
 * - highlight: Android-style highlight feedback
 * - ripple: Material Design ripple effect (Android only)
 * - none: No visual feedback
 */
export type TouchableFeedback = 'opacity' | 'highlight' | 'ripple' | 'none';

/**
 * Feedback strength for visual feedback
 * - subtle: Light feedback (0.8 opacity)
 * - normal: Standard feedback (0.6 opacity)
 * - strong: Strong feedback (0.4 opacity)
 */
export type FeedbackStrength = 'subtle' | 'normal' | 'strong';

/**
 * Hit slop configuration
 * Extends the touchable area beyond the component's bounds
 */
export interface HitSlop {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

/**
 * AtomicTouchable component props
 *
 * A unified touchable wrapper with consistent behavior across platforms.
 * Uses React Native's Pressable API for modern, accessible touch handling.
 *
 * @example
 * ```tsx
 * <AtomicTouchable
 *   onPress={handlePress}
 *   feedback="opacity"
 *   strength="normal"
 *   disabled={isDisabled}
 *   hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
 *   style={styles.touchable}
 * >
 *   <AtomicText>Press Me</AtomicText>
 * </AtomicTouchable>
 * ```
 */
export interface AtomicTouchableProps {
  /**
   * Content to render inside the touchable
   */
  children: React.ReactNode;

  /**
   * Callback fired when the touchable is pressed
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Callback fired when press starts (finger down)
   */
  onPressIn?: (event: GestureResponderEvent) => void;

  /**
   * Callback fired when press ends (finger up)
   */
  onPressOut?: (event: GestureResponderEvent) => void;

  /**
   * Callback fired on long press (500ms default)
   */
  onLongPress?: (event: GestureResponderEvent) => void;

  /**
   * Feedback variant
   * @default 'opacity'
   */
  feedback?: TouchableFeedback;

  /**
   * Feedback strength
   * @default 'normal'
   */
  strength?: FeedbackStrength;

  /**
   * Disable the touchable
   * @default false
   */
  disabled?: boolean;

  /**
   * Hit slop - extends touchable area
   * Useful for small touch targets
   * @default undefined
   */
  hitSlop?: HitSlop | number;

  /**
   * Custom style for the touchable container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style applied when pressed
   */
  pressedStyle?: StyleProp<ViewStyle>;

  /**
   * Style applied when disabled
   */
  disabledStyle?: StyleProp<ViewStyle>;

  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint for screen readers
   */
  accessibilityHint?: string;

  /**
   * Accessibility role
   * @default 'button'
   */
  accessibilityRole?: 'button' | 'link' | 'none';

  /**
   * Test ID for E2E testing
   */
  testID?: string;

  /**
   * Delay before onLongPress is triggered (ms)
   * @default 500
   */
  delayLongPress?: number;

  /**
   * Ripple color (Android only, for 'ripple' feedback)
   * @default theme primary color with alpha
   */
  rippleColor?: string;

  /**
   * Border radius for ripple effect (Android only)
   * @default 0
   */
  rippleRadius?: number;
}

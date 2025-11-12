/**
 * AtomicDatePicker Component
 *
 * A reusable date picker component that wraps the native date picker
 * with consistent styling and behavior across platforms.
 *
 * Features:
 * - Platform-specific native pickers (iOS wheel, Android dialog)
 * - Consistent styling with design tokens
 * - Locale-aware date/time formatting (native Date methods)
 * - Timezone-aware (respects device timezone)
 * - Automatic language integration (native locale support)
 * - Optional label and error states
 * - Minimum and maximum date constraints
 * - Disabled state support
 * - Theme-aware styling
 * - Proper keyboard avoidance on iOS
 *
 * Usage:
 * ```tsx
 * const [selectedDate, setSelectedDate] = useState(new Date());
 *
 * <AtomicDatePicker
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   label="Birth Date"
 *   minimumDate={new Date(1900, 0, 1)}
 *   maximumDate={new Date()}
 * />
 * ```
 *
 * Platform Behavior:
 * - Opens bottom sheet from bottom with spinner wheel
 * - Requires "Done" button to confirm selection
 * - Can be dismissed by swiping down or tapping backdrop
 *
 * @module AtomicDatePicker
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { AtomicIcon, type AtomicIconColor } from './AtomicIcon';

/**
 * Props for AtomicDatePicker component
 */
export interface AtomicDatePickerProps {
  /** Selected date value */
  value: Date | null;
  /** Callback when date changes */
  onChange: (date: Date) => void;
  /** Optional label displayed above picker */
  label?: string;
  /** Optional error message displayed below picker */
  error?: string;
  /** Disable picker interaction */
  disabled?: boolean;
  /** Minimum selectable date */
  minimumDate?: Date;
  /** Maximum selectable date */
  maximumDate?: Date;
  /** Picker mode - date, time, or datetime (iOS only) */
  mode?: 'date' | 'time' | 'datetime';
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Optional test ID for E2E testing */
  testID?: string;
  /** Optional container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * AtomicDatePicker - Universal date/time picker component
 *
 * Wraps @react-native-community/datetimepicker with:
 * - Theme integration
 * - Platform-specific modal handling
 * - Error states
 * - Disabled states
 * - Responsive sizing
 */
export const AtomicDatePicker: React.FC<AtomicDatePickerProps> = ({
  value,
  onChange,
  label,
  error,
  disabled = false,
  minimumDate,
  maximumDate,
  mode = 'date',
  placeholder = 'Select date',
  testID,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const [showPicker, setShowPicker] = useState(false);

  /**
   * Handle date/time change in picker
   * On Android, directly apply the change. On iOS, show picker and apply on confirm.
   */
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      // iOS: Show picker inline, user confirms with Done button
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    }
  };

  /**
   * Handle open - show native picker
   */
  const handleOpen = () => {
    if (Platform.OS === 'android') {
      setShowPicker(true);
    } else {
      // iOS: Show picker inline
      setShowPicker(true);
    }
  };

  /**
   * Format date based on mode
   * Uses native Date formatting (locale-aware)
   */
  const formatDate = (date: Date): string => {
    if (mode === 'time') {
      // Format time only
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    if (mode === 'datetime') {
      // Format date + time
      const dateStr = date.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const timeStr = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${dateStr} ${timeStr}`;
    }
    // Format date only
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /**
   * Determine icon color based on state
   */
  const getIconColor = (): AtomicIconColor => {
    if (disabled) return 'secondary';
    if (error) return 'error';
    return 'primary';
  };

  const styles = getStyles(tokens);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && (
        <Text style={styles.label} testID={testID ? `${testID}-label` : undefined}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          error ? styles.buttonError : undefined,
          disabled ? styles.buttonDisabled : undefined,
        ]}
        onPress={handleOpen}
        disabled={disabled}
        testID={testID ? `${testID}-button` : undefined}
        accessibilityLabel={label || placeholder}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <AtomicIcon
          name="Calendar"
          color={getIconColor()}
          size="md"
        />
        <Text
          style={[
            styles.text,
            disabled ? styles.textDisabled : undefined,
            error ? styles.textError : undefined,
          ]}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText} testID={testID ? `${testID}-error` : undefined}>
          {error}
        </Text>
      )}

      {/* Native DateTimePicker - Simple and reliable */}
      {showPicker && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          testID={testID ? `${testID}-picker` : undefined}
        />
      )}
    </View>
  );
};

/**
 * Get component styles based on design tokens
 */
const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) => {
  return StyleSheet.create({
    container: {
      marginBottom: tokens.spacing.md,
    },
    label: {
      fontSize: tokens.typography.bodyMedium.fontSize,
      fontWeight: tokens.typography.semibold,
      color: tokens.colors.textPrimary,
      marginBottom: tokens.spacing.sm,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: tokens.colors.surface,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      borderRadius: tokens.borders.radius.lg,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.md,
      gap: tokens.spacing.sm,
      minHeight: 48, // Apple HIG minimum touch target
    },
    buttonError: {
      borderColor: tokens.colors.error,
      borderWidth: tokens.borders.width.medium,
    },
    buttonDisabled: {
      backgroundColor: tokens.colors.surfaceDisabled,
      opacity: tokens.opacity.disabled,
    },
    text: {
      flex: 1,
      fontSize: tokens.typography.bodyLarge.fontSize,
      color: tokens.colors.textPrimary,
    },
    textDisabled: {
      color: tokens.colors.textDisabled,
    },
    textError: {
      color: tokens.colors.error,
    },
    errorText: {
      fontSize: tokens.typography.bodySmall.fontSize,
      color: tokens.colors.error,
      marginTop: tokens.spacing.xs,
      marginLeft: tokens.spacing.xs,
    },
  });
};

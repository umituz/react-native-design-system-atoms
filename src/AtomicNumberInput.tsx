/**
 * AtomicNumberInput Component
 *
 * A specialized number input component that wraps AtomicInput with
 * number-specific validation and keyboard handling.
 *
 * Features:
 * - Numeric keyboard (integer or decimal)
 * - Min/max validation
 * - Step increment support
 * - Automatic error states for invalid numbers
 * - Parsed number callback (onValueChange)
 * - Consistent styling with AtomicInput
 * - All AtomicInput features (variants, states, sizes)
 *
 * Usage:
 * ```tsx
 * const [age, setAge] = useState<number | null>(null);
 *
 * <AtomicNumberInput
 *   value={age?.toString() || ''}
 *   onValueChange={setAge}
 *   label="Age"
 *   min={0}
 *   max={150}
 *   helperText="Enter your age"
 * />
 * ```
 *
 * Why This Component:
 * - Separation of concerns (text vs number input)
 * - Built-in number validation
 * - Type-safe number callbacks
 * - Prevents non-numeric input via keyboard
 * - Consistent with AtomicInput styling
 *
 * @module AtomicNumberInput
 */

import React, { useState, useEffect } from 'react';
import { AtomicInput, AtomicInputProps } from './AtomicInput';

/**
 * Props for AtomicNumberInput component
 * Extends AtomicInput but removes text-specific props
 */
export interface AtomicNumberInputProps
  extends Omit<
    AtomicInputProps,
    'keyboardType' | 'secureTextEntry' | 'showPasswordToggle' | 'onChangeText'
  > {
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment (for spinners, future feature) */
  step?: number;
  /** Allow decimal numbers (default: false for integers only) */
  allowDecimal?: boolean;
  /** Callback when valid number is entered (null if invalid/empty) */
  onValueChange?: (value: number | null) => void;
  /** Callback when raw text changes (optional) */
  onTextChange?: (text: string) => void;
}

/**
 * AtomicNumberInput - Specialized numeric input component
 *
 * Wraps AtomicInput with:
 * - Numeric keyboard
 * - Number validation (min, max, format)
 * - Parsed number callbacks
 * - Automatic error states
 */
export const AtomicNumberInput: React.FC<AtomicNumberInputProps> = ({
  min,
  max,
  step = 1,
  allowDecimal = false,
  onValueChange,
  onTextChange,
  value = '',
  state: externalState,
  helperText: externalHelperText,
  ...props
}) => {
  const [internalError, setInternalError] = useState<string | undefined>(undefined);

  /**
   * Validate number and return error message if invalid
   */
  const validateNumber = (text: string): string | undefined => {
    // Empty is valid (null value)
    if (!text || text === '' || text === '-' || text === '.') {
      return undefined;
    }

    // Parse number
    const num = parseFloat(text);

    // Check if valid number
    if (isNaN(num)) {
      return 'Invalid number';
    }

    // Check min constraint
    if (min !== undefined && num < min) {
      return `Minimum value is ${min}`;
    }

    // Check max constraint
    if (max !== undefined && num > max) {
      return `Maximum value is ${max}`;
    }

    return undefined;
  };

  /**
   * Handle text change with validation
   */
  const handleChangeText = (text: string) => {
    // Allow empty, minus sign, and decimal point during typing
    if (text === '' || text === '-' || (allowDecimal && text === '.')) {
      setInternalError(undefined);
      onTextChange?.(text);
      onValueChange?.(null);
      return;
    }

    // Validate format
    const decimalRegex = allowDecimal ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
    if (!decimalRegex.test(text)) {
      // Invalid format, don't update
      return;
    }

    // Validate number
    const error = validateNumber(text);
    setInternalError(error);

    // Call text callback
    onTextChange?.(text);

    // Call value callback with parsed number
    if (!error && text !== '' && text !== '-' && text !== '.') {
      const num = parseFloat(text);
      onValueChange?.(isNaN(num) ? null : num);
    } else {
      onValueChange?.(null);
    }
  };

  /**
   * Validate on mount and when value/constraints change
   */
  useEffect(() => {
    if (value) {
      const error = validateNumber(value.toString());
      setInternalError(error);
    } else {
      setInternalError(undefined);
    }
  }, [value, min, max]);

  // Determine final state (external state overrides internal error)
  const finalState = externalState || (internalError ? 'error' : 'default');

  // Determine final helper text (internal error overrides external helper)
  const finalHelperText = internalError || externalHelperText;

  return (
    <AtomicInput
      {...props}
      value={value}
      onChangeText={handleChangeText}
      keyboardType={allowDecimal ? 'decimal-pad' : 'numeric'}
      state={finalState}
      helperText={finalHelperText}
    />
  );
};

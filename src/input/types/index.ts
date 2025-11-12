import { TextInputProps, ViewStyle, TextStyle } from 'react-native';

export type AtomicInputVariant = 'outlined' | 'filled' | 'underlined';
export type AtomicInputState = 'default' | 'error' | 'success' | 'disabled';
export type AtomicInputSize = 'sm' | 'md' | 'lg';

export interface AtomicInputProps extends Omit<TextInputProps, 'style'> {
  variant?: AtomicInputVariant;
  state?: AtomicInputState;
  size?: AtomicInputSize;
  label: string; // Required per CLAUDE.md Rule 16
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  labelStyle?: TextStyle | TextStyle[];
  helperTextStyle?: TextStyle | TextStyle[];
  testID?: string;
}

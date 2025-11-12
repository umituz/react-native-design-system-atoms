import { ViewStyle, TextStyle } from 'react-native';
import { AtomicIconColor } from '../../AtomicIcon';

/**
 * Picker option item
 *
 * icon: Any MaterialIcons name
 * @see https://fonts.google.com/icons
 */
export interface PickerOption {
  label: string;
  value: string;
  icon?: string; // MaterialIcons name
  disabled?: boolean;
  description?: string;
  testID?: string;
}

export type PickerSize = 'sm' | 'md' | 'lg';

export interface AtomicPickerProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: PickerOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  autoClose?: boolean;
  color?: AtomicIconColor;
  size?: PickerSize;
  modalTitle?: string;
  emptyMessage?: string;
  style?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle | TextStyle[];
  testID?: string;
}

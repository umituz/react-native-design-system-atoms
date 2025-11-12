import { StyleProp, ViewStyle } from 'react-native';

/**
 * Filter option interface
 * Represents a single filterable option
 */
export interface FilterOption {
  /**
   * Unique identifier for the filter option
   */
  id: string;

  /**
   * Display label for the filter
   */
  label: string;

  /**
   * Optional value associated with the filter
   * Can be used for backend filtering
   */
  value?: unknown;

  /**
   * Optional icon name to display
   */
  icon?: string;
}

/**
 * AtomicFilter component props
 */
export interface AtomicFilterProps {
  /**
   * Array of filter options to display
   */
  options: FilterOption[];

  /**
   * Array of currently selected filter IDs
   */
  selectedIds: string[];

  /**
   * Callback when selection changes
   * @param selectedIds - New array of selected IDs
   */
  onSelectionChange: (selectedIds: string[]) => void;

  /**
   * Enable multi-select mode
   * @default true
   */
  multiSelect?: boolean;

  /**
   * Show "Clear All" button when filters are active
   * @default true
   */
  showClearAll?: boolean;

  /**
   * Chip variant style
   * @default 'outlined'
   */
  variant?: 'filled' | 'outlined' | 'soft';

  /**
   * Chip color theme
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Chip size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Custom style for the container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Test ID for testing
   */
  testID?: string;
}

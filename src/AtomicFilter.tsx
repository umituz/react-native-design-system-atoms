import React from 'react';
import { ScrollView, View, TouchableOpacity, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { AtomicChip } from './AtomicChip';
import { AtomicText } from './AtomicText';
import { AtomicIcon } from './AtomicIcon';
import { AtomicFilterProps, FilterOption } from './filter/types';
import {
  getFilterContainerStyle,
  getClearAllContainerStyle,
  getScrollContentContainerStyle,
} from './filter/styles/filterStyles';

export type { FilterOption, AtomicFilterProps } from './filter/types';
export {
  getFilterContainerStyle,
  getClearAllContainerStyle,
  getScrollContentContainerStyle,
} from './filter/styles/filterStyles';

/**
 * AtomicFilter - Horizontal Filter Chip Component
 *
 * A Material Design 3 compliant filter component using chip selection.
 * Supports single and multi-select modes with "Clear All" functionality.
 *
 * @example
 * ```tsx
 * const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
 *
 * <AtomicFilter
 *   options={[
 *     { id: 'active', label: 'Active', icon: 'check-circle' },
 *     { id: 'completed', label: 'Completed', icon: 'check' },
 *     { id: 'pending', label: 'Pending', icon: 'clock' },
 *   ]}
 *   selectedIds={selectedFilters}
 *   onSelectionChange={setSelectedFilters}
 *   multiSelect={true}
 *   showClearAll={true}
 * />
 * ```
 *
 * Features:
 * - Horizontal scrollable filter chips
 * - Single/Multi-select modes
 * - Clear all button (when filters active)
 * - Theme-aware colors from design tokens
 * - Icon support per filter option
 * - Fully controlled component
 */
export const AtomicFilter: React.FC<AtomicFilterProps> = ({
  options,
  selectedIds,
  onSelectionChange,
  multiSelect = true,
  showClearAll = true,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  /**
   * Handle filter chip press
   */
  const handleFilterPress = (optionId: string) => {
    if (multiSelect) {
      // Multi-select mode: Toggle selection
      if (selectedIds.includes(optionId)) {
        // Deselect
        onSelectionChange(selectedIds.filter(id => id !== optionId));
      } else {
        // Select
        onSelectionChange([...selectedIds, optionId]);
      }
    } else {
      // Single-select mode: Replace selection
      if (selectedIds.includes(optionId)) {
        // Deselect (clear selection)
        onSelectionChange([]);
      } else {
        // Select (only this one)
        onSelectionChange([optionId]);
      }
    }
  };

  /**
   * Handle clear all button press
   */
  const handleClearAll = () => {
    onSelectionChange([]);
  };

  const hasActiveFilters = selectedIds.length > 0;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={getScrollContentContainerStyle()}
      style={[style]}
      testID={testID}
    >
      <View style={getFilterContainerStyle()}>
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);

          return (
            <AtomicChip
              key={option.id}
              variant={isSelected ? 'filled' : variant}
              color={color}
              size={size}
              leadingIcon={option.icon}
              selected={isSelected}
              clickable={true}
              onPress={() => handleFilterPress(option.id)}
              testID={`filter-chip-${option.id}`}
            >
              {option.label}
            </AtomicChip>
          );
        })}

        {/* Clear All Button */}
        {showClearAll && hasActiveFilters && (
          <TouchableOpacity
            onPress={handleClearAll}
            style={[
              getClearAllContainerStyle(),
              {
                backgroundColor: tokens.colors.surfaceVariant,
                borderWidth: 1,
                borderColor: tokens.colors.outline,
              }
            ]}
            testID="clear-all-button"
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <AtomicIcon name="X" size="xs" color="surfaceVariant" />
              <AtomicText type="labelSmall" style={{ color: tokens.colors.textSecondary }}>
                Clear All
              </AtomicText>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

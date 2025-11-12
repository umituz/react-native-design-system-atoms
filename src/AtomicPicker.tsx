/**
 * AtomicPicker Component
 *
 * A reusable option picker/dropdown component for selecting from a list of options.
 *
 * Features:
 * - Single and multi-select support
 * - Modal display mode (full-screen on mobile)
 * - Optional search/filter capability
 * - Error and disabled states
 * - Theme-aware styling
 * - Icons for options
 * - Clearable selection
 * - react-hook-form integration ready
 *
 * Architecture:
 * - Follows AtomicButton pattern with separated types and styles
 * - Uses helper functions from picker/styles/pickerStyles.ts
 * - Types defined in picker/types/index.ts
 * - Zero inline StyleSheet.create()
 *
 * Usage:
 * ```tsx
 * const [partyType, setPartyType] = useState('birthday');
 *
 * <AtomicPicker
 *   value={partyType}
 *   onChange={setPartyType}
 *   options={[
 *     { label: 'Birthday Party', value: 'birthday', icon: 'cake' },
 *     { label: 'Wedding', value: 'wedding', icon: 'heart' },
 *     { label: 'Corporate Event', value: 'corporate', icon: 'briefcase' },
 *   ]}
 *   label="Party Type"
 *   placeholder="Select party type"
 *   searchable
 * />
 * ```
 *
 * @module AtomicPicker
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { AtomicPickerProps, PickerOption } from './picker/types';
import { AtomicIcon } from './AtomicIcon';
import { AtomicText } from './AtomicText';
import {
  getPickerContainerStyles,
  getPickerLabelStyles,
  getPickerPlaceholderStyles,
  getPickerValueStyles,
  getPickerErrorStyles,
  getModalOverlayStyles,
  getModalContainerStyles,
  getModalHeaderStyles,
  getModalTitleStyles,
  getSearchContainerStyles,
  getSearchInputStyles,
  getOptionContainerStyles,
  getOptionTextStyles,
  getOptionDescriptionStyles,
  getEmptyStateStyles,
  getEmptyStateTextStyles,
  getChipContainerStyles,
  getChipStyles,
  getChipTextStyles,
} from './picker/styles/pickerStyles';

export type { AtomicPickerProps, PickerOption, PickerSize } from './picker/types';

/**
 * AtomicPicker - Universal option picker component
 *
 * Displays a button that opens a modal for selection.
 * Supports single/multi-select, search, and custom rendering.
 */
export const AtomicPicker: React.FC<AtomicPickerProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select...',
  error,
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = false,
  autoClose = true,
  color = 'primary',
  size = 'md',
  modalTitle,
  emptyMessage = 'No options available',
  style,
  labelStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get style helpers with design tokens
  const containerStyles = getPickerContainerStyles(tokens);
  const labelStyles = getPickerLabelStyles(tokens);
  const placeholderStyles = getPickerPlaceholderStyles(tokens);
  const valueStyles = getPickerValueStyles(tokens);
  const errorStyles = getPickerErrorStyles(tokens);
  const modalOverlayStyles = getModalOverlayStyles(tokens);
  const modalContainerStyles = getModalContainerStyles(tokens, height * 0.85);
  const modalHeaderStyles = getModalHeaderStyles(tokens);
  const modalTitleStyles = getModalTitleStyles(tokens);
  const searchContainerStyles = getSearchContainerStyles(tokens);
  const searchInputStyles = getSearchInputStyles(tokens);
  const emptyStateStyles = getEmptyStateStyles(tokens);
  const emptyStateTextStyles = getEmptyStateTextStyles(tokens);
  const chipContainerStyles = getChipContainerStyles(tokens);
  const chipStyles = getChipStyles(tokens);
  const chipTextStyles = getChipTextStyles(tokens);

  /**
   * Normalize value to array for consistent handling
   */
  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return value ? [value as string] : [];
  }, [value, multiple]);

  /**
   * Get selected option objects
   */
  const selectedOptions = useMemo(() => {
    return options.filter((opt) => selectedValues.includes(opt.value));
  }, [options, selectedValues]);

  /**
   * Filter options based on search query
   */
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.description?.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  /**
   * Format display text for selected value(s)
   */
  const displayText = useMemo(() => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }

    if (multiple) {
      return selectedOptions.length === 1
        ? selectedOptions[0].label
        : `${selectedOptions.length} selected`;
    }

    return selectedOptions[0]?.label || placeholder;
  }, [selectedOptions, placeholder, multiple]);

  /**
   * Handle modal open
   */
  const openModal = () => {
    if (disabled) return;
    setModalVisible(true);
    setSearchQuery('');
  };

  /**
   * Handle modal close
   */
  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery('');
  };

  /**
   * Handle option selection
   */
  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      if (autoClose) {
        closeModal();
      }
    }
  };

  /**
   * Handle clear selection
   */
  const handleClear = () => {
    onChange(multiple ? [] : '');
  };

  /**
   * Handle search query change
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  /**
   * Check if option is selected
   */
  const isSelected = (optionValue: string): boolean => {
    return selectedValues.includes(optionValue);
  };

  /**
   * Render single option
   */
  const renderOption = ({ item }: { item: PickerOption }) => {
    const selected = isSelected(item.value);
    const itemDisabled = item.disabled || false;

    const optionContainerStyle = getOptionContainerStyles(
      tokens,
      selected,
      itemDisabled
    );
    const optionTextStyle = getOptionTextStyles(tokens, selected);
    const optionDescriptionStyle = getOptionDescriptionStyles(tokens);

    return (
      <TouchableOpacity
        onPress={() => !itemDisabled && handleSelect(item.value)}
        disabled={itemDisabled}
        testID={item.testID || `${testID}-option-${item.value}`}
        style={optionContainerStyle}
      >
        {/* Option Icon */}
        {item.icon && (
          <AtomicIcon
            name={item.icon}
            size="md"
            color={selected ? 'primary' : 'secondary'}
          />
        )}

        {/* Option Content */}
        <View style={{ flex: 1 }}>
          <AtomicText style={optionTextStyle}>{item.label}</AtomicText>
          {item.description && (
            <AtomicText style={optionDescriptionStyle}>
              {item.description}
            </AtomicText>
          )}
        </View>

        {/* Selected Indicator */}
        {selected && (
          <AtomicIcon name="CircleCheck" size="md" color="primary" />
        )}
      </TouchableOpacity>
    );
  };

  /**
   * Render selected chips for multi-select
   */
  const renderSelectedChips = () => {
    if (!multiple || selectedOptions.length === 0) return null;

    return (
      <View style={chipContainerStyles}>
        {selectedOptions.map((opt) => (
          <View key={opt.value} style={chipStyles}>
            <AtomicText style={chipTextStyles}>{opt.label}</AtomicText>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                handleSelect(opt.value);
              }}
              hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
            >
              <AtomicIcon name="X" size="sm" color="primary" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const pickerContainerStyle = StyleSheet.flatten([
    containerStyles.base,
    containerStyles.size[size],
    error ? containerStyles.state.error : undefined,
    disabled ? containerStyles.state.disabled : undefined,
    style,
  ]);

  const pickerLabelStyle = StyleSheet.flatten([
    labelStyles.base,
    labelStyles.size[size],
    labelStyle,
  ]);

  const pickerValueStyle = StyleSheet.flatten([
    selectedOptions.length > 0 ? valueStyles.base : placeholderStyles.base,
    selectedOptions.length > 0
      ? valueStyles.size[size]
      : placeholderStyles.size[size],
  ]);

  return (
    <View>
      {/* Label */}
      {label && <AtomicText style={pickerLabelStyle}>{label}</AtomicText>}

      {/* Picker Button */}
      <TouchableOpacity
        onPress={openModal}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityState={{ disabled }}
        testID={testID}
        style={pickerContainerStyle}
      >
        {/* Display Text */}
        <AtomicText style={pickerValueStyle} numberOfLines={1}>
          {displayText}
        </AtomicText>

        {/* Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {/* Clear Button */}
          {clearable && selectedOptions.length > 0 && !disabled && (
            <TouchableOpacity
              onPress={handleClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Clear selection"
              testID={`${testID}-clear`}
            >
              <AtomicIcon name="X" size="sm" color="secondary" />
            </TouchableOpacity>
          )}

          {/* Dropdown Icon */}
          <AtomicIcon
            name={modalVisible ? 'ChevronUp' : 'ChevronDown'}
            size="sm"
            color={disabled ? 'surfaceVariant' : 'secondary'}
          />
        </View>
      </TouchableOpacity>

      {/* Selected Chips (Multi-select) */}
      {renderSelectedChips()}

      {/* Error Message */}
      {error && <AtomicText style={errorStyles}>{error}</AtomicText>}

      {/* Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
        testID={`${testID}-modal`}
      >
        <View style={modalOverlayStyles}>
          <View
            style={[
              modalContainerStyles,
              { paddingBottom: insets.bottom + tokens.spacing.md },
            ]}
          >
            {/* Modal Header */}
            <View style={modalHeaderStyles}>
              {/* Title */}
              <AtomicText style={modalTitleStyles}>
                {modalTitle || label || 'Select'}
              </AtomicText>

              {/* Close Button */}
              <TouchableOpacity
                onPress={closeModal}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel="Close picker"
                testID={`${testID}-close`}
              >
                <AtomicIcon name="X" size="md" color="primary" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            {searchable && (
              <View style={searchContainerStyles}>
                <AtomicIcon name="Search" size="sm" color="secondary" />
                <TextInput
                  value={searchQuery}
                  onChangeText={handleSearch}
                  placeholder="Search..."
                  placeholderTextColor={tokens.colors.textSecondary}
                  style={searchInputStyles}
                  testID={`${testID}-search`}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => handleSearch('')}>
                    <AtomicIcon name="X" size="sm" color="secondary" />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Options List */}
            {filteredOptions.length > 0 ? (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.value}
                renderItem={renderOption}
                showsVerticalScrollIndicator
                testID={`${testID}-list`}
              />
            ) : (
              <View style={emptyStateStyles}>
                <AtomicIcon name="Info" size="xl" color="secondary" />
                <AtomicText style={emptyStateTextStyles}>
                  {emptyMessage}
                </AtomicText>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

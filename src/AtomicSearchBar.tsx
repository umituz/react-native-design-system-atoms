import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { AtomicIcon } from './AtomicIcon';

export interface AtomicSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  editable?: boolean;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const AtomicSearchBar: React.FC<AtomicSearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  autoFocus = false,
  editable = true,
  onClear,
  onFocus,
  onBlur,
  onSubmitEditing,
  style,
  inputStyle,
  accessibilityLabel = 'Search input',
  accessibilityHint,
}) => {
  const tokens = useAppDesignTokens();

  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: tokens.colors.surfaceSecondary,
          borderRadius: tokens.borders.radius.lg,
          borderWidth: 1,
          borderColor: tokens.colors.border,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          gap: tokens.spacing.sm,
          minHeight: 48,
        },
        style,
      ]}
      accessibilityRole="search"
    >
      <AtomicIcon
        name="Search"
        size="sm"
        color="secondary"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.textSecondary}
        autoFocus={autoFocus}
        editable={editable}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        style={[
          {
            flex: 1,
            ...tokens.typography.bodyMedium,
            color: tokens.colors.textPrimary,
            padding: 0,
            margin: 0,
          },
          inputStyle,
        ]}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        returnKeyType="search"
        underlineColorAndroid="transparent"
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={{
            padding: tokens.spacing.xs,
          }}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <AtomicIcon
            name="X"
            size="sm"
            color="secondary"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

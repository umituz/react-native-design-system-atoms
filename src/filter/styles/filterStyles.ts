import { ViewStyle } from 'react-native';

/**
 * Filter container styles
 * Horizontal scrollable filter chip list
 */
export const getFilterContainerStyle = (): ViewStyle => ({
  flexDirection: 'row',
  paddingHorizontal: 16,
  paddingVertical: 12,
  gap: 8, // Space between chips
});

/**
 * Clear all button container styles
 */
export const getClearAllContainerStyle = (): ViewStyle => ({
  marginLeft: 8,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
});

/**
 * ScrollView content container style
 */
export const getScrollContentContainerStyle = (): ViewStyle => ({
  alignItems: 'center',
  gap: 8,
});

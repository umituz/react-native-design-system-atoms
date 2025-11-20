import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import type { TextStyleVariant, ColorVariant } from '@umituz/react-native-design-system-typography';
import { getTextColor } from '@umituz/react-native-design-system-typography';

export interface AtomicTextProps {
  children: React.ReactNode;
  type?: TextStyleVariant;
  color?: ColorVariant | string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: StyleProp<TextStyle>;
  testID?: string;
}

export const AtomicText: React.FC<AtomicTextProps> = ({
  children,
  type = 'bodyMedium',
  color,
  numberOfLines,
  ellipsizeMode,
  textAlign,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Get typography style from tokens
  const typographyStyle = (tokens.typography as Record<string, any>)[type];

  // Get color from tokens or use custom color using utility function
  const resolvedColor = getTextColor(color, tokens);

  const textStyle: StyleProp<TextStyle> = [
    typographyStyle,
    { 
      color: resolvedColor,
      ...(textAlign && { textAlign }),
    },
    style,
  ];

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={textStyle}
      testID={testID}
    >
      {children}
    </Text>
  );
};

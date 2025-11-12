import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, TouchableOpacity, View } from 'react-native';
import { AtomicText } from './AtomicText';
import { AtomicIcon } from './AtomicIcon';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import type { IconName } from './AtomicIcon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AtomicButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: IconName;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

export const AtomicButton: React.FC<AtomicButtonProps> = ({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      paddingVertical: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.sm,
      fontSize: tokens.typography.bodySmall.fontSize,
      iconSize: 16,
      minHeight: 32,
    },
    md: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      fontSize: tokens.typography.bodyMedium.fontSize,
      iconSize: 20,
      minHeight: 44,
    },
    lg: {
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
      fontSize: tokens.typography.bodyLarge.fontSize,
      iconSize: 24,
      minHeight: 52,
    },
  };

  const config = sizeConfig[size];

  // Variant styles
  const getVariantStyles = () => {
    const baseStyle: ViewStyle = {
      backgroundColor: tokens.colors.primary,
      borderWidth: 0,
    };

    const baseTextStyle: TextStyle = {
      color: tokens.colors.textInverse,
    };

    switch (variant) {
      case 'primary':
        return {
          container: {
            ...baseStyle,
            backgroundColor: tokens.colors.primary,
          },
          text: {
            ...baseTextStyle,
            color: tokens.colors.textInverse,
          },
        };

      case 'secondary':
        return {
          container: {
            ...baseStyle,
            backgroundColor: tokens.colors.surfaceSecondary,
          },
          text: {
            ...baseTextStyle,
            color: tokens.colors.textPrimary,
          },
        };

      case 'outline':
        return {
          container: {
            ...baseStyle,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: tokens.colors.border,
          },
          text: {
            ...baseTextStyle,
            color: tokens.colors.textPrimary,
          },
        };

      case 'text':
        return {
          container: {
            ...baseStyle,
            backgroundColor: 'transparent',
          },
          text: {
            ...baseTextStyle,
            color: tokens.colors.primary,
          },
        };

      case 'danger':
        return {
          container: {
            ...baseStyle,
            backgroundColor: tokens.colors.error,
          },
          text: {
            ...baseTextStyle,
            color: tokens.colors.textInverse,
          },
        };

      default:
        return {
          container: baseStyle,
          text: baseTextStyle,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const containerStyle: StyleProp<ViewStyle> = [
    styles.button,
    {
      paddingVertical: config.paddingVertical,
      paddingHorizontal: config.paddingHorizontal,
      minHeight: config.minHeight,
      borderRadius: tokens.borders.radius.md,
    },
    variantStyles.container,
    fullWidth ? styles.fullWidth : undefined,
    disabled ? styles.disabled : undefined,
    style,
  ];

  const buttonTextStyle: StyleProp<TextStyle> = [
    {
      fontSize: config.fontSize,
      fontWeight: '600',
    },
    variantStyles.text,
    disabled ? styles.disabledText : undefined,
    textStyle,
  ];

  const buttonText = title || children;
  const showIcon = icon;
  const iconColor = variantStyles.text.color;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
      testID={testID}
    >
      <View style={styles.content}>
        {showIcon ? (
          <AtomicIcon
            name={typeof icon === 'string' ? icon : String(icon)}
            customSize={config.iconSize}
            customColor={typeof iconColor === 'string' ? iconColor : undefined}
            style={styles.icon}
          />
        ) : null}

        <AtomicText style={buttonTextStyle}>
          {buttonText}
        </AtomicText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 8,
  },
});

export type { AtomicButtonProps as ButtonProps };

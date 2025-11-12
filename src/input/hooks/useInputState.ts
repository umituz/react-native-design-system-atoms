import { useState } from 'react';

export const useInputState = (secureTextEntry: boolean = false) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return {
    isFocused,
    setIsFocused,
    isPasswordVisible,
    togglePasswordVisibility,
  };
};

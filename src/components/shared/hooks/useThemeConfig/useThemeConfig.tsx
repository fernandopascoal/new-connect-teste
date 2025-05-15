import { useContext } from 'react';
import { ThemeContext } from 'w3block-new-lib';




export const UseThemeConfig = () => {
  const context = useContext(ThemeContext);
  return { ...context };
};

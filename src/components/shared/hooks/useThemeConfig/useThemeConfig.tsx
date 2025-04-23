import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';



export const UseThemeConfig = () => {
  const context = useContext(ThemeContext);
  return { ...context };
};

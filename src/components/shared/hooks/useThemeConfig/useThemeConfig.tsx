import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeProvider';



export const UseThemeConfig = () => {
  const context = useContext(ThemeContext);
  return { ...context };
};

import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme = Theme.DARK;
    if (theme === Theme.LIGHT) {
      newTheme = Theme.DARK;
    }
    if (theme === Theme.DARK) {
      newTheme = Theme.ORANGE;
    }
    if (theme === Theme.ORANGE) {
      newTheme = Theme.LIGHT;
    }
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    document.body.className = newTheme;
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}

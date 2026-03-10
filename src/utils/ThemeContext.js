import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    isDark: true,
    toggleTheme: (x, y) => { },
});

export const useThemeToggle = () => useContext(ThemeContext);

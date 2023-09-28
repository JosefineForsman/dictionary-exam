import { createContext, useState } from "react";

// This component, ThemeContextProvider, manages the application theme using the Context API.
// It allows toggling between light and dark themes and provides the theme state and toggle function
// to the components through the ThemeContext.

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: (theme) => {},
});
function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;

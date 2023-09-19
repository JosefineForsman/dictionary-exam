import "./ThemeContext.css";
import { createContext, useState } from "react";

// This component toggle my theme from dark/light with useContext.
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

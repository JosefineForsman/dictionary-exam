import "./Header.css";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { useContext } from "react";

// this components has a lot of visual functionality, toggle dark/light mode + toggle favorite words.
function Header({ toggleFavorites }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`header ${theme}`}>
      <h1 className="header__title">Word Finder</h1>
      <p className="header__text">Let's look up some words for you!</p>
      <div className="toggle-switch">
        <label className="switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>
      <aside className="header__favorites">
        <p className="header__favorite-text" onClick={toggleFavorites}>
          My favorites <i className="fas fa-star"></i>
        </p>
      </aside>
    </header>
  );
}
export default Header;

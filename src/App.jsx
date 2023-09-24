import "./App.css";
import { useState, useContext } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import DisplayWord from "./components/DisplayWord/DisplayWord";
import Header from "./components/Header/Header";
import MyWordList from "./components/MyWordList/MyWorldList";
import { ThemeContext } from "./components/ThemeContext/ThemeContext";
import LikedWordContextProvider from "./components/LikedWordContext/LikedWordContext";
import ThemeContextProvider from "./components/ThemeContext/ThemeContext";

function App() {
  const [inputSearch, setInputSearch] = useState([]);
  const [isFavoritesVisible, setFavoritesVisible] = useState(false);
  const { theme } = useContext(ThemeContext);

  const toggleFavorites = () => {
    setFavoritesVisible(!isFavoritesVisible);
  };

  return (
    <LikedWordContextProvider>
      <div className={`app ${theme}`}>
        <Header toggleFavorites={toggleFavorites} />
        {isFavoritesVisible ? (
          <MyWordList />
        ) : (
          <div className="app__container">
            <SearchBar setInputSearch={setInputSearch} />
            <DisplayWord inputSearch={inputSearch} />
          </div>
        )}
      </div>
    </LikedWordContextProvider>
  );
}

export default App;

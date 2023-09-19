import "./App.css";
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import DisplayWord from "./components/DisplayWord/DisplayWord";
import Header from "./components/Header/Header";
import MyWordList from "./components/MyWordList/MyWorldList";

function App() {
  const [inputSearch, setInputSearch] = useState([]);
  const [isFavoritesVisible, setFavoritesVisible] = useState(false);

  const toggleFavorites = () => {
    // add this function
    setFavoritesVisible(!isFavoritesVisible);
  };

  return (
    <div className="app">
      <Header toggleFavorites={toggleFavorites} />
      {isFavoritesVisible ? (
        <MyWordList />
      ) : (
        <div>
          <SearchBar
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
          />
          <DisplayWord inputSearch={inputSearch} />
        </div>
      )}
    </div>
  );
}

export default App;
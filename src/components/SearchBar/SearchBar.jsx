import "./SearchBar.css";
import { useEffect, useState } from "react";
import DisplayMessage from "../DisplayMessage/DisplayMessage";

// The functionality in this component is to fetch the api, and tell the user if something unexpected happend.
function SearchBar({ inputSearch, setInputSearch }) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [resolution, setResoution] = useState("");

  useEffect(() => {
    console.log(inputSearch);
  }, [inputSearch]);

  async function fetchDictionary() {
    try {
      if (!inputSearch) {
        return; // Return the function if inputSearch is null, empty string, or empty value.
      }
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputSearch}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!inputSearch.data) {
        // Get data from api , even if the word does not exist. And if the word is not in the api, return a message anyway.
        console.log(data);
        setMessage(data.message);
        setResoution(data.resolution);
        setTitle(data.title);
      }
      console.log(data);
      setInputSearch(data);
      console.log(inputSearch);
      return data;
    } catch (error) {
      setMessage(
        "You are trying to search with an empty input. Please try again bud."
      );
      throw new Error();
    }
  }

  function handleKeyPress(e) {
    // fetch the api when pressing enter.
    if (e.key === "Enter") {
      fetchDictionary();
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a word.."
        onChange={(e) => setInputSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        className="input"
      />
      {message && (
        <DisplayMessage
          title={title}
          message={message}
          resolution={resolution}
        />
      )}
    </div>
  );
}
export default SearchBar;

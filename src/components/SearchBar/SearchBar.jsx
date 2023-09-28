import "./SearchBar.css";
import { useState } from "react";
import DisplayMessage from "../DisplayMessage/DisplayMessage";
import { fetchDictionary } from "../../fetch/fetchDictionary";

// This component, SearchBar, is responsible for fetching data from an API based on user input,
// and it displays any relevant messages or search results. It allows users to search for words,
// handles API responses, and communicates with the DisplayMessage component to show feedback.

function SearchBar({ setInputSearch }) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [resolution, setResoution] = useState("");
  const [inputValue, setInputValue] = useState("");

  async function fetchData() {
    try {
      const data = await fetchDictionary(inputValue);
      if (!data) {
        setMessage(
          "You are trying to search with an empty input. Please try again bud."
        );
      } else {
        setMessage(data.message);
        setResoution(data.resolution);
        setTitle(data.title);
        setInputSearch(data);
        setInputValue("");
        return data;
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      throw error;
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      fetchData();
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a word.."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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

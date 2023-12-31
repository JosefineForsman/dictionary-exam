import { LikedWordContext } from "../LikedWordContext/LikedWordContext";
import "./DisplayWord.css";
import { useContext, useState } from "react";
import Phonetics from "./Phonetic/Phonetic";
import Meaning from "./Meaning/Meaning";

// this component is responsible for displaying and interacting with the dictionary from the API.
// the functions make it possible for the user to mark words as favorites with a likedWord list using my
// LikedWordContextProver.

function DisplayWord({ inputSearch }) {
  const [likedWord, setLikedWord] = useState([]);
  const { dispatch } = useContext(LikedWordContext);

  function handleStarClick(word) {
    const isLiked = likedWord.includes(word);

    if (isLiked) {
      setLikedWord(likedWord.filter((selectedWord) => selectedWord !== word));
    } else {
      setLikedWord([...likedWord, word]);
    }
    // add a new favorite word to my reducer.
    dispatch({ type: "ADD", payload: word });
  }

  return (
    <div className="word-details">
      {Array.isArray(inputSearch) && inputSearch.length > 0
        ? inputSearch.map((searchResult, index) => (
            <div key={index} className={`display-words`}>
              <article
                data-testid="star"
                className={`star ${
                  likedWord.includes(searchResult) ? "filled" : ""
                }`}
                onClick={() => handleStarClick(searchResult)}
              >
                <i className="fas fa-star"></i>
              </article>
              <div className="display-words__title">
                <h1 className="display-words__input-search">
                  {searchResult.word}
                </h1>
                <p className="my-word-list__text">{searchResult.phonetic}</p>
              </div>
              {searchResult.meanings.map((meaning, index) => (
                <Meaning key={index} meaning={meaning} />
              ))}
              <Phonetics phonetics={searchResult.phonetics} />
            </div>
          ))
        : ""}
    </div>
  );
}

export default DisplayWord;

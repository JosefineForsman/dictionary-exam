import "./MyWorldList.css";
import { LikedWordContext } from "../LikedWordContext/LikedWordContext";
import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";

// This  component is displaying the liked words from the user and also rendering a delete btn
// if the user wants to delete a word.
function MyWordList() {
  const { word } = useContext(LikedWordContext);
  const { dispatch } = useContext(LikedWordContext);
  const { theme } = useContext(ThemeContext);
  console.log("LikedWordContext data:", word);

  const handleDeleteClick = (id) => {
    const updatedWords = word.map((wordItem) => {
      if (wordItem.id === id) {
        return { ...wordItem, isLiked: !wordItem.isLiked }; // add a isLiked state to display the color to the star. and only remove the color on the one that is being clicked.
      }
      return wordItem;
    });
    dispatch({ type: "deleted", payload: id, updatedWords });
  };
  return (
    <div className="wrapper">
      <div className="my-word-list__container">
        <h3>Favorites:</h3>
        {Array.isArray(word) && word.length > 0 ? ( // check if it really is an array so we can map it out.
          word.map((wordItem, index) => (
            <div key={index} className={`my-word-list ${theme}`}>
              <div
                className={`remove-star ${wordItem.isLiked ? "" : "filled"}`}
                onClick={() => handleDeleteClick(wordItem.id)}
              >
                <i className="fas fa-star"></i>
              </div>
              <h2>Word: {wordItem.word.word}</h2>
              <p className="my-word-list__text">{wordItem.word.phonetic}</p>

              <div>
                {wordItem.word.meanings.map((meaning, index) => (
                  <div key={index}>
                    <p className="my-word-list__text">{meaning.partOfSpeech}</p>
                    <ol>
                      {meaning.definitions.map((definition, index) => (
                        <div key={index}>
                          <li className="my-word-list__text">
                            {definition.definition}
                          </li>
                          {definition.example && (
                            <p className="my-word-list__text ">
                              <strong>Example:</strong> {definition.example}
                            </p>
                          )}
                          {definition.synonyms &&
                            definition.synonyms.length > 0 && (
                              <p className="my-word-list__text">
                                <strong>Synonyms:</strong>{" "}
                                {definition.synonyms.join(", ")}
                              </p>
                            )}
                        </div>
                      ))}
                    </ol>
                  </div>
                ))}
                <div>
                  {wordItem.word.phonetics.map((phonetic, index) => (
                    <div key={index} className="phonetics">
                      {phonetic.audio && phonetic.audio.length > 0 && (
                        <div>
                          <audio
                            className="audio-player"
                            src={phonetic.audio}
                            controls
                          ></audio>
                          <p className="my-word-list__text">{phonetic.text}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You don't have any favorites words.</p>
        )}
      </div>
    </div>
  );
}
export default MyWordList;

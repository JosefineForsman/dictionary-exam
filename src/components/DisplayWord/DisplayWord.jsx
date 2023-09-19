import { LikedWordContext } from "../LikedWordContext/LikedWordContext";
import "./DisplayWord.css";
import { useContext, useState } from "react";

// this component render all the info from the API and also checks if i got an array as an response
// and checks if there is data in the objects inside the objects. if so, we render.
function DisplayWord({ inputSearch }) {
  const [likedWord, setLikedWord] = useState([]);
  const { dispatch } = useContext(LikedWordContext);
  console.log(inputSearch);

  const handleStarClick = (word) => {
    setLikedWord(word);
    console.log(likedWord);
    // add a new favorite word to my reducer.
    dispatch({ type: "added", payload: word });
  };

  return (
    <div className="word-details">
      {Array.isArray(inputSearch) && inputSearch.length > 0 // map only if inputSearch is an array and if the length is higher than 0.
        ? inputSearch.map((searchResult, index) => (
            <div key={index} className="display-words">
              <article
                className={`star ${searchResult === likedWord ? "filled" : ""}`} // change star-color when star is being clicked and word is added.
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
                <div key={index} className="meaning">
                  <p className="part-of-speech">{meaning.partOfSpeech}</p>
                  <strong>Definition:</strong>
                  <ol>
                    {meaning.definitions.map((definition, index) => (
                      <div key={index} className="definition">
                        <li>{definition.definition}</li>
                        {definition.example && ( // display only if data is accoured in example.
                          <p className="example">
                            <strong>Example:</strong> {definition.example}
                          </p>
                        )}
                        {definition.synonyms &&
                          definition.synonyms.length > 0 && ( // display only if data is accoured in synonyms.
                            <p className="synonyms">
                              <strong>Synonyms:</strong>{" "}
                              {definition.synonyms.join(", ")}
                            </p>
                          )}
                      </div>
                    ))}
                  </ol>
                </div>
              ))}
              {searchResult.phonetics.map((phonetic, index) => (
                <div key={index} className="phonetics">
                  {phonetic.audio &&
                    phonetic.audio.length > 0 && ( // display only if data is accoured in audio.
                      <div>
                        <audio
                          className="audio-player"
                          src={phonetic.audio}
                          controls
                        ></audio>
                      </div>
                    )}
                </div>
              ))}
            </div>
          ))
        : ""}
    </div>
  );
}

export default DisplayWord;

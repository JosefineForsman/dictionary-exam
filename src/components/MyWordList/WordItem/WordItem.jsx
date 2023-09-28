// This component, WordItem, is responsible for rendering individual word items
// in the "My Word List." It displays the word's title, allows users to toggle
// additional information, and provides the option to remove the word from the list.

import "./WordItem.css";
import { useState } from "react";
import Meaning from "../Meaning/Meaning";
import Phonetic from "../Phonetic/Phonetic";

function WordItem({ wordItem, theme, handleDeleteClick }) {
  const [toggleInfo, setToggleInfo] = useState(false);
  const isLiked = wordItem?.isLiked || false;

  return (
    <div className={`my-word-list ${theme}`}>
      <div className="list-item-container">
        <div
          data-testid="remove-star"
          className={`remove-star ${isLiked ? "" : "filled"}`}
          onClick={() => handleDeleteClick(wordItem.id)}
        >
          <i className="fas fa-star"></i>
        </div>
        <div className="toggle-container">
          <h2 className="title">{wordItem.word.word}</h2>
        </div>
        <p
          className="see-more-btn"
          onClick={() => {
            setToggleInfo(!toggleInfo);
          }}
        >
          See more
        </p>
      </div>
      <div className={`info-container ${toggleInfo ? "visible" : "hidden"}`}>
        {wordItem.word.meanings.map((meaning, index) => (
          <div key={index}>
            <Meaning meaning={meaning} />
          </div>
        ))}

        {wordItem.word.phonetics && wordItem.word.phonetics.length > 0 && (
          <div className="show-phonetics">
            {wordItem.word.phonetics.map((phonetic, index) => (
              <div key={index}>
                <Phonetic phonetics={phonetic} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WordItem;

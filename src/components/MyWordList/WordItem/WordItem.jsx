import "./WordItem.css";
import { useState } from "react";
import Meaning from "../Meaning/Meaning";
import Phonetic from "../Phonetic/Phonetic";
function WordItem({ wordItem, theme, handleDeleteClick }) {
  const [toggleInfo, setToggleInfo] = useState(false);
  return (
    <div className={`my-word-list ${theme}`}>
      <div className="list-item-container">
        <div
          className={`remove-star ${wordItem.isLiked ? "" : "filled"}`}
          onClick={() => handleDeleteClick(wordItem.id)}
        >
          <i className="fas fa-star"></i>
        </div>
        <div className="toggle-container">
          <h2 className="title">
            <strong>Word:</strong> {wordItem.word.word}
          </h2>
          <p className="my-word-list__text">{wordItem.word.phonetic}</p>
        </div>
        <p
          className="see-more-btn"
          onClick={() => setToggleInfo((prevInfo) => !prevInfo)}
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
        <div>
          {wordItem.word.phonetics.map((phonetic, index) => (
            <div key={index}>
              <Phonetic phonetics={phonetic} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default WordItem;

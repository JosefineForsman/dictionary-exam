import "./MyWorldList.css";
import { LikedWordContext } from "../LikedWordContext/LikedWordContext";
import { useContext } from "react";
import WordItem from "./WordItem/WordItem";

// This component, MyWordList, is responsible for displaying the liked words from the user's
// favorites and rendering a delete button for each word. It interacts with the LikedWordContext
// to manage liked words and their state, allowing users to delete specific words from their list.

function MyWordList() {
  const { word, dispatch } = useContext(LikedWordContext);

  const handleDeleteClick = (id) => {
    const updatedWords = word.map((wordItem) => {
      if (wordItem.id === id) {
        return { ...wordItem, isLiked: !wordItem.isLiked };
      }
      return wordItem;
    });
    dispatch({ type: "DELETE", payload: id, updatedWords });
  };
  return (
    <div className="wrapper">
      <h3 className="my-word-list__favorite-title">Your favorite words:</h3>
      <div className="my-word-list__container">
        {Array.isArray(word) && word.length > 0 ? (
          word.map((wordItem, index) => (
            <WordItem
              key={index}
              wordItem={wordItem}
              handleDeleteClick={handleDeleteClick}
            />
          ))
        ) : (
          <p className="wrapper-p">You don't have any favorite words.</p>
        )}
      </div>
    </div>
  );
}
export default MyWordList;

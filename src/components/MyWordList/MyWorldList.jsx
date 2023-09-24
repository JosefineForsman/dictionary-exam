import "./MyWorldList.css";
import { LikedWordContext } from "../LikedWordContext/LikedWordContext";
import { useContext } from "react";
import WordItem from "./WordItem/WordItem";

// This  component is displaying the liked words from the user and also rendering a delete btn
// if the user wants to delete a word.
function MyWordList() {
  const { word, dispatch } = useContext(LikedWordContext);
  console.log(word);
  console.log("LikedWordContext data:", word);

  const handleDeleteClick = (id) => {
    const updatedWords = word.map((wordItem) => {
      if (wordItem.id === id) {
        return { ...wordItem, isLiked: !wordItem.isLiked }; // add a isLiked state to display the color to the star. and only remove the color on the one that is being clicked.
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

import { createContext } from "react";
import { useReducer } from "react";

export const LikedWordContext = createContext(null);

// reducer to help me add and delete favorite words.
function LikedWordContextProvider({ children }) {
  const [likedWord, likedWordDispatcher] = useReducer(likedWordReducer, []);

  return (
    <LikedWordContext.Provider
      value={{ word: likedWord, dispatch: likedWordDispatcher }}
    >
      {children}
    </LikedWordContext.Provider>
  );
}
let id = 0;
const likedWordReducer = (likedWord, action) => {
  switch (action.type) {
    case "ADD": // add word
      const newWord = {
        id: id++, // makes a different id for each new added word
        word: action.payload,
      };
      return [...likedWord, newWord];
    case "DELETE":
      return likedWord.filter((word) => word.id !== action.payload); // delete word with implemented id.

    default:
      return likedWord;
  }
};
export default LikedWordContextProvider;

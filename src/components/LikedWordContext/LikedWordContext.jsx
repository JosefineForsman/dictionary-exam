import "./LikedWordContext.css";
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
  console.log(likedWord, action);

  switch (action.type) {
    case "added": // add word
      return [
        ...likedWord,
        {
          id: id++, // different id for every word so we also can delete it later if we want.
          word: action.payload,
        },
      ];
    case "deleted": // delete word
      return likedWord.filter((word) => word.id !== action.payload);

    default:
      return;
  }
};
export default LikedWordContextProvider;

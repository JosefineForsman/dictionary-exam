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
    case "ADD": // add word
      const newWord = {
        id: id++, // olika id för varje ord så att det kan tas bort senare om så önskas
        word: action.payload,
      };
      return [...likedWord, newWord]; // Lägg till det nya ordobjektet i arrayen
    case "DELETE": // delete word
      return likedWord.filter((word) => word.id !== action.payload);

    default:
      return likedWord;
  }
};
export default LikedWordContextProvider;

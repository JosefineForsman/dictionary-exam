// render information about a word but only shows three definitions.
// If you want to see more definitions you can click the see more button and all
// definitions will be visile.

import { useState } from "react";
import Definition from "../Definition/Definition";

function Meaning({ meaning }) {
  const [showAll, setShowAll] = useState(false);

  function handleDefinitions() {
    setShowAll(!showAll);
  }
  return (
    <div className="meaning">
      <p className="part-of-speech">{meaning.partOfSpeech}</p>
      <strong>Definition:</strong>
      <ol>
        {meaning.definitions
          .slice(0, showAll ? meaning.definitions.length : 3)
          .map((definition, index) => (
            <Definition key={index} definition={definition} />
          ))}
      </ol>
      {!showAll && meaning.definitions.length > 3 && (
        <div className="btn-container">
          <button className="definitions-btn" onClick={handleDefinitions}>
            See More
          </button>
        </div>
      )}
    </div>
  );
}

export default Meaning;

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
      {showAll && meaning.definitions.length > 3 && (
        <ol>
          {meaning.definitions.slice(3).map((definition, index) => (
            <Definition key={index} definition={definition} />
          ))}
        </ol>
      )}
    </div>
  );
}

export default Meaning;
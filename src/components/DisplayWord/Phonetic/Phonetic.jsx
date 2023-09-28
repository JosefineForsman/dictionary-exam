// Renders information about phonetics.
// Ensures that it displays information using ternary operators.
// If there is no information, it does not display that section.
import React from "react";

function Phonetics({ phonetics }) {
  return (
    <div className="phonetics">
      {phonetics.map((phonetic, index) => (
        <div key={index}>
          {phonetic.audio && phonetic.audio.length > 0 && (
            <div>
              <h3>{phonetic.text}</h3>
              <audio
                data-testid="audio"
                className="audio-player"
                src={phonetic.audio}
                controls
              ></audio>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Phonetics;

// Phonetics.js
import React from "react";

function Phonetics({ phonetics }) {
  return (
    <div className="phonetics">
      {phonetics.map((phonetic, index) => (
        <div key={index}>
          {phonetic.audio && phonetic.audio.length > 0 && (
            <div>
              <audio
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

function Phonetic({ phonetics }) {
  console.log(phonetics);
  return (
    <div>
      <div className="phonetics">
        {phonetics.audio && phonetics.audio.length > 0 && (
          <div>
            <h3 className="my-word-phonetic">{phonetics.text}</h3>
            <audio
              data-testid="audio"
              className="audio-player"
              src={phonetics.audio}
              controls
            ></audio>
          </div>
        )}
      </div>
    </div>
  );
}

export default Phonetic;

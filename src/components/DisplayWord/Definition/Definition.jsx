// Renders information about  word, including definitions, examples, synonyms, and antonyms.
// Ensures that it displays information using ternary operators.
// If there is no information, it does not display that section.
function Definition({ definition }) {
  return (
    <div className="definition">
      <li>{definition.definition}</li>
      {definition.example && (
        <p className="example">
          <strong>Example:</strong> {definition.example}
        </p>
      )}
      {definition.synonyms && definition.synonyms.length > 0 && (
        <p className="synonyms">
          <strong>Synonyms:</strong> {definition.synonyms.join(", ")}
        </p>
      )}
      {definition.antonyms && definition.antonyms.length > 0 && (
        <p className="antonyms">
          <strong>Antonyms:</strong> {definition.antonyms.join(", ")}
        </p>
      )}
    </div>
  );
}

export default Definition;

// Renders information about my liked word, including definitions, examples, synonyms, and antonyms.
// Ensures that it displays information using ternary operators.
// If there is no information, it does not display that section.

function Definition({ definition }) {
  return (
    <div>
      <li className="my-word-list__text">{definition.definition}</li>
      {definition.example && (
        <p className="my-word-list__text-example ">
          <strong className="my-list-strong">Example:</strong>{" "}
          {definition.example}
        </p>
      )}
      {definition.synonyms && definition.synonyms.length > 0 && (
        <p className="my-word-list__text-synonymus">
          <strong className="my-list-strong">Synonyms:</strong>{" "}
          {definition.synonyms.join(", ")}
        </p>
      )}
      {definition.antonyms && definition.antonyms.length > 0 && (
        <p className="my-word-list__text-antonymus">
          <strong className="my-list-strong">Antonyms:</strong>{" "}
          {definition.antonyms.join(", ")}
        </p>
      )}
    </div>
  );
}
export default Definition;

function Definition({ definition }) {
  return (
    <div>
      <li className="my-word-list__text">{definition.definition}</li>
      {definition.example && (
        <p className="my-word-list__text ">
          <strong>Example:</strong> {definition.example}
        </p>
      )}
      {definition.synonyms && definition.synonyms.length > 0 && (
        <p className="my-word-list__text">
          <strong>Synonyms:</strong> {definition.synonyms.join(", ")}
        </p>
      )}
    </div>
  );
}
export default Definition;

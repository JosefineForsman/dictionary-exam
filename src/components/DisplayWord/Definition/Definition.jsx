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
    </div>
  );
}

export default Definition;
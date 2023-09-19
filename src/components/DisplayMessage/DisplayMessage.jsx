import "./DisplayMessage.css";

// this component display messages to the user, what happend and why something went wrong.
function DisplayMessage({ title, message, resolution }) {
  return (
    <div className="display-messages">
      <h2 className="display-messages__title">{title}</h2>
      <p className="dislay-messages__message">{message}</p>
      <p className="display-messages__resolution">{resolution}</p>
    </div>
  );
}
export default DisplayMessage;

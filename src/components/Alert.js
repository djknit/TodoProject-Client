function Alert({
  children,
  theme = 'danger', // this syntax is a default parameter value
  dismissible = true,
  messages
}) {

  // if (!messages || messages.length === 0) return null;

  let divClass = `alert alert-${theme} show`;
  if (dismissible) divClass += ' alert-dismissible fade';

  return (
    <div className={divClass} role="alert">
      {messages && messages.map(message => (
        <p key={message}>{message}</p>
      ))}
      {dismissible && (
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
          {/* <span aria-hidden="true">&times;</span> */}
        </button>
      )}
      {children}
    </div>
  );
}

export default Alert;

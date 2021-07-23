function Alert({
  children,
  theme = 'danger', // this syntax is a default parameter value
  dismissible = true,
  messages
}) {

  let divClass = `alert alert-${theme} show`;
  if (dismissible) divClass += ' alert-dismissible fade';

  return (messages && messages.length > 0 ) && (
    <div className={divClass} role="alert">
      {messages.map(message => (
        <p key={message}>{message}</p>
      ))}
      {dismissible && (
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      )}
      {children}
    </div>
  );
}

export default Alert;

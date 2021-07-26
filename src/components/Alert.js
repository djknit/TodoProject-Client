import './Alert.css';

function Alert({
  children,
  theme = 'danger', // this syntax is a default parameter value
  dismissible = true,
  messages,
  dismiss,
  isDismissed,
  title
}) {

  if (isDismissed) return null;

  let divClass = `alert alert-${theme} show`;
  if (dismissible) divClass += ' alert-dismissible fade';

  return (
    <div className={divClass} role="alert">
      {title && (
        <p className="my-alert-title">{title}</p>
      )}
      {messages && messages.map(message => (
        <p key={message}>{message}</p>
      ))}
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={dismiss}
        />
      )}
      {children}
    </div>
  );
}

export default Alert;

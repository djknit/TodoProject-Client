import './AppFooter.css';

function AppFooter({
  height
}) {

  const footerStyle = height && { height, lineHeight: height };  // shorthand for-> (height ? { height: height, lineHeight: height } : height)

  return (
    <footer style={footerStyle} id="app-footer">
      <div className="container">
        Repositories: <a
          href="https://github.com/djknit/TodoProject-Client"
          rel="noopener noreferrer"
          target="_blank"
        >Client</a> | <a
          href="https://github.com/djknit/TodoProject"
          rel="noopener noreferrer"
          target="_blank"
        >Server</a>
      </div>
    </footer>
  );
}

export default AppFooter;

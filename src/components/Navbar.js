const OPTIONS = [
  { path: '/app/edit-account', name: 'Account' },
  { path: '/app/todos', name: 'Dashboard' }
];

function Navbar({
  currentPath
}) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-teal">
      <div className="container">

        <span className="navbar-brand">Todo App</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-collapse"
          aria-controls="navbar-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href="#">Features</a>
            <a className="nav-item nav-link" href="#">Pricing</a>
            <a className="nav-item nav-link disabled" href="#">Disabled</a>
          </div>
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-btn-outline-secondary my-2 my-sm-0"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

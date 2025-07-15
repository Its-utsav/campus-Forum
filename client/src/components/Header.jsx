export default function Header() {
  const navItems = [
    {
      name: "My Answer",
    },
    {
      name: "Get info",
    },
  ];
  return (
    <header>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <p>Campus Forum</p>
          </a>

          <div>
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  My Answer
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Get info
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

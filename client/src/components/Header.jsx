import { useAuth } from "../context/User.context.js";
import Link from "./Link";

function Logout({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      Logout
    </button>
  );
}

export default function Header() {
  const { data, logout } = useAuth();

  const navItems = [
    {
      name: "My Answer",
      path: "my-answer",
      isActive: data,
    },
    {
      name: "Get info",
      path: "get-info",
      isActive: data,
    },
    {
      name: "Login",
      path: "/login",
      isActive: !data,
    },
    {
      name: "Register",
      path: "/register",
      isActive: !data,
    },
  ];
  return (
    <header>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">
            <p>Campus Forum</p>
          </a> */}
          <Link className="navbar-brand" href="/">
            <p>Campus Forum</p>
          </Link>

          <div>
            <ul className="nav justify-content-end">
              {navItems.map(
                (item) =>
                  item.isActive && (
                    <li className="nav-item" key={item.name}>
                      <Link className="nav-link active" href={item.path}>
                        {item.name}
                      </Link>
                    </li>
                  )
              )}

              {data && (
                <li className="nav-item">
                  <Logout onClick={logout} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

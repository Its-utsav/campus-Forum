import { Link, Navigate, Outlet, useNavigate } from "react-router";
import { Button } from "../components";
import { adminRoutes } from "../routes/adminRoutes";
import adminService from "../services/admin.services";
import { useAuth } from "../context/User.context";

function Logout({ onClick }) {
  return (
    <Button type="button" onClick={onClick} className="btn-danger">
      Logout
    </Button>
  );
}
export default function AdminApp() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = async () => {
    adminService
      .logout()
      .then(() => logout())
      .then(() => {
        return navigate("/", { replace: true });
      });
  };
  return (
    <>
      <main className="container">
        <h1>Admin Layout</h1>
        <div className="d-flex gap-2">
          <Link to={"/admin"} className="btn btn-sm btn-outline-primary">
            Dashboard
          </Link>
          <Logout
            onClick={handleClick}
            className="btn btn-sm btn-outline-danger"
          >
            Logout
          </Logout>
        </div>
        <Outlet />
      </main>
    </>
  );
}

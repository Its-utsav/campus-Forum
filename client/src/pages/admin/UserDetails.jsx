import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import adminService from "../../services/admin.services";
import { Button, Loading, AlertMessage } from "../../components";

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    adminService.getUserInfo(userId).then(setUser);
  }, [userId]);
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await adminService.deleteUser(user._id);
      if (res) {
        setLoading(false);
        navigate("/admin");
      }
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return user ? (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">User Data</div>

        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Username:</strong> {user.username}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="list-group-item">
              <strong>ID:</strong> {user._id}
            </li>
          </ul>
          <Button
            className="btn-danger"
            onClick={handleClick}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      </div>
      {message && <AlertMessage autoHide={false} text={message} />}
    </div>
  ) : (
    <Loading />
  );
}

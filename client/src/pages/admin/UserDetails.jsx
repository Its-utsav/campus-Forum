import { useParams } from "react-router";
import { useEffect, useState } from "react";
import adminService from "../../services/admin.services";
import { Loading } from "../../components";

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    adminService.getUserInfo(userId).then(setUser);
  }, [userId]);

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
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

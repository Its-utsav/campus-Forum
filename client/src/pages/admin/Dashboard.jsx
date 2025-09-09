import { useEffect, useState } from "react";
import { Link } from "react-router";
import adminService from "../../services/admin.services";
import { useAuth } from "../../context/User.context";

export default function Dashboard() {
  console.log(useAuth());
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    adminService.getAllPosts().then(setPosts);
    adminService.getAllUsers().then(setUsers);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row">
        {/* Users Section */}
        <div className="col-md-6">
          <h4>All Users</h4>
          {users.users && users.users.length > 0 ? (
            <ul className="list-group">
              {users.users.map((user) => (
                <li
                  key={user._id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{user.username}</span>
                  <Link
                    to={`/admin/user/${user._id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No users found.</p>
          )}
        </div>

        {/* Posts Section */}
        <div className="col-md-6">
          <h4>All Posts</h4>
          {posts && posts.length > 0 ? (
            <ul className="list-group">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{post.body}</span>
                  <Link
                    to={`/admin/post/${post._id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

import AdminApp from "../admin/App";
import Dashboard from "../pages/admin/Dashboard";
import {
  LoginPage as AdminLogin,
  PostDetails,
  UserDetails,
} from "../pages/admin";
import { data, Outlet, Route, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/User.context";
import { useEffect } from "react";

export default function AdminProtected({ children }) {
  const { pathname } = useLocation();
  const naviagate = useNavigate();
  const { data: userData } = useAuth();

  const isAuthenticate = !!userData;

  useEffect(() => {
    if (isAuthenticate && userData?.role !== "admin") {
      naviagate("/", { replace: true });
    }
    if (
      (!isAuthenticate && pathname !== "/admin-login") ||
      pathname === "/admin"
    ) {
      console.log("here");
      naviagate("/admin-login", { replace: true });
    }

    if (isAuthenticate && pathname === "/admin-login") {
      // console.log("redirect");
      naviagate("/admin", { replace: true });
    }
  }, [data, naviagate]);

  // console.log(userData, isAuthenticate);
  return <Outlet />;
}

export const adminRoutes = (
  <>
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminApp />}>
      <Route element={<AdminProtected />}>
        <Route index element={<Dashboard />} />
        <Route path="user/:userId" element={<UserDetails />} />
        <Route path="post/:postId" element={<PostDetails />} />
      </Route>
    </Route>
  </>
);

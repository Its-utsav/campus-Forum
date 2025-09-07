import AdminApp from "../admin/App";
import Dashboard from "../pages/admin/Dashboard";
import {
  LoginPage as AdminLogin,
  PostDetails,
  UserDetails,
} from "../pages/admin";
import { Route } from "react-router";

export const adminRoutes = (
  <>
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminApp />}>
      <Route index element={<Dashboard />} />
      <Route path="user/:userId" element={<UserDetails />} />
      <Route path="post/:postId" element={<PostDetails />} />
    </Route>
  </>
);

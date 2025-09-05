import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./providers/User.Provider.jsx";

import { AboutMe, HomePage, LoginPage, SignUpPage } from "./pages/index.js";
import { AuthComponent, GuestOnly } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route index element={<HomePage />} />

      {/* Page are only avialabel when user is not login */}
      <Route element={<GuestOnly />}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<AuthComponent />}>
        <Route path="/get-info" element={<AboutMe />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);

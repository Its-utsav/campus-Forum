import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./providers/User.Provider.jsx";
import { RouterProvider } from "./providers/Route.Provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </RouterProvider>
  </StrictMode>
);

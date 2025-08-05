import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "./providers/Route.Provider.jsx";
import { UserProvider } from "./providers/User.Provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </RouterProvider>
  </StrictMode>
);

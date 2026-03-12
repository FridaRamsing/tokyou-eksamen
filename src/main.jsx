import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles.css";
import App from "./App.jsx";

// Entrypoint / bootstrap
// - Mounts the React tree into the DOM element with id 'root'.
// - Wraps the app in StrictMode (dev-time checks) and BrowserRouter for client-side routing.
// - Uses import.meta.env.BASE_URL as the router basename (useful when the app is hosted under a sub-path).
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

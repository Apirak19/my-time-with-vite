import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ContextAProvider } from "./context/ContextA.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextAProvider>
      <App />
    </ContextAProvider>
  </StrictMode>
);

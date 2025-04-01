import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { UserGroupProvider } from "@/context/UserGroupContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserGroupProvider>
        <App />
      </UserGroupProvider>
      <Toaster position="top-right" />
    </BrowserRouter>
  </StrictMode>,
);

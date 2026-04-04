import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./components/saas/animated-showcase/animated-showcase.css";
import { SaasLanding } from "./components/saas/SaasLanding";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SaasLanding />
  </StrictMode>
);

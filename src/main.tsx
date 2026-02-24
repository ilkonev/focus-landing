import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { trackPerformanceMetrics, trackResourceErrors } from "./lib/performance";

trackPerformanceMetrics();
trackResourceErrors();

createRoot(document.getElementById("root")!).render(<App />);

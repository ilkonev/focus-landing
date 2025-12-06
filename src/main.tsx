import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "./lib/analytics";
import { trackPerformanceMetrics, trackResourceErrors } from "./lib/performance";

initAnalytics();

trackPerformanceMetrics();
trackResourceErrors();

createRoot(document.getElementById("root")!).render(<App />);

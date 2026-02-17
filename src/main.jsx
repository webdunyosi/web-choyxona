import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

// Hide initial loader once React app is mounted and all resources are loaded
const hideLoader = () => {
  const loader = document.getElementById("initial-loader");
  if (loader) {
    loader.classList.add("hide");
    // Remove from DOM after transition
    setTimeout(() => {
      loader.remove();
    }, 500);
  }
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Hide loader after the window has fully loaded (all resources including images)
// This ensures nothing is shown in an incomplete state
if (document.readyState === 'complete') {
  // Page already loaded (e.g., cached)
  setTimeout(hideLoader, 100);
} else {
  // Wait for full page load including all resources
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 100);
  });
}

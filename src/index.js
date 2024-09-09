import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Load Google Translate script dynamically
const loadGoogleTranslateScript = () => {
  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
};

window.googleTranslateElementInit = () => {
  // This function is required by the Google Translate script
};

loadGoogleTranslateScript();

root.render(<App />);

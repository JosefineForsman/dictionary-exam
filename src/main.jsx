import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LikedWordContextProvider from "./components/LikedWordContext/LikedWordContext.jsx";
import ThemeContextProvider from "./components/ThemeContext/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LikedWordContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </LikedWordContextProvider>
  </React.StrictMode>
);

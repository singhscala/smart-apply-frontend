import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/index.css";
import "./styles/common.css";
import "./styles/recruiter.css";
import "./styles/seeker.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

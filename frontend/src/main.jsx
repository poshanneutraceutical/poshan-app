import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import InstallPWA from "./InstallPWA";
import { AuthProvider } from "@context/AuthContext";

import "@styles/global.css";
import "@styles/mobile-responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
            <InstallPWA />
        </AuthProvider>
    </React.StrictMode>
);
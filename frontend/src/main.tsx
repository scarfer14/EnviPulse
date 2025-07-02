import ReactDOM from "react-dom/client";
import App from "./App";
import ViewDashboard from "./ViewDashboard";
import AdminDashboard from "./AdminDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/public" element={<ViewDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>
);

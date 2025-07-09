import ReactDOM from "react-dom/client";
import App from "./App";
import ViewDashboard from "./ViewDashboard";
import AdminDashboard from "./AdminDashboard";
import Head from "./Head";            
import Temp from "./Temp";            
import Visitors from "./Visitors";  
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/public" element={<ViewDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/main" element={<Head />} />
      <Route path="/temp" element={<Temp />} />
      <Route path="/visitors" element={<Visitors />} />
    </Routes>
  </BrowserRouter>
);

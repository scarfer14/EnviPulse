import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "./supabaseClient";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    logVisitorInfo();
  }, []);

  const logVisitorInfo = async () => {
    try {
      
      const res = await axios.get("https://ipinfo.io/json?token=bfa2b9375142bc");
      const { ip, city, region, country } = res.data;

      const location = `${city || "Unknown"}, ${region || ""}, ${country || ""}`;
      const deviceInfo = `${navigator.platform} | ${navigator.userAgent}`;

      
      const { error } = await supabase.from("visitor_logs").insert([
        {
          ip_address: ip,
          device_info: deviceInfo,
          location,
        },
      ]);

      if (error) {
        console.error("Insert failed:", error);
      } else {
        console.log("Visitor logged:", ip);
      }
    } catch (err) {
      console.error("Visitor log failed:", err);
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password) // ⚠️ Insecure: hash passwords in production
      .single();

    if (error || !data) {
      alert("Invalid credentials");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="public-btn" onClick={() => navigate("/public")}>
            Public View
          </button>
        </div>
      </div>
    </div>
  );
}

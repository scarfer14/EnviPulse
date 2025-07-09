import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      // 1. Get IP and location info
      const ipRes = await axios.get("https://ipapi.co/json/");
      const { ip, city, region, country_name } = ipRes.data;

      // 2. Get device info from browser
      const deviceInfo = `${navigator.platform} | ${navigator.userAgent}`;
      const location = `${city}, ${region}, ${country_name}`;

      // 3. Save to Supabase
      await supabase.from("visitor_logs").insert([
        {
          ip_address: ip,
          device_info: deviceInfo,
          location: location,
        },
      ]);
    } catch (err) {
      console.error("Error logging visitor:", err);
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password) // ⚠️ Insecure, for demo only
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

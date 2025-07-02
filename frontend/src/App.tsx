import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password) // ⚠️ Insecure, demo only
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

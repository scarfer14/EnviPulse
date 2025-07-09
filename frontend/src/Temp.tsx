import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-wrapper">
      <div className="view-container">
        <h1>Private Dashboard</h1>
      </div>
      <div className="nav-bar">
        <button className="nav-btn" onClick={() => navigate("/main")}>Main</button>
        <button className="nav-btn" onClick={() => navigate("/temp")}>Temp</button>
        <button className="nav-btn" onClick={() => navigate("/visitors")}>Visitors</button>
        <button className="nav-btn-out" onClick={() => navigate("/")}>Logout</button>
      </div>
      <div>
        <h1>Temp Logs</h1>
      </div>
    </div>
  );
}

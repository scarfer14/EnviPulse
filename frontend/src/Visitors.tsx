import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Make sure this path is correct
import "./admin.css";

type VisitorLog = {
  id: string;
  ip_address: string | null;
  device_info: string | null;
  location: string | null;
  timestamp: string;
};

export default function Visitors() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorLogs = async () => {
      const { data, error } = await supabase
        .from("visitor_logs")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Error fetching visitor logs:", error.message);
      } else {
        setLogs(data);
      }
      setLoading(false);
    };

    fetchVisitorLogs();
  }, []);

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
        <h1 className="title-font">Visit Logs</h1>
      </div>

      <div className="content-wrap">
        {loading ? (
          <p style={{ color: "white" }}>Loading...</p>
        ) : logs.length === 0 ? (
          <p style={{ color: "white" }}>No visitor logs found.</p>
        ) : (
          <table className="visitor-table">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>Device Info</th>
                <th>Location</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.ip_address || "N/A"}</td>
                  <td>{log.device_info || "N/A"}</td>
                  <td>{log.location || "N/A"}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./admin.css";

type TempLog = {
  id: string;
  temperature: number;
  humidity: number;
  air_quality: string;
  vibration: string;
  timestamp: string;
};

export default function Temp() {
  const navigate = useNavigate();

  const [showNAModal, setShowNAModal] = useState(false);
  const [showHighSchoolModal, setShowHighSchoolModal] = useState(false);
  const [logs, setLogs] = useState<TempLog[]>([]);
  const [loading, setLoading] = useState(true);

  const closeModals = () => {
    setShowNAModal(false);
    setShowHighSchoolModal(false);
  };

  const openNAModal = () => {
    setShowNAModal(true);
  };

  const openHighSchoolModal = () => {
    setShowHighSchoolModal(true);
  };

  const fetchTempLogs = async () => {
    const { data, error } = await supabase
      .from("temp_logs")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching temp logs:", error.message);
    } else {
      setLogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTempLogs();
  }, []);

  return (
    <div className="admin-wrapper">
      <div className="view-container">
        <h1>Public Dashboard</h1>
      </div>

      <div className="nav-bar">
        <button className="nav-btn-out" onClick={() => navigate("/")}>Back</button>
      </div>

      <div className="content-wrap">
        <h1 className="content-title">School List</h1>
        <div className="school-grid">
          <button className="school-button" onClick={openHighSchoolModal}>High School A</button>
          <button className="school-button" onClick={openNAModal}>NA</button>
          <button className="school-button" onClick={openNAModal}>NA</button>
          <button className="school-button" onClick={openNAModal}>NA</button>
          <button className="school-button" onClick={openNAModal}>NA</button>
        </div>
      </div>

      {/* NA Modal */}
      {showNAModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={closeModals}>✖</button>
            <h2>Feature Coming Soon...</h2>
            <p>New School data will be added soon. Stay tuned.</p>
          </div>
        </div>
      )}

      {/* High School A Modal */}
      {showHighSchoolModal && (
        <div className="modal-overlay">
          <div className="modal-box wide">
            <button className="close-btn" onClick={closeModals}>✖</button>
            <h2>High School A - Data Logs</h2>
            {loading ? (
              <p style={{ color: "white" }}>Loading...</p>
            ) : logs.length === 0 ? (
              <p style={{ color: "white" }}>No temperature logs found.</p>
            ) : (
              <table className="visitor-table">
                <thead>
                  <tr>
                    <th>Temperature (°C)</th>
                    <th>Humidity (%)</th>
                    <th>Air Quality</th>
                    <th>Vibration</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.temperature}</td>
                      <td>{log.humidity}</td>
                      <td>{log.air_quality}</td>
                      <td>{log.vibration}</td>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

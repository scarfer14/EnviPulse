import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./view.css";
import "./admin.css";

// Define the TempLog type
type TempLog = {
  id: string;
  temperature: number;
  humidity: number;
  air_quality: string;
  vibration: string;
  timestamp: string;
};

export default function ViewDashboard() {
  const [showNAModal, setShowNAModal] = useState(false);
  const [showHighSchoolModal, setShowHighSchoolModal] = useState(false);
  const [logs, setLogs] = useState<TempLog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeModals = () => {
    setShowNAModal(false);
    setShowHighSchoolModal(false);
  };

  const openNAModal = () => {
    setShowNAModal(true);
    setShowHighSchoolModal(false);
  };

  const openHighSchoolModal = () => {
    setShowHighSchoolModal(true);
    setShowNAModal(false);
  };

  // Webcam effect
  useEffect(() => {
    const videoElement = videoRef.current;

    if (showHighSchoolModal && videoElement) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
        })
        .catch((err) => {
          console.error("Webcam access failed:", err);
        });
    }

    return () => {
      if (videoElement?.srcObject) {
        const tracks = (videoElement.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [showHighSchoolModal]);

  // Fetch temp_logs from Supabase
  useEffect(() => {
    const fetchTempLogs = async () => {
      const { data, error } = await supabase
        .from("temp_logs")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Error fetching temperature logs:", error.message);
      } else {
        setLogs(data);
      }
      setLoading(false);
    };

    fetchTempLogs();
  }, []);

  return (
    <div>
      <div className="view-container">
        <h1>Public Dashboard</h1>
      </div>

      {/* Logout Button */}
      <div className="nav-bar" style={{ margin: "1rem" }}>
        <button className="nav-btn-out" onClick={() => navigate("/")}>
          Back
        </button>
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

      {/* High School A Webcam Modal */}
      {showHighSchoolModal && (
        <div className="modal-overlay">
          <div className="modal-box wide">
            <button className="close-btn" onClick={closeModals}>✖</button>
            <h2 className="modal-title">High School A - Live Camera</h2>

            {/* Webcam Feed */}
            <video ref={videoRef} autoPlay playsInline className="webcam-feed" />

            {/* Temp Logs Table */}
            <div className="log-table-scroll">
              {loading ? (
                <p>Loading...</p>
              ) : logs.length === 0 ? (
                <p>No temperature logs found.</p>
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
        </div>
      )}
    </div>
  );
}

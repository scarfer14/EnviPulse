import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function Head() {
  const navigate = useNavigate();

  const [showHighSchoolModal, setShowHighSchoolModal] = useState(false);
  const [showNAModal, setShowNAModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const openHighSchoolModal = () => {
    setShowHighSchoolModal(true);
    setShowNAModal(false);
  };

  const openNAModal = () => {
    setShowNAModal(true);
    setShowHighSchoolModal(false);
  };

  const closeModals = () => {
    setShowHighSchoolModal(false);
    setShowNAModal(false);
  };

  // Handle webcam logic
  useEffect(() => {
    if (showHighSchoolModal && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Webcam access failed:", err);
        });
    } else {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  }, [showHighSchoolModal]);

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
        <h1 className="title-font">Main</h1>
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

      {/* High School A Modal */}
      {showHighSchoolModal && (
        <div className="modal-overlay">
          <div className="modal-box webcam-box">
            <button className="close-btn" onClick={closeModals}>✖</button>
            <h2 className="modal-title">High School A - Live Camera</h2>
            <video ref={videoRef} autoPlay playsInline className="webcam-feed" />
          </div>
        </div>
      )}

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
    </div>
  );
}

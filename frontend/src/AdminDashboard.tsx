import "./admin.css";

export default function AdminDashboard() {
  return (
    <div className="admin-wrapper">
      <div className="view-container">
        <h1>Private Dashboard</h1>
      </div>
      <div className="nav-bar">
        <button className="nav-btn">Main</button>
        <button className="nav-btn">Temp</button>
        <button className="nav-btn">Visitors</button>
        <button className="nav-btn-out">Logout</button>
      </div>
    </div>
  );
}

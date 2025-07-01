export default function App() {
  return (
    <div className="page-container">
      <div className="login-box">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <input type="text" placeholder="Username" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <div className="button-container">
          <button className="login-btn">Login</button>
          <button className="public-btn">Public View</button>
        </div>
      </div>
    </div>
  );
}

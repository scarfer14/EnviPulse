import logo from "/logo.png";

export default function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 flex flex-col items-center space-y-6">
        
        <img src={logo} alt="Logo" className="w-24 h-24" />

        <h1 className="text-2xl font-bold text-gray-800">Welcome to EnviPulse</h1>
        
        <div className="w-full space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="w-full space-y-3 mt-4">
          <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition">
            Login
          </button>
          
          <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition font-semibold">
            Public View
          </button>
        </div>
      </div>
    </div>
  );
}

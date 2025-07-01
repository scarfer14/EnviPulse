export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-8 w-80 space-y-6 text-center">
        
        <img src="/logo.png" alt="EnviPulse Logo" className="h-20 mx-auto" />
        
        <h1 className="text-2xl font-extrabold text-gray-800">EnviPulse</h1>
        <p className="text-gray-600">Temperature Monitoring System</p>

        <div className="flex flex-col space-y-3">
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition font-semibold">
            Login
          </button>
          <button className="bg-yellow-400 text-gray-900 px-6 py-2 rounded hover:bg-yellow-500 transition font-semibold">
            Public View
          </button>
        </div>

      </div>
    </div>
  );
}

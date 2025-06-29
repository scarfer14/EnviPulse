export default function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 px-6 py-3 flex justify-between items-center w-[400px] rounded-xl z-50">
      
      {/* Logo Image on the Left */}
      <img 
        src="/logo.png" 
        alt="Envi Pulse Logo" 
        className="h-10"
      />

      {/* Login Button on the Right */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Login
      </button>
      
    </div>
  );
}

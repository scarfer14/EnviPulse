import Navbar from './Navbar';
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      <div className="pt-20 p-4">
        {/* Your main content */}
        <div className="bg-red-500 h-20 w-20"></div>
      </div>
    </div>
  );
}

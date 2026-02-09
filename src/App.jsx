import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import './index.css';

function App() {
  return (
    <Router>
      <div className="layout-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/hostel" element={<div className="p-8"><h2>Hostel Information (Coming Soon)</h2></div>} />
            <Route path="/health" element={<div className="p-8"><h2>Health Records (Coming Soon)</h2></div>} />
            <Route path="/notices" element={<div className="p-8"><h2>Notices Board (Coming Soon)</h2></div>} />
            <Route path="/settings" element={<div className="p-8"><h2>Settings (Coming Soon)</h2></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

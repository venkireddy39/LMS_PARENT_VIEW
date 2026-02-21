import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Hostel from './pages/Hostel';
import Exam from './pages/Exam';
import Notices from './pages/Notices';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={isLoginPage ? "login-layout" : "layout-container"}>
      {!isLoginPage && <Navbar />}
      <main className={isLoginPage ? "" : "main-content"}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/exams" element={<Exam />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;


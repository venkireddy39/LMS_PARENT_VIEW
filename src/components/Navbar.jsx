import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaUserCheck,
    FaMoneyCheckAlt,
    FaHeartbeat,
    FaCog,
    FaSignOutAlt,
    FaBuilding,
    FaGraduationCap,
    FaBell
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Current user in Navbar:', user);

    const getDisplayName = (userData) => {
        if (!userData) return 'Parent Portal';
        const nameKeys = ['parentName', 'name', 'fullName', 'displayName', 'userName', 'firstName', 'first_name', 'username'];
        for (const key of nameKeys) if (userData[key]) return userData[key];
        for (const root of ['data', 'user', 'parent']) {
            if (userData[root]) {
                for (const key of nameKeys) if (userData[root][key]) return userData[root][key];
            }
        }
        if (userData.email) return userData.email.split('@')[0];
        if (userData.sub && userData.sub.includes('@')) return userData.sub.split('@')[0];
        return 'Parent Portal';
    };

    const parentName = getDisplayName(user);

    const menuItems = [
        { name: 'Overview', path: '/', icon: <FaHome /> },
        { name: 'Attendance', path: '/attendance', icon: <FaUserCheck /> },
        { name: 'Fees', path: '/fees', icon: <FaMoneyCheckAlt /> },
        { name: 'Hostel', path: '/hostel', icon: <FaBuilding /> },
        { name: 'Exams', path: '/exams', icon: <FaGraduationCap /> },
        { name: 'Settings', path: '/settings', icon: <FaCog /> }
    ];

    const handleLogout = () => {
        // Clear auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="navbar glass-effect">
            <div className="navbar-header">
                <h2>{parentName}</h2>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Parent Portal</span>
            </div>
            <ul className="navbar-menu">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                        >
                            <div className="icon-wrapper">{item.icon}</div>
                            <span>{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="navbar-footer" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <NavLink
                    to="/notices"
                    className={({ isActive }) => isActive ? 'menu-link active icon-only' : 'menu-link icon-only'}
                    style={{ padding: '0.5rem', borderRadius: '50%', justifyContent: 'center' }}
                >
                    <FaBell size={20} />
                </NavLink>
                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt className="icon-wrapper" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;

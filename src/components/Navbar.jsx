import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaHome,
    FaUserCheck,
    FaMoneyCheckAlt,
    FaHeartbeat,
    FaBullhorn,
    FaCog,
    FaSignOutAlt,
    FaBuilding
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const menuItems = [
        { name: 'Overview', path: '/', icon: <FaHome /> },
        { name: 'Attendance', path: '/attendance', icon: <FaUserCheck /> },
        { name: 'Fees', path: '/fees', icon: <FaMoneyCheckAlt /> },
        { name: 'Hostel', path: '/hostel', icon: <FaBuilding /> },
        { name: 'Health', path: '/health', icon: <FaHeartbeat /> },
        { name: 'Notices', path: '/notices', icon: <FaBullhorn /> },
        { name: 'Settings', path: '/settings', icon: <FaCog /> }
    ];

    return (
        <div className="navbar glass-effect">
            <div className="navbar-header">
                <h2>Parent Portal</h2>
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
            <div className="navbar-footer">
                <button className="logout-btn">
                    <FaSignOutAlt className="icon-wrapper" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaHome,
    FaUserCheck,
    FaMoneyCheckAlt,
    FaHeartbeat,
    FaBullhorn,
    FaCog
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const menuItems = [
        { name: 'Overview', path: '/', icon: <FaHome /> },
        { name: 'Attendance', path: '/attendance', icon: <FaUserCheck /> },
        { name: 'Fees & Payments', path: '/fees', icon: <FaMoneyCheckAlt /> },
        { name: 'Health Records', path: '/health', icon: <FaHeartbeat /> },
        { name: 'Notices', path: '/notices', icon: <FaBullhorn /> },
        { name: 'Settings', path: '/settings', icon: <FaCog /> }
    ];

    return (
        <div className="sidebar glass-effect">
            <div className="sidebar-header">
                <h2>Parent Portal</h2>
            </div>
            <ul className="sidebar-menu">
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
            <div className="sidebar-footer">
                <p>© 2026 LMS Inc.</p>
            </div>
        </div>
    );
};

export default Sidebar;

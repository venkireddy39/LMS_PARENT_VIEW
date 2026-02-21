import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaHome,
    FaUserCheck,
    FaMoneyCheckAlt,
    FaHeartbeat,
    FaCog,
    FaSignOutAlt,
    FaBuilding,
    FaGraduationCap,
    FaBell,
    FaSun,
    FaMoon
} from 'react-icons/fa';
import './Navbar.css';

const SlideInText = ({ text, className }) => {
    return (
        <span className={className}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        delay: i * 0.03,
                        ease: "easeOut"
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
};

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');

    React.useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-mode' : '';
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    console.log('Current user in Navbar:', user);

    const getDisplayName = (userData) => {
        if (!userData) return 'Parent Portal';

        const extractName = (data) => {
            if (!data || typeof data !== 'object') return null;
            const keys = ['parentName', 'name', 'fullName', 'displayName', 'fatherName'];
            for (const key of keys) {
                if (data[key] && typeof data[key] === 'string' && !data[key].includes('@')) return data[key];
            }
            const fName = data.firstName || data.first_name;
            const lName = data.lastName || data.last_name;
            if (fName && typeof fName === 'string' && !fName.includes('@')) {
                return (lName && typeof lName === 'string' && !lName.includes('@')) ? `${fName} ${lName}` : fName;
            }
            return null;
        };

        let result = extractName(userData);
        if (result) return result;

        const roots = ['parent', 'user', 'data'];
        for (const root of roots) {
            const nested = userData[root];
            if (nested) {
                result = extractName(nested);
                if (result) return result;
                if (typeof nested === 'object') {
                    for (const subRoot of roots) {
                        result = extractName(nested[subRoot]);
                        if (result) return result;
                    }
                }
            }
        }
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
                <h2>
                    <SlideInText text={parentName} />
                </h2>
                <SlideInText text="Parent Portal" className="portal-subtitle" />
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
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                </button>
                <NavLink
                    to="/notices"
                    className={({ isActive }) => isActive ? 'menu-link active icon-only' : 'menu-link icon-only'}
                >
                    <FaBell size={22} />
                </NavLink>
                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt className="icon-wrapper" size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;

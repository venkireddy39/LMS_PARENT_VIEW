import React, { useState } from 'react';
import {
    FaUser,
    FaLock,
    FaBell,
    FaMoon,
    FaQuestionCircle,
    FaSignOutAlt,
    FaSave,
    FaEye,
    FaEyeSlash
} from 'react-icons/fa';
import './Settings.css';

import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    // State for Profile
    const [profile, setProfile] = useState({
        name: 'Venkatesh',
        email: 'venki07@example.com',
        phone: '+91 98765 43210'
    });

    // State for Password
    const [showPassword, setShowPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    // State for Preferences
    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        app: true,
        feeReminders: true,
        attendanceAlerts: true
    });

    const { darkMode, toggleTheme } = useTheme();

    /* Removed local dark mode state and useEffect */

    // Handlers
    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleNotificationToggle = (key) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    const handleSavePassword = (e) => {
        e.preventDefault();
        alert('Password changed successfully!');
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Settings</h1>
            </div>

            {/* Profile Section */}
            <section className="settings-section">
                <div className="section-header">
                    <h2><FaUser className="section-icon" /> Profile Settings</h2>
                </div>
                <div className="profile-content">
                    <div className="profile-avatar">
                        {profile.name.charAt(0)}
                    </div>
                    <form className="profile-details" onSubmit={handleSaveProfile}>
                        <div className="input-group">
                            <label className="input-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                value={profile.name}
                                onChange={handleProfileChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="input-field"
                                value={profile.email}
                                onChange={handleProfileChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                className="input-field"
                                value={profile.phone}
                                onChange={handleProfileChange}
                            />
                        </div>
                        <div className="actions-row">
                            <button type="submit" className="btn-primary">
                                <FaSave style={{ marginRight: '0.5rem' }} /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Notifications Section */}
            <section className="settings-section">
                <div className="section-header">
                    <h2><FaBell className="section-icon" /> Notifications</h2>
                </div>
                <div className="toggles-container">
                    <div className="toggle-row">
                        <div className="toggle-info">
                            <h3>Email Notifications</h3>
                            <p>Receive updates and reports via email</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={notifications.email}
                                onChange={() => handleNotificationToggle('email')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="toggle-row">
                        <div className="toggle-info">
                            <h3>SMS Alerts</h3>
                            <p>Get urgent SMS for emergency situations</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={notifications.sms}
                                onChange={() => handleNotificationToggle('sms')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="toggle-row">
                        <div className="toggle-info">
                            <h3>Attendance Alerts</h3>
                            <p>Notify when student is absent or late</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={notifications.attendanceAlerts}
                                onChange={() => handleNotificationToggle('attendanceAlerts')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="toggle-row">
                        <div className="toggle-info">
                            <h3>Fee Reminders</h3>
                            <p>Get reminded before due dates</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={notifications.feeReminders}
                                onChange={() => handleNotificationToggle('feeReminders')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section className="settings-section">
                <div className="section-header">
                    <h2><FaLock className="section-icon" /> Security</h2>
                </div>
                <form onSubmit={handleSavePassword}>
                    <div className="input-group">
                        <label className="input-label">Current Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="current"
                                className="input-field"
                                value={passwords.current}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#6b7280',
                                    cursor: 'pointer'
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">New Password</label>
                        <input
                            type="password"
                            name="new"
                            className="input-field"
                            value={passwords.new}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirm"
                            className="input-field"
                            value={passwords.confirm}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="actions-row">
                        <button type="submit" className="btn-secondary">Update Password</button>
                    </div>
                </form>
            </section>

            <div className="right-column-stack">
                {/* Appearance Section */}
                <section className="settings-section">
                    <div className="section-header">
                        <h2><FaMoon className="section-icon" /> Appearance</h2>
                    </div>
                    <div className="toggle-row">
                        <div className="toggle-info">
                            <h3>Dark Mode</h3>
                            <p>Switch to a dark theme for low-light environments</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={toggleTheme}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </section>

                {/* Account Actions */}
                <section className="settings-section" style={{ border: '1px solid #fee2e2', padding: '1.5rem', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="section-header" style={{ borderBottom: 'none', marginBottom: '0.5rem' }}>
                        <h2 style={{ color: '#dc2626', fontSize: '1.1rem' }}><FaSignOutAlt /> Account Actions</h2>
                    </div>
                    <p style={{ color: '#6b7280', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        Sign out regarding your session or contact support if you have any issues.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <FaQuestionCircle /> Help & Support
                        </button>
                        <button className="btn-danger" style={{ flex: 1, marginTop: 0 }}>Log Out</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;

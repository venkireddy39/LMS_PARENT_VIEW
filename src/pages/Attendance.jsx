import React, { useState } from 'react';
import {
    FaCalendarCheck,
    FaUserClock,
    FaExclamationTriangle,
    FaChevronLeft,
    FaChevronRight,
    FaCalendarAlt
} from 'react-icons/fa';
import './Attendance.css';

const Attendance = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Mock Data
    const attendanceStats = {
        present: 22,
        absent: 2,
        late: 1,
        holiday: 4,
        attendancePercentage: '92%'
    };

    const attendanceHistory = [
        { id: 1, date: 'Feb 09, 2026', status: 'present', checkIn: '08:45 AM', checkOut: '03:15 PM' },
        { id: 2, date: 'Feb 08, 2026', status: 'holiday', checkIn: '-', checkOut: '-' }, // Sunday
        { id: 3, date: 'Feb 07, 2026', status: 'present', checkIn: '08:50 AM', checkOut: '03:10 PM' },
        { id: 4, date: 'Feb 06, 2026', status: 'late', checkIn: '09:15 AM', checkOut: '03:20 PM' },
        { id: 5, date: 'Feb 05, 2026', status: 'present', checkIn: '08:40 AM', checkOut: '03:00 PM' },
        { id: 6, date: 'Feb 04, 2026', status: 'absent', checkIn: '-', checkOut: '-' },
    ];

    // Helper to get days in month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    // Helper to get first day of month (0 = Sun, 1 = Mon, etc.)
    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Mock status for each day (simple cycle for demo)
    const getDayStatus = (day) => {
        // Just for visual demo, randomizing status based on day number
        if (day % 7 === 0 || day % 7 === 6) return 'holiday';
        if (day === 4 || day === 15) return 'absent';
        if (day === 6 || day === 20) return 'late';
        return 'present';
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
        setCurrentDate(new Date(newDate));
    };

    return (
        <div className="attendance-container">
            <header className="attendance-header">
                <div>
                    <h1>Attendance Records</h1>
                    <p>Track daily attendance and punctuality for <strong>Rohan Sharma</strong></p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary">Download Report</button>
                </div>
            </header>

            {/* Quick Stats */}
            <div className="attendance-stats">
                <div className="stat-box">
                    <div className="stat-icon-wrapper" style={{ background: '#d1fae5', color: '#059669' }}>
                        <FaCalendarCheck />
                    </div>
                    <div className="stat-text">
                        <h3>{attendanceStats.attendancePercentage}</h3>
                        <p>Total Attendance</p>
                    </div>
                </div>
                <div className="stat-box">
                    <div className="stat-icon-wrapper" style={{ background: '#fee2e2', color: '#dc2626' }}>
                        <FaUserClock />
                    </div>
                    <div className="stat-text">
                        <h3>{attendanceStats.absent} Days</h3>
                        <p>Absent</p>
                    </div>
                </div>
                <div className="stat-box">
                    <div className="stat-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
                        <FaExclamationTriangle />
                    </div>
                    <div className="stat-text">
                        <h3>{attendanceStats.late} Days</h3>
                        <p>Late Arrival</p>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="attendance-content-wrapper">
                {/* Calendar View */}
                <div className="calendar-card">
                    <div className="calendar-header">
                        <h2><FaCalendarAlt /> Monthly View</h2>
                        <div className="month-selector">
                            <button className="month-btn" onClick={() => changeMonth(-1)}><FaChevronLeft /></button>
                            <span className="current-month">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                            <button className="month-btn" onClick={() => changeMonth(1)}><FaChevronRight /></button>
                        </div>
                    </div>

                    <div className="calendar-grid">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="calendar-day-header">{day}</div>
                        ))}

                        {[...Array(firstDay)].map((_, i) => (
                            <div key={`empty-${i}`} className="calendar-day empty"></div>
                        ))}

                        {[...Array(daysInMonth)].map((_, i) => {
                            const day = i + 1;
                            const status = getDayStatus(day);
                            return (
                                <div key={day} className={`calendar-day ${status}`}>
                                    <span>{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent History List */}
                <div className="history-section">
                    <div className="history-header">
                        <h2>Recent Activity</h2>
                    </div>
                    <div className="history-list">
                        {attendanceHistory.map(record => (
                            <div key={record.id} className="history-item">
                                <div className="history-date">
                                    <div className="date-badge">
                                        {record.date.split(',')[0]}
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Check In: <strong>{record.checkIn}</strong></span>
                                        <span style={{ margin: '0 0.5rem', color: '#e5e7eb' }}>|</span>
                                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Check Out: <strong>{record.checkOut}</strong></span>
                                    </div>
                                </div>
                                <span className={`status-badge ${record.status}`}>
                                    {record.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;

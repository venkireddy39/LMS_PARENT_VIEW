import React, { useState } from 'react';
import {
    FaBullhorn,
    FaGraduationCap,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaExclamationCircle,
    FaSearch,
    FaFilter,
    FaChevronRight
} from 'react-icons/fa';
import './Notices.css';

const Notices = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const noticesData = [
        {
            id: 1,
            title: "Parent-Teacher Meeting Schedule",
            date: "2026-02-15",
            category: "academic",
            priority: "high",
            content: "The quarterly Parent-Teacher Meeting (PTM) for Class X is scheduled for February 15th, 2026. Slots are available from 9:00 AM to 1:00 PM. Please book your slot through the portal.",
            posted: "2 days ago"
        },
        {
            id: 2,
            title: "Annual Sports Day Registration",
            date: "2026-03-10",
            category: "event",
            priority: "medium",
            content: "Registration for the Annual Sports Day is now open. Students interested in participating in track and field events should submit their names to the sports coordinator by Feb 20th.",
            posted: "4 days ago"
        },
        {
            id: 3,
            title: "Semester 2 Fee Payment Deadline",
            date: "2026-02-28",
            category: "finance",
            priority: "urgent",
            content: "This is a reminder that the last date for Semester 2 fee payment is February 28th, 2026. Late fees will be applicable for payments made after the due date.",
            posted: "1 week ago"
        },
        {
            id: 4,
            title: "Holiday Announcement: Mahashivratri",
            date: "2026-02-18",
            category: "general",
            priority: "low",
            content: "The college will remain closed on February 18th, 2026, on account of Mahashivratri. Regular classes will resume on the following day.",
            posted: "1 week ago"
        },
        {
            id: 5,
            title: "Library Book Return Policy Update",
            date: "2026-02-01",
            category: "academic",
            priority: "medium",
            content: "The library book return period has been extended from 7 days to 14 days effective immediately. Please ensure books are returned on time to avoid fines.",
            posted: "2 weeks ago"
        }
    ];

    const categories = [
        { id: 'all', label: 'All Notices', icon: <FaBullhorn /> },
        { id: 'academic', label: 'Academic', icon: <FaGraduationCap /> },
        { id: 'event', label: 'Events', icon: <FaCalendarAlt /> },
        { id: 'finance', label: 'Finance', icon: <FaMoneyBillWave /> },
        { id: 'urgent', label: 'Urgent', icon: <FaExclamationCircle /> }
    ];

    // Helper to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' }),
            full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        };
    };

    // Filter Logic
    const filteredNotices = noticesData.filter(notice => {
        const matchesTab = activeTab === 'all'
            ? true
            : activeTab === 'urgent'
                ? notice.priority === 'urgent'
                : notice.category === activeTab;

        const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notice.content.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'academic': return <FaGraduationCap />;
            case 'event': return <FaCalendarAlt />;
            case 'finance': return <FaMoneyBillWave />;
            default: return <FaBullhorn />;
        }
    };

    return (
        <div className="notices-container">
            <header className="notices-header">
                <div>
                    <h1>Notice Board</h1>
                    <p>Stay updated with the latest announcements regarding <strong>Rohan Sharma</strong></p>
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search notices..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.75rem 1rem 0.75rem 2.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb',
                            width: '250px',
                            fontSize: '0.9rem'
                        }}
                    />
                    <FaSearch style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                </div>
            </header>

            {/* Filter Tabs */}
            <div className="filter-tabs">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(cat.id)}
                    >
                        {cat.icon}
                        {cat.label}
                        <span className="tab-count">
                            {cat.id === 'all'
                                ? noticesData.length
                                : cat.id === 'urgent'
                                    ? noticesData.filter(n => n.priority === 'urgent').length
                                    : noticesData.filter(n => n.category === cat.id).length
                            }
                        </span>
                    </button>
                ))}
            </div>

            {/* Notices List */}
            <div className="notices-list">
                {filteredNotices.length > 0 ? (
                    filteredNotices.map(notice => {
                        const { day, month } = formatDate(notice.date);
                        return (
                            <div key={notice.id} className={`notice-card ${notice.category} ${notice.priority === 'urgent' ? 'urgent' : ''}`}>
                                <div className="notice-date-box">
                                    <span className="date-day">{day}</span>
                                    <span className="date-month">{month}</span>
                                </div>
                                <div className="notice-content">
                                    <div className="notice-meta">
                                        <span className={`category-tag tag-${notice.category}`}>
                                            {getCategoryIcon(notice.category)} {notice.category}
                                        </span>
                                        {notice.priority === 'urgent' && <span className="category-tag tag-urgent">Urgent</span>}
                                        <span className="publish-time">• Posted {notice.posted}</span>
                                    </div>
                                    <h3 className="notice-title">{notice.title}</h3>
                                    <p className="notice-excerpt">{notice.content}</p>
                                </div>
                                <div className="notice-actions">
                                    <button className="read-more-btn">
                                        Read More <FaChevronRight size={12} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-notices">
                        <FaFilter size={48} style={{ color: '#d1d5db', marginBottom: '1rem' }} />
                        <h3>No notices found</h3>
                        <p>Try adjusting your search or filters to find what you're looking for.</p>
                        <button
                            className="btn-primary"
                            style={{ marginTop: '1rem' }}
                            onClick={() => { setActiveTab('all'); setSearchTerm(''); }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notices;

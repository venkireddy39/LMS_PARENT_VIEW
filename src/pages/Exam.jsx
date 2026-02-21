import React, { useState } from 'react';
import {
    FaGraduationCap,
    FaBookOpen,
    FaCertificate,
    FaChartLine,
    FaDownload,
    FaPlayCircle,
    FaCheckCircle,
    FaClock
} from 'react-icons/fa';
import './Exam.css';

const Exam = () => {
    const [activeCourses, setActiveCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Learning Stats (Keep mock for others or update if needed)
    const learningStats = {
        totalCourses: 12,
        completed: 8,
        inProgress: activeCourses.length,
        totalHours: 145,
        certificates: 8
    };

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses');
                if (response.ok) {
                    const data = await response.json();
                    // Assuming data is an array of courses
                    // Map backend fields to frontend if needed
                    const normalizedCourses = data.map((course, index) => ({
                        id: course.id || index,
                        // Use courseName or title from API, fallback to mock if empty
                        title: course.courseName || course.title || 'Untitled Course',
                        provider: course.provider || 'Internal',
                        progress: course.progress || 0,
                        totalLessons: course.totalLessons || 0,
                        completedLessons: course.completedLessons || 0,
                        lastAccessed: course.lastAccessed || 'Recently'
                    }));
                    setActiveCourses(normalizedCourses);
                }
            } catch (err) {
                console.error('Failed to fetch courses:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Completed Courses / Certifications (Keeping mock for now as requested focused on In-Progress)
    const completedCourses = [
        {
            id: 1,
            title: 'Introduction to React.js',
            provider: 'Scrimba',
            completionDate: 'Jan 15, 2026',
            score: '95%',
            certificateId: 'RCT-2026-001'
        },
        {
            id: 2,
            title: 'Advanced CSS and Sass',
            provider: 'Udemy',
            completionDate: 'Dec 10, 2025',
            score: '88%',
            certificateId: 'CSS-2025-045'
        },
        {
            id: 3,
            title: 'JavaScript Algorithms',
            provider: 'FreeCodeCamp',
            completionDate: 'Nov 22, 2025',
            score: '100%',
            certificateId: 'JS-2025-112'
        }
    ];

    return (
        <div className="exam-container">
            <header className="exam-header">
                <div>
                    <h1>Learning & Certifications</h1>
                    <p>Track your online courses, certifications, and skill development progress</p>
                </div>
                <div>
                    <button className="btn-primary">
                        <FaCertificate style={{ marginRight: '0.5rem' }} /> Certificate Vault
                    </button>
                </div>
            </header>

            {/* Stats Overview */}
            <div className="exam-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                        <FaBookOpen />
                    </div>
                    <div className="stat-content">
                        <h3>{learningStats.inProgress}</h3>
                        <p>Active Courses</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#d1fae5', color: '#047857' }}>
                        <FaCheckCircle />
                    </div>
                    <div className="stat-content">
                        <h3>{learningStats.completed}</h3>
                        <p>Completed Courses</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
                        <FaClock />
                    </div>
                    <div className="stat-content">
                        <h3>{learningStats.totalHours}h</h3>
                        <p>Total Learning Time</p>
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="exam-content">
                {/* Active Courses */}
                <section className="exam-section">
                    <div className="section-header">
                        <h2><FaPlayCircle /> In-Progress Courses</h2>
                    </div>
                    <table className="exam-table">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Provider</th>
                                <th style={{ width: '30%' }}>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                                        Loading courses...
                                    </td>
                                </tr>
                            ) : activeCourses.length > 0 ? (
                                activeCourses.map(course => (
                                    <tr key={course.id}>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{course.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                                {course.completedLessons}/{course.totalLessons} Lessons • Last: {course.lastAccessed}
                                            </div>
                                        </td>
                                        <td>{course.provider}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div className="progress-container">
                                                    <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{course.progress}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                                        No in-progress courses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {/* Completed Courses */}
                <section className="exam-section">
                    <div className="section-header">
                        <h2><FaGraduationCap /> Course History & Certificates</h2>
                    </div>
                    <table className="exam-table">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Provider</th>
                                <th>Date Completed</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedCourses.map(course => (
                                <tr key={course.id}>
                                    <td><strong>{course.title}</strong></td>
                                    <td>{course.provider}</td>
                                    <td>{course.completionDate}</td>
                                    <td>
                                        <span className="grade-badge grade-A">
                                            {course.score}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default Exam;

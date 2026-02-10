import React, { useState } from 'react';
import {
    FaBed,
    FaUsers,
    FaDoorOpen,
    FaPhone,
    FaTools,
    FaPlus,
    FaFileMedical,
    FaUserMd,
    FaHeartbeat
} from 'react-icons/fa';
import './Hostel.css';

const Hostel = () => {
    // Mock Data
    const hostelInfo = {
        hostelName: "Boys Hostel A",
        roomNo: "304",
        block: "A Block",
        floor: "3rd Floor",
        type: "Double Sharing",
        warden: {
            name: "Mr. Rajesh Kumar",
            phone: "+91 98765 43210",
            email: "warden.bh1@college.edu"
        }
    };

    const roommates = [
        { id: 1, name: "Amit Verma", course: "B.Tech CSE", year: "2nd Year" },
        { id: 2, name: "Rohan Sharma", course: "B.Tech CSE", year: "2nd Year" } // Current Student
    ];

    const [gatePasses, setGatePasses] = useState([
        { id: 1, type: "Outing", date: "Feb 12, 2026", reason: "Shopping", status: "Pending" },
        { id: 2, type: "Leave", from: "Feb 05, 2026", to: "Feb 07, 2026", reason: "Family Function", status: "Approved" },
        { id: 3, type: "Outing", date: "Jan 28, 2026", reason: "Movie", status: "Rejected" }
    ]);

    const [complaints, setComplaints] = useState([
        { id: 1, category: "Electrical", issue: "Fan not working", date: "Feb 08, 2026", status: "In Progress" },
        { id: 2, category: "Plumbing", issue: "Tap leaking", date: "Jan 15, 2026", status: "Resolved" }
    ]);

    const medicalHistory = [
        {
            id: 1,
            date: 'Feb 01, 2026',
            issue: 'Viral Fever',
            doctor: 'Dr. Sarah Smith',
            prescription: 'Paracetamol, Rest',
            status: 'Resolved'
        },
        {
            id: 2,
            date: 'Jan 15, 2026',
            issue: 'Sprained Ankle',
            doctor: 'Dr. P. Rao (Physio)',
            prescription: 'Crepe Bandage, Ice Pack',
            status: 'Resolved'
        },
        {
            id: 3,
            date: 'Dec 10, 2025',
            issue: 'Annual Health Checkup',
            doctor: 'College Medical Team',
            prescription: 'General Vitamins',
            status: 'Resolved'
        }
    ];

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
            case 'resolved': return 'status-approved';
            case 'pending':
            case 'in progress': return 'status-pending';
            case 'rejected': return 'status-rejected';
            default: return '';
        }
    };

    return (
        <div className="hostel-container">
            <header className="hostel-header">
                <div>
                    <h1>Hostel Information</h1>
                    <p>Manage hostel details, gate passes, and complaints for <strong>Rohan Sharma</strong></p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary">
                        <FaPlus style={{ marginRight: '0.5rem' }} /> New Request
                    </button>
                </div>
            </header>

            <div className="hostel-grid">
                {/* Room Details Card */}
                <div className="hostel-card">
                    <div className="card-header">
                        <h2><FaBed /> Room Details</h2>
                        <span className="status-badge status-approved">Allocated</span>
                    </div>
                    <div className="room-details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Hostel Name</span>
                            <span className="detail-value">{hostelInfo.hostelName}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Room Number</span>
                            <span className="detail-value">{hostelInfo.roomNo}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Block / Floor</span>
                            <span className="detail-value">{hostelInfo.block}, {hostelInfo.floor}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Room Type</span>
                            <span className="detail-value">{hostelInfo.type}</span>
                        </div>
                    </div>
                </div>

                {/* Warden Info Card */}
                <div className="hostel-card">
                    <div className="card-header">
                        <h2><FaPhone /> Warden Contact</h2>
                    </div>
                    <div className="warden-info">
                        <h3>{hostelInfo.warden.name}</h3>
                        <p className="detail-label">Hostel Warden</p>
                        <div className="warden-contact">
                            <a href={`tel:${hostelInfo.warden.phone}`} className="contact-btn">Call Now</a>
                            <a href={`mailto:${hostelInfo.warden.email}`} className="contact-btn">Email</a>
                        </div>
                    </div>
                </div>

                {/* Roommates Card */}
                <div className="hostel-card" style={{ gridColumn: 'span 1' }}>
                    <div className="card-header">
                        <h2><FaUsers /> Roommates</h2>
                    </div>
                    <div className="roommates-list">
                        {roommates.map(mate => (
                            <div key={mate.id} className="roommate-item">
                                <div className="roommate-avatar">
                                    {mate.name.charAt(0)}
                                </div>
                                <div className="roommate-info">
                                    <h3>{mate.name}</h3>
                                    <p>{mate.course} - {mate.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gate Pass History */}
                <div className="hostel-card" style={{ gridColumn: 'span 1' }}>
                    <div className="card-header">
                        <h2><FaDoorOpen /> Gate Pass History</h2>
                        <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer' }}>View All</button>
                    </div>
                    <div className="gatepass-list">
                        {gatePasses.map(pass => (
                            <div key={pass.id} className="gatepass-item">
                                <div>
                                    <div style={{ fontWeight: '600' }}>{pass.type} - {pass.reason}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                        {pass.date || `${pass.from} - ${pass.to}`}
                                    </div>
                                </div>
                                <span className={`status-badge ${getStatusClass(pass.status)}`}>
                                    {pass.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Complaints */}
                <div className="hostel-card" style={{ gridColumn: 'span 2' }}>
                    <div className="card-header">
                        <h2><FaTools /> Maintenance & Complaints</h2>
                        <button className="btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Report Issue</button>
                    </div>
                    <div className="gatepass-list">
                        {complaints.length > 0 ? (
                            complaints.map(comp => (
                                <div key={comp.id} className="gatepass-item">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div className="roommate-avatar" style={{ background: '#e0e7ff', color: 'var(--primary-color)' }}>
                                            <FaTools size={14} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{comp.category} - {comp.issue}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Reported on {comp.date}</div>
                                        </div>
                                    </div>
                                    <span className={`status-badge ${getStatusClass(comp.status)}`}>
                                        {comp.status}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#6b7280' }}>No active complaints.</p>
                        )}
                    </div>
                </div>

                {/* Health & Medical History */}
                <div className="hostel-card" style={{ gridColumn: '1 / -1' }}>
                    <div className="card-header">
                        <h2><FaHeartbeat /> Health & Medical History</h2>
                        <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer' }}>View Details</button>
                    </div>
                    <div className="gatepass-list">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                                    <th style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>Date</th>
                                    <th style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>Issue</th>
                                    <th style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>Doctor</th>
                                    <th style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>Prescription</th>
                                    <th style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicalHistory.map(record => (
                                    <tr key={record.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#374151' }} className="table-text">{record.date}</td>
                                        <td style={{ padding: '0.75rem', fontWeight: '600', color: '#1f2937' }} className="table-text-primary">{record.issue}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#374151' }} className="table-text">
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <FaUserMd style={{ color: '#6b7280' }} /> {record.doctor}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }} className="table-text-secondary">{record.prescription}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <span className={`status-badge ${getStatusClass(record.status)}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hostel;

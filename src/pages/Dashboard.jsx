import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { FaUserCheck, FaNotesMedical, FaRegMoneyBillAlt, FaBell } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    // Mock Data
    const attendanceData = [
        { name: 'Present', value: 85, color: '#10b981' },
        { name: 'Absent', value: 10, color: '#ef4444' },
        { name: 'Late', value: 5, color: '#f59e0b' }
    ];
    const feeData = [
        { name: 'Term 1', paid: 50000, due: 0 },
        { name: 'Term 2', paid: 30000, due: 20000 },
        { name: 'Term 3', paid: 0, due: 50000 },
    ];
    const notices = [
        { id: 1, title: 'Parent-Teacher Meeting', date: 'Feb 15, 2026', type: 'Academic' },
        { id: 2, title: 'Annual Sports Day', date: 'Mar 10, 2026', type: 'Event' },
        { id: 3, title: 'Fee Payment Reminder', date: 'Feb 28, 2026', type: 'Finance' }
    ];
    const StatCard = ({ title, value, icon, color, subtitle }) => (
        <div className="stat-card card">
            <div className="stat-icon" style={{ backgroundColor: `${color}20`, color: color }}>
                {icon}
            </div>
            <div className="stat-info">
                <h3>{value}</h3>
                <p>{title}</p>
                {subtitle && <span className="stat-subtitle">{subtitle}</span>}
            </div>
        </div>
    );
    const totalPaid = feeData.reduce((acc, curr) => acc + curr.paid, 0);
    const totalDue = feeData.reduce((acc, curr) => acc + curr.due, 0);
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Welcome back, Mr. Sharma</h1>
                    <p>Here's what's happening with your child, <strong>Rohan Sharma</strong> (Class X-A)</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary">View Full Report</button>
                </div>
            </header>

            {/* Quick Stats Row */}
            <div className="stats-grid">
                <StatCard
                    title="Attendance"
                    value="85%"
                    icon={<FaUserCheck />}
                    color="#10b981"
                    subtitle="This Month"
                />
                <StatCard
                    title="Fees Due"
                    value="₹20,000"
                    icon={<FaRegMoneyBillAlt />}
                    color="#ef4444"
                    subtitle="Due: Feb 28"
                />
                <StatCard
                    title="Health Status"
                    value="Good"
                    icon={<FaNotesMedical />}
                    color="#3b82f6"
                    subtitle="Last Checkup: Jan 10"
                />
                <StatCard
                    title="New Notices"
                    value="3"
                    icon={<FaBell />}
                    color="#f59e0b"
                    subtitle="Unread"
                />
            </div>

            {/* Main Content Grid */}
            <div className="content-grid">

                {/* Attendance Chart */}
                <div className="chart-card card">
                    <div className="card-header">
                        <h3>Attendance Overview</h3>
                    </div>
                    <div className="chart-container">
                        <div style={{ height: '250px', width: '100%', position: 'relative' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <defs>
                                        {attendanceData.map((entry, index) => (
                                            <linearGradient id={`color-${index}`} key={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                                                <stop offset="100%" stopColor={entry.color} stopOpacity={1} />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    <Pie
                                        data={attendanceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={75}
                                        outerRadius={95}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={5}
                                    >
                                        {attendanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`url(#color-${index})`} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                                        <tspan x="50%" dy="-0.5em" fontSize="26" fontWeight="800" fill="#1f2937">85%</tspan>
                                        <tspan x="50%" dy="1.6em" fontSize="13" fontWeight="600" fill="#9ca3af" letterSpacing="0.5px">PRESENT</tspan>
                                    </text>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chart-legend">
                            {attendanceData.map((item, index) => (
                                <div key={index} className="legend-item">
                                    <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                                    <span>{item.name}: {item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fee Payment Chart */}
                <div className="chart-card card">
                    <div className="card-header">
                        <h3>Fee Payment Status</h3>
                        <button className="view-link" onClick={() => navigate('/fees')}>Pay Now</button>
                    </div>
                    <div className="chart-container">
                        <div style={{ height: '250px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={feeData}
                                    margin={{
                                        top: 10,
                                        right: 15,
                                        left: -15,
                                        bottom: 0,
                                    }}
                                    barSize={14}
                                    barGap={6}
                                >
                                    <defs>
                                        <filter id="barShadow" height="130%">
                                            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                                            <feOffset dx="0" dy="2" result="offsetblur" />
                                            <feComponentTransfer>
                                                <feFuncA type="linear" slope="0.2" />
                                            </feComponentTransfer>
                                            <feMerge>
                                                <feMergeNode />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                        <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="colorDue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#f87171" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#ef4444" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                                        tickFormatter={(value) => `₹${value / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                                        cursor={{ fill: '#f8fafc', radius: 4 }}
                                        formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
                                    />
                                    <Bar
                                        dataKey="paid"
                                        name="Paid"
                                        fill="url(#colorPaid)"
                                        radius={[10, 10, 10, 10]}
                                        animationDuration={1500}
                                        filter="url(#barShadow)"
                                    />
                                    <Bar
                                        dataKey="due"
                                        name="Due"
                                        fill="url(#colorDue)"
                                        radius={[10, 10, 10, 10]}
                                        animationDuration={1500}
                                        filter="url(#barShadow)"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="fee-summary">
                            <div className="fee-stat-item">
                                <span className="text-secondary text-sm">Total Paid : </span>
                                <span className="text-success font-bold">₹{totalPaid.toLocaleString()}</span>
                            </div>

                            <div className="fee-stat-divider"></div>
                            <div className="fee-stat-item">
                                <span className="text-secondary text-sm">Total Due :  </span>
                                <span className="text-danger font-bold">₹{totalDue.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Notices */}
                <div className="notices-card card">
                    <div className="card-header">
                        <h3>Recent Notices</h3>
                        <a href="/notices" className="view-all">View All</a>
                    </div>
                    <div className="notices-list">
                        {notices.map((notice) => (
                            <div key={notice.id} className="notice-item">
                                <div className="notice-icon">
                                    <FaBell />
                                </div>
                                <div className="notice-content">
                                    <h4>{notice.title}</h4>
                                    <span className="notice-date">{notice.date}</span>
                                </div>
                                <span className={`notice-tag ${notice.type.toLowerCase()}`}>{notice.type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};
export default Dashboard;
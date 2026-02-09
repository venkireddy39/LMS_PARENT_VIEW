import React, { useState } from 'react';
import {
    FaFileInvoiceDollar,
    FaHistory,
    FaCreditCard,
    FaWallet,
    FaExclamationCircle,
    FaDownload
} from 'react-icons/fa';
import './Fees.css';

const Fees = () => {
    // Mock Data
    const feeSummary = {
        totalFee: 120000,
        paid: 80000,
        pending: 40000,
        nextDueDate: 'Feb 28, 2026'
    };

    const feeBreakdown = [
        { id: 1, term: 'Term 1 (Apr - Jul)', amount: 40000, dueDate: 'Apr 10, 2025', status: 'Paid', method: 'Online' },
        { id: 2, term: 'Term 2 (Aug - Nov)', amount: 40000, dueDate: 'Aug 10, 2025', status: 'Paid', method: 'Cash' },
        { id: 3, term: 'Term 3 (Dec - Mar)', amount: 40000, dueDate: 'Feb 28, 2026', status: 'Pending', method: '-' },
    ];

    const transactionHistory = [
        { id: 101, title: 'Term 2 Fee Payment', date: 'Aug 05, 2025', amount: 40000, id: '#TXN123456' },
        { id: 102, title: 'Term 1 Fee Payment', date: 'Apr 02, 2025', amount: 40000, id: '#TXN789012' },
        { id: 103, title: 'Bus Fee (Annual)', date: 'Apr 02, 2025', amount: 15000, id: '#TXN789013' },
    ];

    return (
        <div className="fees-container">
            <header className="fees-header">
                <div>
                    <h1>Fees & Payments</h1>
                    <p>Manage your child's academic fees and view payment history</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary">
                        <FaCreditCard style={{ marginRight: '0.5rem' }} /> Pay Online
                    </button>
                </div>
            </header>

            {/* Fee Stats */}
            <div className="fees-stats-grid">
                <div className="fee-stat-card">
                    <FaFileInvoiceDollar className="fee-stat-icon" style={{ color: '#6366f1' }} />
                    <div>
                        <div className="fee-stat-label">Total Annual Fee</div>
                        <div className="fee-stat-value">₹{feeSummary.totalFee.toLocaleString()}</div>
                    </div>
                </div>

                <div className="fee-stat-card">
                    <FaWallet className="fee-stat-icon" style={{ color: '#10b981' }} />
                    <div>
                        <div className="fee-stat-label">Total Paid</div>
                        <div className="fee-stat-value" style={{ color: '#059669' }}>₹{feeSummary.paid.toLocaleString()}</div>
                    </div>
                    <div className="fee-stat-footer">
                        <FaCreditCard /> 66% Complete
                    </div>
                </div>

                <div className="fee-stat-card">
                    <FaExclamationCircle className="fee-stat-icon" style={{ color: '#ef4444' }} />
                    <div>
                        <div className="fee-stat-label">Pending Due</div>
                        <div className="fee-stat-value" style={{ color: '#dc2626' }}>₹{feeSummary.pending.toLocaleString()}</div>
                    </div>
                    <div className="fee-stat-footer overdue">
                        Due by {feeSummary.nextDueDate}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="fees-content-grid">
                {/* Fee Breakdown Table */}
                <div className="fee-card">
                    <div className="fee-card-header">
                        <h2>Fee Breakdown</h2>
                        <button className="pay-now-btn" style={{ background: 'none', color: '#6366f1', border: '1px solid #6366f1' }}>
                            <FaDownload style={{ marginRight: '0.5rem' }} /> Download Statement
                        </button>
                    </div>
                    <div className="fee-table-container">
                        <table className="fee-table">
                            <thead>
                                <tr>
                                    <th>Term / Description</th>
                                    <th>Due Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeBreakdown.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{item.term}</div>
                                            {item.method !== '-' && <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Paid via {item.method}</div>}
                                        </td>
                                        <td>{item.dueDate}</td>
                                        <td style={{ fontWeight: '600' }}>₹{item.amount.toLocaleString()}</td>
                                        <td>
                                            <span className={`status-pill ${item.status.toLowerCase()}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            {item.status === 'Pending' ? (
                                                <button className="pay-now-btn">Pay Now</button>
                                            ) : (
                                                <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.9rem' }} title="Download Receipt">
                                                    <FaDownload />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="fee-card">
                    <div className="fee-card-header">
                        <h2><FaHistory style={{ color: '#6366f1' }} /> Recent Transactions</h2>
                    </div>
                    <div className="transactions-list">
                        {transactionHistory.map((txn) => (
                            <div key={txn.id} className="transaction-item">
                                <div className="transaction-icon">
                                    <FaCreditCard />
                                </div>
                                <div className="transaction-details">
                                    <h4>{txn.title}</h4>
                                    <p>{txn.date} • {txn.id}</p>
                                </div>
                                <div className="transaction-amount">
                                    -₹{txn.amount.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fees;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTickets } from '../utils/api';
import { STATUS_COLORS } from '../utils/constants';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    high: 0,
    medium: 0,
    low: 0
  });
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const tickets = await getTickets();
      
      const total = tickets.length;
      const open = tickets.filter(t => t.status === 'OPEN').length;
      const inProgress = tickets.filter(t => t.status === 'IN_PROGRESS').length;
      const resolved = tickets.filter(t => t.status === 'RESOLVED').length;
      const closed = tickets.filter(t => t.status === 'CLOSED').length;
      const high = tickets.filter(t => t.priority === 'HIGH').length;
      const medium = tickets.filter(t => t.priority === 'MEDIUM').length;
      const low = tickets.filter(t => t.priority === 'LOW').length;

      setStats({ total, open, inProgress, resolved, closed, high, medium, low });
      setRecentTickets(tickets.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard fade-in">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Ticket Support Pro</h1>
          <p className="hero-subtitle">
            Streamline your customer support with our powerful ticket management system
          </p>
          <div className="hero-actions">
            <Link to="/tickets/new" className="btn btn-hero-primary">
              <span className="btn-icon">🎫</span>
              Create New Ticket
            </Link>
            <Link to="/tickets" className="btn btn-hero-secondary">
              <span className="btn-icon">📋</span>
              View All Tickets
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">{stats.total}</div>
            <div className="hero-stat-label">Total Tickets</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">{stats.open}</div>
            <div className="hero-stat-label">Active</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">{stats.resolved}</div>
            <div className="hero-stat-label">Resolved</div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="stats-section">
        <h2 className="section-title">System Overview</h2>
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Tickets</div>
              <div className="stat-trend">All time</div>
            </div>
          </div>
          
          <div className="stat-card open">
            <div className="stat-icon">🔓</div>
            <div className="stat-content">
              <div className="stat-number">{stats.open}</div>
              <div className="stat-label">Open Tickets</div>
              <div className="stat-trend">Needs attention</div>
            </div>
          </div>
          
          <div className="stat-card progress">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-number">{stats.inProgress}</div>
              <div className="stat-label">In Progress</div>
              <div className="stat-trend">Being worked on</div>
            </div>
          </div>
          
          <div className="stat-card resolved">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{stats.resolved}</div>
              <div className="stat-label">Resolved</div>
              <div className="stat-trend">Ready to close</div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority & Actions Section */}
      <div className="dashboard-grid">
        <div className="priority-section">
          <h2 className="section-title">Priority Distribution</h2>
          <div className="priority-cards">
            <div className="priority-card high">
              <div className="priority-icon">🔥</div>
              <div className="priority-number">{stats.high}</div>
              <div className="priority-label">High Priority</div>
            </div>
            <div className="priority-card medium">
              <div className="priority-icon">⚠️</div>
              <div className="priority-number">{stats.medium}</div>
              <div className="priority-label">Medium Priority</div>
            </div>
            <div className="priority-card low">
              <div className="priority-icon">📝</div>
              <div className="priority-number">{stats.low}</div>
              <div className="priority-label">Low Priority</div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="action-grid">
            <button 
              onClick={() => window.location.href = '/tickets/new'} 
              className="action-card create"
            >
              <div className="action-icon">➕</div>
              <div className="action-title">Create Ticket</div>
              <div className="action-desc">Submit new support request</div>
            </button>
            
            <button 
              onClick={() => window.location.href = '/tickets'} 
              className="action-card view"
            >
              <div className="action-icon">👁️</div>
              <div className="action-title">View Tickets</div>
              <div className="action-desc">Browse all tickets</div>
            </button>
            
            <button 
              onClick={fetchDashboardData} 
              className="action-card refresh"
            >
              <div className="action-icon">🔄</div>
              <div className="action-title">Refresh</div>
              <div className="action-desc">Update dashboard data</div>
            </button>
            
            <button 
              onClick={() => window.location.href = '/help'} 
              className="action-card help"
            >
              <div className="action-icon">❓</div>
              <div className="action-title">Get Help</div>
              <div className="action-desc">View documentation</div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-section">
        <div className="section-header">
          <h2 className="section-title">Recent Activity</h2>
          <Link to="/tickets" className="view-all-btn">
            View All →
          </Link>
        </div>
        
        {recentTickets.length === 0 ? (
          <div className="empty-state-card">
            <div className="empty-icon">🎫</div>
            <div className="empty-title">No Recent Activity</div>
            <div className="empty-desc">Create your first ticket to get started</div>
            <Link to="/tickets/new" className="btn btn-primary">
              Create First Ticket
            </Link>
          </div>
        ) : (
          <div className="recent-grid">
            {recentTickets.map(ticket => (
              <div key={ticket.id} className="recent-card">
                <div className="recent-header">
                  <Link to={`/tickets/${ticket.id}`} className="recent-title">
                    {ticket.subject}
                  </Link>
                  <span 
                    className="recent-status"
                    style={{ backgroundColor: STATUS_COLORS[ticket.status] }}
                  >
                    {ticket.status}
                  </span>
                </div>
                <div className="recent-meta">
                  <span className={`recent-priority priority-${ticket.priority.toLowerCase()}`}>
                    {ticket.priority}
                  </span>
                  <span className="recent-author">By: {ticket.createdBy}</span>
                  <span className="recent-date">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="recent-actions">
                  <Link to={`/tickets/${ticket.id}`} className="btn btn-sm btn-outline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
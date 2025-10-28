import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTickets } from '../utils/api';
import { STATUS_COLORS, PRIORITY_SORT_MAPPING } from '../utils/constants';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching tickets from:', 'http://localhost:8085/api/tickets');
      
      // Direct fetch to test connection
      const response = await fetch('http://localhost:8085/api/tickets');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched tickets:', data);
      setTickets(Array.isArray(data) ? data : []);
      
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === 'priority') {
      return PRIORITY_SORT_MAPPING[b.priority] - PRIORITY_SORT_MAPPING[a.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">❌</div>
        <div className="empty-state-title">Connection Error</div>
        <div className="empty-state-description">{error}</div>
        <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Make sure the backend is running on http://localhost:8085
        </div>
        <button onClick={fetchTickets} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4">
        <h1 className="page-title">Support Tickets ({tickets.length})</h1>
        <div className="flex gap-4 items-center">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select" 
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="priority">Sort by Priority</option>
            <option value="date">Sort by Date</option>
          </select>
          <Link to="/tickets/new" className="btn btn-primary">
            + Create Ticket
          </Link>
        </div>
      </div>
      
      {tickets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎫</div>
          <div className="empty-state-title">No Tickets Found</div>
          <div className="empty-state-description">
            Create your first support ticket to get started.
          </div>
          <Link to="/tickets/new" className="btn btn-primary">
            Create Your First Ticket
          </Link>
        </div>
      ) : (
        <div className="ticket-grid">
          {sortedTickets.map(ticket => (
            <div key={ticket.id} className={`ticket-card priority-${ticket.priority.toLowerCase()} fade-in`}>
              <div className="flex justify-between items-center mb-4">
                <Link 
                  to={`/tickets/${ticket.id}`}
                  className="ticket-title"
                  style={{ 
                    textDecoration: 'none',
                    color: 'inherit',
                    flex: 1,
                    marginRight: '1rem'
                  }}
                >
                  {ticket.subject}
                </Link>
                <span 
                  className="status-badge"
                  style={{ 
                    backgroundColor: STATUS_COLORS[ticket.status] || '#9ca3af', 
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
              
              <p className="ticket-description">{ticket.description}</p>
              
              <div className="ticket-meta">
                <span className={`status-badge priority-${ticket.priority.toLowerCase()}`}>
                  {ticket.priority}
                </span>
                <span><strong>By:</strong> {ticket.createdBy}</span>
                <span>
                  {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="ticket-actions">
                <Link 
                  to={`/tickets/${ticket.id}`} 
                  className="btn btn-primary text-sm"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTicketById, updateTicketStatus, addResponse, getResponsesForTicket } from '../utils/api';
import { STATUS_COLORS, TICKET_STATUSES } from '../utils/constants';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newResponse, setNewResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchTicketData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching ticket with ID:', id);
      
      // Fetch ticket details
      const ticketData = await getTicketById(id);
      console.log('Ticket data received:', ticketData);
      setTicket(ticketData);
      
      // Fetch responses
      try {
        const responsesData = await getResponsesForTicket(id);
        console.log('Responses data received:', responsesData);
        setResponses(Array.isArray(responsesData) ? responsesData : []);
      } catch (responseError) {
        console.log('No responses found or error fetching responses:', responseError);
        setResponses([]);
      }
      
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError(error.message || 'Failed to load ticket details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchTicketData();
    }
  }, [id, fetchTicketData]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateTicketStatus(id, newStatus);
      setTicket(prev => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status: ' + error.message);
    }
  };

  const handleAddResponse = async (e) => {
    e.preventDefault();
    if (!newResponse.trim()) return;

    setSubmitting(true);
    try {
      const response = await addResponse(id, { 
        message: newResponse.trim(),
        respondedBy: 'Support Agent'
      });
      setResponses(prev => [response, ...prev]);
      setNewResponse('');
    } catch (error) {
      console.error('Error adding response:', error);
      alert('Failed to add response: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

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
        <div className="empty-state-title">Error Loading Ticket</div>
        <div className="empty-state-description">{error}</div>
        <Link to="/" className="btn btn-primary">Back to Tickets</Link>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🎫</div>
        <div className="empty-state-title">Ticket Not Found</div>
        <div className="empty-state-description">The ticket you're looking for doesn't exist.</div>
        <Link to="/" className="btn btn-primary">Back to Tickets</Link>
      </div>
    );
  }

  return (
    <div className="ticket-detail fade-in">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/" className="btn btn-secondary">← Back to Tickets</Link>
      </div>

      {/* Ticket Header */}
      <div className="ticket-header">
        <div className="flex justify-between items-center mb-4">
          <h1 className="ticket-detail-title">{ticket.subject}</h1>
          <span 
            className="status-badge"
            style={{ 
              backgroundColor: STATUS_COLORS[ticket.status] || '#9ca3af', 
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            {ticket.status}
          </span>
        </div>
        
        <p className="text-gray mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          {ticket.description}
        </p>
        
        <div className="ticket-detail-meta">
          <div className="meta-item">
            <span className="meta-label">Priority</span>
            <span className="meta-value">{ticket.priority}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Created</span>
            <span className="meta-value">
              {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Created By</span>
            <span className="meta-value">{ticket.createdBy}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Last Updated</span>
            <span className="meta-value">
              {new Date(ticket.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        <div className="status-update">
          <label className="status-label">Update Status:</label>
          <select 
            value={ticket.status} 
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="status-select"
          >
            {TICKET_STATUSES.map(status => (
              <option key={status} value={status}>{status.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Responses Section */}
      <div className="responses-section">
        <h3 className="responses-title">
          Responses ({responses.length})
        </h3>
        
        {/* Add Response Form */}
        <form onSubmit={handleAddResponse} className="response-form">
          <div className="form-group">
            <label className="form-label">Add a Response</label>
            <textarea
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              placeholder="Type your response here..."
              className="form-textarea"
              rows={4}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={submitting || !newResponse.trim()}
            className="btn btn-primary"
          >
            {submitting ? 'Adding Response...' : 'Add Response'}
          </button>
        </form>

        {/* Responses List */}
        <div className="grid">
          {responses.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem', margin: 0 }}>
              <div className="empty-state-icon">💬</div>
              <div className="empty-state-title">No Responses Yet</div>
              <div className="empty-state-description">
                Be the first to respond to this ticket.
              </div>
            </div>
          ) : (
            responses.map((response, index) => (
              <div key={response.id || index} className="response-item">
                <p className="response-message">{response.message}</p>
                <div className="response-meta">
                  <span><strong>By:</strong> {response.respondedBy || 'Unknown'}</span>
                  <span>
                    {response.respondedAt 
                      ? new Date(response.respondedAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Unknown time'
                    }
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
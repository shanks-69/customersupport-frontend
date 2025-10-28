import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../utils/api';
import { TICKET_PRIORITIES } from '../utils/constants';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'MEDIUM',
    createdBy: 'user'
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.createdBy.trim()) {
      newErrors.createdBy = 'Created by is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const ticket = await createTicket(formData);
      navigate(`/tickets/${ticket.id}`);
    } catch (error) {
      console.error('Error creating ticket:', error);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="create-ticket-form">
      <h1 className="form-title">Create New Ticket</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`form-input ${errors.subject ? 'error' : ''}`}
            placeholder="Enter ticket subject"
          />
          {errors.subject && (
            <span className="text-sm" style={{ color: '#ef4444', marginTop: '0.25rem', display: 'block' }}>
              {errors.subject}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Describe the issue in detail"
          />
          {errors.description && (
            <span className="text-sm" style={{ color: '#ef4444', marginTop: '0.25rem', display: 'block' }}>
              {errors.description}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Created By *
          </label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            className={`form-input ${errors.createdBy ? 'error' : ''}`}
            placeholder="Enter your name"
          />
          {errors.createdBy && (
            <span className="text-sm" style={{ color: '#ef4444', marginTop: '0.25rem', display: 'block' }}>
              {errors.createdBy}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            {TICKET_PRIORITIES.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        {errors.submit && (
          <div className="mb-4" style={{
            color: '#ef4444',
            backgroundColor: '#fef2f2',
            padding: '0.75rem',
            borderRadius: '6px',
            border: '1px solid #fecaca'
          }}>
            {errors.submit}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
          >
            {submitting ? 'Creating...' : 'Create Ticket'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
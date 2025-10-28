import axios from 'axios';
import { API_BASE_URL } from './constants';

// Configure axios defaults
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const getTickets = async () => {
  try {
    console.log('Making request to:', `${API_BASE_URL}/api/tickets`);
    const response = await axios.get(`${API_BASE_URL}/api/tickets`);
    console.log('Response received:', response.data);
    return response.data;
  } catch (err) {
    console.error('API Error:', err);
    if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
      throw new Error('Cannot connect to server. Make sure the backend is running on port 8085.');
    }
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch tickets');
  }
};

export const getTicketById = async (id) => {
  try {
    console.log('Fetching ticket:', `${API_BASE_URL}/api/tickets/${id}`);
    const response = await axios.get(`${API_BASE_URL}/api/tickets/${id}`);
    console.log('Ticket response:', response.data);
    return response.data;
  } catch (err) {
    console.error('API Error:', err);
    if (err.response?.status === 404) throw new Error('Ticket not found');
    if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
      throw new Error('Cannot connect to server');
    }
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch ticket');
  }
};

export const createTicket = async (ticketData) => {
  try {
    console.log('Creating ticket:', ticketData);
    const response = await axios.post(`${API_BASE_URL}/api/tickets`, ticketData);
    console.log('Create response:', response.data);
    return response.data;
  } catch (err) {
    console.error('API Error:', err);
    if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
      throw new Error('Cannot connect to server');
    }
    throw new Error(err.response?.data?.message || err.message || 'Failed to create ticket');
  }
};

export const updateTicketStatus = async (id, newStatus) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/tickets/${id}/status`, { status: newStatus });
    return response.data;
  } catch (err) {
    if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
      throw new Error('Cannot connect to server');
    }
    throw new Error(err.response?.data?.message || err.message || 'Failed to update status');
  }
};

export const addResponse = async (ticketId, responseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/tickets/${ticketId}/responses`, {
      ...responseData,
      respondedBy: responseData.respondedBy || 'Support Agent'
    });
    return response.data;
  } catch (err) {
    if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
      throw new Error('Cannot connect to server');
    }
    throw new Error(err.response?.data?.message || err.message || 'Failed to add response');
  }
};

export const getResponsesForTicket = async (ticketId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/tickets/${ticketId}/responses`);
    return response.data;
  } catch (err) {
    if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
      throw new Error('Cannot connect to server');
    }
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch responses');
  }
};
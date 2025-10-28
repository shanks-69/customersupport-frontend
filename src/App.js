import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import CreateTicket from './components/CreateTicket';
import About from './components/About';
import Help from './components/Help';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        🎫 Ticket Support Pro
      </Link>

      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
        >
          🏠 Dashboard
        </Link>
        <Link
          to="/tickets"
          className={`nav-link ${isActive('/tickets') ? 'active' : ''}`}
        >
          📋 Tickets
        </Link>
        <Link
          to="/tickets/new"
          className={`nav-link ${isActive('/tickets/new') ? 'active' : ''}`}
        >
          ➕ Create
        </Link>
        <Link
          to="/about"
          className={`nav-link ${isActive('/about') ? 'active' : ''}`}
        >
          ℹ️ About
        </Link>
        <Link
          to="/help"
          className={`nav-link ${isActive('/help') ? 'active' : ''}`}
        >
          ❓ Help
        </Link>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Ticket Support Pro</h4>
          <p>Professional ticket management system for efficient customer support.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Dashboard</Link>
          <Link to="/tickets">All Tickets</Link>
          <Link to="/tickets/new">Create Ticket</Link>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <Link to="/help">Help Center</Link>
          <Link to="/about">About System</Link>
          <a href="mailto:support@ticketsystem.com">Contact Us</a>
        </div>
        <div className="footer-section">
          <h4>System Status</h4>
          <div className="status-indicator">
            <span className="status-dot online"></span>
            <span>All Systems Operational</span>
          </div>
          <div className="version-info">
            Version 1.0.0
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Ticket Support Pro. All rights reserved.</p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tickets" element={<TicketList />} />
              <Route path="/tickets/new" element={<CreateTicket />} />
              <Route path="/tickets/:id" element={<TicketDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
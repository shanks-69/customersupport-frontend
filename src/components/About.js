import React from 'react';

const About = () => {
  return (
    <div className="about-page fade-in">
      <div className="about-header">
        <h1 className="page-title">About Ticket Support System</h1>
        <p className="about-subtitle">
          Your comprehensive solution for managing customer support tickets efficiently
        </p>
      </div>

      <div className="about-content">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🎫</div>
            <h3>Ticket Management</h3>
            <p>Create, track, and manage support tickets with ease. Organize by priority and status.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Response System</h3>
            <p>Add responses to tickets, maintain conversation history, and collaborate effectively.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Monitor ticket statistics, track resolution times, and analyze support performance.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Status Tracking</h3>
            <p>Track tickets through their lifecycle: Open → In Progress → Resolved → Closed.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Priority Management</h3>
            <p>Categorize tickets by priority levels: High, Medium, and Low for better organization.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Modern Interface</h3>
            <p>Clean, responsive design that works seamlessly across all devices and screen sizes.</p>
          </div>
        </div>

        <div className="tech-stack">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-logo">⚛️</div>
              <div className="tech-name">React</div>
              <div className="tech-desc">Frontend Framework</div>
            </div>
            <div className="tech-item">
              <div className="tech-logo">🍃</div>
              <div className="tech-name">Spring Boot</div>
              <div className="tech-desc">Backend API</div>
            </div>
            <div className="tech-item">
              <div className="tech-logo">🗄️</div>
              <div className="tech-name">MySQL</div>
              <div className="tech-desc">Database</div>
            </div>
            <div className="tech-item">
              <div className="tech-logo">🎨</div>
              <div className="tech-name">CSS3</div>
              <div className="tech-desc">Styling</div>
            </div>
          </div>
        </div>

        <div className="stats-showcase">
          <h2 className="section-title">System Capabilities</h2>
          <div className="capability-grid">
            <div className="capability-item">
              <div className="capability-number">∞</div>
              <div className="capability-label">Unlimited Tickets</div>
            </div>
            <div className="capability-item">
              <div className="capability-number">4</div>
              <div className="capability-label">Status Types</div>
            </div>
            <div className="capability-item">
              <div className="capability-number">3</div>
              <div className="capability-label">Priority Levels</div>
            </div>
            <div className="capability-item">
              <div className="capability-number">24/7</div>
              <div className="capability-label">Availability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
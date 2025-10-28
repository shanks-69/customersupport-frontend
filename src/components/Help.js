import React, { useState } from 'react';

const Help = () => {
  const [activeTab, setActiveTab] = useState('faq');

  const faqs = [
    {
      question: "How do I create a new ticket?",
      answer: "Click on 'Create Ticket' in the navigation or dashboard. Fill in the subject, description, priority, and your name, then click 'Create Ticket'."
    },
    {
      question: "What are the different ticket statuses?",
      answer: "Tickets have 4 statuses: OPEN (newly created), IN_PROGRESS (being worked on), RESOLVED (solution provided), and CLOSED (completed)."
    },
    {
      question: "How do I respond to a ticket?",
      answer: "Open the ticket details page and scroll to the 'Responses' section. Type your message and click 'Add Response'."
    },
    {
      question: "What do the priority levels mean?",
      answer: "HIGH: Urgent issues requiring immediate attention. MEDIUM: Important issues with moderate urgency. LOW: Minor issues that can be addressed later."
    },
    {
      question: "Can I update a ticket's status?",
      answer: "Yes! In the ticket details page, use the 'Update Status' dropdown to change the ticket status."
    }
  ];

  const guides = [
    {
      title: "Getting Started",
      steps: [
        "Navigate to the dashboard to see an overview",
        "Click 'Create Ticket' to submit a new support request",
        "Fill in all required fields with clear, descriptive information",
        "Select appropriate priority level",
        "Submit and track your ticket's progress"
      ]
    },
    {
      title: "Managing Tickets",
      steps: [
        "View all tickets on the main tickets page",
        "Use sorting options to organize by priority or date",
        "Click on any ticket to view full details",
        "Add responses to communicate about the issue",
        "Update status as the ticket progresses"
      ]
    },
    {
      title: "Best Practices",
      steps: [
        "Write clear, descriptive ticket subjects",
        "Provide detailed descriptions of issues",
        "Set appropriate priority levels",
        "Respond promptly to requests for information",
        "Close tickets when issues are fully resolved"
      ]
    }
  ];

  return (
    <div className="help-page fade-in">
      <div className="help-header">
        <h1 className="page-title">Help & Support</h1>
        <p className="help-subtitle">
          Find answers to common questions and learn how to use the system effectively
        </p>
      </div>

      <div className="help-tabs">
        <button 
          className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          📋 FAQ
        </button>
        <button 
          className={`tab-btn ${activeTab === 'guides' ? 'active' : ''}`}
          onClick={() => setActiveTab('guides')}
        >
          📖 Guides
        </button>
        <button 
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          📞 Contact
        </button>
      </div>

      <div className="help-content">
        {activeTab === 'faq' && (
          <div className="faq-section">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question">
                    <span className="faq-icon">❓</span>
                    {faq.question}
                  </div>
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'guides' && (
          <div className="guides-section">
            <h2 className="section-title">Step-by-Step Guides</h2>
            <div className="guides-grid">
              {guides.map((guide, index) => (
                <div key={index} className="guide-card">
                  <h3 className="guide-title">{guide.title}</h3>
                  <ol className="guide-steps">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="guide-step">{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="contact-section">
            <h2 className="section-title">Contact Information</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <h3>Email Support</h3>
                <p>support@ticketsystem.com</p>
                <p className="contact-note">Response within 24 hours</p>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>Live Chat</h3>
                <p>Available 9 AM - 6 PM</p>
                <p className="contact-note">Monday to Friday</p>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📱</div>
                <h3>Phone Support</h3>
                <p>+1 (555) 123-4567</p>
                <p className="contact-note">Emergency issues only</p>
              </div>
            </div>

            <div className="emergency-info">
              <h3>🚨 Emergency Contact</h3>
              <p>For critical system issues that require immediate attention:</p>
              <div className="emergency-details">
                <strong>Emergency Hotline: +1 (555) 911-HELP</strong>
                <br />
                <em>Available 24/7 for system-critical issues</em>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
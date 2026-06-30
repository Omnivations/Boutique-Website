import React, { useState, useEffect } from 'react';

const ChatWidget = ({ 
  position = 'bottom-right',
  messengerUrl,
  whatsappNumber,
  preferredPlatform = 'messenger' // 'messenger' or 'whatsapp'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Simulate online status (in real app, this would come from your backend)
  useEffect(() => {
    const interval = setInterval(() => {
      const businessHours = {
        start: 9,  // 9 AM
        end: 18    // 6 PM
      };
      
      const now = new Date();
      const hour = now.getHours();
      const isBusinessHours = hour >= businessHours.start && hour < businessHours.end;
      setIsOnline(isBusinessHours);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const openMessenger = () => {
    if (messengerUrl) {
      window.open(messengerUrl, '_blank', 'width=400,height=600');
    } else {
      // Fallback to generic messenger
      window.open('https://m.me/your-page-name', '_blank', 'width=400,height=600');
    }
    setIsOpen(false);
  };

  const openWhatsApp = (message = '') => {
    const defaultMessage = encodeURIComponent(
      message || "Hello! I'm interested in your boutique items. Can you help me?"
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed',
      zIndex: 1000
    };

    switch (position) {
      case 'bottom-left':
        return { ...baseStyles, bottom: 'var(--space-lg)', left: 'var(--space-lg)' };
      case 'bottom-right':
      default:
        return { ...baseStyles, bottom: 'var(--space-lg)', right: 'var(--space-lg)' };
      case 'top-right':
        return { ...baseStyles, top: 'var(--space-lg)', right: 'var(--space-lg)' };
      case 'top-left':
        return { ...baseStyles, top: 'var(--space-lg)', left: 'var(--space-lg)' };
    }
  };

  return (
    <div className="chat-widget" style={getPositionStyles()}>
      {/* Chat Options Popup */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          padding: 'var(--space-lg)',
          minWidth: '280px',
          maxWidth: '320px'
        }}>
          {/* Header */}
          <div style={{
            borderBottom: '1px solid var(--cream-dark)',
            paddingBottom: 'var(--space-md)',
            marginBottom: 'var(--space-md)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              marginBottom: 'var(--space-xs)'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: isOnline ? '#4CAF50' : '#FF5722'
              }}></div>
              <span style={{
                fontWeight: '600',
                color: 'var(--charcoal)'
              }}>
                {isOnline ? 'We\'re Online!' : 'We\'ll Reply Soon'}
              </span>
            </div>
            <p style={{
              margin: 0,
              fontSize: '0.9rem',
              color: '#666'
            }}>
              {isOnline 
                ? 'Chat with us for immediate assistance' 
                : 'Leave a message and we\'ll get back to you'
              }
            </p>
          </div>

          {/* Chat Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {/* Facebook Messenger Option */}
            <button
              onClick={openMessenger}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                padding: 'var(--space-md)',
                border: '1px solid var(--cream-dark)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--white)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#E3F2FD';
                e.target.style.borderColor = '#2196F3';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'var(--white)';
                e.target.style.borderColor = 'var(--cream-dark)';
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#0084FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>
                💬
              </div>
              <div>
                <div style={{ fontWeight: '500' }}>Facebook Messenger</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Continue on Facebook
                </div>
              </div>
            </button>

            {/* WhatsApp Option */}
            {whatsappNumber && (
              <button
                onClick={() => openWhatsApp()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-md)',
                  border: '1px solid var(--cream-dark)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--white)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#E8F5E8';
                  e.target.style.borderColor = '#25D366';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'var(--white)';
                  e.target.style.borderColor = 'var(--cream-dark)';
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  📱
                </div>
                <div>
                  <div style={{ fontWeight: '500' }}>WhatsApp</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    Message us directly
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{
            marginTop: 'var(--space-md)',
            paddingTop: 'var(--space-md)',
            borderTop: '1px solid var(--cream-dark)',
            fontSize: '0.85rem'
          }}>
            <p style={{ margin: '0 0 var(--space-xs) 0', fontWeight: '500' }}>
              Quick questions:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <button
                onClick={() => openWhatsApp('What rental items do you have available?')}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  color: 'var(--gold-primary)',
                  cursor: 'pointer',
                  padding: '2px 0'
                }}
              >
                • Available rental items?
              </button>
              <button
                onClick={() => openWhatsApp('What are your rental rates?')}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  color: 'var(--gold-primary)',
                  cursor: 'pointer',
                  padding: '2px 0'
                }}
              >
                • Rental rates?
              </button>
              <button
                onClick={() => openWhatsApp('Do you have this in my size?')}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  color: 'var(--gold-primary)',
                  cursor: 'pointer',
                  padding: '2px 0'
                }}
              >
                • Size availability?
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              color: '#666',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Main Chat Button */}
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative'
        }}
      >
        {isOpen ? '✕' : '💬'}
        
        {/* Online indicator */}
        {isOnline && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '12px',
            height: '12px',
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            border: '2px solid white'
          }}></div>
        )}
      </button>

      {/* Business hours notice */}
      {!isOnline && !isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          background: 'var(--soft-black)',
          color: 'white',
          padding: 'var(--space-sm) var(--space-md)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8rem',
          whiteSpace: 'nowrap',
          opacity: 0.9
        }}>
          Available 9 AM - 6 PM
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
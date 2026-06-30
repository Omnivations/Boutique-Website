import React, { useState } from 'react';
import CalendarWidget from './CalendarWidget';

const ProductCard = ({ 
  product,
  isRental = false,
  onRentSelect,
  onPurchase,
  availableDates = [],
  unavailableDates = []
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleDateSelect = (date, qty) => {
    setSelectedDate(date);
    if (onRentSelect) {
      onRentSelect(product.id, date, qty);
    }
  };

  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(product.id, quantity);
    }
  };

  const adjustQuantity = (change) => {
    const newQuantity = Math.max(1, Math.min(product.maxQuantity || 99, quantity + change));
    setQuantity(newQuantity);
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={product.image || '/api/placeholder/300/250'}
          alt={product.name}
          className="product-image"
        />
        {product.isNew && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'var(--gold-primary)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            NEW
          </div>
        )}
        {product.featured && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'var(--soft-black)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            FEATURED
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-price">
          {isRental ? (
            <>
              ₱{product.rentalPrice}/day
              {product.originalPrice && (
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: '#666', 
                  marginLeft: 'var(--space-sm)',
                  textDecoration: 'line-through'
                }}>
                  ₱{product.originalPrice}
                </span>
              )}
            </>
          ) : (
            `₱${product.price}`
          )}
        </div>

        {product.description && (
          <p className="product-description">{product.description}</p>
        )}

        {/* Sizes available */}
        {product.sizes && (
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: '500' }}>
              Sizes: {product.sizes.join(', ')}
            </span>
          </div>
        )}

        {/* Colors available */}
        {product.colors && (
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: '500' }}>
              Colors: 
            </span>
            <div style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 'var(--space-xs)' }}>
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: color.toLowerCase(),
                    border: '2px solid #ddd',
                    title: color
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isRental ? (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => setShowCalendar(!showCalendar)}
              style={{ width: '100%', marginBottom: 'var(--space-md)' }}
            >
              {showCalendar ? 'Hide Calendar' : 'Check Availability'}
            </button>

            {showCalendar && (
              <div style={{ marginBottom: 'var(--space-md)' }}>
                <CalendarWidget
                  availableDates={availableDates}
                  unavailableDates={unavailableDates}
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                  maxQuantity={product.maxQuantity || 1}
                />
              </div>
            )}

            {selectedDate && (
              <div style={{ 
                background: 'var(--cream)', 
                padding: 'var(--space-md)', 
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-md)'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  <strong>Selected:</strong> {selectedDate}
                </p>
                <button 
                  className="btn btn-secondary"
                  style={{ marginTop: 'var(--space-sm)', width: '100%' }}
                  onClick={() => {
                    // This would typically open a chat widget
                    alert('Opening chat to confirm reservation...');
                  }}
                >
                  Confirm via Chat
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Quantity selector for retail items */}
            <div className="quantity-selector">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => adjustQuantity(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  min="1"
                  max={product.maxQuantity || 99}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button
                  className="quantity-btn"
                  onClick={() => adjustQuantity(1)}
                  disabled={quantity >= (product.maxQuantity || 99)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handlePurchase}
              style={{ width: '100%' }}
            >
              Add to Cart - ₱{(product.price * quantity).toFixed(2)}
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div style={{ 
          display: 'flex', 
          gap: 'var(--space-sm)', 
          marginTop: 'var(--space-md)',
          justifyContent: 'space-between'
        }}>
          <button 
            className="btn btn-outline"
            style={{ flex: 1, fontSize: '0.9rem', padding: 'var(--space-sm)' }}
            onClick={() => {
              // Add to wishlist functionality
              alert('Added to wishlist!');
            }}
          >
            ♡ Wishlist
          </button>
          <button 
            className="btn btn-outline"
            style={{ flex: 1, fontSize: '0.9rem', padding: 'var(--space-sm)' }}
            onClick={() => {
              // Share functionality
              navigator.share && navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href
              });
            }}
          >
            📤 Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
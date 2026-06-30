import React, { useState, useEffect } from 'react';

const Carousel = ({ 
  items = [], 
  autoPlay = true, 
  autoPlayDelay = 4000,
  showArrows = true,
  showDots = true,
  title 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, items.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  if (!items.length) {
    return (
      <div className="carousel-container" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-shimmer" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-lg)' }}></div>
      </div>
    );
  }

  return (
    <div className="carousel-section">
      {title && (
        <h2 className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
          {title}
        </h2>
      )}
      
      <div className="carousel-container">
        <div 
          className="carousel-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={item.image || '/api/placeholder/800/400'}
                alt={item.title || `Slide ${index + 1}`}
                className="carousel-image"
              />
              {(item.title || item.description) && (
                <div className="carousel-content">
                  {item.title && <h3>{item.title}</h3>}
                  {item.description && <p>{item.description}</p>}
                  {item.price && (
                    <div className="product-price" style={{ fontSize: '1.5rem', marginTop: 'var(--space-md)' }}>
                      {item.price}
                    </div>
                  )}
                  {item.link && (
                    <a href={item.link} className="btn btn-primary" style={{ marginTop: 'var(--space-lg)' }}>
                      View Details
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && items.length > 1 && (
          <>
            <button
              className="carousel-arrow prev"
              onClick={goToPrevSlide}
              aria-label="Previous slide"
            >
              ◀
            </button>
            <button
              className="carousel-arrow next"
              onClick={goToNextSlide}
              aria-label="Next slide"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Dots Navigation */}
      {showDots && items.length > 1 && (
        <div className="carousel-nav">
          {items.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
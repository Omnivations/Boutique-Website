import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Costumes', href: '/costumes' },
    { name: 'Cosplay', href: '/cosplay' },
    { name: 'Gowns', href: '/gowns' },
    { name: 'Contact Lenses', href: '/contact-lenses' },
    { name: 'Accessories', href: '/accessories' }
  ];

  return (
    <header className="nav-header">
      <div className="container">
        <div className="nav-container">
          {/* Logo */}
          <a href="/" className="nav-logo">
            Boutique Elegance
          </a>

          {/* Desktop Navigation */}
          <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.name} className="nav-item">
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
            {/* Search can be integrated here or as a separate component */}
            <li className="nav-item">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search items..."
                  style={{ width: '200px', padding: '8px 12px' }}
                />
              </div>
            </li>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
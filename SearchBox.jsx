import React, { useState, useEffect, useRef } from 'react';

const SearchBox = ({ 
  placeholder = "Search items...",
  onSearch,
  suggestions = [],
  recentSearches = [],
  popularSearches = []
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Default suggestions for boutique items
  const defaultSuggestions = [
    // Costumes
    'Princess costume', 'Superhero costume', 'Medieval dress', 'Vampire cape',
    'Angel wings', 'Historical costume', 'Character costume',
    
    // Cosplay
    'Anime cosplay', 'Game character', 'Movie character', 'TV character',
    'Cosplay wig', 'Cosplay accessories', 'Cosplay armor',
    
    // Gowns
    'Wedding dress', 'Evening gown', 'Prom dress', 'Cocktail dress',
    'Ball gown', 'Mermaid dress', 'A-line dress', 'Vintage gown',
    
    // Contact Lenses
    'Colored contacts', 'Halloween contacts', 'Cosplay lenses',
    'Contact solution', 'Lens case', 'Daily contacts',
    
    // Accessories
    'Crown', 'Tiara', 'Jewelry', 'Gloves', 'Shoes', 'Bag',
    'Veil', 'Hair accessories', 'Belt', 'Scarf'
  ];

  const allSuggestions = [...suggestions, ...defaultSuggestions];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
      setShowSuggestions(true);
    } else {
      // Show recent and popular searches when no query
      const combined = [
        ...recentSearches.slice(0, 4).map(item => ({ text: item, type: 'recent' })),
        ...popularSearches.slice(0, 4).map(item => ({ text: item, type: 'popular' }))
      ];
      setFilteredSuggestions(combined);
      setShowSuggestions(false);
    }
  }, [query, suggestions, recentSearches, popularSearches]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setActiveSuggestion(-1);
  };

  const handleInputFocus = () => {
    if (filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestion >= 0) {
        const selectedSuggestion = typeof filteredSuggestions[activeSuggestion] === 'string'
          ? filteredSuggestions[activeSuggestion]
          : filteredSuggestions[activeSuggestion].text;
        handleSearch(selectedSuggestion);
      } else {
        handleSearch(query);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchQuery) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      setQuery(finalQuery);
      setShowSuggestions(false);
      if (onSearch) {
        onSearch(finalQuery.trim());
      }
      
      // Add to recent searches (in a real app, this would be stored)
      console.log('Searching for:', finalQuery.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const suggestionText = typeof suggestion === 'string' ? suggestion : suggestion.text;
    handleSearch(suggestionText);
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    searchRef.current?.focus();
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          style={{
            paddingRight: query ? '40px' : '16px'
          }}
        />
        
        {/* Search/Clear button */}
        <button
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--gold-primary)',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
          onClick={query ? clearSearch : () => handleSearch(query)}
          aria-label={query ? 'Clear search' : 'Search'}
        >
          {query ? '✕' : '🔍'}
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="search-suggestions" ref={suggestionsRef}>
          {query.length === 0 && (recentSearches.length > 0 || popularSearches.length > 0) && (
            <>
              {recentSearches.length > 0 && (
                <div>
                  <div style={{ 
                    padding: 'var(--space-sm) var(--space-lg)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'var(--gold-dark)',
                    borderBottom: '1px solid var(--cream-dark)'
                  }}>
                    Recent Searches
                  </div>
                  {recentSearches.slice(0, 4).map((item, index) => (
                    <div
                      key={`recent-${index}`}
                      className="search-suggestion"
                      onClick={() => handleSearch(item)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-sm)'
                      }}
                    >
                      <span style={{ color: 'var(--gold-primary)' }}>🕒</span>
                      {item}
                    </div>
                  ))}
                </div>
              )}
              
              {popularSearches.length > 0 && (
                <div>
                  <div style={{ 
                    padding: 'var(--space-sm) var(--space-lg)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'var(--gold-dark)',
                    borderBottom: '1px solid var(--cream-dark)'
                  }}>
                    Popular Searches
                  </div>
                  {popularSearches.slice(0, 4).map((item, index) => (
                    <div
                      key={`popular-${index}`}
                      className="search-suggestion"
                      onClick={() => handleSearch(item)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-sm)'
                      }}
                    >
                      <span style={{ color: 'var(--gold-primary)' }}>🔥</span>
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          
          {query.length > 0 && filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`search-suggestion ${index === activeSuggestion ? 'active' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                backgroundColor: index === activeSuggestion ? 'var(--cream)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)'
              }}
            >
              <span style={{ color: 'var(--gold-primary)' }}>🔍</span>
              <span>
                {typeof suggestion === 'string' 
                  ? suggestion.replace(
                      new RegExp(`(${query})`, 'gi'),
                      '<strong>$1</strong>'
                    )
                  : suggestion.text
                }
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
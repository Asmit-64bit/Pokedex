import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';

const Header = () => {
  const {
    searchTerm,
    setSearchTerm,
    setPage,
    isFilterOpen,
    setIsFilterOpen,
    selectedType,
    selectedGeneration,
    sortBy
  } = usePokemon();

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  const hasActiveFilters = selectedType !== '' || selectedGeneration !== 'all' || sortBy !== 'id-asc';

  const filterButton = (
    <button
      onClick={toggleFilter}
      className="glass"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        padding: '0.6rem 1.2rem',
        borderRadius: '50px',
        cursor: 'pointer',
        border: isFilterOpen 
          ? '1px solid var(--primary-color)' 
          : '1px solid var(--glass-border)',
        background: isFilterOpen 
          ? 'color-mix(in srgb, var(--primary-color) 20%, var(--card-bg))' 
          : 'var(--card-bg)',
        color: 'var(--text-light)',
        fontWeight: 600,
        fontSize: '0.88rem',
        transition: 'all 0.25s ease',
        boxShadow: isFilterOpen 
          ? '0 0 15px color-mix(in srgb, var(--primary-color) 15%, transparent)' 
          : 'none',
        width: '100%'
      }}
      onMouseEnter={(e) => {
        if (!isFilterOpen) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isFilterOpen) {
          e.currentTarget.style.background = 'var(--card-bg)';
          e.currentTarget.style.borderColor = 'var(--glass-border)';
        }
      }}
    >
      <svg 
        width="15" 
        height="15" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ color: isFilterOpen ? 'var(--primary-color)' : 'inherit' }}
      >
        <line x1="4" y1="21" x2="4" y2="14"></line>
        <line x1="4" y1="10" x2="4" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12" y2="3"></line>
        <line x1="20" y1="21" x2="20" y2="16"></line>
        <line x1="20" y1="12" x2="20" y2="3"></line>
        <line x1="1" y1="14" x2="7" y2="14"></line>
        <line x1="9" y1="8" x2="15" y2="8"></line>
        <line x1="17" y1="16" x2="23" y2="16"></line>
      </svg>
    </button>
  );

  return (
    <header className="glass header-container">
      {/* Brand logo & title */}
      <div className="header-top-row">
        <Link 
          to="/" 
          className="logo-spin" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}
        >
          <svg 
            className="pokeball-logo"
            width="28" 
            height="28" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ transition: 'transform 0.3s ease' }}
          >
            <circle cx="50" cy="50" r="45" fill="white" stroke="#1d1d1f" strokeWidth="8"/>
            <path d="M5 50H95" stroke="#1d1d1f" strokeWidth="8"/>
            <path d="M5 50C5 25.1472 25.1472 5 50 5C74.8528 5 95 25.1472 95 50" fill="#FF5350" stroke="#1d1d1f" strokeWidth="8"/>
            <circle cx="50" cy="50" r="16" fill="white" stroke="#1d1d1f" strokeWidth="8"/>
            <circle cx="50" cy="50" r="6" fill="#1d1d1f" />
          </svg>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 850, 
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #ff5350, #f7d02c)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            backgroundClip: 'text',
            margin: 0
          }}>
            Pokédex
          </h1>
        </Link>
        <div className="mobile-filter-btn-wrap">
          {filterButton}
        </div>
      </div>

      {/* Center Search Input */}
      <div className="header-search-wrap">
        <span style={{
          position: 'absolute',
          left: '1.1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          color: 'var(--text-light)',
          opacity: 0.35
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="search-input-field"
          style={{
            padding: '0.65rem 2.8rem 0.65rem 2.6rem',
            fontSize: '0.95rem',
            borderRadius: '50px'
          }}
        />
        {searchTerm && (
          <button
            onClick={() => handleSearchChange('')}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-light)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              opacity: 0.5,
              transition: 'opacity 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Right Controls */}
      <div className="desktop-filter-btn-wrap">
        {filterButton}
      </div>
    </header>
  );
};

export default Header;

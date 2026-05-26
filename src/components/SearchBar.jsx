import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div style={{ 
      marginBottom: '2rem', 
      display: 'flex', 
      justifyContent: 'center',
      position: 'sticky',
      top: '7.5rem',
      zIndex: 90
    }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="glass"
          style={{
            width: '100%',
            padding: '1rem 3rem 1rem 2rem', // Added right padding for button
            fontSize: '1.2rem',
            color: 'var(--text-light)',
            outline: 'none',
            borderRadius: '50px'
          }}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-light)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              opacity: 0.7
            }}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

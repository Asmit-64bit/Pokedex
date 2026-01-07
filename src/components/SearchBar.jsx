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
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="glass"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          color: 'var(--text-light)',
          outline: 'none',
          borderRadius: '50px'
        }}
      />
    </div>
  );
};

export default SearchBar;

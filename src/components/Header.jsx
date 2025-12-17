import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="glass" style={{ 
      padding: '1rem 2rem', 
      marginBottom: '2rem', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: '1rem',
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(to right, #ff5350, #f7d02c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Pokédex
        </h1>
      </Link>
      
    </header>
  );
};

export default Header;

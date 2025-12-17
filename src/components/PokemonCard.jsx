import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TypeBadge from './TypeBadge';

const PokemonCard = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <motion.div
        className="glass"
        whileHover={{ scale: 1.05, translateY: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          fontSize: '100px',
          opacity: 0.1,
          fontWeight: 'bold',
          color: 'var(--text-light)',
          zIndex: 0
        }}>
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
        
        <img
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          style={{ width: '150px', height: '150px', zIndex: 1, filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}
        />
        
        <h2 style={{ 
          textTransform: 'capitalize', 
          margin: '1rem 0 0.5rem 0', 
          fontSize: '1.5rem',
          zIndex: 1,
          fontWeight: 700
        }}>
          {pokemon.name}
        </h2>

        <div style={{ display: 'flex', gap: '0.5rem', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
      </motion.div>
    </Link>
  );
};

export default PokemonCard;

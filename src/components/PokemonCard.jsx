import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TypeBadge from './TypeBadge';
import { getSpriteUrl } from '../utils/spriteHelper';

const PokemonCard = ({ pokemon }) => {
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = `var(--type-${primaryType})`;

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <motion.div
        className="glass pokemon-card-type-border"
        whileHover={{ scale: 1.02, translateY: -4 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          padding: '2rem 1.5rem 1.8rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          background: `radial-gradient(circle at 50% 120%, color-mix(in srgb, ${typeColor} 14%, transparent), var(--card-bg))`,
          border: `1px solid color-mix(in srgb, ${typeColor} 20%, var(--glass-border))`,
          '--type-color-glow': typeColor
        }}
      >
        {/* Glow backdrop watermark */}
        <div 
          className="pokemon-card-type-bg" 
          style={{ '--type-color-glow': typeColor }} 
        />

        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          fontSize: '90px',
          opacity: 0.08,
          fontWeight: 900,
          color: `color-mix(in srgb, ${typeColor} 60%, var(--text-light))`,
          zIndex: 0,
          letterSpacing: '-2px',
          userSelect: 'none'
        }}>
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
        
        <img
          src={getSpriteUrl(pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default)}
          alt={pokemon.name}
          style={{ 
            width: '140px', 
            height: '140px', 
            zIndex: 1, 
            filter: 'drop-shadow(0 12px 12px rgba(0,0,0,0.35))',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        />
        
        <h2 style={{ 
          textTransform: 'capitalize', 
          margin: '1.2rem 0 0.5rem 0', 
          fontSize: '1.4rem',
          zIndex: 1,
          fontWeight: 700,
          letterSpacing: '-0.3px',
          color: 'var(--text-light)'
        }}>
          {pokemon.name}
        </h2>

        <div style={{ display: 'flex', gap: '0.4rem', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
      </motion.div>
    </Link>
  );
};

export default PokemonCard;

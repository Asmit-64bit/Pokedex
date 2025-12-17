import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TypeBadge from '../components/TypeBadge';
import Loader from '../components/Loader';
import { usePokemon } from '../hooks/usePokemon';
import { motion } from 'framer-motion';

const PokemonDetails = () => {
  const { id } = useParams();
  const { getPokemonDetails, getPokemonSpecies } = usePokemon();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getPokemonDetails(id);
      if (data) {
        setPokemon(data);
        const speciesData = await getPokemonSpecies(id);
        setSpecies(speciesData);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="container"><Loader /></div>;
  if (!pokemon) return <div className="container">Pokemon not found</div>;

  return (
    <div className="container">
      <Link to="/" style={{ marginBottom: '2rem', display: 'inline-block' }}>
        <button className="glass" style={{
            padding: '0.5rem 1.5rem', 
            color: 'var(--text-light)', 
            cursor: 'pointer'
        }}>
           ← Back
        </button>
      </Link>

      <motion.div 
        className="glass"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '3rem', textTransform: 'capitalize', marginBottom: '1rem' }}>
            {pokemon.name} <span style={{ opacity: 0.5, fontSize: '2rem' }}>#{pokemon.id.toString().padStart(3, '0')}</span>
          </h1>
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name}
            style={{ width: '300px', height: '300px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
          />
           <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
           <div>
              <h3>Stats</h3>
              {pokemon.stats.map(s => (
                  <div key={s.stat.name} style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <span style={{ textTransform: 'capitalize' }}>{s.stat.name}</span>
                          <b>{s.base_stat}</b>
                      </div>
                      <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px' }}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(s.base_stat, 100)}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            style={{ 
                                height: '100%', 
                                background: 'var(--primary-color)', 
                                borderRadius: '4px' 
                            }} 
                          />
                      </div>
                  </div>
              ))}
           </div>
           
           <div>
              <h3>Info</h3>
              <p style={{ marginTop: '1rem' }}>
                  {species?.flavor_text_entries?.find(e => e.language.name === 'en')?.flavor_text.replace(/\f/g, ' ')}
              </p>
              
              <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="glass" style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ opacity: 0.7 }}>Height</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{pokemon.height / 10} m</div>
                  </div>
                  <div className="glass" style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ opacity: 0.7 }}>Weight</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{pokemon.weight / 10} kg</div>
                  </div>
              </div>
           </div>
        </div>

      </motion.div>
    </div>
  );
};

export default PokemonDetails;

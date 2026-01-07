import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TypeBadge from '../components/TypeBadge';
import Loader from '../components/Loader';
import { usePokemon } from '../hooks/usePokemon';
import { motion } from 'framer-motion';

const PokemonDetails = () => {
  const { id } = useParams();
  const { getPokemonDetails, getPokemonSpecies, getEvolutionChain } = usePokemon();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getPokemonDetails(id);
      if (data) {
        setPokemon(data);
        const speciesData = await getPokemonSpecies(id);
        setSpecies(speciesData);

        // Evolution Chain Logic
        if (speciesData?.evolution_chain?.url) {
          const evoDataRaw = await getEvolutionChain(speciesData.evolution_chain.url);
          
          // Recursive function to parse chain
          const parseChain = (node) => {
            const evoDetails = node.evolution_details[0];
            const id = node.species.url.split('/').filter(Boolean).pop();
            
            return {
              species_name: node.species.name,
              min_level: !evoDetails ? null : evoDetails.min_level,
              trigger_name: !evoDetails ? null : evoDetails.trigger.name,
              item: !evoDetails ? null : evoDetails.item,
              id: id,
              evolves_to: node.evolves_to.map(child => parseChain(child))
            };
          };

          const rootNode = parseChain(evoDataRaw.chain);

          // Flatten tree to get all IDs for Type fetching
          const getAllIds = (node) => {
            let ids = [node.id];
            node.evolves_to.forEach(child => {
              ids = [...ids, ...getAllIds(child)];
            });
            return ids;
          };
          
          const allIds = getAllIds(rootNode);
          
          // Fetch types for potentially branching unique IDs to avoid duplicates if any
          const uniqueIds = [...new Set(allIds)];
          const typeMap = {};
          
          await Promise.all(uniqueIds.map(async (uid) => {
             const details = await getPokemonDetails(uid);
             if (details) typeMap[uid] = details.types;
          }));

          // Attach types to tree
          const enrichTree = (node) => {
             node.types = typeMap[node.id];
             node.evolves_to.forEach(enrichTree);
          };
          
          enrichTree(rootNode);
          setEvolutionChain([rootNode]); // Wrap in array to keep state structure simple or just use root
        }
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
        className="glass details-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="details-header">
          <div className="details-title-container">
            <h1 className="details-title">{pokemon.name}</h1>
            <span className="details-id">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name}
            style={{ width: '300px', height: '300px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', maxWidth: '100%', objectFit: 'contain' }}
          />
           <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
        </div>

        <div className="details-grid">
           <div>
              <h3>Stats</h3>
              {pokemon.stats.map(s => (
                  <div key={s.stat.name} className="stat-row">
                      <div className="stat-label">
                          <span style={{ textTransform: 'capitalize' }}>{s.stat.name}</span>
                          <b>{s.base_stat}</b>
                      </div>
                      <div className="stat-bar-bg">
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
              
              <div className="attributes-grid">
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

        {/* Evolution Chain Section */}
        {evolutionChain.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Evolution Chain</h3>
            <div className="evo-container">
               {/* Recursive Rendering Function */}
               {(() => {
                 const RenderNode = ({ node }) => (
                   <div className="evo-node">
                     {/* The Card */}
                     <Link to={`/pokemon/${node.id}`} style={{ textAlign: 'center' }}>
                        <div className="glass evo-card">
                           <div className="evo-bg-number">
                              #{node.id.toString().padStart(3, '0')}
                           </div>

                           <img 
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${node.id}.png`} 
                              alt={node.species_name}
                              className="evo-image"
                           />
                           <span className="evo-name">{node.species_name}</span>
                           
                           {node.types && (
                               <div className="evo-types">
                                   {node.types.map(t => (
                                       <TypeBadge key={t.type.name} type={t.type.name} /> 
                                   ))}
                               </div>
                           )}
                        </div>
                     </Link>

                     {/* Children */}
                     {node.evolves_to.length > 0 && (
                        <div className="evo-children">
                           {node.evolves_to.map(child => (
                              <div key={child.id} className="evo-child-row">
                                 {/* Arrow & Info */}
                                 <div className="evo-transition">
                                   {child.min_level && <span className="evo-level">Lvl {child.min_level}</span>}
                                   {child.item && (
                                       <div className="evo-item-container">
                                          <img 
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${child.item.name}.png`}
                                            alt={child.item.name}
                                            className="evo-item-image"
                                          />
                                       </div>
                                   )}
                                   <div className="evo-arrow">→</div>
                                 </div>
                                 
                                 <RenderNode node={child} />
                              </div>
                           ))}
                        </div>
                     )}
                   </div>
                 );
                 
                 return <RenderNode node={evolutionChain[0]} />;
               })()}
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default PokemonDetails;

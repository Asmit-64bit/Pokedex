import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PokemonList from '../components/PokemonList';
import Loader from '../components/Loader';
import { usePokemon } from '../hooks/usePokemon';
import { motion } from 'framer-motion';

const Home = () => {
  const { pokemonList, loading, error, getPokemonDetails } = usePokemon();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // 1. Filter the master list
  const filteredList = pokemonList.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Determine which items to show based on pagination/infinite scroll
  const visibleItems = filteredList.slice(0, page * ITEMS_PER_PAGE);

  // 3. Fetch details for visible items
  useEffect(() => {
    let cancelled = false;

    const fetchDetails = async () => {
      // If no items match, clear the display immediately
      if (visibleItems.length === 0) {
        setDisplayedPokemon([]);
        return;
      }
      
      setDetailsLoading(true);
      
      const promises = visibleItems.map(async (item) => {
        const details = await getPokemonDetails(item.name);
        return details;
      });

      const results = await Promise.all(promises);
      
      if (!cancelled) {
        setDisplayedPokemon(results.filter(r => r !== null));
        setDetailsLoading(false);
      }
    };

    // Debounce slightly to prevent thrashing
    const timeoutId = setTimeout(() => {
        fetchDetails();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      cancelled = true;
    };
  }, [page, searchTerm, pokemonList]); // Re-run when page, search, or master list changes

  // Reset page and scroll to top when search changes
  useEffect(() => {
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchTerm]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="container">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {error && <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>}
        
        {loading ? (
             <div style={{textAlign: 'center', padding: '2rem'}}>Loading Library...</div>
        ) : (
          <>
            <PokemonList pokemonList={displayedPokemon} />
            
            {detailsLoading && <Loader />}
            
            {!detailsLoading && visibleItems.length < filteredList.length && (
               <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                  <button 
                    onClick={handleLoadMore}
                    className="glass"
                    style={{
                      padding: '1rem 3rem',
                      color: 'var(--text-light)',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      background: 'var(--primary-color)',
                      border: 'none',
                      fontWeight: 'bold',
                      borderRadius: '50px'
                    }}
                  >
                    Load More
                  </button>
               </div>
            )}
            
            {!detailsLoading && displayedPokemon.length === 0 && searchTerm && (
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    Sorry, no results found
                </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Home;

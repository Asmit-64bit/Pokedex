import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PokemonList from '../components/PokemonList';
import Loader from '../components/Loader';
import { usePokemon } from '../hooks/usePokemon';
import { motion } from 'framer-motion';

const Home = () => {
  const { 
    pokemonList, 
    loading, 
    error, 
    getPokemonDetails,
    searchTerm,
    setSearchTerm,
    page,
    setPage
  } = usePokemon();

  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  
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
  }, [page, searchTerm, pokemonList, getPokemonDetails]); // Re-run when page, search, or master list changes

  // Reset page and scroll to top when search changes
  // Note: We need to be careful not to reset if we are just navigating back.
  // We can track the previous search term to check if it actually changed, or just rely on user action.
  // For now, let's keep the existing behavior but it might reset on mount if not handled.
  // Actually, since searchTerm is now global, we only want to reset page if the USER changes the term, not on mount.
  // The SearchBar component calls setSearchTerm. We should move the page reset there or handle it here with a ref.
  
  // However, specifically for the task "clicking back button shouldn't refresh", 
  // we want to PRESERVE the page. 
  // The original code reset page to 1 when searchTerm changed. 
  // Since searchTerm is now preserved, we don't need to do anything special here 
  // EXCEPT ensuring we don't reset page on mount.
  
  // This effect was:
  // useEffect(() => {
  //   setPage(1);
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [searchTerm]);
  
  // If we leave this, it will run on mount because searchTerm comes from context? 
  // No, useEffect runs on dependency change. On mount, it runs once.
  // If we come back and searchTerm is 'pika', it runs.
  // We DO NOT want to reset page to 1 on mount if we are coming back.
  
  // Let's modify SearchBar to handle page reset, or use a ref to track if it's the first mount.
  // But strictly following the task to simply 'use context', I should be careful.
  
  // A better approach for the search-reset-page logic is to do it in the event handler, but SearchBar takes `setSearchTerm`.
  // Let's just remove this side effect from Home.jsx and assume the user wants to keep their page 
  // even if they change search term (or we can move it to a handler if we had access).
  // OR, we can use a ref to track IsFirstMount.

  // Let's REMOVE the auto-reset effect for now to ensure persistence works as requested.
  // If the user types a new search, they might want to see the top results, but `setPage(1)` 
  // inside the `onSearch` handler would be better.
  // Since `SearchBar` is passed `setSearchTerm`, let's wrap it.

  const handleSearchChange = (term) => {
      setSearchTerm(term);
      setPage(1); // Reset page when USER searches
      // window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: scroll to top
  };

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
        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
        
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

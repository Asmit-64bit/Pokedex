import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterPanel from '../components/FilterPanel';
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
    setPage,
    selectedType,
    selectedGeneration,
    sortBy,
    fetchPokemonByType
  } = usePokemon();

  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [typePokemonList, setTypePokemonList] = useState([]);
  const [typeLoading, setTypeLoading] = useState(false);
  
  const ITEMS_PER_PAGE = 20;

  // Extract ID from PokeAPI Pokemon URL
  const getPokemonIdFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
  };

  // 1. Fetch type-specific list if type filter is active
  useEffect(() => {
    if (!selectedType) {
      setTypePokemonList([]);
      return;
    }

    let cancelled = false;
    const loadTypePokemon = async () => {
      setTypeLoading(true);
      const list = await fetchPokemonByType(selectedType);
      if (!cancelled) {
        setTypePokemonList(list || []);
        setTypeLoading(false);
      }
    };

    loadTypePokemon();
    return () => {
      cancelled = true;
    };
  }, [selectedType, fetchPokemonByType]);

  // Determine base list to use
  const baseList = selectedType ? typePokemonList : pokemonList;

  // Generation ID boundary mappings
  const GENERATION_RANGES = {
    all: { min: 1, max: Infinity },
    gen1: { min: 1, max: 151 },
    gen2: { min: 152, max: 251 },
    gen3: { min: 252, max: 386 },
    gen4: { min: 387, max: 493 },
    gen5: { min: 494, max: 649 },
    gen6: { min: 650, max: 721 },
    gen7: { min: 722, max: 809 },
    gen8: { min: 810, max: 898 },
    gen9: { min: 899, max: 1025 },
    special: { min: 10001, max: Infinity }
  };

  const range = GENERATION_RANGES[selectedGeneration] || GENERATION_RANGES.all;

  // 2. Filter base list by search name and generation range
  let filteredList = baseList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const id = getPokemonIdFromUrl(p.url);
    const matchesGen = id && id >= range.min && id <= range.max;
    return matchesSearch && matchesGen;
  });

  // 3. Sort the filtered list
  filteredList = [...filteredList].sort((a, b) => {
    const idA = getPokemonIdFromUrl(a.url) || 0;
    const idB = getPokemonIdFromUrl(b.url) || 0;

    switch (sortBy) {
      case 'id-desc':
        return idB - idA;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'id-asc':
      default:
        return idA - idB;
    }
  });

  // 4. Determine which items to show based on page slicing
  const visibleItems = filteredList.slice(0, page * ITEMS_PER_PAGE);

  // 5. Fetch details for visible items
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
  }, [page, searchTerm, baseList, getPokemonDetails, selectedGeneration, sortBy]); // Re-run when page, search, baseList, generation, or sort changes

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
        <FilterPanel />
        
        {error && <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>}
        
        {loading || typeLoading ? (
             <div style={{textAlign: 'center', padding: '2rem'}}>Loading Pokemons...</div>
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
            
            {!detailsLoading && displayedPokemon.length === 0 && (searchTerm || selectedType || selectedGeneration !== 'all') && (
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

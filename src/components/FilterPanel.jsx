import React from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { motion, AnimatePresence } from 'framer-motion';

const TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const GENERATIONS = [
  { id: 'all', label: 'All Gen' },
  { id: 'gen1', label: 'Gen 1 (Kanto)' },
  { id: 'gen2', label: 'Gen 2 (Johto)' },
  { id: 'gen3', label: 'Gen 3 (Hoenn)' },
  { id: 'gen4', label: 'Gen 4 (Sinnoh)' },
  { id: 'gen5', label: 'Gen 5 (Unova)' },
  { id: 'gen6', label: 'Gen 6 (Kalos)' },
  { id: 'gen7', label: 'Gen 7 (Alola)' },
  { id: 'gen8', label: 'Gen 8 (Galar)' },
  { id: 'gen9', label: 'Gen 9 (Paldea)' },
  { id: 'special', label: 'Special Forms' }
];

const SORT_OPTIONS = [
  { id: 'id-asc', label: 'ID: Lowest First' },
  { id: 'id-desc', label: 'ID: Highest First' },
  { id: 'name-asc', label: 'Name: A-Z' },
  { id: 'name-desc', label: 'Name: Z-A' }
];

const FilterPanel = () => {
  const {
    selectedType,
    setSelectedType,
    selectedGeneration,
    setSelectedGeneration,
    sortBy,
    setSortBy,
    setPage,
    setSearchTerm,
    isFilterOpen
  } = usePokemon();

  const handleTypeSelect = (type) => {
    setSelectedType(prev => (prev === type ? '' : type));
    setPage(1);
  };

  const handleGenSelect = (genId) => {
    setSelectedGeneration(genId);
    setPage(1);
  };

  const handleSortSelect = (sortId) => {
    setSortBy(sortId);
    setPage(1);
  };

  const handleReset = () => {
    setSelectedType('');
    setSelectedGeneration('all');
    setSortBy('id-asc');
    setSearchTerm('');
    setPage(1);
  };

  return (
    <div className="filters-wrapper" style={{ marginBottom: isFilterOpen ? '2.5rem' : '0', transition: 'margin 0.3s ease' }}>
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '0.5rem' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="glass filter-panel-content">
              <div className="filter-header-row">
                <span className="filter-header-title">Filters & Options</span>
                <button onClick={handleReset} className="btn-reset">
                  Reset All
                </button>
              </div>

              {/* Type Filter */}
              <div className="filter-section">
                <div className="filter-title">Filter by Type</div>
                <div className="filter-options-grid">
                  {TYPES.map((type) => {
                    const isActive = selectedType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => handleTypeSelect(type)}
                        className={`type-pill ${isActive ? 'active' : ''}`}
                        style={{
                          '--type-color': `var(--type-${type})`
                        }}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generation Filter */}
              <div className="filter-section">
                <div className="filter-title">Filter by Generation / Region</div>
                <div className="filter-options-flex">
                  {GENERATIONS.map((gen) => {
                    const isActive = selectedGeneration === gen.id;
                    return (
                      <button
                        key={gen.id}
                        onClick={() => handleGenSelect(gen.id)}
                        className={`filter-pill ${isActive ? 'active' : ''}`}
                      >
                        {gen.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Options */}
              <div className="filter-section">
                <div className="filter-title">Sort order</div>
                <div className="filter-options-flex">
                  {SORT_OPTIONS.map((opt) => {
                    const isActive = sortBy === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSortSelect(opt.id)}
                        className={`filter-pill ${isActive ? 'active' : ''}`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;

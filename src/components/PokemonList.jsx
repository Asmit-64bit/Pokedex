import React from 'react';
import PokemonCard from './PokemonCard';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const PokemonList = ({ pokemonList }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="pokemon-grid"
    >
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </motion.div>
  );
};

export default PokemonList;

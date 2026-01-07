import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const usePokemon = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPokemonList = async () => {
        setLoading(true);
        try {
            // Fetch all pokemon at once (lightweight list)
            const response = await axios.get(`${BASE_URL}/pokemon?limit=1025`);
            setPokemonList(response.data.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getPokemonDetails = async (idOrName) => {
        try {
            const response = await axios.get(`${BASE_URL}/pokemon/${idOrName}`);
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const getPokemonSpecies = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }



    const getEvolutionChain = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    useEffect(() => {
        fetchPokemonList();
    }, []);

    return {
        pokemonList, // Content: [{ name, url }, ...]
        loading,
        error,
        getPokemonDetails,
        getPokemonSpecies,
        getEvolutionChain
    };
};

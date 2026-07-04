import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const PokemonContext = createContext();

const BASE_URL = 'https://pokeapi.co/api/v2';

export const PokemonProvider = ({ children }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Global state for Home page persistence
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    
    // Cache for details to avoid refetching
    const [detailsCache, setDetailsCache] = useState({});

    // Filter states
    const [selectedType, setSelectedType] = useState('');
    const [selectedGeneration, setSelectedGeneration] = useState('all');
    const [sortBy, setSortBy] = useState('id-asc');
    const [typeCache, setTypeCache] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const fetchPokemonByType = useCallback(async (type) => {
        if (!type) return null;
        if (typeCache[type]) return typeCache[type];

        try {
            const response = await axios.get(`${BASE_URL}/type/${type}`);
            const list = response.data.pokemon.map(p => p.pokemon);
            setTypeCache(prev => ({
                ...prev,
                [type]: list
            }));
            return list;
        } catch (err) {
            console.error(err);
            return null;
        }
    }, [typeCache]);

    const fetchPokemonList = useCallback(async () => {
        // If we already have the list, don't refetch
        if (pokemonList.length > 0) return;

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/pokemon?limit=1302`);
            setPokemonList(response.data.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [pokemonList.length]);

    useEffect(() => {
        fetchPokemonList();
    }, [fetchPokemonList]);

    const getPokemonDetails = useCallback(async (idOrName) => {
        // Check cache first
        if (detailsCache[idOrName]) {
            return detailsCache[idOrName];
        }

        try {
            const response = await axios.get(`${BASE_URL}/pokemon/${idOrName}`);
            const data = response.data;
            
            // Update cache
            setDetailsCache(prev => ({
                ...prev,
                [idOrName]: data,
                [data.id]: data // Cache by both name and ID
            }));
            
            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }, [detailsCache]);

    const getPokemonSpecies = useCallback(async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }, []);

    const getEvolutionChain = useCallback(async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }, []);

    const value = {
        pokemonList,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        page,
        setPage,
        selectedType,
        setSelectedType,
        selectedGeneration,
        setSelectedGeneration,
        sortBy,
        setSortBy,
        isFilterOpen,
        setIsFilterOpen,
        fetchPokemonByType,
        getPokemonDetails,
        getPokemonSpecies,
        getEvolutionChain
    };

    return (
        <PokemonContext.Provider value={value}>
            {children}
        </PokemonContext.Provider>
    );
};

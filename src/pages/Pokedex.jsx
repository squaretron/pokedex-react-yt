import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState("");
    const [loadMore, setLoadMore] = useState(
        `https://pokeapi.co/api/v2/pokemon?limit=100`
    );

    const navigate = useNavigate();

    const getAllPokemons = async () => {
        const res = await fetch(loadMore);
        const data = await res.json();

        setLoadMore(data.next);

        const createPokemonObject = results => {
            results.forEach((pokemon, i) => {
                const pokemonData = {
                    id: i + 1,
                    name: pokemon.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        i + 1
                    }.png`,
                };

                setPokemons(currentList => [...currentList, pokemonData]);
            });
        };

        createPokemonObject(data.results);
    };

    const loadPokemons = async () => {
        const res = await fetch(loadMore);
        const data = await res.json();

        setLoadMore(data.next);

        const createPokemonObject = results => {
            results.forEach((pokemon, i) => {
                const id = pokemons.slice(-1)[0].id + i + 1;

                const pokemonData = {
                    id,
                    name: pokemon.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                };

                setPokemons(currentList => [...currentList, pokemonData]);
            });
        };

        createPokemonObject(data.results);
    };

    const searchPokedex = () => {
        setSearch(search.toLowerCase());

        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${search}`)
            .then(res => {
                const { data } = res;
                navigate(`/pokemon/${data.id}`);
            })
            .catch(() => {
                alert("The pokemon you searched for does not exist.");
                setSearch("");
                console.clear();
            });
    };

    useEffect(() => {
        getAllPokemons();
    }, []);

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a pokemon"
                    className="form-control"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <button className="button" onClick={searchPokedex}>
                    Search
                </button>
            </div>

            <div className="pokemon-cards">
                {pokemons.map(pokemon => (
                    <Link to={`pokemon/${pokemon.id}`} key={pokemon.id}>
                        <PokemonCard pokemon={pokemon} />
                    </Link>
                ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "25px" }}>
                <button className="button" onClick={loadPokemons}>
                    Load More
                </button>
            </div>
        </>
    );
};

export default Pokedex;

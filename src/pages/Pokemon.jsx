import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";

const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);

    const params = useParams();
    const id = params.id;

    const getPokemonData = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
            const { data } = res;

            const pokemonData = {
                id: data.id,
                name: data.name,
                weight: data.weight,
                height: data.height,
                types: data.types,
                sprite: data.sprites.front_default,
            };

            setPokemon(pokemonData);
        });
    };

    useEffect(() => {
        getPokemonData();
    }, [id]);

    return (
        <div>
            <PokemonCard pokemon={pokemon} />

            <div style={{ textAlign: "center", marginTop: "25px" }}>
                <Link className="button" to="/">
                    Back To Home
                </Link>
            </div>
        </div>
    );
};

export default Pokemon;

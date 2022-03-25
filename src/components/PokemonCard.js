import React from "react";

const PokemonCard = ({ pokemon }) => {
    return (
        <div className="pokemon-card">
            <img src={pokemon.sprite} alt="pokemon" />
            <h1 className="card-title">
                {pokemon.id}. {pokemon.name}
            </h1>
            {pokemon.weight !== undefined && (
                <>
                    <p className="card-subtitle">
                        Type:{" "}
                        {pokemon.types.map(type => type.type.name).join(", ")}
                    </p>
                    <p>
                        <small>Height:</small> {pokemon.height} |{" "}
                        <small>Weight:</small> {pokemon.weight} |{" "}
                        <small>Type: </small>
                        {pokemon.types.map(type => type.type.name).join(", ")}
                    </p>
                </>
            )}
        </div>
    );
};

export default PokemonCard;

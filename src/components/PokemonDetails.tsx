import React from "react";
import { useMatch } from "react-location";
import { usePokemon } from "./usePokemon";

export const PokemonDetails = () => {
  const {
    params: { id },
  } = useMatch();

  const { pokemons } = usePokemon();

  const pokemonData = pokemons.find((pokemon) => pokemon.id == +id);

  if (!pokemonData) return <h1>No find Pokemon</h1>;

  return (
    <div>
      <h2>{pokemonData?.name}</h2>
      <h3>{JSON.stringify(pokemonData)}</h3>
    </div>
  );
};

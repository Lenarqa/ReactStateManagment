import { usePokemon } from "./usePokemon";

export default function PokemonList() {
  const { pokemons } = usePokemon();

  console.log(pokemons);
  return (
    <ul className="pokemonList">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id} className="pokemon">
          <h2>{pokemon.name}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt="img"
          />
        </li>
      ))}
    </ul>
  );
}

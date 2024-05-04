import { Link } from "react-location";
import { usePokemon } from "./usePokemon";

export default function PokemonList() {
  const { pokemons } = usePokemon();

  return (
    <ul className="pokemonList">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id} className="pokemon">
          <Link to={`/pokemon/${pokemon.id}`}>
            <h2>{pokemon.name}</h2>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt="img"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

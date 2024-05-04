import {
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useContext,
  createContext,
} from "react";
import { IPokemon } from "../interfaces";

export function usePokemonSource(): {
  pokemons: IPokemon[];
  search: string;
  setSearch: (value: string) => void;
} {
  // const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  // const [search, setSearch] = useState<string>("");

  type PokemonState = {
    pokemons: IPokemon[];
    search: string;
  };

  type PokemonAction =
    | {
        type: "SET_POKEMONS";
        payload: IPokemon[];
      }
    | {
        type: "SET_SEARCH";
        payload: string;
      };

  const [{ pokemons, search }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case "SET_POKEMONS":
          return { ...state, pokemons: action.payload };

        case "SET_SEARCH":
          return { ...state, search: action.payload };

        default:
          return state;
      }
    },
    {
      pokemons: [],
      search: "",
    }
  );

  useEffect(() => {
    fetch("./pokemon.json")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_POKEMONS", payload: data }));
  }, []);

  const setSearch = useCallback((value: string): void => {
    dispatch({ type: "SET_SEARCH", payload: value });
  }, []);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((p) => p.name.includes(search));
  }, [pokemons, search]);

  return { pokemons: filteredPokemons, search, setSearch };
}

const PokemonsContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

export function usePokemon() {
  return useContext(PokemonsContext);
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <PokemonsContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonsContext.Provider>
  );
}

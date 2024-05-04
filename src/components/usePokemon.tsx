import {
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useContext,
  createContext,
} from "react";
import { IPokemon } from "../interfaces";
import { useQuery } from "react-query";

export function usePokemonSource(): {
  pokemons: IPokemon[];
  search: string;
  setSearch: (value: string) => void;
} {
  type PokemonState = {
    search: string;
  };

  type PokemonAction = {
    type: "SET_SEARCH";
    payload: string;
  };

  const { data: pokemons } = useQuery<IPokemon[]>(
    ["pokemons"],
    () => fetch("./pokemon.json").then((response) => response.json()),
    {
      initialData: [],
    }
  );

  const [{ search }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case "SET_SEARCH":
          return { ...state, search: action.payload };

        default:
          return state;
      }
    },
    {
      search: "",
    }
  );

  const setSearch = useCallback((value: string): void => {
    dispatch({ type: "SET_SEARCH", payload: value });
  }, []);

  const filteredPokemons = useMemo(() => {
    return pokemons!.filter((p) => p.name.includes(search));
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

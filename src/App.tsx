import "./App.css";
import PokemonList from "./components/PokemonList";
import { PokemonProvider } from "./components/usePokemon";
import { Search } from "./components/Search";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <div className="App">
          <Search />
          <PokemonList />
        </div>
      </PokemonProvider>
    </QueryClientProvider>
  );
}

export default App;

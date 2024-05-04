import "./App.css";
import PokemonList from "./components/PokemonList";
import { PokemonProvider } from "./components/usePokemon";
import { Search } from "./components/Search";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, ReactLocation, Router } from "react-location";
import { PokemonDetails } from "./components/PokemonDetails";

const queryClient = new QueryClient();
const location = new ReactLocation();

const routes = [
  {
    path: "/",
    element: (
      <>
        <Search />
        <PokemonList />
      </>
    ),
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetails />,
  },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <Router location={location} routes={routes}>
          <Outlet />
        </Router>
      </PokemonProvider>
    </QueryClientProvider>
  );
}

export default App;

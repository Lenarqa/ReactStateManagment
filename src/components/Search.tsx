import { usePokemon } from "./usePokemon";

export const Search = () => {
  const { search, setSearch } = usePokemon();
  return (
    <div>
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => (
  <input
    type="text"
    placeholder="Search by name or city..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full border p-2 rounded shadow"
  />
);

export default SearchBar;

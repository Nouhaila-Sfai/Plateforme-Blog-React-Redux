import "../searchBar.css";
import { FaSearch } from "react-icons/fa";
function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div class="search-container">
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button class="search-btn">
            <FaSearch/>
      </button>
    </div>
  );
}

export default SearchBar;

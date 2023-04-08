const SearchBar = ({ handleSubmit }) => {
  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;

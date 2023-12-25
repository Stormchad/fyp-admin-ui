// SearchBar.js
import React from 'react';
import { Button } from 'reactstrap';
import '../Styles/SearchBar.css'

function SearchBar({ searchTerm, setSearchTerm, handleSearch, clearSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch} className="search-btn" >Search</Button>
      <Button onClick={clearSearch} className="clear-search-btn" >Clear</Button>
    </div>
  );
}

export default SearchBar;

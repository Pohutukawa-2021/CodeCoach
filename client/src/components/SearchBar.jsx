import React from 'react'

function SearchBar() {
  return (
    <div>
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search</span>
        </label>
        <input
            type="text"
            id="text-search"
            placeholder="Search"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
    </div>
  )
}

export default SearchBar;

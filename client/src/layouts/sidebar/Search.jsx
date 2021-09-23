import React from 'react'
import SearchBar from '../../components/SearchBar'

function Search() {
    return (
        <div>
            <SearchBar />
            <span>Results</span>
            {/* <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.name}</li>
                ))}
            </ul> */}
        </div>
  )
}

export default Search

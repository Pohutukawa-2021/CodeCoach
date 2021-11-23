import React from "react";

function SortPostsButtons() {
  return (
    <div>
      <h2>Sort Posts By:</h2>
      <select>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}

export default SortPostsButtons;

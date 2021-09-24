import React from "react";

function Filter() {
     return (
       <div className="filter">
         <h1>Filters</h1>
         <label><input type="checkbox" />Answered</label>
         <label><input type="checkbox" />Unanswered</label>
         <label><input type="checkbox" />My questions</label>
    </div>
  );
}


export default Filter;
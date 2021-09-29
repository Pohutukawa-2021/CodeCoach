import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBarUser } from "../components/SearchBarUsers"

function UserFilter() {
  const [link, setLink] = useState({
    junior: { link: "/app/users/junior", style: "unclicked" },
    senior: { link: "/app/users/senior", style: "unclicked" },
  });

  function handleClickA(e) {
    if (link.junior.link === "/app/users/junior") {
      setLink({ ...link, junior: { link: "/app/users/", style: "clicked" } });
    } else {
      setLink({
        ...link,
        junior: { link: "/app/users/junior", style: "unclicked" },
      });
    }
  }

  function handleClickB(e) {
    if (link.senior.link === "/app/users/senior") {
      setLink({
        ...link,
        senior: { link: "/app/users/", style: "clicked" },
      });
    } else {
      setLink({
        ...link,
        senior: { link: "/app/users/senior", style: "unclicked" },
      });
    }
  }

  return (
    <div className="layout-left-col">
      <p className="search-filter-tags-label">Filters</p>
      <div className="filter-label">
        <Link
          to={link.junior.link}
          className={link.junior.style}
          id="junior"
          onClick={handleClickA}
        >
          <input className="filter-checkbox" type="checkbox" />
          Junior
        </Link>
      </div>
      <div className="filter-label">
        <Link
          to={link.senior.link}
          className={link.senior.style}
          id="senior"
          onClick={handleClickB}
        >
          <input className="filter-checkbox" type="checkbox" />
          Senior
        </Link>
      </div>
    </div>
  );
}

export default UserFilter;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Filter() {
  const [link, setLink] = useState({
    answered: { link: "/app/posts/answered", style: "unclicked" },
    unanswered: { link: "/app/posts/unanswered", style: "unclicked" },
    myquestions: { link: "/app/posts/myquestions", style: "unclicked" },
  });

  function handleClickA(e) {
    if (link.answered.link === "/app/posts/answered") {
      setLink({ ...link, answered: { link: "/app", style: "clicked" } });
    } else {
      setLink({
        ...link,
        answered: { link: "/app/posts/answered", style: "unclicked" },
      });
    }
  }

  function handleClickB(e) {
    if (link.unanswered.link === "/app/posts/unanswered") {
      setLink({
        ...link,
        unanswered: { link: "/app", style: "clicked" },
      });
    } else {
      setLink({
        ...link,
        unanswered: { link: "/app/posts/unanswered", style: "unclicked" },
      });
    }
  }

  function handleClickC(e) {
    if (link.myquestions.link === "/app/posts/myquestions") {
      setLink({
        ...link,
        myquestions: { link: "/app", style: "clicked" },
      });
    } else {
      setLink({
        ...link,
        myquestions: { link: "/app/posts/myquestions", style: "unclicked" },
      });
    }
  }

  return (
    <div>
      <p>Filters</p>
      <div>
        <Link
          to={link.answered.link}
          className={link.answered.style}
          id="answered"
          onClick={handleClickA}
        >
          Answered
        </Link>
      </div>
      <div>
        <Link
          to={link.unanswered.link}
          className={link.unanswered.style}
          id="unanswered"
          onClick={handleClickB}
        >
          Unanswered
        </Link>
      </div>
      <div>
        <Link
          to={link.myquestions.link}
          className={link.myquestions.style}
          id="myquestions"
          onClick={handleClickC}
        >
          My Questions
        </Link>
      </div>
    </div>
  );
}

export default Filter;

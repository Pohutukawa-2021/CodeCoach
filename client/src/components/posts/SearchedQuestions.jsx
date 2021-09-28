import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function SearchQuestions() {
  const allPosts = useSelector((state) => state.search);
  console.log(allPosts);
  return (
    <>
      <div>
        {allPosts.map((post) => {
          return (
            <div className="each-question">
              <Link to={`/app/post/${post.postId}`}>
                <div className="user-question">
                  <h2 className="user-icon-name">{post.user.name} </h2>
                  <img src={post.user.image} alt={post.user.name}></img>
                </div>
                <div className="question-title">
                  <h2 className="question-name">{post.question}</h2>
                </div>
              </Link>
              <div className="question-body">
                <p className="question-details">{post.body}</p>
              </div>
              <small>
                {post.post_time} ({post.post_date})
              </small>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SearchQuestions;

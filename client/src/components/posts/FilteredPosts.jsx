import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

function FilteredPosts() {
  const allPosts = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.userAccount)
  const { filter } = useParams()
  let filteredPosts = [];
  
  if (filter === "answered") {
    const answeredPosts = allPosts.filter(post => post.post_answered === 1)
    filteredPosts = answeredPosts
  } else if (filter === "myquestions") {
     const myquestions = allPosts.filter(post => post.user.id === currentUser.id)
     filteredPosts = myquestions
  } else {
    const unansweredPosts = allPosts.filter(post => post.post_answered === 0)
    filteredPosts = unansweredPosts
  }

  return (
    <>
      <div>
        {filteredPosts.map((post) => {
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

export default FilteredPosts;

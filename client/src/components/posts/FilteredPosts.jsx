import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

function FilteredPosts() {
  const allPosts = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.userAccount);
  const { filter } = useParams();
  let filteredPosts = [];

  if (filter === "answered") {
    const answeredPosts = allPosts.filter((post) => post.post_answered === 1);
    filteredPosts = answeredPosts;
  } else if (filter === "myquestions") {
    const myquestions = allPosts.filter(
      (post) => post.user.id === currentUser.id
    );
    filteredPosts = myquestions;
  } else {
    const unansweredPosts = allPosts.filter((post) => post.post_answered === 0);
    filteredPosts = unansweredPosts;
  }

  return (
    <>
      <div className="center-col-container">
      <div className="question-list-container">
        {filteredPosts.map((post) => {
          return (
            <Link to={`/app/post/${post.postId}`} className="question-container">
                    <div className="question-stats">
                      <p className="question-votes">{post.post_votes}<br />votes</p>
                      <p className="question-answers">{post.post_answered}<br />answers</p>
                    </div>
                    <div className="question-content">
                      <h2 className="question-name">{post.question}</h2>
                      <p className="question-details">{post.body}</p>
                    
                    <div className="question-tags">
                      {post.post_tags.map((tag) => {
                        return (
                          <p className="post-tags">{tag}</p>
                        );
                      })}
                    </div>
                    <div className="user-question">                      
                      <img src={post.user.image} alt={post.user.name}></img>
                      <h3 className="user-icon-name">{post.user.name} </h3>
                      </div>
                    </div>
              </Link>
          );
        })}
        </div>
        </div>
    </>
  );
}

export default FilteredPosts;

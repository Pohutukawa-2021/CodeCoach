import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function SearchQuestions() {
  const allPosts = useSelector((state) => state.search);
  return (
    <>
      <div className="center-col-container">
        {allPosts.map((post) => {
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
    </>
  );
}

export default SearchQuestions;

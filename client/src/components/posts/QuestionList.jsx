import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tags from "../../redux/actions/tags";
function QuestionList() {
  const allPosts = useSelector((state) => state.posts);
  const allTags = useSelector((state) => state.tags);
  const tagsFilter = useSelector((state) => state.tagsFilter);
  const dispatch = useDispatch();
  function handleTags() {
    let tagsToDispatch = [];
    allPosts.map((post) => {
      post.post_tags.map((tag) => {
        if (tag.length !== 0) {
          if (!tagsToDispatch.includes(tag)) {
            tagsToDispatch.push(tag);
          }
        }
        return tag;
      });
      return post;
    });
    dispatch(tags(tagsToDispatch));
  }

  useEffect(() => {
    handleTags();
  }, [allPosts]);

  function tagPosts(tags) {
    let arr = [];
    tags.map((tag) => {
      allPosts.map((post) => {
        if (post.post_tags.includes(tag)) {
          arr.push(post);
        }
        return "";
      });
      return "";
    });
    return arr;
  }
  const tagPostArr = tagPosts(tagsFilter);
  return (
    <div className="center-col-container">
      {tagsFilter.length === 0 ? (
        <>
          <div className="question-list-container">
            {allPosts.map((post) => {
              return (
                <Link
                  to={`/app/post/${post.postId}`}
                  className="question-container"
                >
                  <div className="question-stats">
                    <p className="question-votes">
                      {post.post_votes}
                      <br />
                      votes
                    </p>
                    <p className="question-answers">
                      {post.comments.length}
                      <br />
                      answers
                    </p>
                  </div>
                  <div className="question-content">
                    <h2 className="question-name">{post.question}</h2>
                    <p className="question-details">{post.body}</p>
                    <div className="question-tags">
                      {post.post_tags.map((tag) => {
                        return <p className="post-tags">{tag}</p>;
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
      ) : (
        <div className="question-list-container">
          {tagPostArr.map((post) => {
            return (
              <Link
                to={`/app/post/${post.postId}`}
                className="question-container"
              >
                <div className="question-stats">
                  <p className="question-votes">
                    {post.post_votes}
                    <br />
                    votes
                  </p>
                  <p className="question-answers">
                    {post.post_answered}
                    <br />
                    answers
                  </p>
                </div>
                <div className="question-content">
                  <h2 className="question-name">{post.question}</h2>
                  <p className="question-details">{post.body}</p>

                  <div className="question-tags">
                    {post.post_tags.map((tag) => {
                      return <p className="post-tags">{tag}</p>;
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
      )}
    </div>
  );
}

export default QuestionList;

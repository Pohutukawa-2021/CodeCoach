import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tags from "../../redux/actions/tags";
function QuestionList() {
  const allPosts = useSelector((state) => state.posts);
  const allTags = useSelector((state) => state.tags);
  const tagsFilter = useSelector((state) => state.tagsFilter);

  const dispatch = useDispatch();
  // console.log(allTags);
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
  if (allTags.length === 0) {
    handleTags();
    //console.log("tags:", tagsFilter.length);
  }
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
    <div>
      {tagsFilter.length === 0 ? (
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
      ) : (
        <div>
          {tagPostArr.map((post) => {
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
      )}
    </div>
  );
}

export default QuestionList;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import commentsByPost from "../../redux/actions/commentsByPost";

export function PostComponent() {
  const allPosts = useSelector((state) => state.posts);
  const { postId } = useParams();
  const id = Number(postId);
  const post = allPosts.find((post) => post.postId === id);
  const dispatch = useDispatch();

  const [commentNumber, setCommentNumber] = useState(5)

  const [form, setForm] = useState({
    postId: id,
    comment: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(commentsByPost(form));
    setForm({
      postId: id,
      comment: "",
    });
  }

  // let comment array = 0, post.comments is the array of comments
  // which needs to be an array we identify

  // loop through all comments in post.comments
  // if commentNumber is more than 5, set to display 5 comments only
  // else display all.

  let commentShown = []
  if (post.comments.length > commentNumber){
    for (let i = 0; i<commentNumber; i++){
      commentShown.push(post.comments[i])
    }
  } else {
    commentShown = post.comments
  }

  return (
    <div className="whole-post">
      <div className="question-title-body">
        <h1>Question: {post.question}</h1>
        <h2> {post.body}</h2>
      </div>

      <div className="footer-note">
        <small>
          {" "}
          Post created:  {post.post_time}   ({post.post_date}) {console.log(post)}
        </small>
      </div>

      <div className="comments">
      <h2> {post.comments.length} Answers</h2>
  }
      {post.comments.map((comment) => {
        return (
          <div className="each-comment">
            <p>{post.question}</p>
            <img src={comment.image_url} alt={comment.username}></img>
            <p>{comment.username}</p>
            <p>{comment.comment}</p>
            <small>
              {" "}
              {comment.comment_date} - {comment.comment_time}
            </small>
          </div>
        );
      })}

    </div>

      <form className="column-6">
        <div className="field">
          <label htmlFor="firstName" className="form-label">
            Your answer:
          </label>
          <input
            name="comment"
            value={form.comment}
            placeholder="comment"
            onChange={handleChange}
          ></input>
        </div>

        <button
          type="submit"
          className="button-primary"
          onClick={handleClick}
          data-testid="submitButton"
        >
          Post
        </button>
      </form>
    </div>
  );
}

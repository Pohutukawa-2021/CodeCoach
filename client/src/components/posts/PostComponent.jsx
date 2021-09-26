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
    //console.log(form);
    dispatch(commentsByPost(form));
    setForm({
      postId: id,
      comment: "",
    });
  }
  console.log(post);
  return (
    <div className="whole-post">
      <div className="question-title-body">
        <h1>{post.question} </h1>
        <h3> {post.body}</h3>
      </div>

      <div className="comments">
        <h2> {post.comments.length} Answers</h2>
        {post.comments.map((comment) => {
          return (
            <div className="each-comment">
              <p>hdsfhksdbfgsd</p>
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
        <div className="footer-note">
          <small>
            {" "}
            {post.post_date} - {post.post_time}
          </small>
        </div>
      </div>

      <form className="column-6">
        <div className="field">
          <label htmlFor="firstName" className="form-label">
            Title
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

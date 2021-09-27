import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/actions/posts";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function QuestionForm() {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(addPost(form));
    setForm({
      title: "",
      body: "",
    });
  }
  //console.log("allposts: ", allPosts);
  return (
    <>
      <ul>
        {allPosts.map((post) => {
          return (
            <li key={uuidv4()}>
              <Link to={`/app/post/${post.postId}`}>
                {post.question} === {post.user.name}
                <ul>
                  {post.comments.map((commentObj) => (
                    <li key={uuidv4()}>
                      {" "}
                      {commentObj.comment} --- {commentObj.username}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="flex-container">
        <form className="column-6">
          <div className="field">
            <label htmlFor="firstName" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              placeholder="summary"
              onChange={handleChange}
            ></input>
          </div>
          <div className="field">
            <label htmlFor="lastName" className="form-label">
              Body
            </label>
            <input
              name="body"
              value={form.body}
              placeholder="details"
              onChange={handleChange}
            ></input>
          </div>
          <button
            type="submit"
            className="button-primary"
            onClick={handleClick}
            data-testid="submitButton"
          >
            Ask!
          </button>
        </form>
      </section>
    </>
  );
}

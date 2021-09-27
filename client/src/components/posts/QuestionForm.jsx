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
    tags: ""
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
      <ul className="thing">
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
      <div className="layout-left-col"></div>
      <div className="layout-center-col">
        <section className="center-col-container">
          <h2 className="center-col-title form-title">Ask a question</h2>
          <form className="form-container">          
            <div className="form-field">
              <label htmlFor="firstName" className="form-label">
                Title
              </label>
              <input
                className="input-field-standard"
                type="text"
                name="title"
                value={form.title}
                placeholder="Title"
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-field">
              <label htmlFor="lastName" className="form-label">
                Body
              </label>
              <textarea
                className="input-field-standard input-field-textarea"
                type="text"
                name="body"
                value={form.body}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-field">
              <label htmlFor="lastName" className="form-label">
                Tags
              </label>
              <select className="input-field-standard" name="tags" type="text" value={form.tags} onChange={handleChange}>
                <option value=""></option>
                <option value="Java">Java</option>
                <option value="Javascript">Javascript</option>
              </select>
            </div>
            <div className="post-buttons-container">
              <Link to="/app">
                <button
                  type="submit"
                  className="small-button discard-button"
                  onClick={handleClick}
                  data-testid="submitButton"
                >
                  Discard
                </button>
              </Link>
              <button
                type="submit"
                className="small-button post-button"
                onClick={handleClick}
                data-testid="submitButton"
              >
                Post
              </button>
            </div>
            </form>
          </section>
        </div>
        <div className="layout-right-col"></div>
    </>
  );
}

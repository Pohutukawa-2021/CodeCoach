import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addPost } from "../../redux/actions/posts";
import { Link } from "react-router-dom";

export function QuestionForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    title: "",
    body: "",
    tags: "",
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
    history.push("/app");
  }
  return (
    <>
      {/* <ul>
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
      </ul> */}
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
              <label for="myBrowser" className="form-label">
                Tags
              </label>
              <input
                list="tags"
                name="tags"
                placeholder='Tags...seperate by " , "'
                onChange={handleChange}
                className="input-field-standard"
              />
              <datalist id="tags" className="input-field-standard">
                <option value="Java," />
                <option value="Javascript," />
                <option value="Python," />
                <option value="C#," />
                <option value="ArnoldC," />
              </datalist>
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

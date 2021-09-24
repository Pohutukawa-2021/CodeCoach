import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/actions/posts";
import { Link } from "react-router-dom";

export function QuestionForm() {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
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
    console.log("inHandleClick");
    e.preventDefault();
    //console.log(form);
    dispatch(addPost(form));
    setForm({
      title: "",
      body: "",
    });
  }
  return (
    <>
      <ul>
        {allPosts.map((post) => (
          <li>
            <Link to={`/app/post/${post.id}`}>
              {post.text} === {post.username}
            </Link>
          </li>
        ))}
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
            type="button"
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

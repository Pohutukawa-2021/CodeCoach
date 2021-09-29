import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/actions/updatePost";
import { useHistory, useParams } from "react-router";

export function QuestionEdit() {
  const allPosts = useSelector((state) => state.posts);
  const { postId } = useParams();
  const id = Number(postId);
  let post = {
    body: "loading",
    id: "",
    comments: [],
    postId: id,
    post_date: "69/69/69",
    post_tags: "",
    post_time: "",
    question: "loading...",
    user: {
      name: "loading...",
      role: "loading...",
      image: "",
    },
  };
  if (allPosts.length !== 0) {
    post = allPosts.find((post) => post.postId === id);
  }

  const [form, setForm] = useState({
    id: post.postId,
    title: post.question,
    text: post.body,
    tags: post.post_tags, // its changing the post but the form is stuck with that first render, the date rendering is right so idk wtf imma sleep now fuck
  });
  const history = useHistory();
  const dispatch = useDispatch();
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(updatePost(form));
    history.push("/app");
  }

  return (
    <>
      <h1> {post.post_date}</h1>
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
              name="text"
              value={form.text}
              placeholder="details"
              onChange={handleChange}
            ></input>
          </div>
          <label htmlFor="myBrowser">Tags:</label>
          <input
            list="tags"
            name="tags"
            placeholder='Tags...seperate by " , "'
            value={form.tags}
            onChange={handleChange}
          />
          <datalist id="tags">
            <option value="Java," />
            <option value="Javascript," />
            <option value="Python," />
            <option value="C#," />
            <option value="ArnoldC," />
          </datalist>
          <button
            type="submit"
            className="button-primary"
            onClick={handleClick}
            data-testid="submitButton"
          >
            Edit
          </button>
        </form>
      </section>
    </>
  );
}

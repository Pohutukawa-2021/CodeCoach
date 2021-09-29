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
      <div className="layout-left-col"></div>
      <div className="layout-center-col">
      
      <section className="center-col-container">
          <h2 className="center-col-title form-title">Edit question</h2>
          <p>{post.post_date}</p>
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
              <button
                type="submit"
                className="small-button post-button"
                onClick={handleClick}
                data-testid="submitButton"
              >
                Save
              </button>
            </div>
            </form>
          </section>
      </div>
      <div className="layout-right-col"></div>
    </>
  );
}

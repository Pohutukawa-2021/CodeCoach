import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addPost } from "../../redux/actions/posts";

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
  //console.log("allposts: ", allPosts);
  return (
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
        <label for="myBrowser">Tags:</label>
        <input
          list="tags"
          name="tags"
          placeholder='Tags...seperate by " , "'
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
          Ask!
        </button>
      </form>
    </section>
  );
}

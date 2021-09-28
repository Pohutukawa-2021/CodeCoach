import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addPost } from "../../redux/actions/posts";

export function QuestionForm() {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.tags);
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

  function addNewTags(listOfTags) {
    let newTags = listOfTags.filter((tag) => {
      if (!allTags.includes(tag)) {
        return tag;
      }
    });
    dispatch({ type: "addNewTags", data: newTags });
  }

  function handleClick(e) {
    e.preventDefault();
    addNewTags(form.tags.split(","));
    dispatch(addPost(form));
    history.push("/app");
  }

  return (
    <section className="flex-container">
      <form className="column-6">
        <div className="field">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={form.title}
            placeholder="summary"
            onChange={handleChange}
          ></input>
        </div>
        <div className="field">
          <label className="form-label">Body</label>
          <input
            name="body"
            value={form.body}
            placeholder="details"
            onChange={handleChange}
          ></input>
        </div>
        <label>Tags:</label>
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

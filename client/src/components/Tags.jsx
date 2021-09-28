import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import tagsFilter from "../redux/actions/tagsFilter";
function Tags() {
  const allTags = useSelector((state) => state.tags);
  const [selectedTags, setTags] = useState([]);
  const tt = useSelector((state) => state.tagsFilter);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { value } = e.target;
    if (selectedTags.includes(value) === false) {
      let arr = selectedTags;
      arr.push(value);
      setTags([...arr]);
      dispatch(tagsFilter([...arr]));
    }
  }
  function handleClick(e) {
    const { value } = e.target;
    let arr = selectedTags;
    const index = arr.indexOf(value);
    if (index !== -1) {
      arr.splice(arr.indexOf(value), 1);
    }
    setTags([...arr]);
    // console.log(selectedTags);
    dispatch(tagsFilter([...arr]));
  }
  console.log("tt:", tt);
  return (
    <>
      {selectedTags.map((tag) => {
        return (
          <p>
            {" "}
            {tag}{" "}
            <button className="close-btn" value={tag} onClick={handleClick}>
              &#10005;
            </button>{" "}
          </p>
        );
      })}
      <div className="tags">
        <label htmlFor="experience" className="form-label">
          Tags
        </label>
        <select onChange={handleChange} className="select" name="experience">
          <option hidden>Select Tags</option>
          {allTags.map((tag) => {
            return <option value={tag}>{tag}</option>;
          })}
        </select>
      </div>
    </>
  );
}
export default Tags;

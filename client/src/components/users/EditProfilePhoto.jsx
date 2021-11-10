import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePhotoImage } from "../../redux/actions/user";

function EditProfilePhoto() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAccount);
  const [url, setUrl] = useState(user.image_url);

  function save(e) {
    e.preventDefault();
    dispatch({ type: "setWaiting" });
    dispatch(changePhotoImage(url));
  }

  return (
    <div className="edit-profile-photo-form">
      <div className="form-container">
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            image url:
          </label>
          <input
            className="input-field-standard"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
        </div>
      </div>
      <button className="small-button small-button-styling" onClick={save}>
        Save
      </button>
    </div>
  );
}

export default EditProfilePhoto;

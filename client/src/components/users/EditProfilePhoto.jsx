import React, { useState } from "react";
import { useSelector } from "react-redux";

function EditProfilePhoto() {
  const user = useSelector((state) => state.userAccount);
  const [url, setUrl] = useState(user.image_url);
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
      <button className="small-button small-button-styling">Save</button>
    </div>
  );
}

export default EditProfilePhoto;

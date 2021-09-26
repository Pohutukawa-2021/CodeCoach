import React, {useState } from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import {sendUserDetails} from "../../redux/actions/user"

function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.userAccount)
  const [form, setForm] = useState({
    name: user.username,
    role: "",
    experience: "",
    bio: user.bio,
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
    dispatch(sendUserDetails(form));
    history.push('/app/myprofile')
  }
  return (
    <div>
      <section className="flex-container">
        <form className="column-6">
          <div className="field">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              placeholder={user.username}
              onChange={handleChange}
            ></input>
          </div>
          <div>
          <label htmlFor='role' className='form-label'>Role</label>
          <select
            onChange={handleChange}
            className='select'
            name='role'>
            <option hidden>Select from this list</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
          </div>
          <div>
          <label htmlFor='experience' className='form-label'>Experience</label>
          <select
            onChange={handleChange}
            className='select'
            name='experience'>
            <option hidden>Select from this list</option>
            <option value="0-1 year experience">0-1 year experience</option>
            <option value="1-2 years experience">1-2 years experience</option>
            <option value="2-3 years experience">2-3 years experience</option>
            <option value="3-4 years experience">3-4 years experience</option>
            <option value="5+ year experience">5+ year experience</option>
          </select>
          </div>
          <div className="field">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <input
              name="bio"
              type="text"
              value={form.bio}
              placeholder="Type your bio here"
              onChange={handleChange}
            ></input>
          </div>
          <button
            type="submit"
            className="button-primary"
            onClick={handleClick}
            data-testid="submitButton">
            Save
          </button>
        </form>
      </section>
    </div>
  )
}

export default EditProfile

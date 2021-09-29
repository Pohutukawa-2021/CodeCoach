import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useState } from "react";
import { searchUserAction } from "../redux/actions/searchUser";
import { SearchOutline } from 'react-ionicons'

function SearchBarUser() {
  const allUsers = useSelector((state) => state.users);
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setSearchUser(value);
  }
  function findUsers() {
    let userArr = [];
    searchUser.split(" ").map((name) => {
      return allUsers.map((user) => {
        if (user.username.includes(name)) {
          userArr.push(user);
        }
        return user;
      });
    });
    return userArr;
  }
  function handleClick(e) {
    e.preventDefault();
    const userList = findUsers();
    dispatch(searchUserAction(userList));
    setSearchUser("");
    // console.log("drgdgdgdfg", userList);
    history.push("/app/searchusers");
  }
  //console.log(findUsers());
  return (
    <div>
      <h1 className="left-col-title">Users</h1>
      <form action="/" method="get" className="search-form-container">
        <div className="search-container">
        <input
          className="input-field-standard search-field"
          type="text"
          id="text-search"
          placeholder="Search users"
          name="s"
          value={searchUser}
          onChange={handleChange}
          />
          <button type="submit" onClick={handleClick} className="search-button">
          <SearchOutline
            color={'#031B44'} 
            height="30px"
            width="30px"
          />
          </button>
        </div>        
      </form>
    </div>
  );
}

export default SearchBarUser;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useState } from "react";
import { searchUserAction } from "../redux/actions/searchUser";
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
    history.push("/app/blah");
  }
  console.log(findUsers());
  return (
    <div>
      <form action="/" method="get">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search</span>
        </label>
        <input
          type="text"
          id="text-search"
          placeholder="Search"
          name="s"
          value={searchUser}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleClick}>
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBarUser;

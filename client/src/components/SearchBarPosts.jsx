import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Search from "../redux/actions/search";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { SearchOutline } from 'react-ionicons'

function SearchBar() {
  const allPosts = useSelector((state) => state.posts);
  const history = useHistory();
  const [searchPost, setSearchPost] = useState("");
  const dispatch = useDispatch();
  function checkSubstringSimilarites(search, postQuestion) {
    let count = 0;
    let searchArr = search.split(" ");
    const question = postQuestion.toLowerCase();
    //let questionArr = postQuestion.split(" ")
    for (let i = 0; i < searchArr.length; i++) {
      let word = searchArr[i].toLowerCase();
      if (question.includes(word)) {
        count++;
      }
    }
    return count; // count of matching words
  }
  function getArrayOfPostsBySearch(countArray, search) {
    let postsMatchingSearch = {}; // array of posts that have half or more words similar
    for (let i = 0; i < countArray.length; i++) {
      if (Math.floor(search.split(" ").length / 2) === 0) {
        if (countArray[i] >= 1) {
          if (postsMatchingSearch[countArray[i]] === undefined) {
            postsMatchingSearch[countArray[i]] = [allPosts[i]];
          } else {
            postsMatchingSearch[countArray[i]].push(allPosts[i]);
          }
        }
      } else if (countArray[i] >= Math.floor(search.split(" ").length / 2)) {
        if (postsMatchingSearch[countArray[i]] === undefined) {
          postsMatchingSearch[countArray[i]] = [allPosts[i]];
        } else {
          postsMatchingSearch[countArray[i]].push(allPosts[i]);
        }
      }
    }
    return postsMatchingSearch;
  }
  function handleChange(e) {
    const { value } = e.target;
    setSearchPost(value);
  }
  function handleClick(e) {
    e.preventDefault();
    let search = searchPost.trim();
    let substringMatchedPerPost = [];
    allPosts.map((post) => {
      const postQuestion = post.question;
      substringMatchedPerPost.push(
        checkSubstringSimilarites(search, postQuestion)
      );
      return post;
    });
    const postsMatchingSearch = getArrayOfPostsBySearch(
      substringMatchedPerPost,
      search
    );
    let sortedKeys = Object.keys(postsMatchingSearch).reverse();
    let sortedPosts = [];
    sortedKeys.forEach(([key]) => {
      postsMatchingSearch[key].map((post) => {
        sortedPosts.push(post);
        return post;
      });
    });
    dispatch(Search(sortedPosts));
    setSearchPost("");
    history.push("/app/search");
  }
  return (
    <div>
      <form action="/" method="get" className="search-form-container">
        <div className="search-container">
          <input
          className="input-field-standard search-field"
          type="text"
          id="text-search"
          placeholder="Search posts"
          name="s"
          value={searchPost}
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

export default SearchBar;

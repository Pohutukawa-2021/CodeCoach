import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export function PostComponent() {
  const allPosts = useSelector((state) => state.posts);
  const { postId } = useParams();
  const id = Number(postId);
  const post = allPosts.find((post) => post.id === id);
  console.log(post);
  return (
    <>
      <h1> Post </h1>
      <ul>{post.time}</ul>
    </>
  );
}

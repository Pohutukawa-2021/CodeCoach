export function addPost(post) {
  return {
    type: "server/addPost",
    data: post,
  };
}

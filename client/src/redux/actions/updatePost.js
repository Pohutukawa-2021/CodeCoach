export function updatePost(post) {
  return {
    type: "server/updatePost",
    data: post,
  };
}

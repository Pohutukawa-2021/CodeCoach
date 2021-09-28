export function changeAnswered (bool) {
  return {
    type: "server/updatePost",
    data: bool,
  };
}

export function sendUserDetails(user) {
  return {
    type: "server/sendUserDetails",
    data: user,
  };
}

export function changePhotoImage(urlImage) {
  return {
    type: "server/updateProfilePhoto",
    data: urlImage,
  };
}

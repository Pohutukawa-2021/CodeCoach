module.exports = {
  changePhoto,
};

const { updateUserProfilePhoto, getAllUsers } = require("../../db/users");

function changePhoto(io, socket, action, users) {
  updateUserProfilePhoto(action.data, users[socket.id].auth_id).then(() => {
    users[socket.id].image_url = action.data;
    io.emit("action", { type: "setOnlineUsers", data: users });
    socket.emit("action", { type: "setUser", data: { ...users[socket.id] } });
    getAllUsers().then((allUsers) => {
      io.emit("action", { type: "setAllUsers", data: allUsers });
    });
    socket.emit("action", { type: "finishWaiting" });
  });
}

module.exports = ridOfDuplicateUsersOnline;

function ridOfDuplicateUsersOnline(users, authId) {
  const userValues = Object.values(users);
  const socketIds = Object.keys(users);
  // (users);
  // (authId);
  for (let i = 0; i < userValues.length; i++) {
    if (userValues[i].auth_id == authId) {
      delete users[socketIds[i]];
    }
  }
  return;
}

export function sendUserDetails(user) {
  return {
    type: 'server/sendUserDetails',
    data: user
  }
}
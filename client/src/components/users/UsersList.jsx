import React from 'react'
// import UserProfile from './UserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions/users'

function UsersList() {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  dispatch(getAllUsers())
  console.log(users);
  return (
    <h1>Hey</h1>
    // <>
    // <ul>
    //   {users.map((user) => 
    //     <UserProfile key={user.id} />
    //   )}
    // </ul>
    // </>
  )



  // const users = useSelector((state) => state.userAccounts)
  // console.log(state)
  // const isJunior = useSelector(globalState => globalState.userAccount.role.junior)
  // return (
  //   <>
  // <h1>Choose a mentor</h1>
  //   <div>
  //   {users.map((user) =>
  //         <UserProfile key={user.id} userid={userid} user={user} userRole={isJunior} />
  //       )}
  //   </div>
  //   <div>
  //       {
  //         isJunior
  //           ? <NavLink to='/messages/new' className='button'>Message</NavLink>
  //           : null
  //       }
  //     </div>
  // </>
  // )
}

export default UsersList

import { createSelector } from 'reselect'
 

export const usersSelector = () => createSelector(
  state=>state.users,
  users=>users.usersData
)
 
export const getUserbyIdSelector = (userId) => createSelector(
  state=>state.users.usersData,
  users=>users.filter(user=>user.id == Number(userId))
)
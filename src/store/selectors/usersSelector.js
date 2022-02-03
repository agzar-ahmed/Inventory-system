import { createSelector } from 'reselect'
 

export const usersSelector = () => createSelector(
  state=>state.users,
  inventory=>inventory.usersData
)
 
export const getUserbyIdSelector = (userId) => createSelector(
  state=>state.users.usersData,
  users=>users.filter(user=>user.id == Number(userId))
)
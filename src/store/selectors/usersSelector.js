import { createSelector } from 'reselect'
 

export const usersSelector = () => createSelector(
  state=>state.users.usersData,
  users=>users
)
 
export const getUserbyIdSelector = (userId) => createSelector(
  state=>state.users.usersData,
  users=>users.byIds[String(userId)].firstName //+ users.ByIds[Number(userId)].firstName
)
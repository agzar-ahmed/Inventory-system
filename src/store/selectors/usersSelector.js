import { createSelector } from 'reselect'
 

export const usersSelector = () => createSelector(
  state=>state.users,
  inventory=>inventory.usersData
)
 
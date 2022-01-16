import { createSelector } from 'reselect'
 

export const sizeSelector = () => createSelector(
  state=>state.size,
  size=>size.sizeData
)
import { createSelector } from 'reselect'
 

export const manufacturerSelector = () => createSelector(
  state=>state.manufacturer,
  manufacturer=>manufacturer.manufacturerData
)
 

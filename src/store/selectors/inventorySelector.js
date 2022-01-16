import { createSelector } from 'reselect'
 

export const inventorySelector = () => createSelector(
  state=>state.inventory,
  inventory=>inventory.inventoryData
)
 

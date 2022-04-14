import { createSelector } from 'reselect'
 

export const inventorySelector = () => createSelector(
  state=>state.inventory,
  inventory=>inventory.inventoryData
)
 
export const getInventorybyIdSelector = (inventoryId) => createSelector(
  state=>state.inventory.inventoryData,
  inventory=>inventory.byIds[String(inventoryId)]
)
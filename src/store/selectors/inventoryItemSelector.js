import { createSelector } from 'reselect'
 

export const inventoryItemSelector = () => createSelector(
  state=>state.inventoryItem,
  inventoryItem=>inventoryItem.inventoryItemData
)
 
export const getInventoryItemByIdSelector = (inventoryItemId) => createSelector(
  state=>state.inventoryItem.inventoryItemData,
  inventoryItem=>inventoryItem.filter(inventoryItem=> inventoryItem.id == Number(inventoryItemId))
)
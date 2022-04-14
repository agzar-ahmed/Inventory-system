import { createSelector } from 'reselect'
 

export const stockSelector = () => createSelector(
  state =>state.stock.stockData,
  stock => stock
)
 
export const getStockByIdSelector = (stockId) => createSelector(
  state=>state.stock.stockData,
  stock=>stock[stockId]///.filter(inventoryItem=> inventoryItem.id == Number(inventoryItemId))
)

export const stockByInventoriesSelector = () => createSelector(
  state =>state.stock.stockByInventory,
  stock => stock
)
import { createSelector } from 'reselect'
 

export const itemsSelector = () => createSelector(
  state=>state.items,
  items=>items.itemsData
)
export const getItemsbyIdSelector = (itemId) => createSelector(
  state=>state.items.itemsData,
  items=>items[itemId]//.filter(item=> item.id == Number(itemId))
)
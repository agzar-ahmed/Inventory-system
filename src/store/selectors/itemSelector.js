import { createSelector } from 'reselect'
 

export const itemsSelector = () => createSelector(
  state=>state.items,
  items=>items.itemsData
)
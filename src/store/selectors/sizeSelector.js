import { createSelector } from 'reselect'
 

export const sizeSelector = () => createSelector(
  state=>state.size,
  size=>size.sizeData
)
export const getSizebyIdSelector = (sizeId) => createSelector(
  state=>state.size.sizeData,
  size=>size.filter(size=>size.id == Number(sizeId))
)
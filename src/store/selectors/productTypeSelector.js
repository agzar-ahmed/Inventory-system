import { createSelector } from 'reselect'
 

export const productTypeSelector = () => createSelector(
  state=>state.productType,
  productType=>productType.productTypeData
)
 

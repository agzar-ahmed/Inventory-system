import { createSelector } from 'reselect'
 

export const productTypeSelector = () => createSelector(
  state=>state.productType,
  productType=>productType.productTypeData
)
 
export const getProductTypebyIdSelector = productTypeId =>createSelector(
  state=>state.productType.productTypeData,
  productTypes=>productTypes.filter(productType=> productType.id == Number(productTypeId))
)
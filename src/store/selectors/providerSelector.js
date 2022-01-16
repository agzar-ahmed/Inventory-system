import { createSelector } from 'reselect'
 

export const providerSelector = () => createSelector(
  state=>state.provider,
  productType=>productType.providerData
)
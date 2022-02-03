import { createSelector } from 'reselect'
 

export const providerSelector = () => createSelector(
  state=>state.provider,
  productType=>productType.providerData
)

export const getProviderbyIdSelector = (providerId) => createSelector(
  state=>state.provider.providerData,
  provider=>provider.filter(provider=>provider.id == Number(providerId))
)
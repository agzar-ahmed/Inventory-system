import { createSelector } from 'reselect'
 

export const providerSelector = () => createSelector(
  state=>state.provider.providerData,
  provider=>provider
)

export const getProviderbyIdSelector = (providerId) => createSelector(
  state=>state.provider.providerData,
  provider=>provider.byIds[String(providerId)]//filter(provider=>provider.id == Number(providerId))
)
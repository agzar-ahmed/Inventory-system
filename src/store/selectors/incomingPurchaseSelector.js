import { createSelector } from 'reselect'
 

export const incomingPurchaseSelector = () => createSelector(
  state=>state.incomingPurchases,
  incomingPurchases=>incomingPurchases.incomingPurchaseData
)
 
import { createSelector } from 'reselect'
 

export const incomingPurchaseSelector = () => createSelector(
  state=>state.incomingPurchase,
  incomingPurchase=>incomingPurchase.incomingPurchaseData
)
 
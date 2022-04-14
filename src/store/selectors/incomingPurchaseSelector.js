import { createSelector } from 'reselect'
 

export const incomingPurchaseSelector = () => createSelector(
  state=>state.incomingPurchase,
  incomingPurchase=>incomingPurchase.incomingPurchaseData
)
 

export const getIncomingPurchaseByIdSelector = (incomingId) => createSelector(
  state=>console.log(state,incomingId,'getIncomingPurchase state')
    //state.incomingPurchase.incomingPurchaseData.byIds
,
  incomingPurchase=>incomingPurchase[incomingId]
)

/************************************************incomingPurchaseDetailsSelectors*********************************/
export const incomingDetailsLoadingSelector = ()=> createSelector(
  state=> state.incomingPurchase,
  incomingPurchase=>incomingPurchase.incomingPurchaseDetailsisLoading
)

export const incomingPurchaseDetailsSelector = ()=> createSelector(
  state=> state.incomingPurchase,
  incomingPurchase=>incomingPurchase.incomingPurchaseDetails
)
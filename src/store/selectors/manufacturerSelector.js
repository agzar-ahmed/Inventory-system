import { createSelector } from 'reselect'
 

export const manufacturerSelector = () => createSelector(
  state=>state.manufacturer,
  manufacturer=>manufacturer.manufacturerData
)
 
export const getManufacturerbyIdSelector = (manufacturerId) => createSelector(
  state=>state.manufacturer.manufacturerData,
  manufacturer=>manufacturer.filter(manufacturer=> manufacturer.id == Number(manufacturerId))
)
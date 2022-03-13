import { createSelector } from 'reselect'
 

export const companiesSelector = () => createSelector(
  state=>state.companies,
  companies=>companies.companyData
)
 
export const getCompanybyIdSelector = (companyId) => createSelector(
  state=>state.companies.companyData,
  company=>company.filter(company=>company.id == Number(companyId))
)
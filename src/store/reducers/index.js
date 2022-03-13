import { combineReducers } from 'redux';

import productTypeReducer from './productTypeReducer';
import inventoryReducer from './inventoryReducer';
import sizeReducer from './sizeReducer';
import providerReducer from './providerReducer';
import manufacturerReducer from './manufacturerReducer'
import usersReducer from './usersReducer';
import itemsReducer from './itemsReducer';
import incomingPurchaseReducer from './incomingPurchaseReducer'
import inventoryItemReducer from './inventoryItemReducer'
import companyReducer from './companyReducer';

export default combineReducers({
    productType: productTypeReducer,
    inventory: inventoryReducer,
    size: sizeReducer,
    provider: providerReducer,
    manufacturer: manufacturerReducer,
    users: usersReducer,
    items: itemsReducer,
    incomingPurchase:incomingPurchaseReducer,
    inventoryItem: inventoryItemReducer,
    companies: companyReducer
});
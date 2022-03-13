import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import combineReducers from './reducers'
import {devToolsEnhancer} from "redux-devtools-extension"
import * as actionCreators from './actions/sizeActions'; 
import logger from './middleware/logger'
import toastMiddleware from './middleware/toast'
import api from './middleware/api'

const initialState ={}

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true,
      traceLimit: 25
     }): []

const store= createStore(combineReducers, initialState, compose(
    applyMiddleware(api(),logger(console),toastMiddleware(),thunk),
    //  devToolsEnhancer({trace:true}),
    //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    //     trace: true,
    //     traceLimit: 25
    //    })
    composeSetup
    ));

export default store;
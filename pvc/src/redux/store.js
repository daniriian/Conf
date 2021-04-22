import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'

import rootReducer from './rootReducer'
import thunk from 'redux-thunk'


const middlewares=[thunk, logger]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
import { createStore, applyMiddleware } from "redux"
import { createPromise } from 'redux-promise-middleware';
import logger from "redux-logger"

import thunk from "redux-thunk";
import promise from "redux-promise-middleware"

import reducer from "../Reducers/index"

const middleware = applyMiddleware(createPromise(), thunk, logger);
const store =  createStore(reducer, middleware)


export default store
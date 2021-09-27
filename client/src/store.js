import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

//Redux 초기상태
const initalState = {}

const middlewares = [ sagaMiddleware, routerMiddleware(history) ];

//chrome에서 사용하는 개발자도구
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

//배포단계에서는 개발자도구 미사용
const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
    createRootReducer(history),
    initalState,
    composeEnhancer(applyMiddleware(...middlewares))
)
sagaMiddleware.run(rootSaga);

export default store;

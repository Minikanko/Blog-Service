import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router' 
import authReducer from './authReducer';

const createRouteReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
});

export default createRouteReducer;
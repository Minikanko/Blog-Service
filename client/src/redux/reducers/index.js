import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router' 
import authReducer from './authReducer';
import postReducer from './postReducer';

const createRouteReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    post: postReducer,
});

export default createRouteReducer;
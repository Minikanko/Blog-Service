import { all, fork } from 'redux-saga/effects'
import dotenv from 'dotenv'
import axios from 'axios'
import authSaga from './authSaga'

dotenv.config();
//axios.defaults.baseURL = process.env.config.REDUX_APP_BASIC_SERVER_URL;
axios.defaults.baseURL = 'http://localhost:7050';

//console.log(process.env.config.REDUX_APP_BASIC_SERVER_URL)

export default function* rootSaga(){
    yield all([
        fork(authSaga)
    ]);
}

import axios from 'axios'
import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, 
    LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, 
    USER_LOADING_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST,
    CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS,
    REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST,
} from '../type'

const loginUserAPI = (loginData) => {
    console.log(loginData, "loginData");
    const config = {
        header : {
            "Content-Type":"application/json"
        }
    }
    return axios.post('api/auth',loginData, config)
}

function* loginUser(action){
    try {
        const result = yield call(loginUserAPI,action.payload);
        console.log(result);
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data,
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}

function* watchLoginUser(){
    yield takeEvery(LOGIN_REQUEST , loginUser);
}

//로그인 유지
const userLoadingAPI = (token) => {
    console.log(token, "token");
    const config = {
        header : {
            "Content-Type":"application/json"
        }
    }
    if(token) {
        config.header["x-auth-token"] = token;
    }
    return axios.post('api/auth/user',  config)
}

function* userLoading(action){
    try {
        const result = yield call(userLoadingAPI,action.payload);
        console.log(result);
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data,
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response
        })
    }
}

function* watchUserLoading(){
    yield takeEvery(USER_LOADING_REQUEST , userLoading);
}

//Register user
const registerUserAPI = (data) => {
    console.log(data, "registerUser Data");
    return axios.post('api/user',data);
}

function* registerUser(action){
    try {
        const result = yield call(registerUserAPI,action.payload);
        console.log(result, "Register User");
        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data,
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response
        })
    }
}

function* watchRegisterUser(){
    yield takeEvery(REGISTER_REQUEST , registerUser);
}

//Logout
function* logoutUser(action){
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        })
    } catch (e) {
        yield put({
            type: LOGOUT_FAILURE,
        })
        console.log(e);
    }
}

function* watchLogoutUser(){
    yield takeEvery(LOGOUT_REQUEST , logoutUser);
}

//clear Error
function* clearError(){
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        })
    } catch (e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        })
        console.log(e);
    }
}

function* watchClearError(){
    yield takeEvery(CLEAR_ERROR_REQUEST , clearError);
}


export default function* allSaga(){
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchClearError),
        fork(watchRegisterUser),
        fork(watchUserLoading),
    ])
}
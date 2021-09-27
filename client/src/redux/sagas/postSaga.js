import axios from 'axios'
import {put, call, takeEvery, all, fork} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {POST_LOADING_FAILURE, POST_LOADING_SUCCESS, POST_LOADING_REQUEST, } from '../type'


const loadPostAPI = () => {
    return axios.get('/api/post');
}

function* loadPosts(){
    try {
        const result = yield call(loadPostAPI);
        console.log(result, " loadPosts Result");
        yield put({
            type: POST_LOADING_SUCCESS,
            payload: result.data,
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: POST_LOADING_FAILURE,
            payload: e,
        })
        yield push('/');
    }
}

function* watchLoadPost(){
    yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

export default function* postSaga() {
    yield all([fork(watchLoadPost)])
}

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, 
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, 
    USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../type'

const initalState = {
    token: localStorage.getItem('token'),
    isAuth: null,
    isLoading: false,
    user: "",
    userId: "",
    userName: "",
    userRole: "",
    errMsg: "",
    successMsg: "",
}

const authReducer = (state = initalState, action) => {
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGOUT_REQUEST:
        case LOGIN_REQUEST: 
            return {
                ...state,
                errMsg: "",
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                user: action.payload.user,
                userId: action.payload.userId,
                userName: action.payload.userName,
                userRole: action.payload.userRole,
                errMsg: "",
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                user: null,
                userId: null,
                userName: null,
                userRole: null,
                errMsg: "",
            }
        case REGISTER_FAILURE:
        case LOGOUT_FAILURE:
        case LOGIN_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                //...action.payload
                isAuth: false,
                isLoading: false,
                user: null,
                userId: null,
                userName: null,
                userRole: null,
                errMsg: action.payload.data.errMsg,
            }

        //CLEAR case???  errMsg??? state ???????????? ???????????? ????????? ???????????? ???????????? ????????? ?????? 
        //???????????? ?????????????????? ????????? state??? ????????? ????????? ????????? ???????????? ????????? ??????????????????.
        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errMsg: ''
            }
        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
                errMsg: ''
            }
        case CLEAR_ERROR_SUCCESS:
        return {
            ...state,
            errMsg: ''
        }

        //??????????????? ??????
        case USER_LOADING_FAILURE:
            return {
                ...state,
                user: null,
                userRole: "", 
                isLoading: false,
                isAuth: false,
            }
        case USER_LOADING_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case USER_LOADING_SUCCESS:
        return {
            ...state,
            isAuth: true,
            isLoading: false,
            user: action.payload,
            userId: action.payload._id,
            userName: action.payload.name,
            userRole: action.payload.role,
        }
        default:
            return state;

    }
}

export default authReducer;
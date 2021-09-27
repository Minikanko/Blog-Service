import { POST_LOADING_FAILURE, POST_LOADING_REQUEST, POST_LOADING_SUCCESS } from "../type";

const initialState = {
    isAuthenticated: null,
    posts: [],
    postDeatil: "",
    postCount: "",
    loading: false,
    error: "",
    createId: "",
    //카테고리 검색결과
    categoryFindResult: "",
    tilte: "",
    searchBy: "",
    searchResult: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type){
        case POST_LOADING_REQUEST:
            return{
                ...state,
                posts: [],
                loading: true,
            }
        case POST_LOADING_SUCCESS:
            return{
                ...state,
                posts: [...state.posts, ...action.payload],
                loading: false,
            }
        case POST_LOADING_FAILURE:
            return{
                ...state,
                loading: false,

            }
        default:
             return state
    }
}
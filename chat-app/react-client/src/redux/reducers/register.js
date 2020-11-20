import * as ActionTypes from '../constants/ActionTypes'

const initState = {
    isLoading: false,
    user: null,
    errMsg: null
}

export const register = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                user: action.payload,
                errMsg: null
            }
        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                errMsg: null
            }
        case ActionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                user: null,
                errMsg: action.payload
            }
        default:
            return state
    }
}
import * as ActionTypes from '../constants/ActionTypes'

const initState = {
    isLoading: false,
    message: null,
    errMsg: null
}

export const addMessage = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CHANNEL_LOADING:
            return {
                ...state,
                isLoading: true,
                message: action.payload,
                errMsg: null
            }
        case ActionTypes.FETCH_CHANNEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload,
                errMsg: null
            }
        case ActionTypes.FETCH_CHANNEL_ERROR:
            return {
                ...state,
                isLoading: false,
                message: null,
                errMsg: action.payload
            }
        default:
            return state
    }
}
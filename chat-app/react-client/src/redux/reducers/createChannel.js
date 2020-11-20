import * as ActionTypes from '../constants/ActionTypes'

const initState = {
    isLoading: false,
    errMsg: null
}

export const createChannel = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_CHANNEL_LOADING:
            return {
                ...state,
                isLoading: true,
                errMsg: null
            }
        case ActionTypes.CREATE_CHANNEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMsg: null
            }
        case ActionTypes.CREATE_CHANNEL_ERROR:
            return {
                ...state,
                isLoading: false,
                errMsg: action.payload
            }
        default:
            return state
    }
}
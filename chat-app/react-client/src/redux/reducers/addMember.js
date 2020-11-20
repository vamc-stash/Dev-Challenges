import * as ActionTypes from '../constants/ActionTypes'

const initState = {
    isLoading: false,
    errMsg: null
}

export const addMember = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MEMBER_TO_CHANNEL_LOADING:
            return {
                ...state,
                isLoading: true,
                errMsg: null
            }
        case ActionTypes.ADD_MEMBER_TO_CHANNEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMsg: null
            }
        case ActionTypes.ADD_MEMBER_TO_CHANNEL_ERROR:
            return {
                ...state,
                isLoading: false,
                errMsg: action.payload
            }
        default:
            return state
    }
}
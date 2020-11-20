import * as ActionTypes from '../constants/ActionTypes'

const initState = {
	isLoading: false,
	user: null,
	errMsg: null
}

export const profile = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.IS_LOADING:
			return {
				...state,
				isLoading: true,
				errMsg: null
			}
		case ActionTypes.IS_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
				errMsg: null
			}
		case ActionTypes.IS_FAILURE:
			return {
				...state,
				isLoading: false,
				errMsg: action.payload
			}
		default:
			return state
	}
}
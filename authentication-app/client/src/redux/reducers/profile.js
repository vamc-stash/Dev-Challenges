import * as ActionTypes from '../constants/ActionTypes'

const initState = {
	isLoading: false,
	user: null,
	errMsg: null
}

export const userInfo = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.INFO_LOADING:
			return {
				...state,
				isLoading: true,
				errMsg: null
			}
		case ActionTypes.USER_INFO:
			return {
				...state,
				isLoading: false,
				user: action.payload,
				errMsg: null
			}
		case ActionTypes.INFO_FAILURE:
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

export const uploadFile = (state = {
	isLoading: false,
	errMsg: null
}, action) => {
	switch (action.type) {
		case ActionTypes.UPLOAD_LOADING:
			return {
				...state,
				isLoading: true,
				errMsg: null
			}
		case ActionTypes.UPLOAD_SUCCESS:
			return {
				...state,
				isLoading: false,
				errMsg: null
			}
		case ActionTypes.UPLOAD_FAILURE:
			return {
				...state,
				isLoading: false,
				errMsg: action.payload
			}
		default: 
			return state
	}
}
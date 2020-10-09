import * as ActionTypes from '../constants/ActionTypes'

const initState = {
	isLoading: false,
	isAuthenticated: localStorage.getItem('token') ? true : false,
	token: localStorage.getItem('token'),
	user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
	errMsg: null
}

export const auth = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.LOGIN_REQUEST:
			return {
				...state,
				isLoading: true,
				isAuthenticated: false,
				user: action.payload
			}
		case ActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				errMsg: '',
				token: action.token
			}
		case ActionTypes.LOGIN_FAILURE:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				errMsg: action.payload
			}
		case ActionTypes.LOGOUT_REQUEST:
			return {
				...state,
				isLoading: true,
				isAuthenticated: true
			}
		case ActionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				token: '',
				user: null
			}
		default: 
			return state
	}
} 
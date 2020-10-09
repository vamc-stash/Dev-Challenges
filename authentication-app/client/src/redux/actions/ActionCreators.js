import * as ActionTypes from '../../constants/ActionTypes';
import { BASE_URL } from '../../../shared/baseUrl';

function errorObject(res) {
	var error = new Error('Error ' + res.status + ': ' + res.statusText)
	error.response = res
	return error
}

//SignUp the user
export const signupUser = (creds) => (dispatch) => {
	dispatch(requestSignup(creds))

	return fetch(BASE_URL + 'users/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(creds),
		credentials: 'same-origin'
	})
	.then(res => {
		if (res.ok) {
			return res
		}
		else {
			throw errorObject(res)
		}
	}, err => {throw err})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			dispatch(addToUsers(JSON.stringify(creds)))
		}
		else {
			throw errorObject(res)
		}
	})
	.catch(err => dispatch(signupError(err.message)))
}

export const requestSignup = (creds) => {
	return {
		type: ActionTypes.SIGNUP_REQUEST,
		payload: creds
	}
}

export const addToUsers = (creds) => {
	return {
		type: ActionTypes.ADD_TO_USERS,
		payload: creds
	}
}

export const signupError = (message) => {
	return {
		type: ActionTypes.SIGNUP_FAILURE,
		payload: message
	}
}


//Logs in the user
export const loginUser = (creds) => (dispatch) => {
	dispatch(requestLogin(creds))

	return fetch(BASE_URL + 'users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(creds)
	})
	.then(res => {
		if (res.ok) {
			return res
		}
		else {
			throw errorObject(res)
		}
	}, err => {throw err})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			localStorage.setItem('token', res.token)
			localStorage.setItem('creds', JSON.stringify(creds))

			dispatch(receiveLogin(res))
			return res
		}
		else {
			throw errorObject(res)
		}
	})
	.catch(err => dispatch(loginError(err.message)))
}

export const facebookLoginUser = (accessToken) => (dispatch) => {

	dispatch(requestLogin(accessToken))

	return fetch(BASE_URL + 'users/facebook/token', {
		headers: {
			'access_token': accessToken
		},
		credentials: 'same-origin'
	})
	.then(res => {
		if (res.ok) {
			return res
		}
		else {
			throw errorObject(res)
		}
	}, err => {throw err})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			localStorage.setItem('token', res.token)
			localStorage.setItem('creds', JSON.stringify(res.user))

			dispatch(receiveLogin(res))
			return res
		}
		else {
			throw errorObject(res)
		}
	})
	.catch(err => dispatch(loginError(err.message)))
}

export const twitterLoginUser = (data) => (dispatch) => {

	dispatch(requestLogin(data.oauth_token))

	return fetch(BASE_URL + 'users/twitter/token?oauth_token='+data.oauth_token+'&oauth_token_secret='+data.oauth_token_secret+'&user_id='+data.user_id, {
		headers: {
		},
		credentials: 'same-origin'
	})
	.then(res => {
		if (res.ok) {
			return res
		}
		else {
			throw errorObject(res)
		}
	}, err => {throw err})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			localStorage.setItem('token', res.token)
			localStorage.setItem('creds', JSON.stringify(res.user))

			dispatch(receiveLogin(res))
			return res
		}
		else {
			throw errorObject(res)
		}
	})
	.catch(err => dispatch(loginError(err.message)))
}

export const githubLoginUser = (code) => (dispatch) => {

	dispatch(requestLogin(code))

	return fetch(BASE_URL + 'users/github/code?code='+code, {
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin'
	})
	.then(res => {
		if (res.ok) {
			return res
		}
		else {
			throw errorObject(res)
		}
	}, err => {throw err})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			console.log(res)
			localStorage.setItem('token', res.token)
			localStorage.setItem('creds', JSON.stringify(res.user))

			dispatch(receiveLogin(res))
			return res
		}
		else {
			throw errorObject(res)
		}
	})
	.catch(err => dispatch(loginError(err.message)))
}

export const googleLoginUser = (accessToken) => (dispatch) => {

	dispatch(requestLogin(accessToken))

	return fetch(BASE_URL + 'users/google/token', {
		headers: {
			'access_token': accessToken
		},
		credentials: 'same-origin'
	})
	.then(res => {
		if (res.ok) {
			return res
		}
		else {
			throw errorObject(res)
		}
	}, err => {throw err})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			localStorage.setItem('token', res.token)
			localStorage.setItem('creds', JSON.stringify(res.user))

			dispatch(receiveLogin(res))
			return res
		}
		else {
			throw errorObject(res)
		}
	})
	.catch(err => dispatch(loginError(err.message)))
}

export const requestLogin = (creds) => {
	return {
		type: ActionTypes.LOGIN_REQUEST,
		payload: creds
	}
}

export const receiveLogin = (res) => {
	return {
		type: ActionTypes.LOGIN_SUCCESS,
		token: res.token
	}
}

export const loginError = (message) => {
	return {
		type: ActionTypes.LOGIN_FAILURE,
		payload: message
	}
}

//Logs out the user
export const logoutUser = () => (dispatch) => {
	dispatch(requestLogout())

	localStorage.removeItem('token')
	localStorage.removeItem('creds')

	dispatch(receiveLogout())
}

export const requestLogout = () => {
	return {
		type: ActionTypes.LOGOUT_REQUEST,
	}
}

export const receiveLogout = () => {
	return {
		type: ActionTypes.LOGOUT_SUCCESS,
	}
}

//fetch User info
export const fetchUserInfo = () => async (dispatch, getState) => {

	console.log('state', getState())

	dispatch(infoLoading())

	const bearer = 'Bearer ' + localStorage.getItem('token')

	return await fetch(BASE_URL + 'users/dashboard', {
		headers: {
			'Authorization': bearer
		},
		credentials: 'same-origin'
		//sameSite: 'none' //TODO
	})
	.then(res => {
		if (res.ok) {
			return res
		}
		else {
			throw errorObject(res)
		}
	}, err => {
		var errMsg = new Error(err.message)
		throw errMsg
	})
	.then(res => res.json())
	.then(res => dispatch(userInfo(res)))
	.catch(err => dispatch(infoFailed(err.message)))
}

//update User info
export const updateUserInfo = (user) => (dispatch) => {
	dispatch(infoLoading())

	const bearer = 'Bearer ' + localStorage.getItem('token')

	return fetch(BASE_URL + 'users/dashboard', {
		method: 'PUT',
		headers: {
			'Authorization': bearer,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
	.then(res => {
		if (res.ok) {
			return res
		}
		else {
			throw errorObject(res)
		}
	}, err => {
		var errMsg = new Error(err.message)
		throw errMsg
	})
	.then(res => res.json())
	.then(res => dispatch(userInfo(res)))
	.catch(err => dispatch(infoFailed(err.message)))
}

export const infoLoading = () => {
	return {
		type: ActionTypes.INFO_LOADING,
	}
}

export const userInfo = (user) => {
	return {
		type: ActionTypes.USER_INFO,
		payload: user
	}
}

export const infoFailed = (message) => {
	return {
		type: ActionTypes.INFO_FAILURE,
		payload: message
	}
}

//upload image file
export const uploadFile = (file) => (dispatch) => {
	dispatch(uploadLoading())

	const bearer = 'Bearer ' + localStorage.getItem('token')
	var formData = new FormData();
 formData.append('imageFile', file[0]);

 console.log('formData', formData)

	return fetch(BASE_URL + 'imageUpload', {
		method: 'POST',
		headers: {
			'Authorization': bearer
		},
		body: formData
	})
	.then(res => {
		if (res.ok) {
			return res
		}
		else {
			throw errorObject(res)
		}
	}, err => {
		var errMsg = new Error(err.message)
		throw errMsg
	})
	.then(res => res.json())
	.then(res => dispatch(uploadSuccess()))
	.catch(err => dispatch(uploadFailed(err.message)))
}

export const uploadLoading = () => {
	return {
		type: ActionTypes.UPLOAD_LOADING,
	}
}

export const uploadSuccess = (res) => {
	return {
		type: ActionTypes.UPLOAD_SUCCESS,
	}
}

export const uploadFailed = (message) => {
	return {
		type: ActionTypes.UPLOAD_FAILURE,
		payload: message
	}
}
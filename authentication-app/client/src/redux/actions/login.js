import * as ActionTypes from '../constants/ActionTypes';
import { BASE_URL } from '../../shared/constants'
import errorObject from '../utilities/helper'

export const login = (creds) => (dispatch) => {
	dispatch(requestLogin(creds))

	return fetch(BASE_URL + '/users/login', {
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

export const socialLogin = (accessURL, headerBody) => (dispatch) => {
	dispatch(requestLogin(headerBody['access_token']))

	return fetch(BASE_URL + accessURL, {
		headers: headerBody,
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
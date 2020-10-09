import * as ActionTypes from '../constants/ActionTypes';
import { BASE_URL } from '../../shared/constants';
import errorObject from '../utilities/helper'

export const fetchUserInfo = () => async (dispatch, getState) => {

    dispatch(infoLoading())
	const bearer = 'Bearer ' + localStorage.getItem('token')

	return await fetch(BASE_URL + '/users/details', {
		headers: {
			'Authorization': bearer
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

	return fetch(BASE_URL + '/users/details', {
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

	return fetch(BASE_URL + '/imageUpload', {
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
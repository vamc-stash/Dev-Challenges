import * as ActionTypes from '../constants/ActionTypes';
import { BASE_URL } from '../../shared/constants';
import { errorObject } from '../utilities/helper'

export const fetchUserInfo = () => async (dispatch, getState) => {

	dispatch(isLoading())
	const bearer = 'Bearer ' + localStorage.getItem('token')

	return await fetch(BASE_URL + '/users/profile', {
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
		.then(res => dispatch(isSuccess(res)))
		.catch(err => dispatch(isFailed(err.message)))
}

export const uploadFile = (file) => (dispatch) => {
	dispatch(isLoading())

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
		})
		.then(res => res.json())
		.then(res => dispatch(isSuccess(res)))
		.catch(err => dispatch(isFailed(err.message)))
}

export const isLoading = () => {
	return {
		type: ActionTypes.IS_LOADING,
	}
}

export const isSuccess = (res) => {
	return {
		type: ActionTypes.IS_SUCCESS,
		payload: res
	}
}

export const isFailed = (message) => {
	return {
		type: ActionTypes.IS_FAILURE,
		payload: message
	}
}
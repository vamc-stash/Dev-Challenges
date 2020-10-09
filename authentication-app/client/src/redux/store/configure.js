import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {register} from '../reducers/register'
import {auth} from '../reducers/auth'
import {userInfo, uploadFile} from '../reducers/profile'

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			register: register,
			auth: auth,
			userInfo: userInfo,
			uploadFile: uploadFile
		}),
		applyMiddleware(thunk, logger)
	)
	return store
}
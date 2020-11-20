import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { auth } from '../reducers/auth'
import { register } from '../reducers/register'
import { addMember } from '../reducers/addMember'
import { addMessage } from '../reducers/addMessage'
import { channel } from '../reducers/channel'
import { createChannel } from '../reducers/createChannel'
import { allChannels } from '../reducers/allChannels'
import { profile } from '../reducers/profile'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            register: register,
            auth: auth,
            profile: profile,
            channel: channel,
            createChannel: createChannel,
            allChannels: allChannels,
            addMember: addMember,
            addMessage: addMessage,
        }),
        applyMiddleware(thunk, logger)
    )
    return store
}

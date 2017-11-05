import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './authReducer'
import toggle from './toggleReducer'
import poll from './pollReducer'

export default combineReducers({
	auth,
	toggle,
	form,
	poll
})

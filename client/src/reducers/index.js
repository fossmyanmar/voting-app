import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './authReducer'
import toggle from './toggleReducer'

export default combineReducers({
	auth,
	toggle,
	form
})

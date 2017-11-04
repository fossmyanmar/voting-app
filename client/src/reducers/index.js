import { combineReducers } from 'redux'

import auth from './authReducer'
import toggle from './toggleReducer'

export default combineReducers({ auth, toggle })

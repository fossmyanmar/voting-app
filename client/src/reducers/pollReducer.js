import { POLL_DATA } from '../actions/types'

export default (state = null, action) => {
	switch (action.type) {
		case POLL_DATA:
			return action.payload || false
		default:
			return state
	}
}

import { POLL_ALL, POLL_DETAILS, POLL_USER } from '../actions/types'

export default (state = null, action) => {
	switch (action.type) {
		case POLL_ALL:
		case POLL_DETAILS:
			return action.payload || false
		case POLL_USER:
			return action.payload
		default:
			return state
	}
}

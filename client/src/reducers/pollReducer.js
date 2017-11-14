import { POLL_ALL, POLL_DETAILS } from '../actions/types'

export default (state = null, action) => {
	switch (action.type) {
		case POLL_ALL:
		case POLL_DETAILS:
			return action.payload || false
		default:
			return state
	}
}

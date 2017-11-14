import { POLL_ALL, POLL_DETAILS, POLL_USER, POLL_CLEAR } from '../actions/types'

export default (state = null, { type, payload }) => {
	switch (type) {
		case POLL_ALL:
		case POLL_DETAILS:
			return payload || false
		case POLL_USER:
			return payload
		case POLL_CLEAR:
			return null
		default:
			return state
	}
}

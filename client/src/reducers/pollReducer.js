import { POLL_ALL, POLL_DETAILS, POLL_USER } from '../actions/types'

export default (state = null, { type, payload }) => {
	switch (type) {
		case POLL_ALL:
		case POLL_DETAILS:
			return payload || false
		case POLL_USER:
			return payload
		default:
			return state
	}
}

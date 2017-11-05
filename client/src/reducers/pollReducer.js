import { POLL_ALL } from '../actions/types'

export default (state = null, action) => {
	switch (action.type) {
		case POLL_ALL:
			return action.payload || false
		default:
			return state
	}
}

import {
	TOGGLE_DROPDOWN,
	TOGGLE_LOGIN_MODAL,
	TOGGLE_POLL_MODAL
} from '../actions/types'

export default (
	state = { showDropdown: false, showLoginModal: false, showPollModal: false },
	{ type }
) => {
	switch (type) {
		case TOGGLE_DROPDOWN:
			return { ...state, showDropdown: !state.showDropdown }
		case TOGGLE_LOGIN_MODAL:
			return { ...state, showLoginModal: !state.showLoginModal }
		case TOGGLE_POLL_MODAL:
			return { ...state, showPollModal: !state.showPollModal }
		default:
			return state
	}
}

import { TOGGLE_DROPDOWN, TOGGLE_LOGIN_MODAL } from '../actions/types'

export default (
	state = { showDropdown: false, showLoginModal: false },
	{ type }
) => {
	switch (type) {
		case TOGGLE_DROPDOWN:
			return { ...state, showDropdown: !state.showDropdown }
		case TOGGLE_LOGIN_MODAL:
			return { ...state, showLoginModal: !state.showLoginModal }
		default:
			return state
	}
}

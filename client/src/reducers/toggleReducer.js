import { TOGGLE_DROPDOWN, TOGGLE_MODAL } from '../actions/types'

export default (
	state = { showDropdown: false, showModal: false },
	{ type }
) => {
	switch (type) {
		case TOGGLE_DROPDOWN:
			return { ...state, showDropdown: !state.showDropdown }
		case TOGGLE_MODAL:
			return { ...state, showModal: !state.showModal }
		default:
			return state
	}
}

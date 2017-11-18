import {
	TOGGLE_DROPDOWN,
	TOGGLE_LOGIN_MODAL,
	TOGGLE_POLL_MODAL,
	TOGGLE_DELETE_MODAL
} from './types'

export const toggleDropdown = () => ({ type: TOGGLE_DROPDOWN })

export const toggleLoginModal = () => ({ type: TOGGLE_LOGIN_MODAL })

export const togglePollModal = () => ({ type: TOGGLE_POLL_MODAL })

export const toggleDeleteModal = () => ({ type: TOGGLE_DELETE_MODAL })

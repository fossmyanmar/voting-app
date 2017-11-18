import { fetchUser } from './authActions'
import { allPolls, getPoll, getMyPolls, clearPoll, vote } from './pollActions'
import {
	toggleDropdown,
	toggleLoginModal,
	togglePollModal,
	toggleDeleteModal
} from './toggleActions'

export {
	fetchUser,
	toggleDropdown,
	toggleLoginModal,
	togglePollModal,
	toggleDeleteModal,
	allPolls,
	getPoll,
	getMyPolls,
	clearPoll,
	vote
}

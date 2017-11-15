import { fetchUser } from './authActions'
import { allPolls, getPoll, getMyPolls, clearPoll, vote } from './pollActions'
import {
	toggleDropdown,
	toggleLoginModal,
	togglePollModal
} from './toggleActions'

export {
	fetchUser,
	toggleDropdown,
	toggleLoginModal,
	togglePollModal,
	allPolls,
	getPoll,
	getMyPolls,
	clearPoll,
	vote
}

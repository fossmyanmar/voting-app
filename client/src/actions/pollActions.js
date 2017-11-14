import axios from 'axios'

import { POLL_ALL, POLL_DETAILS } from './types'

export const allPolls = () => dispatch => {
	axios.get('/poll/all_polls').then(res => {
		if (res.status === 200) {
			dispatch({
				type: POLL_ALL,
				payload: res.data
			})
		}
	})
}

export const getPoll = id => dispatch => {
	axios.get(`/poll/get_poll/${id}`).then(res => {
		if (res.status === 200) {
			dispatch({
				type: POLL_DETAILS,
				payload: res.data
			})
		}
	})
}

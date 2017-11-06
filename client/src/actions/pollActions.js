import axios from 'axios'

import { POLL_DATA } from './types'

export const allPolls = () => dispatch => {
	axios.get('/poll/all_polls').then(res => {
		if (res.status === 200) {
			dispatch({
				type: POLL_DATA,
				payload: res.data
			})
		}
	})
}

export const getPoll = id => dispatch => {
	axios.get(`/poll/get_poll/${id}`).then(res => {
		if (res.status === 200) {
			dispatch({
				type: POLL_DATA,
				payload: res.data
			})
		}
	})
}

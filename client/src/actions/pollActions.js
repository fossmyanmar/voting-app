import axios from 'axios'

import { POLL_ALL, POLL_DETAILS, POLL_USER } from './types'

export const allPolls = () => dispatch => {
	axios.get('/poll/all_polls').then(({ status, data }) => {
		if (status === 200) {
			dispatch({
				type: POLL_ALL,
				payload: data
			})
		}
	})
}

export const getMyPolls = id => dispatch => {
	axios.get(`/poll/get_user_polls/${id}`).then(({ status, data }) => {
		if (status === 200) {
			dispatch({
				type: POLL_USER,
				payload: data
			})
		}
	})
}

export const getPoll = id => dispatch => {
	axios.get(`/poll/get_poll/${id}`).then(({ status, data }) => {
		if (status === 200) {
			dispatch({
				type: POLL_DETAILS,
				payload: data
			})
		}
	})
}

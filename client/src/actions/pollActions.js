import axios from 'axios'

import { POLL_ALL, POLL_DETAILS, POLL_USER, POLL_CLEAR } from './types'

export const allPolls = (limit, offset) => dispatch => {
	axios
		.get(`/poll/all_polls?offset=${offset}&limit=${limit}`)
		.then(({ status, data }) => {
			if (status === 200) {
				dispatch({
					type: POLL_ALL,
					payload: data
				})
			}
		})
}

export const getMyPolls = (id, limit, offset) => dispatch => {
	axios
		.get(`/poll/get_user_polls/${id}?offset=${offset}&limit=${limit}`)
		.then(({ status, data }) => {
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

export const vote = (selection, poll, Alert) => dispatch => {
	selection.id = poll._id
	axios
		.put(`/poll/vote`, selection)
		.then(({ status, data }) => {
			if (status === 200) {
				dispatch({
					type: POLL_DETAILS,
					payload: data
				})
			}
		})
		.catch(() => {
			dispatch({
				type: POLL_DETAILS,
				payload: poll
			})
			Alert.error(
				'Vote failed: Custom option is the same as a predefined option'
			)
		})
}

export const clearPoll = () => ({
	type: POLL_CLEAR
})

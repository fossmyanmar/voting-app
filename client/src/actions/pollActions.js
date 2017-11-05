import axios from 'axios'

import { POLL_ALL } from './types'

export const allPolls = () => dispatch => {
	axios('/poll/all_polls').then(res => {
		if (res.status === 200) {
			dispatch({
				type: POLL_ALL,
				payload: res.data
			})
		}
	})
}

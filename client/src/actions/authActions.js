import axios from 'axios'

import { FETCH_USER } from './types'

export const fetchUser = () => dispatch => {
	axios('/auth/current_user').then(({ status, data }) => {
		if (status === 200) {
			dispatch({
				type: FETCH_USER,
				payload: data
			})
		}
	})
}

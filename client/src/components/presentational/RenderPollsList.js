import React from 'react'
import { ListGroup } from 'reactstrap'

import RenderPolls from './RenderPolls'
import Loader from './Loader'

export default ({ poll }) => {
	if (!poll) {
		return <Loader />
	} else {
		if (poll.count) {
			return (
				<ListGroup>
					<RenderPolls polls={poll.polls} />
				</ListGroup>
			)
		} else {
			return (
				<div>
					You don't have any polls yet, click on 'Add Poll' in the navigation to
					add a poll
				</div>
			)
		}
	}
}

import React from 'react'
import { ListGroup } from 'reactstrap'

import RenderPolls from './RenderPolls'

export default ({ poll }) => {
	if (!poll) {
		return null
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

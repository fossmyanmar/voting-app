import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroupItem } from 'reactstrap'

export default ({ polls }) =>
	polls && polls.constructor === Array
		? polls.map((poll, i) => (
				<ListGroupItem className="poll-list-item" key={i}>
					<Link className="poll-link" to={`/poll/${poll.id}`}>
						{poll.pollQuestion}
					</Link>
				</ListGroupItem>
			))
		: ''

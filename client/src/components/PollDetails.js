import React from 'react'
import { withRouter } from 'react-router-dom'

const PollDetails = ({ match }) => {
	console.log(match)
	return <div>{match.params.id}</div>
}

export default withRouter(PollDetails)

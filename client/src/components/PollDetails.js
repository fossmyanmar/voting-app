import React from 'react'
import { withRouter } from 'react-router-dom'

const PollDetails = ({ match }) => <div>{match.params.id}</div>

export default withRouter(PollDetails)

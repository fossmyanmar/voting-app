import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../actions'

class PollDetails extends Component {
	componentDidMount() {
		this.props.getPoll(this.props.match.params.id)
	}
	render() {
		return <div>{this.props.match.params.id}</div>
	}
}

const mapStateToProps = ({ poll }) => ({ poll })

export default connect(mapStateToProps, actions)(withRouter(PollDetails))

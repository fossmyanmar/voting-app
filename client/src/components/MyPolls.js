import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions'

class MyPolls extends Component {
	shouldComponentUpdate(nextProps) {
		if (!nextProps.poll) {
			nextProps.getMyPolls(nextProps.auth._id)
		}
		return true
	}

	render() {
		return <div>My Polls</div>
	}
}

const mapStateToProps = ({ auth, poll }) => ({ auth, poll })

export default connect(mapStateToProps, actions)(MyPolls)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'

export default ComposedComponent => {
	class Authentication extends Component {
		componentWillUpdate(nextProps) {
			if (!nextProps.auth) {
				this.props.history.push('/')
				return
			}
		}
		render() {
			return <ComposedComponent {...this.props} />
		}
	}
	const mapStateToProps = ({ auth }) => ({ auth })

	return connect(mapStateToProps, actions)(Authentication)
}

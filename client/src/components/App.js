import React, { Component } from 'react'
import Alert from 'react-s-alert'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'

const Landing = () => <div>Landing Page</div>

class App extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}
	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<Route path="/" component={Landing} />
					<Alert effect="slide" timeout="4000" />
				</div>
			</BrowserRouter>
		)
	}
}

export default connect(null, actions)(App)

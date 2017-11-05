import React, { Component } from 'react'
import Alert from 'react-s-alert'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Home from './Home'
import Header from './Header'
import PollDetails from './PollDetails'

class App extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}
	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<Route exact path="/" component={Home} />
					<Route path="/:id" component={PollDetails} />
					<Alert effect="slide" timeout={4000} />
				</div>
			</BrowserRouter>
		)
	}
}

export default connect(null, actions)(App)

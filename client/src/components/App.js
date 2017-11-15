import React, { Component } from 'react'
import Alert from 'react-s-alert'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Home from './containers/Home'
import Header from './containers/Header'
import PollDetails from './containers/PollDetails'
import MyPolls from './containers/MyPolls'

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
					<Route exact path="/my_polls" component={MyPolls} />
					<Route path="/poll/:id" component={PollDetails} />
					<Alert effect="slide" timeout={4000} />
				</div>
			</BrowserRouter>
		)
	}
}

export default connect(null, actions)(App)

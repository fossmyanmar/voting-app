import React, { Component } from 'react'
import Alert from 'react-s-alert'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Home from './containers/Home'
import Header from './containers/Header'
import Footer from './presentational/Footer'
import PollDetails from './containers/PollDetails'
import MyPolls from './containers/MyPolls'

import RequireAuth from './hoc/RequireAuth'

class App extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}
	render() {
		return (
			<BrowserRouter>
				<div id="wrapper">
					<Header />
					<Route exact path="/" component={Home} />
					<Route exact path="/my_polls" component={RequireAuth(MyPolls)} />
					<Route path="/poll/:id" component={PollDetails} />
					<Footer />
					<Alert effect="slide" timeout={4000} />
				</div>
			</BrowserRouter>
		)
	}
}

export default connect(null, actions)(App)

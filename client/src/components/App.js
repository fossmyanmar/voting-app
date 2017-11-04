import React, { Component } from 'react'
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
				</div>
			</BrowserRouter>
		)
	}
}

export default connect(null, actions)(App)

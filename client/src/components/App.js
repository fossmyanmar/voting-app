import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'

const Landing = () => <div>Landing Page</div>

const App = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Route path="/" component={Landing} />
		</div>
	</BrowserRouter>
)

export default App

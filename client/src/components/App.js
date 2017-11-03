import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

const Landing = () => <div>Landing Page</div>

const App = () => (
	<BrowserRouter>
		<div>
			<Route path="/" component={Landing} />
		</div>
	</BrowserRouter>
)

export default App

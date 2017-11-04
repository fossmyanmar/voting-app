import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger))

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
)

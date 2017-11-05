import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'

import App from './components/App'
import reducers from './reducers'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger))

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
)
registerServiceWorker()

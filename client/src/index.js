import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import './style.css'
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

if (process.env.NODE_ENV !== 'production') {
	if (module.hot) {
		module.hot.accept('./reducers', () => {
			store.replaceReducer(reducers)
		})
	}
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
)

if (module.hot) {
	module.hot.accept('./components/App', () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>,
			document.querySelector('#root')
		)
	})
}
registerServiceWorker()

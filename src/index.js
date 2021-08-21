import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './store/index';
function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
}
ReactDOM.render(
	// <ErrorBoundary
	// 	FallbackComponent={ErrorFallback}
	// 	onReset={() => {
	// 		// reset the state of your app so the error doesn't happen again
	// 	}}
	// >
	<Provider store={Store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	// </ErrorBoundary>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

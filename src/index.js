/*
 * @Author: ZJT
 * @Date: 2022-06-25 22:00:00
 * @LastEditors: ZJT
 * @LastEditTime: 2022-06-26 23:50:10
 * @Description:
 */
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import './index.css';
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

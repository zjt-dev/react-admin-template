import axios from 'axios';
// import queryString from 'querystring'
import Cookies from 'js-cookie';
import { message } from 'antd';
// import store from '@/store'
import { getStore } from './localStore';
// create an axios instance
const service = axios.create({
	baseURL: '//api.msmk.tech/union/v1', // url = base url + request url
	// baseURL: '//192.168.8.125:9501/union/v1', // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000, // request timeout
});
// request interceptor
service.interceptors.request.use(
	config => {
		let domain =
			Cookies.get('domain') === 'undefined' ? '' : Cookies.get('domain');
		if (!domain) {
			domain = service.domain;
			Cookies.set('domain', service.domain);
		}
		console.log(config);
		config.method = 'post';
		// do something before request is sent
		config.data = {
			'.': {
				token: getStore('ticket'),
				lan: 'cn',
				domain: 'demo8',
			},
			...config.data,
		};
		return config;
	},
	error => {
		// do something with request error
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	response => {
		const res = response.data;
		// eslint-disable-next-line eqeqeq
		if (res.code == 200) {
			return res.result;
		} else {
			// removeDomain()
			console.log(res);
			let msg = '';
			switch (res.code) {
				case 90603:
					msg = '用户名或密码错误';
					break;
				default:
					msg = res.msg;
					break;
			}
			message.error(msg);
		}
		// if the custom code is not 20000, it is judged as an error.
		// if (res.code !== 20000) {
		//   message({
		//     message: res.message || 'Error',
		//     type: 'error',
		//     duration: 5 * 1000
		//   })

		//   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
		//   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
		//     // to re-login
		//     messageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
		//       confirmButtonText: 'Re-Login',
		//       cancelButtonText: 'Cancel',
		//       type: 'error'
		//     }).then(() => {
		//       store.dispatch('user/resetToken').then(() => {
		//         location.reload()
		//       })
		//     })
		//   }
		//   return Promise.reject(new Error(res.message || 'Error'))
		// } else {
		//   return res
		// }
	},
	error => {
		console.log('err' + error); // for debug
		// removeDomain()
		message.error(error.message);
		return Promise.reject(error);
	}
);

export default service;

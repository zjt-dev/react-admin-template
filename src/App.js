import './App.less';
import { message } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { main as mainConfig } from './router/index';
import { RenderRoutes } from './router/allocation';
import { getUserInfo } from './api/login';
@inject('store')
@observer
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	checkPermisson = id => {
		getUserInfo(id).then(res => {
			console.log(res);
			if (!res || !res.user) {
				message.error({
					content: '登录状态已过期，请重新登录',
					duration: 2,
					onClose: () => {
						this.props.store.logout();
						this.props.history.push('/');
						// window.location.reload();
					},
				});
			} else {
				// this.props.history.push('/index');
			}
		});
	};
	componentDidMount() {
		console.log(this.props);
		const { id, ticket } = this.props.store;
		if (id && ticket) {
			// this.checkPermisson(id);
		}
	}
	render() {
		const { authed } = this.props.store;
		const { pathname } = this.props.location;
		return (
			<div className="App">
				{/* <Redirect to="/login"></Redirect> */}
				<RenderRoutes
					routes={mainConfig}
					authed={authed}
					authPath="/login"
					route={pathname}
				></RenderRoutes>
			</div>
		);
	}
}

export default withRouter(App);

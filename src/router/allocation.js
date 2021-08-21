import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { CSSTransition } from 'react-transition-group';
import MLayout from '../pages/layout/index';
import NotMatch from '../pages/404/index';
import { Spin } from 'antd';

const LoadingPage = () => {
	return (
		<div style={{ width: '100%', height: '100%', position: 'relative' }}>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					margin: 'auto',
					with: '60px',
					height: '50px',
					textAlign: 'center',
				}}
			>
				<Spin style={{}} tip="Loading..." />
			</div>
		</div>
	);
};
const whiteList = ['/login', '/logup'];
const MainRoute = props => {
	console.log(props);
	const { routes, authed, authPath, route } = props;
	// 查找当前路由组件 Obj 遍历所有路由 递归
	const filteRouteFn = routes => {
		const currentRoute = routes.find(v => v.path == route);
		if (currentRoute) {
			return currentRoute;
		} else {
			const currentRoute1 = routes
				.map(v => {
					if (v.routes) {
						return filteRouteFn(v.routes);
					}
				})
				.filter(v => v);
			return (currentRoute1[0] && currentRoute1[0]) || false;
		}
	};
	// 当前路由组件 Obj
	const filteRoute = filteRouteFn(routes);
	// 是否在白名单 Boolean
	const isInWhiteList = whiteList.some(v => route.indexOf(v) !== -1);
	console.log(isInWhiteList);
	console.log(filteRoute);
	if (!filteRoute) {
		return <Route component={NotMatch} />;
	}
	document.title = filteRoute.name;
	// 未登录 在白名单
	if (!authed && isInWhiteList) {
		return <Route {...filteRoute}></Route>;
	}
	// 未登陆 不在白名单
	if (!authed && !isInWhiteList) {
		const path = route;
		return <Redirect {...filteRoute} to={`/login?redirect=${path}`} />;
	}
	// 重定向
	if (filteRoute.redirect) {
		return <Redirect to={filteRoute.redirect}></Redirect>;
	}
	return (
		<Switch>
			<MLayout>
				<React.Suspense fallback={<LoadingPage />}>
					<CSSTransition in={true} classNames="card" timeout={400} appear>
						<Route {...filteRoute}></Route>
					</CSSTransition>
				</React.Suspense>
			</MLayout>
		</Switch>
	);
};
// { routes, authed, authPath, route }
export const RenderRoutes = props => {
	useState(NProgress.start());
	useEffect(() => {
		NProgress.done();
		return () => NProgress.done();
	});
	return <Route path="/" component={() => <MainRoute {...props} />}></Route>;
};

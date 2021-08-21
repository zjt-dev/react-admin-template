import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { inject, observer } from 'mobx-react';
import FadeRoute from './fadeRoute';
import MLayout from '../pages/layout/index';
import notFound from '../pages/404/index';
const RenderRoute = route => {
	if (route.routes) {
		return route.routes.map(v => {
			if (v.routes) {
				return RenderRoute(v);
			} else {
				return <v.component {...route} key={route.path}></v.component>;
			}
		});
	} else {
		console.log(route);
		return <route.component {...route}></route.component>;
	}
};
const SubRoutes = route => {
	console.log(route);
	return (
		<FadeRoute
			requiresAuth={route.requiresAuth}
			path={route.path}
			exact={route.exact}
			render={props => {
				console.log(route);
				document.title = route.name || '';
				if (route.redirect) {
					return <Redirect to={{ pathname: route.redirect }} />;
				}
				if (
					!route.requiresAuth ||
					route.authed ||
					route.path === route.authPath
				) {
					console.log(route);
					if (route.authed && route.path !== route.authPath) {
						console.log(route);
						return (
							<MLayout>
								<RenderRoute {...route} {...props} />
								{/* {() => RenderRoute({ ...route, ...props })} */}
								{/* <route.component {...props} routes={route.routes} /> */}
								{/* </Switch> */}
							</MLayout>
						);
					} else {
						return <route.component {...props} routes={route.routes} />;
					}
				}
				console.log(1111);
				return (
					<Redirect
						to={{
							pathname: route.authPath,
							search: '?redirect=' + props.location.pathname,
							state: { from: props.location },
						}}
					/>
				);
			}}
		/>
	);
};
export const RenderRoutes = ({ routes, authed, authPath, route }) => {
	if (authPath != true) {
		console.log(1111);
		return <Redirect to="/login" />;
	}
	return (
		// <TransitionGroup className={'router-wrapper'}>
		// 	<CSSTransition classNames="fade" key={route} timeout={0} unmountOnExit>
		<Switch>
			{routes.map((route, i) => (
				<SubRoutes key={i} {...route} authed={authed} authPath={authPath} />
			))}
			<Route component={notFound}></Route>
		</Switch>
		// 	</CSSTransition>
		// </TransitionGroup>
	);
};

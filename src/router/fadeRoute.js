/*
 * @Author: ZJT
 * @Date: 2021-08-09 13:16:32
 * @LastEditors: ZJT
 * @LastEditTime: 2021-08-09 18:59:58
 * @Description:
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React, { useState, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

const FadeRoute = props => {
	useState(NProgress.start());
	useEffect(() => {
		NProgress.done();
		return () => NProgress.done();
	});
	console.log(props);
	console.log(props.store.authed == true);
	if (props.store.authed == true && !props.requiresAuth) {
		console.log(33333333);
		return <Redirect to={'index'}></Redirect>;
	}
	return <Route {...props}></Route>;
};

export default withRouter(inject('store')(observer(FadeRoute)));

import React from 'react';
import Login from '../pages/login/sign_in';
import Logup from '../pages/login/sign_up';
// import Hotel from '../pages/hotel/index';
// import Test from '../pages/test/index';
// import Register from '../pages/register/index';
// import Invoice from '../pages//index';

// const Login = React.lazy(() => import('../pages/login/sign_in'));
// const Logup = React.lazy(() => import('../pages/login/sign_up'));
const Hotel = React.lazy(() => import('../pages/hotel/index'));
const Test = React.lazy(() => import('../pages/test/index'));
const Register = React.lazy(() => import('../pages/register/index'));
const Invoice = React.lazy(() => import('../pages/invoice/index'));
// 菜单相关路由
export const menus = [];
export const syncMenu = [
	{
		path: '/index',
		name: '首页',
		// exact: true,
		component: Test,
		requiresAuth: true,
	},
	{
		path: '/hotel',
		name: '酒店预订',
		component: Hotel,
		requiresAuth: true,
	},
	{
		path: '/register',
		name: '注册缴费',
		component: Register,
		requiresAuth: true,
	},
	{
		path: '/invoice',
		name: '发票申请',
		component: Invoice,
		requiresAuth: true,
	},
	{
		path: '/team',
		name: '团队管理',
		// component: Team,
		requiresAuth: true,
		routes: [
			{
				path: '/team/team_index',
				name: '团队管理首页',
				// exact: true,
				// component: Test,
				requiresAuth: true,
				routes: [
					{
						path: '/team/team_index/index',
						name: '团队管理首页dsfsd',
						// exact: true,
						component: Hotel,
						requiresAuth: true,
					},
				],
			},
		],
	},
];
//登录、首页、404路由
export const getSyncMenu = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(syncMenu);
		}, 2000);
	});
};
export const main = [
	{ path: '/', exact: true, redirect: '/index' },
	{ path: '/login', name: '登录', component: Login },
	{ path: '/logup', name: '注册', component: Logup },
	...syncMenu,
	// {
	// 	path: '/',
	// 	name: '首页',
	// 	// exact: true,
	// 	component: Indexs,
	// 	routes: syncMenu,
	// 	// routes: [],
	// 	requiresAuth: true,
	// },
];
export const routerExport = {
	main,
	syncMenu,
	menus,
};

import React, { Component } from 'react';
import { Layout, Menu, Input, Modal } from 'antd';
import { RenderRoutes } from '../../router/allocation';
import { Link, useRouteMatch, withRouter } from 'react-router-dom';
import { syncMenu } from '../../router';
import { inject, observer, Provider } from 'mobx-react';
import MSubmenu from './submenu';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { getStore, setStore, removeStore } from '../../utils/localStore';
import { keys } from 'mobx';

require('./index.less');

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
@inject('store')
@observer
@withRouter
class mIndex extends Component {
	state = {
		collapsed: false,
		theme: 'dark',
		menus: syncMenu,
		openKeys: (getStore('openKeys') && getStore('openKeys').split(',')) || [],
	};

	onCollapse = collapsed => {
		this.setState({ collapsed });
	};
	changeTheme = value => {
		this.setState({
			theme: value ? 'dark' : 'light',
		});
	};
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};
	onSelect = key => {
		// 判断一个数组中是否包含另一个数组
		function isArrInArr(a, b) {
			return a.length > b.length
				? b.every(val => a.includes(val))
				: a.every(val => b.includes(val));
		}
		if (!isArrInArr(this.state.openKeys, key.keyPath)) {
			removeStore('openKeys');
			this.setState({
				openKeys: [],
			});
		}
	};
	onOpenChange = key => {
		setStore('openKeys', key);
		this.setState({
			openKeys: key,
		});
	};
	componentDidMount() {}
	render() {
		const { collapsed, menus, openKeys } = this.state;
		let { routes, children } = this.props;
		const { pathname } = this.props.location;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<div
					style={{
						width: this.state.collapsed ? '80px' : '200px',
						transition: 'all 0.2s',
					}}
				></div>
				<Sider
					theme={this.state.theme}
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
					style={{
						position: 'fixed',
						height: '100vh',
					}}
				>
					<div className="logo" />
					<div style={{ padding: '10px 16px' }}>
						<Input
							placeholder="按enter键搜索"
							allowClear
							onChange={el => {
								!el.target.value &&
									this.setState({
										menus: syncMenu,
									});
							}}
							onPressEnter={el => {
								const filterMenu = syncMenu.filter(v =>
									v.name.match(el.target.value)
								);
								this.setState({
									menus: filterMenu,
								});
							}}
						></Input>
					</div>
					<Menu
						theme={this.state.theme}
						defaultSelectedKeys={[pathname]}
						onSelect={this.onSelect}
						onOpenChange={this.onOpenChange}
						openKeys={openKeys}
						mode="inline"
					>
						{menus.map(v =>
							v.routes ? (
								MSubmenu(v)
							) : (
								<Menu.Item key={v.path}>
									<Link to={v.path}>{v.name}</Link>
								</Menu.Item>
							)
						)}
						<Menu.Item
							key="logout"
							onClick={() => {
								Modal.confirm({
									title: '确定退出系统？',
									cancelText: '取消',
									okText: '确定',
									onOk: () => {
										Modal.destroyAll();
										setTimeout(() => {
											this.props.store.logout();
											this.props.history.push('/login?redirect=' + pathname);
										}, 500);
									},
								});
							}}
						>
							退出登录
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout
					className="site-layout"
					style={
						{
							// marginLeft: this.collapsed ? '80px' : '200px',
						}
					}
				>
					<Header
						className="site-layout-background"
						style={{
							padding: 0,
							position: 'fixed',
							width: '100%',
							zIndex: 1,
						}}
					>
						{React.createElement(
							this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								className: 'trigger',
								onClick: this.toggle,
							}
						)}
					</Header>
					<Content
						className="site-layout-background"
						style={{
							margin: '84px 16px 24px',
							padding: 24,
							minHeight: 280,
						}}
					>
						{children}
					</Content>
				</Layout>
			</Layout>
		);
	}
}
export default mIndex;

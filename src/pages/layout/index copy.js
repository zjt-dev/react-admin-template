import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { RenderRoutes } from '../../router/allocation';
import { Link } from 'react-router-dom';
import { syncMenu } from '../../router';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from '@ant-design/icons';
require('./index.less');

const { Header, Content, Sider } = Layout;
// const { SubMenu } = Menu;

class mIndex extends Component {
	state = {
		collapsed: false,
		theme: 'dark',
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
	render() {
		const { collapsed } = this.state;
		console.log(22222);
		let { routes } = this.props;
		const { pathname } = this.props.location;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					theme={this.state.theme}
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
				>
					<div className="logo" />
					<Menu
						theme={this.state.theme}
						defaultSelectedKeys={['/user/experience']}
						defaultOpenKeys={['sub1']}
						mode="inline"
					>
						<Menu.Item key="1">
							<Link to="/user/WorkBench">工作台</Link>
						</Menu.Item>
						{syncMenu.map(v => (
							<Menu.Item key={v.name}>
								<Link to={v.path}>{v.name}</Link>
							</Menu.Item>
						))}
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }}>
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
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}
					>
						<RenderRoutes routes={routes} route={pathname}></RenderRoutes>
					</Content>
				</Layout>
			</Layout>
		);
	}
}
export default mIndex;

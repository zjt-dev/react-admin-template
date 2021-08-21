/*
 * @Author: ZJT
 * @Date: 2021-08-10 11:43:33
 * @LastEditors: ZJT
 * @LastEditTime: 2021-08-10 13:40:54
 * @Description:
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Input, Modal } from 'antd';
const MSubmenu = props => {
	console.log(props.path);
	return (
		<Menu.SubMenu title={props.name} key={props.path}>
			{props.routes.map(c =>
				c.routes ? (
					MSubmenu(c)
				) : (
					<Menu.Item key={c.path}>
						<Link to={c.path}>{c.name}</Link>
					</Menu.Item>
				)
			)}
		</Menu.SubMenu>
		// <Menu.SubMenu key="sub3" title="Submenu">
		// 	<Menu.Item key="7">Option 7</Menu.Item>
		// 	<Menu.Item key="8">Option 8</Menu.Item>
		// 	<Menu.SubMenu key="sub10" title="Submenu">
		// 		<Menu.Item key="17">Option 17</Menu.Item>
		// 		<Menu.Item key="18">Option 18</Menu.Item>
		// 	</Menu.SubMenu>
		// </Menu.SubMenu>
	);
};

export default MSubmenu;

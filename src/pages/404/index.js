/*
 * @Author: ZJT
 * @Date: 2021-08-04 13:30:14
 * @LastEditors: ZJT
 * @LastEditTime: 2021-08-10 10:58:50
 * @Description:
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class index extends Component {
	render() {
		return (
			<div
				style={{
					position: 'fixed',
					left: 0,
					top: 0,
					right: 0,
					bottom: 0,
					background: '#fff',
				}}
			>
				<h1>您访问的页面不存在</h1>
				<Link to="/index">返回首页</Link>
			</div>
		);
	}
}

export default index;

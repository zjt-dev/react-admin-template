import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import './index.less';
export default withRouter(function index(props) {
	const { pathname } = props.location;
	const isActive = val => {
		if (pathname === val) {
			return 'active';
		}
	};
	return (
		<>
			<Row className="main">
				<Col xs={0} md={0} sm={0} lg={16}>
					<div className="main-left">
						<div></div>
					</div>
				</Col>
				<Col className="main-right" md={8} sm={24}>
					<div className="main-header">
						<span className={isActive('/login')}>
							<Link to="/login">登录</Link>
						</span>
						<span className={isActive('/logup')}>
							<Link to="/logup">注册</Link>
						</span>
					</div>
					{props.children}
				</Col>
			</Row>
		</>
	);
});

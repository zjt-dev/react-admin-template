import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Main from './index';
import { login, getUserInfo } from '../../api/login';
import ForgotForm from './forgot';
import querystring from 'querystring';
const SignIn = props => {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const onCreate = values => {
		console.log('Received values of form: ', values);
		setVisible(false);
	};
	const urlParams = querystring.parse(props.location.search.substr(1));
	const onFinish = values => {
		console.log('Received values of form: ', values);
		setLoading(true);
		const { username, password } = values;
		login({ username, password }).then(res => {
			const { userLogin } = res;
			if (userLogin) {
				props.store.setLoginState({ ...userLogin });
				getUserInfo(userLogin.id).then(user => {
					setLoading(false);
					if (user && user.user) {
						props.store.setUserInfo({ ...user.user });
						props.history.push(urlParams.redirect || '/index');
					} else {
						message.error('出错啦...');
					}
					console.log(props.store.userInfo);
				});
			} else {
				message.error('出错啦...');
			}
		});
	};

	return (
		<Main>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{
					remember: true,
					username: '18369656127',
					password: '12345q',
				}}
				onFinish={onFinish}
			>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: '请输入手机号或邮箱!',
						},
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="手机号/邮箱"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: '请输入密码!',
						},
					]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="密码"
					/>
				</Form.Item>
				<Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>记住密码</Checkbox>
					</Form.Item>

					<span
						className="login-form-forgot"
						onClick={() => {
							setVisible(true);
						}}
					>
						忘记密码
					</span>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						loading={loading}
					>
						Log in
					</Button>
					Or <a href="/logup">register now!</a>
				</Form.Item>
			</Form>

			<ForgotForm
				visible={visible}
				onCreate={onCreate}
				onCancel={() => {
					setVisible(false);
				}}
			></ForgotForm>
		</Main>
	);
};

export default inject('store')(observer(SignIn));

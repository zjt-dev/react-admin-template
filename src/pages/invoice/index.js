/*
 * @Author: ZJT
 * @Date: 2022-06-25 22:00:00
 * @LastEditors: ZJT
 * @LastEditTime: 2022-06-25 23:30:30
 * @Description:
 */
// 父组件
import { Button } from 'antd';
import React from 'react';
class Son extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: 'son',
		};
	}
	handleChange = e => {
		this.setState({
			info: e.target.value,
		});
	};
	clearInput = () => {
		this.setState({
			info: '',
		});
	};
	render() {
		return (
			<div>
				<div>{this.state.info}</div>
				<input type="text" onChange={this.handleChange} />
			</div>
		);
	}
}
class Father extends React.Component {
	son;
	constructor(props) {
		super(props);
		this.son = React.createRef(); // 在此处创建ref
	}
	clearSonInput = () => {
		const { current } = this.son; // 注意，这里必须通过 this.son.current拿到子组件的实例
		current.clearInput();
	};
	render() {
		return (
			<div>
				<Son ref={this.son} />
				<Button type="primary" onClick={this.clearSonInput}>
					清空子组件的input
				</Button>
			</div>
		);
	}
}
export default Father;

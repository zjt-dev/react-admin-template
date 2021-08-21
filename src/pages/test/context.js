import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Button } from 'antd';
const MyCount = React.createContext();
const aaa = {
	a: <div>sdfdsfsf</div>,
};
// console.log(aaa.a);
// console.log(aaa?.a);
// console.log(aaa!.a);
class One extends Component {
	// static contextType = MyCount;
	render() {
		return (
			<div>
				{aaa.a}
				<MyCount.Consumer>
					{value => {
						return (
							<div>
								<div>{value.name}</div>
								<div>{value.age}</div>
							</div>
						);
					}}
				</MyCount.Consumer>
			</div>
		);
	}
}
class index extends Component {
	state = {
		info: {
			name: 'Xiaoxiao',
			age: 123,
		},
	};
	render() {
		return (
			<MyCount.Provider value={this.state.info}>
				<h2>Context 深层数据传递</h2>
				<Button
					onClick={() => {
						this.setState({
							info: {
								...this.state.info,
								age: 12313213123,
							},
						});
					}}
				>
					change Age
				</Button>
				<One />
			</MyCount.Provider>
		);
	}
}

export default index;

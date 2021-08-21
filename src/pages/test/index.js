import React, { Component } from 'react';
import { List } from 'antd';
import Context from './context';
import Ref from './ref';
class index extends Component {
	render() {
		return (
			<>
				{/* <textarea name="" id="" cols="30" rows="20"></textarea> */}
				<List>
					<List.Item>
						<Context></Context>
					</List.Item>
					<List.Item>
						<Ref></Ref>
					</List.Item>
				</List>
			</>
		);
	}
}

export default index;

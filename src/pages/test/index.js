/*
 * @Author: ZJT
 * @Date: 2022-06-25 22:00:00
 * @LastEditors: ZJT
 * @LastEditTime: 2022-06-26 22:21:49
 * @Description:
 */
import { List } from 'antd';
import { Component, useState } from 'react';
import Context from './context';
import Ref from './ref';

function Demo() {
	const [login, setlogin] = useState(0);
	console.log(login);

	return <h1>Good{login}</h1>;
}
class index extends Component {
	render() {
		return (
			<>
				{/* <textarea name="" id="" cols="30" rows="20"></textarea> */}
				Dem1
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

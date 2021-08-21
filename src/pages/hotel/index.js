import React, {
	Component,
	useRef,
	useImperativeHandle,
	createRef,
} from 'react';
import { Spin } from 'antd';

function logProps(Component) {
	class LogProps extends React.Component {
		componentDidMount(prevProps) {
			console.log('old props:', prevProps);
			console.log('new props:', this.props);
		}
		dididi = () => {};
		render() {
			const { forwardedRef, ...rest } = this.props;
			console.log(
				'🚀 ~ file: index.js ~ line 17 ~ LogProps ~ render ~ forwardedRef',
				forwardedRef
			);
			// 将自定义的 prop 属性 “forwardedRef” 定义为 ref
			return <Component ref={forwardedRef} {...rest} dididi={this.dididi} />;
		}
	}
	console.log(Component);
	// 注意 React.forwardRef 回调的第二个参数 “ref”。
	// 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
	// 然后它就可以被挂载到被 LogProps 包裹的子组件上。
	return React.forwardRef((props, ref) => {
		return <LogProps {...props} forwardedRef={ref} />;
	});
}
const BaseSon = (props, refs) => {
	const ref = useRef();
	useImperativeHandle(refs, () => ({
		do: () => {},
		...props,
	}));
	return (
		<div ref={ref}>
			<div>{props.children}</div>
		</div>
	);
};
const Son = React.forwardRef(BaseSon);
const HocSon = logProps(Son);
class index extends Component {
	constructor(props) {
		super(props);
		this.divref = createRef();
		this.ref = createRef();
		this.hocRef = createRef();
	}
	componentDidMount() {
		console.log(this.divref);
		console.log(this.ref);
		console.log(this.hocRef);
		// this.hocRef.currnt.do();
	}
	render() {
		return (
			<div ref={this.divref}>
				<Son ref={this.ref}>基础子组件</Son>
				{/*  */}
				<HocSon ref={this.hocRef}>HocSon高阶组件</HocSon>
				<div style={{ width: '100%', height: '100%', position: 'relative' }}>
					<Spin style={{  }} tip="Loading..." />
				</div>
			</div>
		);
	}
}

export default index;

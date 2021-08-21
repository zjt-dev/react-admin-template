import React, { useRef, useImperativeHandle } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
function logProps(Component) {
	class LogProps extends React.Component {
		componentDidMount(prevProps) {
			console.log('old props:', prevProps);
			console.log('new props:', this.props);
		}
		render() {
			console.log(this);
			const { forwardedRef, ...rest } = this.props;

			// 将自定义的 prop 属性 “forwardedRef” 定义为 ref
			return <Component {...rest} ref={forwardedRef} />;
		}
	}

	// 注意 React.forwardRef 回调的第二个参数 “ref”。
	// 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
	// 然后它就可以被挂载到被 LogProps 包裹的子组件上。
	return React.forwardRef((props, ref) => {
		console.log(props);
		console.log(ref);
		return <LogProps {...props} forwardedRef={ref} />;
	});
	// return LogProps;
}
const BaseButton = props => {
	const ref = useRef();
	const refInit = el => {
		props.refInfo(el);
	};
	ref && console.log(ref);
	return <div ref={ref}>{props.children}</div>;
};
const HocButton = logProps(BaseButton);

/**
 * @description: 父组件获取 子组件中的实例和方法
 * 函数组件篇：
 * 利用React.forwardRef 和 useImperativeHandle（a,b）
 * 参数a 定义current对象的 ref
 * 参数b 一个函数 返回值未一个对象 即这个 ref 的 current 对象
 */
const Button = React.forwardRef((props, ref) => {
	const inputRef = useRef();
	const methods = {
		focus: () => {
			inputRef.current.focus();
		},
	};
	useImperativeHandle(ref, () => ({ ...methods }));
	return (
		<div ref={ref}>
			<input ref={inputRef} type="text" />
			<button>{props.children}</button>
		</div>
	);
});
class refs extends React.Component {
	state = {
		ref: React.createRef(),
		buttonRef: React.createRef(),
	};
	baseButton = null;
	hocButton = null;
	componentDidMount() {
		hljs?.highlightAll();
		hljs.registerLanguage('javascript', javascript);
		this.baseButton && console.log(this.baseButton);
	}
	refInfoHandler = el => {
		this.baseButton = el;
	};
	HocRefInfoHandler = el => {
		this.hocButton = el;
	};
	render() {
		return (
			<div>
				<h2>Refs转发</h2>
				<div hidden>
					<pre>
						<code>
							{`类组件：使用 React.createRef()
              函数组件：React.forwardRef 使用 例如：
              const Button = React.forwardRef((props, ref) => {
                const inputRef = useRef();
                const methods = {
                  focus: () => {
                    inputRef.current.focus();
                  },
                  aaaa: () => {
                    alert();
                  },
                };
                const a = useImperativeHandle(ref, () => ({ ...methods }));
                return (
                  <button ref={ref} onClick={methods.aaaa}>
                    {props.children}
                  </button>
                );
              });
							`}
						</code>
					</pre>
				</div>
				<div>
					<BaseButton refInfo={this.refInfoHandler}>
						BaseButton 基础函数组件
					</BaseButton>
					<HocButton refInfo={this.HocRefInfoHandler}>
						HocButton 高阶组件
					</HocButton>
					<Button ref={this.state.buttonRef}>button子函数组件</Button>
					<button
						ref={this.state.ref}
						onClick={() => {
							console.log(this.state.buttonRef);
							this.state.buttonRef.current.focus();
							this.state.ref.current.innerHTML = '操作本组件DOM元素';
						}}
					>
						本身组件 点击触发button 子组件方法
					</button>
				</div>
			</div>
		);
	}
}

export default refs;

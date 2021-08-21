import { makeAutoObservable } from 'mobx';
import { getStore, setStore, removeStore } from '../utils/localStore';
class Store {
	constructor() {
		makeAutoObservable(this);
	}
	// 被观察者，你可以理解成Vuex中的State，也就是说，声明一些想要观察的状态，变量。
	// 被观察者可以是：JS基本数据类型、引用类型、普通对象、类实例、数组和映射
	num = 0;
	authed = getStore('authState') == true; //登录状态
	userInfo = {};
	ticket = getStore('ticket') || null;
	id = getStore('id') || null;

	// 计算值是可以根据现有的状态或其它计算值衍生出的值.
	// 计算值不接受参数
	get retunum() {
		return `${this.num}~~~~~~~~`;
	}

	get addNum() {
		return this.num + 10;
	}

	// 使用@action 更改被观察者
	add() {
		this.num++;
	}
	setLoginState({ ticket, id }) {
		this.ticket = ticket;
		this.id = id;
		setStore('ticket', ticket);
		setStore('id', id);
	}
	setUserInfo(value) {
		this.userInfo = value;
		this.authed = true;
		setStore('authState', 1);
	}

	logout() {
		console.log(this);
		this.authed = false;
		this.ticket = null;
		this.id = null;
		removeStore('ticket');
		removeStore('id');
		removeStore('authState');
	}
}
export default new Store();

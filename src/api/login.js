import request from '../utils/request';
// import store from "@/store/index";
const store = {};
/**
 * @name: ZJT
 * @msg: 获取 酒店、注册信息
 * @param {*} user_id
 * @param {*} product_type
 * @return {*}
 */
export function getProductDetail(user_id, product_type) {
	return request({
		url: '',
		method: 'post',
		data: {
			'=[]': {
				join: '<order_detail/order_id,<product/id',
				order: {
					'@column':
						'id,order_sn,user_id,payment_method,order_money,payment_money,pay_time,order_status,memo,method_detail,updatetime',
					user_id: user_id,
					'order_status|{}': [1],
				},
				order_detail: {
					'@column':
						'order_id,product_id,product_name,product_category,product_cnt,product_price,serv_starttime,serv_endtime',
					'order_id@': '/[]/order/id',
					product_category: product_type + 'type',
				},
				product: {
					'@column': 'parentno',
					'id@': '/[]/order_detail/product_id',
				},
			},
		},
	});
}

export function login(data) {
	return request({
		url: '',
		method: 'post',
		data: {
			'%userLogin': {
				'@column': 'username,mobile',
				...data,
			},
		},
	});
}

export function getUserInfo(uid) {
	return request({
		url: '',
		method: 'post',
		data: {
			'=user': {
				'@column': 'id,fullname,avatar,mobile,email,username,roles',
				id: uid,
			},
		},
	});
}
/**
 * @name: ZJT
 * @param {*} searchVal  要搜索的字段
 * @param {*} pageOption 页数
 * @param {*} multiSearchOption 多字段搜索 &&
 * @param {*} sign 身份证刷卡查询
 */
export function getUsers(
	searchOption,
	pageOption,
	multiSearchOption,
	sign = null
) {
	const _userExtFields = store.state.user.userExtFields;
	const _userFields = store.state.user.userFields;
	let _userFieldsCombine = [];
	const _userFieldsFilter = {};
	if (searchOption) {
		_userFieldsCombine = _userFields.map(item => `|${item}$`);
		_userFieldsCombine.push('|id$');
		_userFields.forEach(el => {
			_userFieldsFilter[el + '$'] = `%${searchOption}%`;
		});
		_userFieldsFilter['id$'] = `%${searchOption}%`;
		if (_userFields.idcardno) {
			_userFieldsFilter['idcardno$'] = `%${searchOption}%`;
		}
	}
	console.log(multiSearchOption);
	if (multiSearchOption) {
		for (const key in multiSearchOption) {
			if (multiSearchOption[key]) {
				_userFieldsCombine.push(`&${key}$`);
				_userFieldsFilter[key + '$'] = `%${multiSearchOption[key]}%`;
			}
		}
	}
	if (sign) {
		_userFieldsCombine = ['|fullname$', '|idcardno$'];
		_userFieldsFilter['idcardno|{}'] = [sign.Name, sign.IDC];
		// _userFieldsFilter['fullname|{}'] = [sign.Name, sign.IDC]
	}
	var pageOpt = {};
	if (pageOption) {
		const { page, count } = pageOption;
		pageOpt = {
			page: page,
			count: count,
		};
	}
	return request({
		url: '',
		method: 'post',
		data: {
			'=[]': {
				...pageOpt,
				total: 0,
				join: '<customField/user_id,<checkRecord/user_id',
				user: {
					'@combine':
						_userFieldsCombine.length > 0 ? _userFieldsCombine + '' : '',
					'@column':
						'id,roles,sign,sign_time,group:user_group,register_fee,' +
						_userFields,
					..._userFieldsFilter,
				},
				customField: {
					'@column': 'user_id,' + _userExtFields,
					'user_id@': '/[]/user/id',
					'@order': 'user_id-',
				},
				// checkRecord: {
				//   "@column": "id:record_id,type,card,device,remark,createtime",
				//   "user_id@": "/[]/user/id",
				// }
			},
		},
	});
}
export function getUser(userFields, userExtFields, id) {
	return request({
		url: '',
		method: 'post',
		data: {
			user: {
				'@column': 'id,' + userFields,
				'id|{}': [id],
			},
			'[]': {
				customField: {
					'@column': 'user_id,' + userExtFields,
					'user_id@': '/user/id',
				},
			},
		},
	});
}
export function delUser(id) {
	return request({
		url: '',
		method: 'post',
		data: {
			'*user': {
				'@column': 'id,fullname',
				'id|{}': [id],
				delflag: 1,
			},
		},
	});
}

export function getUserFields() {
	return request({
		url: '',
		method: 'post',
		data: {
			'=[]': {
				access: {
					'@column':
						'type,title,content,rule,msg,ok,isshow,weigh,field,model_name',
					'@order': 'weigh-',
					alias: 'userRegister',
					isshow: 1,
					'field&{}':
						"{}!='',{}!='ticket',{}!='ticketid',{}!='password',{}!='username'",
				},
			},
		},
	});
}

export function editUser(data) {
	const { id, userFields, userExtFields } = data;
	var editExtField = {};
	if (Object.keys(userExtFields).length !== 0) {
		editExtField = {
			'*customField': {
				'user_id|{}': [id],
				...userExtFields,
			},
		};
	}
	return request({
		url: '',
		method: 'post',
		data: {
			'*user': {
				'id|{}': [id],
				...userFields,
			},
			...editExtField,
		},
	});
}
export function addUser(data) {
	const { userFields, userExtFields } = data;
	return request({
		url: '',
		method: 'post',
		data: {
			'+user': {
				'@column': 'id,fullname',
				...userFields,
			},
			'+customField': {
				'@column': 'user_id',
				'user_id@': '/user/id',
				...userExtFields,
			},
		},
	});
}
export function editInfo(data) {
	const { id } = data;
	delete data.id;
	return request({
		url: '',
		method: 'post',
		data: {
			'*user': {
				'@column': 'id,fullname,avatar,mobile,email,username,roles',
				'id|{}': [id],
				...data,
			},
		},
	});
}
export function changePassword(payload) {
	return request({
		url: '',
		method: 'post',
		data: {
			'%changeVerifyField': {
				'@column': 'id',
				...payload,
			},
		},
	});
}

export function importUserExcel(data, teamid = 0) {
	return request({
		url: '',
		method: 'post',
		data: {
			'%importUserExcel': {
				data: data,
				teamid: teamid,
			},
		},
	});
}
export function logout() {
	return request({
		url: '/vue-admin-template/user/logout',
		method: 'post',
	});
}

export function searchUser(searchOption, pageOption) {
	const _userExtFields = store.state.user.userExtFields;
	const _userFields = store.state.user.userFields;
	let _userFieldsCombine = [];
	// let _userExtFieldsCombine = []
	const _userFieldsFilter = {};
	// const _userExtFieldsFilter = {};
	if (searchOption) {
		_userFieldsCombine = _userFields.map(item => `|${item}$`);
		// _userExtFieldsCombine = _userExtFields.map(item => `|${item}$`);
		_userFields.forEach(el => {
			_userFieldsFilter[el + '$'] = `%${searchOption}%`;
		});
		// _userExtFields.forEach(el => {
		//   _userExtFieldsFilter[el + "$"] = `%${searchOption}%`;
		// });
	}
	const { page, count } = pageOption || {
		page: 1,
		count: 10,
	};
	return request({
		url: '',
		method: 'post',
		data: {
			'=[]': {
				page: page,
				count: count,
				total: 0,
				join: '<customField/user_id',
				user: {
					'@combine':
						_userFieldsCombine.length > 0 ? _userFieldsCombine + '' : '',
					'@column': 'id,roles,' + _userFields,
					..._userFieldsFilter,
				},
				customField: {
					// "@combine": _userExtFieldsCombine + '',
					'@column': 'user_id,' + _userExtFields,
					'user_id@': '/[]/user/id',
					// ..._userExtFieldsFilter
				},
			},
		},
	});
}
export function getIdCardInfo(user_id) {
	return request({
		method: 'POST',
		data: {
			'=idCardInfo': {
				'@column': 'user_id',
				user_id: user_id,
			},
		},
	});
}
export function addIdCardInfo(params) {
	return request({
		method: 'POST',
		data: {
			'+idCardInfo': {
				'@column': 'user_id',
				user_id: params.user_id,
				fullname: params.Name,
				gender: params.Gender,
				idcardno: params.IDC,
				nation: params.EthnicName,
				birthday: params.Birth,
				address: params.Address,
				authority: params.IssuingAuthority,
				datestart: params.ValidDateStart,
				dateend: params.ValidDateEnd,
				photo: params.avatar,
			},
		},
	});
}
export function getUserData(id, tablefake, tablefakeField) {
	return request({
		url: '',
		method: 'post',
		data: {
			'=invoice': {
				'@column': 'user_id,' + tablefakeField,
				user_id: id,
			},
		},
	});
}

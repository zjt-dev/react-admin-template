import Cookies from 'js-cookie';
// const TokenKey = 'u_token';
// // 顶级域名  token uid  共享
// const topDomain = process.env.NODE_ENV === 'development' ? '' : 'huijj.cn';
// export function getToken() {
// 	return Cookies.get(TokenKey);
// }
// export function setToken(token) {
// 	return Cookies.set(TokenKey, token, { domain: topDomain });
// }

// export function removeToken() {
// 	return Cookies.remove(TokenKey, { domain: topDomain });
// }

// const UidKey = 'u_id';
// export function getUid() {
// 	return Cookies.get(UidKey);
// }

// export function setUid(Uid) {
// 	return Cookies.set(UidKey, Uid, { domain: topDomain });
// }

// export function removeUid() {
// 	return Cookies.remove(UidKey, { domain: topDomain });
// }

// const domainKey = 'domain';
// export function getDomain() {
// 	return Cookies.get(domainKey);
// }

// export function setDomain(domain) {
// 	return Cookies.set(domainKey, domain);
// }

// export function removeDomain() {
// 	return Cookies.remove(domainKey);
// }
// const authKey = 'authState';
// export function getAuth() {
// 	return Cookies.get(authKey);
// }

// export function setAuth(domain) {
// 	return Cookies.set(authKey, domain);
// }

// export function removeAuth() {
// 	return Cookies.remove(authKey);
// }

export const setStore = (key, value) => Cookies.set(key, value);
export const removeStore = (key, value) => Cookies.remove(key);
export const getStore = (key, value) => Cookies.get(key);

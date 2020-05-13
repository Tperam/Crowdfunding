import Web3 from 'web3';

let web3;

if (typeof window != 'undefined' && typeof window.web3 !== 'undefined'){
	// 获取前端地址
	const metaMask = window.web3.currentProvider;
	web = new Web3(metaMask);
} else {
	const rpcUrl = "http://eth.hujiuyun.xyz:8545";
	const httpProvider = new Web3.providers.HttpProvider(rpcUrl);
	web3 = new Web3(httpProvider);
}

export default web3;
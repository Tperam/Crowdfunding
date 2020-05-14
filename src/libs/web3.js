import Web3 from 'web3';

let web3;
let nodeWeb3;

const rpcUrl = "http://127.0.0.1:8545";
const httpProvider = new Web3.providers.HttpProvider(rpcUrl);
nodeWeb3 = new Web3(httpProvider);

// 判断是否有前端钱包
if (typeof window != 'undefined' && typeof window.web3 !== 'undefined'){
	// 获取前端地址
	const metaMask = window.web3.currentProvider;
	web3 = new Web3(metaMask);

// 使用指定rpcUrl的web3
}else{
	web3 = nodeWeb3;
}


export {nodeWeb3};

export default web3;
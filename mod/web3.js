const Web3 = require("web3") 

// 获取提供者 ( 连接geth和ip地址的rpc对象 )
const httpProviders = new Web3.providers.HttpProvider("http://127.0.0.1:8545")

//获取web3对象
const web3 = new Web3( httpProviders )

// 判断是否连接成功
// if ( web3.isConnected() ){
//         console.log("连接geth成功！")
        
// } else {
//         console.log("连接geth失败！")
        
// }
module.exports = web3
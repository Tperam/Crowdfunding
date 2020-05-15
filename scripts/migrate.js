const Web3 = require("web3") // web3-1.0.0-beta.36
const fs = require("fs-extra")
const path = require("path")

// 连接自己的 geth客户端
const httpProvider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(httpProvider)

// 获取json
const projectListFile = path.resolve(__dirname,"../src/build","ProjectList.json")
// 找到abi 和 bytecode 部署文件需要用到的
const {interface,bytecode} = require(projectListFile)

// 部署方法
async function deployContract(){
    // 获取第一个账号
    const accounts = await web3.eth.getAccounts()
    // 交易对象
    const deployTx = {from:accounts[0],gas:100000000}

    // 部署合约
    const instance = await new web3.eth.Contract( JSON.parse(interface) )
                                .deploy({data:"0x"+bytecode})
                                .send(deployTx) // 使用 accounts[0]账号进行部署
                                .catch( err=>{ console.log("aa",err)})

    // 将部署合约地址保存到ProjectListAddress.json文件中
    console.log("合约地址为:",instance.options.address)
    // 保存路径
    const adrFile = path.resolve(__dirname,"../src/build/ProjectListAddress.json")
    // 写入数据
    fs.writeFileSync(adrFile,JSON.stringify(instance.options.address))
}

deployContract()
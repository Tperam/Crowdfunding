# Crowdfunding DAICO众筹项目

## 项目描述
	利用 Solidity,Ethereum,以及Nodejs等技术完成一个多DAICO模型合约
	一个在运行于eth链上的众筹平台，每一个众筹都是一个合约项目 都是一个以DAICO模型的合约

### 什么是 DAICO
	我们先来看 ICO 的风险和 DAO 的风险：

	ICO ：都面临团队不负责任或者项目仅仅是一个骗局的风险
	DAO ：任何投票系统都面临51%攻击的问题、贿赂选票和其他博弈上的缺陷。
	DAICO 则是两者的组合：在 DAICO 中，这些风险都得到了最小化。

	DAICO 合约由一个需要募集资金的开发团队发布。DAICO 合约有两种模式（贡献模式，自毁模式）由开始生效以后合约进入贡献模式，每个人都可以将以太贡献到合约当中，并得到相应的代币。当贡献阶段结束后，就无法再继续贡献以太，初始的代币余额将设定，之后代币可以被交易。在贡献阶段结束后，合约有一个主要状态变量：tap ，初始值为零。tap 决定每秒钟开发团队可以从合约中提现的数量。也就是说，团队无法从合约地址中直接全部提现。持有代币的人拥有投票权去改变这个 tap 值，投票者可以给开发团队一个合理而不太高的每月预算，假如团队不断证明其能力，预算可以通过投票提高。如果投票者对团队的开发进展不满意，他们可以完全关闭 DAICO合约，DAICO进入“自毁模式”，并取回自己的资金。
摘取:
	作者：牧笛2017
	链接：https://www.jianshu.com/p/e613e7caa332
	来源：简书
	著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 项目要求

> 遵循ERC20

```solidity

// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
	/*
		定义接口
	*/
    function totalSupply() public constant returns (uint); // 总供应
    function balanceOf(address tokenOwner) public constant returns (uint balance); // 查询地址
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining); // 
    function transfer(address to, uint tokens) public returns (bool success); // 直接转账
    function approve(address spender, uint tokens) public returns (bool success); // 授权
    function transferFrom(address from, address to, uint tokens) public returns (bool success); // 从授权之后的from转账到to 

    event Transfer(address indexed from, address indexed to, uint tokens); // 监听事件 当此方法被调用，会通知前端
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens); // 监听事件 当此方法被调用，会通知前端
}

```

> 遵循Dao `去中心化自治组织`
主要用于限制项目发起方的行动，限制他对众筹资金的权力
- 如果在一定时间内没有达到总众筹资金，则直接原路返还给所有投资者
- 当众筹完成之后，项目方可以发起投票申请取钱，每一位投资者都有投票的权力(依据投资金额)，超过50%投票则同意取钱
- 投资者可以在特定的时间内(在项目进行到1/3时,2/3时)，决定是否对项目进行终止，当51%的投资权力认为需要停止项目。则直接按比例退回剩余资金


## 项目目录介绍
```
-- contracts 存放智能合约源码

-- scripts 存放编译合约脚本

-- public react 静态文件 .css .html .js

-- src react前端js
	|-- build 存放合约abi文件，address地址
	|-- Component react组件
	|-- libs 库
```

## 个别特殊变量解析
> 合约中 Decimals变量

比如 `1 token = 3，000 wei` 那么我只使用`300wei`购买token的时候就会产生小数，这个变量主要用来控制你的1个token可以产生多少位的小数。
例如，人民币`1元`能分成`10角`、`100分`，他的decimals就等于2

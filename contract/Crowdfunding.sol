pragma solidity ^0.4.26;



// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
	// 定义接口
    function totalSupply() public constant returns (uint); // 总供应
    function balanceOf(address tokenOwner) public constant returns (uint balance); // 查询地址
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining); // 
    function transfer(address to, uint tokens) public returns (bool success); // 直接转账
    function approve(address spender, uint tokens) public returns (bool success); // 授权
    function transferFrom(address from, address to, uint tokens) public returns (bool success); // 从授权之后的from转账到to 

    event Transfer(address indexed from, address indexed to, uint tokens); // 监听事件 当此方法被调用，会通知前端
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens); // 监听事件 当此方法被调用，会通知前端
}

/*
	当前平台运行
*/
// contract ProjectList{
//     // 合约列表

//     address[] ProjectList public; // 记录项目名

//     // 创建一个项目
// 	function createPorject(address owner, bytes32 name, uint goal, uint maxInvest, uint minInvest, string description) public {
// 		address p1 = new Project(owner,name,goal,maxInvest,minInvest,description);
// 		ProjectList.push(p1);
// 	}
     
// }

/*
	DACIO模型
*/
contract Project is ERC20Interface{
	using SafeMath for uint; // 使用安全库

	address public owner ; // 合约拥有者的地址
	bytes32 public projectName;
	uint public goal ; // 众筹金额
	uint public maxInvest ; // 个人最大投资金额
	uint public minInvest ; // 个人最小投资金额
	string public description ; // 项目描述

	bytes32 symbol; // 币名简称
	bytes32 name; // 币名全程
	uint8 public decimals; // 小数点 bi
    uint public _totalSupply;  // 总供应量
    uint public startDate; // 众筹开始时间
    uint public bonusEnds; // 奖励时间
    uint8 public bonusPercent; // 奖励百分比 bonusPercent = 0.2
    uint public weiToToken; // wei 转换 token价值
    uint public endDate; // 众筹结束时间

	mapping(address=>Investor) investors; // 投资者 地址对应信息

	/*
		allowed[tokenOwner][spender];
		代表 tokenOwner 允许 spender 进行消费，可消费值为value设定值
		可以通过 allowance 方法进行查询
		可以通过 approve 方法进行设置哪个地址可以使用当前账户的特定金额
	*/
    mapping(address => mapping(address => uint)) allowed; // 允许使用资金


	Payment[] public paymentList ; // 投票记录

	struct Investor { // 投资者

		uint amount; // 币
		uint[] votingRecord; // 记录投票的id
		// Payment.id 对应 是否支持
		mapping(uint=>bool) voteResult;

	}

	/*
	当众筹者需要钱了，需要发起一次投票询问投资者是否同意给钱
	超过50%的资金持有者同意则发放给众筹者
	*/
	struct Payment {
		uint id;
		string description; // 用于存放 众筹者对这次金钱需求的描述
		uint amount; // 金额
		bool completed; // 记录当前交易是否取出过 true表示已取出，false表示未取出
		uint votingCount; // 同意的比例
		uint endDate;
	}

	modifier ownerOnly() { 
		require (owner == msg.sender); 
		_;
	}
	modifier completeCrowdfunding(){
		require (now > endDate);
		_;
	}
	modifier investable() { 
		require ((now >= startDate) && (now <= endDate)); 
		_;
	}


	constructor(address _owner, bytes32 _projectName, uint _goal, uint _maxInvest, uint _minInvest, string _description, bytes32 _symbol, bytes32 _name, uint8 _decimals, uint _startDate, uint _bonusEnds, uint8 _bonusPercent, uint _weiToToken, uint _endDate) public{
		owner = _owner;
		projectName = _projectName;
		goal = _goal;
		_totalSupply = 0;
		maxInvest = _maxInvest;
		minInvest = _minInvest;
		description = _description;
		symbol = _symbol;
		name = _name;
		decimals = _decimals;
		startDate = _startDate;
		bonusEnds = _bonusEnds;
		bonusPercent = _bonusPercent;
		weiToToken = _weiToToken;
		endDate = _endDate;
	}

	// 实现 ERC20 接口

	// 当前供应量
	function totalSupply() public view returns (uint){
		return _totalSupply;
	}
	// 查询存款
	function balanceOf(address tokenOwner) public view returns (uint){
		return investors[tokenOwner].amount;
	}
	// 查询允许使用token的账户
	function allowance(address tokenOwner, address spender) public view returns (uint){
		return allowed[tokenOwner][spender];
	}
	// 转账
	function transfer(address to, uint tokens) public returns (bool success){
		// from 默认为 msg.sender
		investor _from = investors[msg.sender];
		investor _to = investors[to];

		require( _from.amount >= tokens); // 转账者的token数量必须大于转账数量

		Payment[] memory ongoingVoting; // 正在进行的投票

		for( uint i=0; i<paymentList.length; i ++){
			// 如果截止时间小于现在时间，那么代表当前投票已经关闭。
			// 如果completed等于true，那么代表当前投票已经通过（）
			if( paymentList[i].endDate < now || completed ){ 

			}
		}
	}


	// 创建一次 投票取钱
	function createPayment(string _description, uint amount,uint endDate) ownerOnly public{
		
		// 创建一次投票
		Payment memory p0 = Payment({
			id: paymentList.length,
			description:_description,
			amount:amount,
			completed: false,
			votingCount: 0,
			endDate:endDate
		});

		// 添加进投票列表里
		paymentList.push(p0);
	}

	// 投票 是否同意取钱
	// id: payment id
	// flag: 是否同意 true = 同意， false = 不同意.
	function approvePayment(uint id, bool flag) public{
		// 寻找是否投过票
		for(uint i=0; i < investors[msg.sender].votingRecord.length; i ++){
	        if ( investors[msg.sender].votingRecord[i]==id ){
	            return;
	        }
		}
		investors[msg.sender].votingRecord.push(id);
		
		if ( flag ){
		    investors[msg.sender].voteResult[id]=flag;
		    paymentList[id].votingCount = paymentList[id].votingCount.add(investors[msg.sender].amount);
		}
		

		
	}


	function () public payable {
		require(now >= startDate && now < endDate);
		uint tokens;
		if (now <= bonusEnds) {
			tokens = msg.value.mul(weiToToken.mul(bonusPercent)); // 1 wei = 1.2 token
		} else {
			tokens = msg.value.mul(weiToToken); // 1 wei = 1 token
		}

		uint totalToken = investors[msg.sender].amount.add(tokens);
		require (totalToken > minInvest); // 限制个人最多购买数量
		require (totalToken < maxInvest); // 个人最小购买数
		investors[msg.sender].amount = totalToken;
		_totalSupply = _totalSupply.add(tokens);
		emit Transfer(address(0), msg.sender, tokens);
	}

	function contribute () payable {}
	
}


/** 
* @title SafeMath 
* @dev Math operations with safety checks that throw on error 
*/ 
library SafeMath { 
	function mul(uint a, uint b) internal pure returns (uint) { 
		uint c = a * b; 
		assert(a == 0 || c / a == b); 
		return c;
	}
	function div(uint a, uint b) internal pure returns (uint) { 
		// assert(b > 0); // Solidity automatically throws when dividing by 0 
		uint c = a / b; 
		// assert(a == b * c + a % b); // There is no case in which this doesn't hold 
		return c; 
	} 
	function sub(uint a, uint b) internal pure returns (uint) { 
		assert(b <= a); 
		return a - b; 
	} 
	function add(uint a, uint b) internal pure returns (uint) { 
		uint c = a + b; 
		assert(c >= a); 
		return c; 
	} 
}

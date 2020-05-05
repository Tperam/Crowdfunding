pragma solidity ^0.4.26;

contract ProjectList{
    // 合约列表

    address[] ProjectList public; // 记录项目名


    // 创建一个项目
	function createPorject(address owner, bytes32 name, uint goal, uint maxInvest, uint minInvest, string description) public {
		address p1 = new Project(owner,name,goal,maxInvest,minInvest,description);
		ProjectList.push(p1);
	}
     
}

contract Project{
	using SafeMath for uint; // 使用安全库

	address owner public; // 合约拥有者的地址
	bytes32 name public; // 合约名称

	uint goal public; // 众筹金额
	uint maxInvest public; // 个人最大投资金额
	uint minInvest public; // 个人最小投资金额
	string description public; // 项目描述

	mapping(address=>Investor) investors; // 投资者 地址对应信息

	Payment[] paymentList public;

	struct Investor { // 投资者

		uint amount; // 投资金额
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
		uint endTime;
	}

	modifier ownerOnly() { 
		require (owner == msg.sender); 
		_; 
	}
	

	// 投资
	function contribute() payable public { // 表明当前方法是可以进行支付的

		uint value = investors[msg.sender].amount.add(msg.value);

		require(value<=maxInvest); // 过滤当前投资大于 maxInvest
		require(value>=minInvest); // 过滤当前投资小于 minInvest
		require(address(this).balance.add(msg.value) > goal); // 判断当前投资总数有没有超过众筹金额

		investors[msg.sender] = value; // 记录
	}

	// 创建一次 投票取钱
	function createPayment(string description, uint amount,uint endTime) ownerOnly public{
		
		// 创建一次投票
		Payment p0 = Payment({
			id: paymentList.length,
			description,
			amount,
			completed: false,
			votingCount: 0,
			endTime
		})

		// 添加进投票列表里
		paymentList.push(p0);
	}

	// 投票 是否同意取钱
	// id: payment id
	// flag: 是否同意 true = 同意， false = 不同意.
	function votePayment(uint id, bool flag){
		if ( !investors[msg.sender].votingRecord[id] && flag){ // 判断是否投过票 没投过票则继续判断 这次投票是否为同意
			investors[msg.sender]
		} 

		
	}


	function() payable public{} // 表明当前合约是可以进行支付的
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

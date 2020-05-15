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
contract ProjectList{
    // 合约列表

	address[] ProjectListAddress; // 记录项目地址

    // 创建一个项目
    /**
		_owner 合约地址
		_projectName 众筹的项目名称
		_goal 众筹的总金额 单位 eth
		_maxInvest 个人最大投资金额 eth
		_minInvest 个人最小投资金额 eth
		_description 项目描述
		_symbol 币简称
		_name 币详细名称
		_decimals 小数
		_startDate 投资开始日期
		_bonusEnd 奖励结束
		_bonusTokenToWei 奖励时 1 token = 多少wei
		_tokenToWei 一eth等于多少token
		_endDate 投资结束日期
	*/
	function createProject(address _owner, bytes32 _projectName, uint _goal, uint _maxInvest, uint _minInvest, string _description, bytes32 _symbol, bytes32 _name, uint8 _decimals, uint _startDate, uint _bonusEnds, uint _bonusTokenToWei, uint _tokenToWei, uint _endDate) public {

		/**
		_owner 合约地址
		_projectName 众筹的项目名称
		_goal 众筹的总金额 单位 eth
		_maxInvest 个人最大投资金额 eth
		_minInvest 个人最小投资金额 eth
		_description 项目描述
		_symbol 币简称
		_name 币详细名称
		_decimals 小数
		_startDate 投资开始日期
		_bonusEnd 奖励金
		_bonusTokenToWei 奖励时 1 token = 多少wei
		_tokenToWei 一eth等于多少token
		_endDate 投资结束日期
		*/
		address p1 = new Project(_owner, _projectName, _goal, _maxInvest, _minInvest, _description, _symbol, _name, _decimals, _startDate, _bonusEnds, _bonusTokenToWei, _tokenToWei, _endDate);

		ProjectListAddress.push(p1);
	}

	// 返回项目列表地址
	function getProjectList() view public returns(address[]){
		return ProjectListAddress;
	}
     
}

/*
	DACIO模型
*/
contract Project is ERC20Interface{
	using SafeMath for uint; // 使用安全库

	address public owner ; // 合约拥有者的地址
	bytes32 public projectName;
	uint public goal ; // 众筹金额 eth
	uint public maxInvest ; // 个人最大投资金额 eth
	uint public minInvest ; // 个人最小投资金额 eth
	string public description ; // 项目描述

	bytes32 symbol; // 币名简称
	bytes32 name; // 币名全程
	uint8 public decimals; // 小数点 
    uint public _totalSupply;  // 总供应量
    uint public startDate; // 众筹开始时间
    uint public bonusEnds; // 奖励时间
    uint public bonusTokenToWei; // 奖励倍率 bonusTokenToWei = 1.2
    uint public tokenToWei; // eth 转换 token价值
    uint public endDate; // 众筹结束时间

    string[] progress;

    address[] investorList; // 起始投资者
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

		uint amount; // tokens
		uint investment; // eth
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
		address accept; // 接受者地址
		string description; // 用于存放 众筹者对这次金钱需求的描述
		uint amount; // 金额
		bool completed; // 记录当前交易是否取出过 true表示已取出，false表示未取出
		uint votingCount; // 同意的金钱总数
		uint endDate; // 结束时间
	}

	modifier ownerOnly() { 
		require (owner == msg.sender,"当前方法只能由合约拥有者执行"); 
		_;
	}


	/**
		_owner 合约地址
		_projectName 众筹的项目名称
		_goal 众筹的总金额 单位 eth
		_maxInvest 个人最大投资金额 eth
		_minInvest 个人最小投资金额 eth
		_description 项目描述
		_symbol 币简称
		_name 币详细名称
		_decimals 小数
		_startDate 投资开始日期
		_bonusEnd 奖励金
		_bonusTokenToWei 奖励时 1 token = 多少wei
		_tokenToWei 一eth等于多少token
		_endDate 投资结束日期
	*/
	constructor(address _owner, bytes32 _projectName, uint _goal, uint _maxInvest, uint _minInvest, string _description, bytes32 _symbol, bytes32 _name, uint8 _decimals, uint _startDate, uint _bonusEnds, uint _bonusTokenToWei, uint _tokenToWei, uint _endDate) public{
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
		bonusTokenToWei = _bonusTokenToWei;
		tokenToWei = _tokenToWei;
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
		Investor storage _from = investors[msg.sender];
		Investor storage _to = investors[to];

		require( _from.amount >= tokens,"转账者的token数量必须大于转账数量"); // 转账者的token数量必须大于转账数量

		uint[] memory ongoingVoting = tool_validPayment(); // 正在进行的投票
		
		// 遍历当前正在执行的投票
		for ( uint i=0; i<ongoingVoting.length; i ++){
			// 判断用户是否投过票
			if ( _from.voteResult[ ongoingVoting[i] ] ){ // 等于true 则代表投过票，当他进行转账时他的权重就需要进行下调
				paymentList[ongoingVoting[i]].votingCount = paymentList[ongoingVoting[i]].votingCount.sub(tokens);
			}
			if ( _to.voteResult[ ongoingVoting[i] ] ){ // 当接受者的投票等于true的时候，增加他的权重
				paymentList[ongoingVoting[i]].votingCount = paymentList[ongoingVoting[i]].votingCount.add(tokens);
			}
		}

		// 进行转账操作
		_from.amount = _from.amount.sub(tokens);
		_to.amount = _to.amount.add(tokens);

		emit Transfer(msg.sender,to,tokens);

		return true;
	}
	// 授权 spender地址用户 可以使用当前账户tokens
	function approve(address spender, uint tokens) public returns (bool success){
		allowed[msg.sender][spender] = tokens;
		emit Approval(msg.sender,spender,tokens);
		return true;
	}

	function transferFrom(address from, address to, uint tokens) public returns (bool success){
		require(allowed[from][msg.sender] >= tokens,"超出允许资金");
		require(investors[from].amount >= tokens,"超出from账户现有资金");

		// 进行转账
		investors[from].amount = investors[from].amount.sub(tokens);
		allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
		investors[to].amount = investors[to].amount.add(tokens);
		emit Transfer(from,to,tokens); // 提交到前端
		return true;
	}


	// 创建一次 投票取钱
	function createPayment(address accept,string _description, uint _amount,uint _endDate) ownerOnly public{
		
		uint[] memory ongoingVoting = tool_validPayment();
		uint totalPrice;
		for( uint i=0; i<ongoingVoting.length; i++){
			totalPrice = totalPrice.add(paymentList[ongoingVoting[i]].amount);
		}
		totalPrice = totalPrice.add(_amount);
		require( totalPrice < address(this).balance ,"当前申请资金超过合约剩余金额");

		// 创建一次投票
		Payment memory p0 = Payment({
			id: paymentList.length,
			accept:accept,
			description:_description,
			amount:_amount,
			completed: false,
			votingCount: 0,
			endDate:_endDate
		});

		// 添加进投票列表里
		paymentList.push(p0);
	}
	function getPayment(uint index) view public returns(uint,address,string,uint,bool,uint,uint){

		require (index >= 0 && index <= paymentList.length,"索引越界");
		
		return (
			paymentList[index].id,
			paymentList[index].accept,
			paymentList[index].description,
			paymentList[index].amount,
			paymentList[index].completed,
			paymentList[index].votingCount,
			paymentList[index].endDate
		);
	}

	function getPaymentListLength() view public returns(uint){
		return paymentList.length;
	}
	// 投票 是否同意取钱
	// id: payment id
	// flag: 是否同意 true = 同意， false = 不同意.
	function approvePayment(uint id, bool flag) public returns(bool){
		// 寻找是否投过票
		for(uint i=0; i < investors[msg.sender].votingRecord.length; i ++){
	        if ( investors[msg.sender].votingRecord[i]==id ){
	            return false;
	        }
		}
		investors[msg.sender].votingRecord.push(id);
		
		if ( flag ){
		    investors[msg.sender].voteResult[id]=flag;
		    paymentList[id].votingCount = paymentList[id].votingCount.add(investors[msg.sender].amount);
		}
		// 投票成功
		return true;
	}

	// 从合约账户取钱
	function doPayment(uint id) ownerOnly public{
		Payment storage p0 = paymentList[id];
		require(!p0.completed,"当前payment以及取过钱"); // 判断是否取过钱
		require(p0.votingCount > _totalSupply.div(2),"支持人数没有超过50%"); // 判断支持人数是否超过51%
		require(p0.amount <= address(this).balance, "资金不够");
		p0.completed = true;
		transfer(p0.accept,p0.amount);
	}

	// 返回当前合约的详细信息
	function getContractInfo() view public returns(address,uint,uint,uint,string,bytes32,bytes32,uint8,uint,uint,uint,uint,uint,uint){
		return (
			owner,
			goal,
			maxInvest,
			minInvest,
			description,
			symbol,
			name,
			decimals,
			_totalSupply,
			startDate,
			bonusEnds,
			bonusTokenToWei,
			tokenToWei,
			endDate
		);
	}

	// 项目方描述项目已经干了什么
	function addProgress(string desc) public{
		progress.push(desc);
	}

	function getProgress(uint index) view public returns(string){
		return progress[index];
	}
	function progressLength() view public returns(uint){
		return progress.length;
	}

	function () public payable {
		require(now >= startDate && now < endDate,"只能在众筹阶段购买");
		uint tokens;
		tokens = getToken(msg.value); // 1 eth = 1.2 token

		uint ethCount = investors[msg.sender].investment.add(msg.value);
		require (ethCount >= minInvest,"不能超过个人最多购买量"); // 限制个人最多购买数量
		require (ethCount <= maxInvest,"不能小于个人最少购买量"); // 个人最小购买数
		require (address(this).balance.add(msg.value) <= goal,"超出投资总额");

		investors[msg.sender].investment = ethCount;
		investors[msg.sender].amount = investors[msg.sender].amount.add(tokens);

		// 判断是否添加过
		if (ethCount == msg.value){ // 等于就代表第一次投资
			investorList.push(msg.sender);
		}

		_totalSupply = _totalSupply.add(tokens);
		// 提交到前端
		emit Transfer(address(0), msg.sender, tokens);
	}

	function contribute () payable public{}

	// 获取token数量
	function getToken(uint value) private view returns(uint token){
		// 确定1token等于多少wei的位数
		uint count = 1;
		uint cp_tokenToWei = tokenToWei;

		// 计算出有多少位
		for(;cp_tokenToWei>=10;cp_tokenToWei/=10){
			count ++;
		}
		// 重置res
		uint decimalPlaces = 1;
		for (uint i=0; i < (count-decimals); i++){
			decimalPlaces.mul(10);
		}

		// 判断是否在奖励阶段
		if (now <= bonusEnds) {
			token = value.div( bonusTokenToWei.div(decimalPlaces) );
		} else {
			token = value.div( tokenToWei.div(decimalPlaces) );
		}
		// 返回: 这次交易所生成的token
		return token;
	}

	// 众筹失败，自动退还已众筹金额
	function crowdfundingFailed() public{
		require(now>=endDate,"未到可退款时间");
		for( uint i=0; i<investorList.length; i++){
			transfer( investorList[i],investors[investorList[i]].investment);
			investors[investorList[i]].investment = 0; // 清空他的投资
		}
	}





	// 工具 - 查询正在进行中的Payment
	function tool_validPayment() private view returns(uint[]){
		uint[] memory ongoingVoting; // 正在进行的投票
		// 将正在进行的投票进行获取
		for( uint i=0; i<paymentList.length; i ++){
			// 如果截止时间大于现在时间，并且completed 不等于true ，那么代表当前投票正在进行。
			if( paymentList[i].endDate > now && !paymentList[i].completed ){ 
				ongoingVoting[ongoingVoting.length] =  i;
			}
		}
		return ongoingVoting;
	}

	
	
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

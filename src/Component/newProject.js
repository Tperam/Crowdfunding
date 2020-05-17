import React from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import web3 from "../libs/web3";
import ProjectListContract from '../libs/projectList';

class newProject extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			projectName: "",
			goal: 0,
			maxInvest: 0,
			minInvest: 0,
			description: "",
			symbol: "",
			name: "",
			decimals: 0,
			startDate: 0,
			bonusEnd: 0,
			bonusTokenToWei: 0,
			endDate: 0,
			tokenToWei:0,
			errors :{},
			createError:"",
			createRes:""
		};

		this.handleNewProject = this.handleNewProjectInput()
	}

	// 处理验证input表单
	handleNewProjectInput(){
		return {

			setProjectName(event){
				const value = event.target.value.trim();
				// 判断是否为空
				if ( !(/^$/).test(value) ){
					this.setState({projectName:value});

					// 深度复制 避免覆盖 errors中其他对象
					let errors = Object.assign({},this.state.errors);
					errors.projectName = null;
					this.setState({
						errors:errors
					});
					return true;
					
				} else {
					// 深度复制
					let errors = Object.assign({},this.state.errors);
					errors.projectName = "projectname不能为空";
					this.setState({
						errors: errors,
						projectName: ""
					});
					return false;
				}
			},


			setGoal(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( (/^\d+$/).test(value) ){
					this.setState({goal:value});

					let errors = Object.assign({},this.state.errors);
					errors.goal = null;
					this.setState({
						errors:errors
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.goal = "goal必须为数字";
					this.setState({
						errors: errors,
						goal: 0
					});
					return false;
				}
			},

			setMaxInvest(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( (/^\d+$/).test(value) && parseInt(value) >= this.state.minInvest && parseInt(value) <= this.state.goal){

					let errors = Object.assign({},this.state.errors);
					errors.maxInvest = null;
					this.setState({
						errors:errors,
						maxInvest:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.maxInvest = "maxInvest必须为数字，必须大于或等于minInvest,必须小于等于goal";
					this.setState({
						errors: errors,
						maxInvest: 0
					});
					return false;
				}
			},

			setMinInvest(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( (/^\d+$/).test(value) && parseInt(value) <= this.state.maxInvest){
					let errors = Object.assign({},this.state.errors);
					errors.minInvest = null;
					this.setState({
						errors:errors,
						minInvest:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.minInvest = "minInvest必须为数字，必须小于或等于maxInvest";
					this.setState({
						errors: errors,
						minInvest: 0
					});
					return false;
				}
			},

			setSymbol(event){
				const value = event.target.value.trim();
				// 判断是否为空
				if ( !(/^$/).test(value)){

					let errors = Object.assign({},this.state.errors);
					errors.symbol = null;
					this.setState({
						errors:errors,
						symbol:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.symbol = "symbol不能为空";
					this.setState({
						errors: errors,
						symbol: ""
					});
					return false;
				}
			},

			setName(event){
				const value = event.target.value.trim();
				// 判断是否为空
				if ( !(/^$/).test(value)){

					let errors = Object.assign({},this.state.errors);
					errors.name = null;
					this.setState({
						errors:errors,
						name:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.name = "name不能为空";
					this.setState({
						errors: errors,
						name: ""
					});
					return false;
				}
			},

			setTokenToWei(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( (/^\d+$/).test(value)){

					let errors = Object.assign({},this.state.errors);
					errors.tokenToWei = null;
					this.setState({
						errors:errors,
						tokenToWei:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.tokenToWei = "tokenToWei不能为空";
					this.setState({
						errors: errors,
						tokenToWei: ""
					});
					return false;
				}
			},

			setDecimal(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( (/^\d+$/).test(value)){

					let errors = Object.assign({},this.state.errors);
					errors.decimals = null;
					this.setState({
						errors:errors,
						decimal:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.decimals = "decimal必须为数字";
					this.setState({
						errors: errors,
						decimal: ""
					});
					return false;
				}
			},

			setStartDate(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( (/^[0-9]{4}\-[0-1][0-9]\-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).test(value)){
					var unix = Date.parse(new Date(value))/1000;
					let errors = Object.assign({},this.state.errors);
					errors.startDate = null;
					this.setState({
						errors:errors,
						startDate:unix
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.startDate = "日期格式为: yyyy-MM-dd HH:mm:ss";
					this.setState({
						errors: errors,
						startDate: 0
					});
					return false;
				}
			},

			setEndDate(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( (/^[0-9]{4}\-[0-1][0-9]\-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).test(value)){
					var unix = Date.parse(new Date(value))/1000;
					let errors = Object.assign({},this.state.errors);
					errors.endDate = null;
					this.setState({
						errors:errors,
						endDate:unix
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.endDate = "日期格式为: yyyy-MM-dd HH:mm:ss";
					this.setState({
						errors: errors,
						endDate: 0
					});
					return false;
				}
			},

			setbonusEnd(event){
				const value = event.target.value.trim();
				// 判断是否是日期
				if ( (/^[0-9]{4}\-[0-1][0-9]\-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).test(value)){
					var unix = Date.parse(new Date(value))/1000;
					let errors = Object.assign({},this.state.errors);
					errors.bonusEnd = null;
					this.setState({
						errors:errors,
						bonusEnd:unix
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.bonusEnd = "日期格式为: yyyy-MM-dd HH:mm:ss";
					this.setState({
						errors: errors,
						bonusEnd: 0
					});
					return false;
				}
			},

			setbonusTokenToWei(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( (/^\d+$/).test(value)){

					let errors = Object.assign({},this.state.errors);
					errors.bonusTokenToWei = null;
					this.setState({
						errors:errors,
						bonusTokenToWei:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.bonusTokenToWei = "奖励时间token价值必须为数字";
					this.setState({
						errors: errors,
						bonusTokenToWei: ""
					});
					return false;
				}
			},

			setDescription(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( !(/^$/).test(value)){

					let errors = Object.assign({},this.state.errors);
					errors.description = null;
					this.setState({
						errors:errors,
						description:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.description = "description不能为空";
					this.setState({
						errors: errors,
						description: ""
					});
					return false;
				}
			},
		}
	}

	// 创建众筹项目
	async createProject(){
		// 判断是否有metamask
		if (typeof window.web3 == 'undefined'){
			// 弹出错误，没有前端钱包
			this.setState({
				createError:"没有发现前端钱包!"
			})
			return false;
		}
		// 获取账号 
		let accounts = await web3.eth.getAccounts();

		if (accounts.length === 0){
			// 弹出错误，提示请给本网站授权
			this.setState({
				createError:"无法连接到前端钱包!"
			})
			return false;
		}

		// 开始判断输入
		let project = {
			owner: accounts[0],
			projectName: this.state.projectName,
			goal: await web3.utils.toWei(this.state.goal.toString(),"ether"),
			maxInvest: await web3.utils.toWei(this.state.maxInvest.toString(),"ether"),
			minInvest: await web3.utils.toWei(this.state.minInvest.toString(),"ether"),
			description: this.state.description,
			symbol: this.state.symbol,
			name: this.state.name,
			decimals: this.state.decimals,
			startDate: this.state.startDate,
			bonusEnd: this.state.bonusEnd,
			bonusTokenToWei: this.state.bonusTokenToWei,
			tokenToWei: this.state.tokenToWei,
			endDate: this.state.endDate
		}
		// 判断projectName
		if (/^$/.test(project.projectName)){
			this.setState({
				createError:"project name 为空"
			})
			return false;
		}
		// 判断goal
		if (!/^\d+$/.test(project.goal)){
			this.setState({
				createError:"goal必须为数字"
			})
			return false;
		}
		// 判断 MaxInvest
		// 是否是数字 && 是否大于minInvest && 是否小于goal
		if (!(/^\d+$/.test(project.maxInvest) && project.maxInvest>=project.minInvest && project.maxInvest <= project.goal)){
			this.setState({
				createError:"检查MaxInvest是否是数字，并检查是否大于minInvest，是否小于goal"
			})
			return false;
		}
		// 判断 MinInvest
		if (!/^\d+$/.test(project.maxInvest)){
			this.setState({
				createError:"检查MinInvest是否是数字"
			})
			return false;
		}
		// 判断 symbol 和 name
		if (/^$/.test(project.symbol) || /^$/.test(project.name)){
			this.setState({
				createError:"symbol或者name选项为空"
			})
			return false;
		}
		// 判断 tokenToWei bonusTokenToWei
		if (!/^\d+$/.test(project.tokenToWei) && !/^\d+$/.test(project.bonusTokenToWei)){
			this.setState({
				createError:"1 token兑换wei 或者 奖励时间token价值 栏目必须为数字,"
			})
			return false;
		}
		// 判断 Decimals
		if (!/^\d+$/.test(project.decimals) && project.tokenToWei/Math.pow(10,project.decimals-1) > 0){
			this.setState({
				createError:"decimals必须为数字,并且tokenToWei/10的"+project.decimals+"次幂不能小于0"
			})
			return false;
		}
		// 判断所有日期 startDate bonusEnd endDate
		if ( !(project.startDate<=project.bonusEnd && project.bonusEnd<=project.endDate) ){
			this.setState({
				createError:"众筹开始时间必须小于等于奖励结束日期，奖励日期必须小于等于众筹结束时间"
			})
			return false;
		}
		// 判断描述是否为空
		if ( /^$/.test(project.description)){
			this.setState({
				createError:"项目描述不能为空"
			})
			return false;
		}
		// 判断结束 输入值没有错误

		// 使用合约ProjectList调用createProject方法

				// 调用方法 创建合约
		ProjectListContract.methods.createProject(
				project.owner,
				web3.utils.fromUtf8(project.projectName),
				project.goal,
				project.maxInvest,
				project.minInvest,
				project.description,
				web3.utils.fromUtf8(project.symbol),
				web3.utils.fromUtf8(project.name),
				project.decimals,
				project.startDate,
				project.bonusEnd,
				project.bonusTokenToWei,
				project.tokenToWei,
				project.endDate,
			)
			.send({from:accounts[0],gas:"5000000"},function(err,res){
				if (err){
					console.log(err);
					this.setState({
						createError:"交易失败，请联系管理员",
						createRes:""
					})
				}
				this.setState({
					createError:"",
					createRes:"您已成功创建项目！"
				})

			}.bind(this))


		
	}

	render () {
		return (
			<Form>
				<Alert variant="danger" show={this.state.createError}>
					{this.state.createError}
				</Alert>

				<Alert variant="success" show={this.state.createRes}>
					{this.state.createRes}
				</Alert>

				<Form.Group controlId="formProjectName">
					<Form.Label>项目名称</Form.Label>

					<Form.Control placeholder="Project name" isInvalid={this.state.errors.projectName} isValid={this.state.projectName} onBlur={  this.handleNewProject.setProjectName.bind(this) } />
					<Form.Control.Feedback type="invalid">
					{this.state.errors.projectName}
					</Form.Control.Feedback>

				</Form.Group>

				<Form.Group controlId="formGoal">
					<Form.Label>众筹金额(eth)</Form.Label>
					<Form.Control placeholder="Goal" isInvalid={this.state.errors.goal} isValid={this.state.goal} onBlur={  this.handleNewProject.setGoal.bind(this)  } />
					<Form.Control.Feedback type="invalid">
					{this.state.errors.goal}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Row>
					<Form.Group as={Col} controlId="formMaxInvest">
						<Form.Label>个人最大投资(eth)</Form.Label>
						<Form.Control placeholder="MaxInvest" isInvalid={this.state.errors.maxInvest} isValid={this.state.maxInvest} onBlur={  this.handleNewProject.setMaxInvest.bind(this)  }/>
						<Form.Control.Feedback type="invalid">
						{this.state.errors.maxInvest}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formMinInvest">
						<Form.Label>个人最小投资(eth)</Form.Label>
						<Form.Control placeholder="MinInvest" isInvalid={this.state.errors.minInvest} isValid={this.state.minInvest} onBlur={  this.handleNewProject.setMinInvest.bind(this)  } />
						<Form.Control.Feedback type="invalid">
						{this.state.errors.minInvest}
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} controlId="formSymbol">
						<Form.Label>众筹代币名称</Form.Label>
						<Form.Control placeholder="Symbol" isInvalid={this.state.errors.symbol} isValid={this.state.symbol} onBlur={  this.handleNewProject.setSymbol.bind(this)  } />
						<Form.Control.Feedback type="invalid">
						{this.state.errors.symbol}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formName">
						<Form.Label>众筹代币详细名称</Form.Label>
						<Form.Control placeholder="name" isInvalid={this.state.errors.name} isValid={this.state.name} onBlur={  this.handleNewProject.setName.bind(this)  } />
						<Form.Control.Feedback type="invalid">
						{this.state.errors.name}
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>


				<Form.Row>
					<Form.Group as={Col} controlId="formStartDate">
						<Form.Label>1 token兑换wei</Form.Label>
						<Form.Control placeholder="Token to wei" isInvalid={this.state.errors.tokenToWei} isValid={this.state.tokenToWei} onBlur={  this.handleNewProject.setTokenToWei.bind(this)  } />
						<Form.Text className="text-muted">1token需要多少wei(1eth=1,000,000,000,000,000,000wei)</Form.Text>
						<Form.Control.Feedback type="invalid">
						{this.state.errors.tokenToWei}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formDecimal">
						<Form.Label>代币小数位</Form.Label>
						<Form.Control placeholder="Decimal" isInvalid={this.state.errors.decimal} isValid={this.state.decimal} onBlur={  this.handleNewProject.setDecimal.bind(this)  } />
						<Form.Text className="text-muted">默认为0(1token是否可以有小数点 单token是否可拆分)</Form.Text>
						<Form.Control.Feedback type="invalid">
						{this.state.errors.decimals}
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} controlId="formStartDate">
						<Form.Label>开始众筹日期</Form.Label>
						<Form.Control placeholder="Start Date" isInvalid={this.state.errors.startDate} isValid={this.state.startDate} onBlur={  this.handleNewProject.setStartDate.bind(this)  } />
						<Form.Text className="text-muted">不填写默认为当前时间</Form.Text>
						<Form.Control.Feedback type="invalid">
						{this.state.errors.startDate}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formEndDate">
						<Form.Label>结束众筹日期</Form.Label>
						<Form.Control placeholder="End Date" isInvalid={this.state.errors.endDate} isValid={this.state.endDate} onBlur={  this.handleNewProject.setEndDate.bind(this)  } />
						<Form.Text className="text-muted">众筹日期截止</Form.Text>
						<Form.Control.Feedback type="invalid">
						{this.state.errors.endDate}
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>


				<Form.Row>
					<Form.Group as={Col} controlId="formbonusEnd">
						<Form.Label>众筹奖励结束日期</Form.Label>
						<Form.Control placeholder="bonusEnd" isInvalid={this.state.errors.bonusEnd} isValid={this.state.bonusEnd} onBlur={  this.handleNewProject.setbonusEnd.bind(this)  } />
						<Form.Text className="text-muted">奖励结束日期 (可以用相同的钱买到更多的token 可以为0)</Form.Text>
						<Form.Control.Feedback type="invalid">
						{this.state.errors.bonusEnd}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formbonusTokenToWei">
						<Form.Label>奖励时间token价值</Form.Label>
						<Form.Control placeholder="bonus Token to wei" isInvalid={this.state.errors.bonusTokenToWei} isValid={this.state.bonusTokenToWei} onBlur={  this.handleNewProject.setbonusTokenToWei.bind(this)  } />
						<Form.Text className="text-muted">1token在奖励时间内需要多少wei购买(1eth=1,000,000,000,000,000,000wei)</Form.Text>
						<Form.Control.Feedback type="invalid">
						{this.state.errors.bonusTokenToWei}
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>项目描述</Form.Label>
					<Form.Control as="textarea" rows="5" isInvalid={this.state.errors.description} isValid={this.state.description} onBlur={  this.handleNewProject.setDescription.bind(this)  } />
					<Form.Control.Feedback type="invalid">
					{this.state.errors.description}
					</Form.Control.Feedback>
				</Form.Group>



				<Button variant="primary" type="button" onClick={this.createProject.bind(this)}>
					Submit
				</Button>
			</Form>
		);
	}

};

export default newProject;
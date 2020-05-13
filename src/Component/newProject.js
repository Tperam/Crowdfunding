import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

class newProject extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			owner: "",
			projectName: "",
			goal: 0,
			maxInvest: 0,
			minInvest: 0,
			description: "",
			symbol: "",
			name: "",
			decimals: 0,
			startDate: 0,
			bounsEnd: 0,
			bounsTokenToWei: 0,
			endDate: 0,
			tokenToWei:0,
			errors :{

			}
		};

		this.handleNewProject = this.handleNewProjectInput()
	}

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
				if ( (/^\d+$/).test(value) && value >= this.state.minInvest){

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
					errors.maxInvest = "maxInvest必须为数字，必须大于或等于minInvest";
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
				if ( (/^\d+$/).test(value) && value >= this.state.maxInvest){

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
					errors.minInvest = "minInvest必须为数字，必须小于或等于minInvest";
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
					errors.decimal = null;
					this.setState({
						errors:errors,
						decimal:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.decimal = "decimal必须为数字";
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
					var unix = value;
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
					var unix = value;
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

			setBounsEnd(event){
				const value = event.target.value.trim();
				// 判断是否是日期
				if ( (/^[0-9]{4}\-[0-1][0-9]\-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).test(value)){
					var unix = value;
					let errors = Object.assign({},this.state.errors);
					errors.bounsEnd = null;
					this.setState({
						errors:errors,
						bounsEnd:unix
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.bounsEnd = "日期格式为: yyyy-MM-dd HH:mm:ss";
					this.setState({
						errors: errors,
						bounsEnd: 0
					});
					return false;
				}
			},

			setBounsTokenToWei(event){
				const value = event.target.value.trim();
				// 判断是否全是数字
				if ( (/^\d+$/).test(value)){

					let errors = Object.assign({},this.state.errors);
					errors.bounsTokenToWei = null;
					this.setState({
						errors:errors,
						bounsTokenToWei:value
					});
					return true;

				} else {
					//深度复制
					let errors = Object.assign({},this.state.errors);
					errors.bounsTokenToWei = "symbol不能为空";
					this.setState({
						errors: errors,
						bounsTokenToWei: ""
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

		

		// // 将className 设置为 isValid
		// function setValid(event){

		// 	// 检测里面是否有 is-valid
		// 	if (!event.target.className.match("is-valid")){

		// 		var strArr = event.target.className.split(" is-invalid");
		// 		strArr.push("is-valid");
		// 		event.target.className = strArr.join(" ");
		// 	}
		// }
		// // 将className 设置为 isValid
		// function setInValid(event){

		// 	// 检测里面是否有 is-valid
		// 	if (!event.target.className.match("is-invalid")){

		// 		var strArr = event.target.className.split(" is-valid");
		// 		strArr.push("is-invalid");
		// 		event.target.className = strArr.join(" ");
		// 	}
		// }
	}

	printContent(){
		console.log(this.state);
	}

	render () {
		return (
			<Form className="container mt40 mb40">

				<Form.Group controlId="formProjectName" className="has-success has-feedback">
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
					<Form.Group as={Col} controlId="formBounsEnd">
						<Form.Label>众筹奖励结束日期</Form.Label>
						<Form.Control placeholder="BounsEnd" isInvalid={this.state.errors.bounsEnd} isValid={this.state.bounsEnd} onBlur={  this.handleNewProject.setBounsEnd.bind(this)  } />
						<Form.Text className="text-muted">奖励结束日期 (可以用相同的钱买到更多的token 可以为0)</Form.Text>
						<Form.Control.Feedback type="invalid">
						{this.state.errors.bounsEnd}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formbounsTokenToWei">
						<Form.Label>奖励时间token价值</Form.Label>
						<Form.Control placeholder="Bouns Token to wei" isInvalid={this.state.errors.bounsTokenToWei} isValid={this.state.bounsTokenToWei} onBlur={  this.handleNewProject.setBounsTokenToWei.bind(this)  } />
						<Form.Text className="text-muted">1token在奖励时间内需要多少wei购买(1eth=1,000,000,000,000,000,000wei)</Form.Text>
						<Form.Control.Feedback type="invalid">
						{this.state.errors.bounsTokenToWei}
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



				<Button variant="primary" type="button" onClick={this.printContent.bind(this)}>
					Submit
				</Button>
			</Form>
		);
	}

};

export default newProject;
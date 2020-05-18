import React from 'react';
import { Table, Form, Modal, Button, Row, Col } from 'react-bootstrap';
import web3 from '../libs/web3';
import getProjectContract from '../libs/project';

class Project extends React.Component{
	constructor(props){
		super(props);
		// 获取 路由参数address
		this.state = {
			project:{
				// 此处一定要实例化一下(new Date())，否则下面setState不起作用
				startDate: new Date(),
				bonusEnds: new Date(),
				endDate: new Date()
			},
			investInputShow:false,
		}

		// 获取地址
		this.address = this.props.match.params.address;
		// 获取合约实例
		this.instance = getProjectContract(this.address);

		this.getInfo();
	}

	async getInfo(){

		let details = await this.instance.methods.getDetails().call();
		let [
			owner,
			projectName,
			goal,
			maxInvest,
			minInvest,
			description,
			symbol,
			name,
			decimals,
			startDate,
			bonusEnds,
			bonusTokenToWei,
			tokenToWei,
			endDate
		] = Object.values(details);
		let totalSupply = await this.instance.methods.totalSupply().call()
		let balance = await web3.eth.getBalance(this.address)

		let _project = {
			address: this.address,
			owner,
			projectName: web3.utils.toUtf8(projectName),
			goal: web3.utils.fromWei(goal,"ether"),
			maxInvest: web3.utils.fromWei(maxInvest,"ether"),
			minInvest: web3.utils.fromWei(minInvest,"ether"),
			description,
			symbol: web3.utils.toUtf8(symbol),
			name: web3.utils.toUtf8(name),
			decimals,
			startDate: new Date(startDate*1000),
			bonusEnds: new Date(bonusEnds*1000),
			bonusTokenPrice: web3.utils.fromWei(bonusTokenToWei,"ether"),
			tokenPrice: web3.utils.fromWei(tokenToWei,"ether"),
			endDate: new Date(endDate*1000),
			balance: web3.utils.fromWei(balance),
			totalSupply: totalSupply
		};

		this.setState({
			project: _project,
		})

	}

	async invest(){
		let ethNum = this.refs.investInput.value.trim()
		// 判断是不是数字
		if ( ! (/^\d+$/).test(ethNum)){
			alert("不是数字")
			return false;
		}
		// 判断是否有前端钱包
		if (typeof window.web3 == 'undefined'){
			// 弹出错误，没有前端钱包
			alert("没有前端钱包")
			return false;
		}

		let accounts = await web3.eth.getAccounts();

		this.instance.methods.contribute().send({from:accounts[0],value:web3.utils.toWei(ethNum,"ether"),gas:5000000})

		alert("请在钱包账户上进行支付！")

		this.setState({ 
			investInputShow:false
		})
	}

	render(){
		return (
			<div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th align="right">项目地址:</th>
							<th colSpan="3">{this.state.project.address}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>项目名:</td>
							<td>{this.state.project.projectName}</td>
							<td>众筹金额</td>
							<td>{this.state.project.goal} eth</td>
						</tr>
						<tr>
							<td>最大投资金额</td>
							<td>{this.state.project.maxInvest} eth</td>
							<td>最小投资金额</td>
							<td>{this.state.project.minInvest} eth</td>
						</tr>
						<tr>
							<td>项目币简称</td>
							<td>{this.state.project.symbol}</td>
							<td>项目币全称</td>
							<td>{this.state.project.name}</td>
						</tr>
						<tr>
							<td>token价值</td>
							<td>{this.state.project.tokenPrice} eth</td>
							<td>多少位小数</td>
							<td>{this.state.project.decimals}</td>
						</tr>
						<tr>
							<td>开始时间</td>
							<td>
								{this.state.project.startDate.getFullYear()}年{this.state.project.startDate.getMonth()+1}月{this.state.project.startDate.getDate()+1}日
								{this.state.project.startDate.getHours()}时{this.state.project.startDate.getMinutes()}分{this.state.project.startDate.getSeconds()}秒
							</td>
							<td>结束时间</td>
							<td>
								{this.state.project.endDate.getFullYear()}年{this.state.project.endDate.getMonth()+1}月{this.state.project.endDate.getDate()+1}日
								{this.state.project.endDate.getHours()}时{this.state.project.endDate.getMinutes()}分{this.state.project.endDate.getSeconds()}秒
							</td>
						</tr>
						<tr>
							<td>奖励截止时间</td>
							<td>
								{this.state.project.bonusEnds.getFullYear()+1}年{this.state.project.bonusEnds.getMonth()+1}月{this.state.project.bonusEnds.getDate()+1}日
								{this.state.project.bonusEnds.getHours()}时{this.state.project.bonusEnds.getMinutes()}分{this.state.project.bonusEnds.getSeconds()}秒
							</td>
							<td>奖励时token价值</td>
							<td>{this.state.project.bonusTokenPrice} eth</td>
						</tr>
						<tr>
							<td>剩余钱数/已募资资金</td>
							<td>{this.state.project.balance} eth</td>
							<td>总发币数量</td>
							<td>{this.state.project.totalSupply}</td>
						</tr>
						<tr>
							<td>项目描述</td>
							<td colSpan="3"> 
								<Form.Control as="textarea" rows="10" value={this.state.project.description}/>
							</td>
						</tr>
					</tbody>
				</Table>
				<Row>
					<Col><Button onClick={ ()=> this.setState({ investInputShow:true }) }>投资</Button></Col>
					<Col><Button></Button></Col>
					<Col><Button></Button></Col>
				</Row>

				<Modal
					show={this.state.investInputShow}

					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							投资
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>投资金额(eth)</Form.Label>
							<Form.Control type="text" placeholder="eth num" ref="investInput"/>
							<Form.Text className="text-muted">
								填入投资金额，不能大于最大投资金额，也不能小于最小投资金额 必须为数字
							</Form.Text>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={ this.invest.bind(this) }>投资</Button>
						<Button onClick={ ()=> this.setState({ investInputShow:false }) }>Close</Button>
					</Modal.Footer>
				</Modal>

			</div>
		);
	}
}

export default Project;
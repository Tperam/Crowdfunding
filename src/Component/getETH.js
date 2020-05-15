import React from 'react'
import web3,{nodeWeb3} from '../libs/web3';
import { Form, Alert, Button } from 'react-bootstrap';


class getETH extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			res:"",
			error:""
		};
		window.nodeWeb3 = nodeWeb3;
	}

	async getETH(){
		const ethNum = this.refs.ethInput.value.trim();
		// 判断是否有metamask
		if (typeof window.web3 == 'undefined'){
			// 弹出错误，没有前端钱包
			this.setState({
				error:"没有发现前端钱包!"
			})
			return false;
		}
		// 获取账号 
		const accounts = await web3.eth.getAccounts();

		if (accounts.length === 0){
			// 弹出错误，提示请给本网站授权
			this.setState({
				error:"无法连接到前端钱包!"
			})
			return false;
		}

		if ( !(/^\d+$/.test(ethNum)) ){
			this.setState({
				error:"eth只能为数字"
			});
			return false;
		}
		const webAccounts = await nodeWeb3.eth.getAccounts();

		const num = await nodeWeb3.eth.getBalance(webAccounts[0]);

		const getNum = web3.utils.toWei(ethNum,"ether");

		if (getNum > num){
			// 提示无法取出
			this.setState({
				error:"测试账号余额不足，测试账号剩余:"+num+"wei"
			});
			return false;
		}

		nodeWeb3.eth.sendTransaction({from:webAccounts[0],to:accounts[0],gas:5000000,value:getNum})
			.on("receipt",function(receipt){
				this.setState({
					error:"",
					res:"已有交易收据!"
				})
			})
			.on("confirmation",function(){
				this.setState({
					error:"",
					res:"交易成功!"
				})
			})
			.on('error', function(err){
				this.setState({
					error:err,
					res:""
				})
			});

		this.setState({
			error:"",
			res:"获取eth成功！"
		})
	}

	render(){
		return (
			<Form>

				<Alert variant="success" show={this.state.res}>
					{this.state.res}
				</Alert>

				<Alert variant="danger" show={this.state.error}>
					{this.state.error}
				</Alert>

				<Form.Group controlId="formBasicEmail">
					<Form.Label>获取eth(非公网)</Form.Label>
					<Form.Control type="text" placeholder="eth num" ref="ethInput" />
					<Form.Text className="text-muted">
						eth为单位(1eth = 1,000,000,000,000,000,000wei)
					</Form.Text>
				</Form.Group>

				<Button variant="primary" type="button" onClick={this.getETH.bind(this)}>
					获取eth
				</Button>
			</Form>
		)
	}
}


export default getETH;
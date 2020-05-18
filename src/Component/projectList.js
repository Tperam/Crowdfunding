import React from 'react';
import { Card, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import web3 from  '../libs/web3';
import ProjectListContract from '../libs/projectList';
import getProjectContract from '../libs/project';

class ProjectList extends React.Component{

	constructor( props){
		super(props);
		this.state = {
			projects:[]
		}
		window.testWeb3 = web3
	}

	async componentWillMount(){
		// 获取所有众筹项目的地址
    	const addresses = await ProjectListContract.methods.getProjectList().call();
    	// 获取projectInfoList
    	const projectList = await Promise.all(addresses.map(address=> getProjectContract(address).methods.getGeneralInfo().call() ));
    	const investorNum = await Promise.all(addresses.map(address=> getProjectContract(address).methods.getInvestorNum().call() ));

    	let projects = projectList.map( (obj,index)=>{

    		let [
				projectName,
				goal,
				maxInvest,
				minInvest,
				description,
				symbol,
				bonusEnds,
				balance
    		]=Object.values(obj);

    		return {
    			projectName: web3.utils.toUtf8(projectName),
				goal: web3.utils.fromWei(goal,"ether"),
				maxInvest: web3.utils.fromWei(maxInvest,"ether"),
				minInvest: web3.utils.fromWei(minInvest,"ether"),
				description,
				symbol: web3.utils.toUtf8(symbol),
				bonusEnds,
				balance: web3.utils.fromWei(balance,"ether"),
				investorNum: investorNum[index][0],
				address:addresses[index]
			}
    	} )

    	this.setState({
    		projects:projects
    	})
	}

	render(){
		let projectListInfo = this.state.projects.map( (project,index)=>{
			let flagBonusTime = project.bonusEnds > Date.parse(new Date())/1000;
			let precentComplete = ((project.balance / project.goal)*100).toFixed(2);
			// let precentComplete = 50.66;
			return (
	    		<Card className={"mt40"} key={index}>
					<Card.Header>
						{project.projectName}
						<div className={"investorNum"}>已投资人数: {project.investorNum}人</div>
					</Card.Header>
					<Card.Body >
						<ProgressBar animated variant={flagBonusTime?"warning":"success"} now={precentComplete}  label={precentComplete+"%"} className="mb20"/>
						<Card.Title className="textHidden">{project.description}</Card.Title>
						<Card.Text as={Row} className="mb20">
							<Col>goal: <span className={"red"}>{project.goal}</span> eth</Col>
							<Col>maxInvest: <span className={"red"}>{project.maxInvest}</span> eth</Col>
							<Col>minInvest: <span className={"red"}>{project.minInvest}</span> eth</Col>
							<Col>众筹完成度: <span className={"red"}>{precentComplete}%</span></Col>
					    </Card.Text>
					    <Row>
							<Col xs={{ span: 2, offset: 10 }}><Button as={Link} to={"/projectDetail/"+project.address} variant={flagBonusTime?"warning":"success"} size="sm">Learn more</Button></Col>
						</Row>
					</Card.Body>
				</Card>
			)
		})

		return (
			<div>
				<h1>众筹列表</h1>
				{ projectListInfo }
			</div>
		);
	}
}

export default ProjectList;
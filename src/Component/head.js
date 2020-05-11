import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Head extends React.Component{

	constructor( ...args){
		super(...args);
	}


	componentWillMount() {
		this.state = {
			count:1
		};
	}
	render(){
		return (
			<Navbar bg="dark" variant="dark" expand="lg" >
				<div className="container">
					<Navbar.Brand href="home">众筹DApp</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Item>
							<Link to="/" className="nav-link">Home</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to="/newproject" className="nav-link">创建一个众筹项目</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to="/project" className="nav-link">Pricing</Link>
						</Nav.Item>
					</Nav>
				</div>
			</Navbar>
		);
	}
}
export default Head;
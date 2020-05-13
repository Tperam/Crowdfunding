import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Head extends React.Component{


	render(){
		return (
			<Navbar bg="dark" variant="dark" expand="lg" >
				<div className="container">
					<Navbar.Brand href="home">众筹DApp</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Item>
							<Nav.Link as={Link} to="/">Home</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to="/newproject">创建一个众筹项目</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to="/project">投资</Nav.Link>
						</Nav.Item>
					</Nav>
				</div>
			</Navbar>
		);
	}
}
export default Head;
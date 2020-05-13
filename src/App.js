import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Head from './Component/head';
import NewProject from './Component/newProject';
import ProjectDetail from './Component/projectDetail';
import ProjectList from './Component/projectList';

class App extends React.Component{


	render(){
		return (
			<div >
				<Router>
					<Head />
				 	<div className="container">
						<Switch>
							<Route path="/newproject">
								<NewProject />
							</Route>
							<Route path="/projectDetail">
								<ProjectDetail />
							</Route>
							<Route path="/">
								<ProjectList />
							</Route>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}

}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Head from './Component/head';
import NewProject from './Component/newProject';
import ProjectDetail from './Component/projectDetail';
import ProjectList from './Component/projectList';
import GetETH from './Component/getETH';

class App extends React.Component{


	render(){
		return (
			<div>
				<Router>
					<Head />
				 	<div className="container mt40 mb40">
						<Switch>
							<Route path="/newproject" component={NewProject}/>

							<Route path="/projectDetail/:address" component={ProjectDetail} />
							
							<Route path="/getEth" component={GetETH} />

							<Route path="/" component={ProjectList} />
							
						</Switch>
					</div>
				</Router>
			</div>
		);
	}

}

export default App;
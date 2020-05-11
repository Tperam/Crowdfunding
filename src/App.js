import React from 'react';
import Head from './Component/head';

class App extends React.Component{

	constructor( ...args){
		super(...args);
	}


	render(){
		return (
			<div>
				<Head />
			</div>
		);
	}

}

export default App;
import React from 'react';

class Project extends React.Component{
	constructor(props){
		super(props);
		// 获取 路由参数address
		this.address = this.props.match.params.address

	}

	render(){

		return (
			<div>
				项目详情
				{this.address}
			</div>
		);
	}
}

export default Project;
import web3 from './web3';
import Project from '../buuild/Project.json';

export default getContract (address){
	return new web3.eth.Contract(JSON.parse(Project.interface),address);
}


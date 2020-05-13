import web3 from './web3';
import ProjectList from '../build/Project.json';
import ProjectListAddress from '../build/ProjectListAdress.json';

export default getContract(){
	// 获取合约地址
	return new web3.eth.Contract(JSON.parse(ProjectList.interface),address);
}
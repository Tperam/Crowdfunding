import web3 from './web3';
import ProjectList from '../build/ProjectList.json';
import ProjectListAddress from '../build/ProjectListAddress.json';

const contract = new web3.eth.Contract(JSON.parse(ProjectList.interface),ProjectListAddress);


export default contract
import web3 from './web3';
import Project from '../buuild/Project.json';


const contract =  new web3.eth.Contract(JSON.parse(Project.interface),address);

export default contract;



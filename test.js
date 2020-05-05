const web3 = require('./mod/web3.js')


web3.eth.getBlockNumber( (err,res)=>{
        if (!err){
                console.log(JSON.stringify(res))
        } else {
                console.log(err)
        }
})
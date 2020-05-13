const fs = require("fs-extra")
const path = require("path")
const solc = require("solc")

// 编译路径
const compileDir = path.resolve(__dirname,"../src/build")

// 删除编译过的文件
fs.removeSync(compileDir) 
// 确保 dir 同步
fs.ensureDirSync(compileDir)

// 读取合约文件
const files = fs.readdirSync( path.resolve(__dirname,"../contracts") )

// 遍历files目录下的所有文件
files.map( src=>{
    // sol文件
    const solFile = path.resolve(__dirname,"../contracts",src)
    // utf8解码
    const content = fs.readFileSync(solFile,"utf8")
    // 使用solc进行编译
    const res = solc.compile(content,1)
    
    // console.log(res)
    // 判断是否出错
    if( Array.isArray(res.errors) && res.errors.length>0){

        res.errors.map(errStr=>{
            if( errStr.indexOf("Error") != -1){
                throw new Error("合约编译失败",res.errors)
            }
        })
    }
    // 多合约时

    // 遍历以编译好的合约
    Object.keys(res.contracts).map( name=>{
        // 合约名
        const contractJsonName = name.replace(/^:/,"") + ".json"
        // 文件绝对路径名
        const filePath = path.resolve(__dirname,"../src/build",contractJsonName)
        // 输出文件
        fs.outputJsonSync(filePath,res.contracts[name]) 
        // 打印文件路径
        console.log(filePath," -  compile successfuly.")
    } )
} )

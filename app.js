const express = require ("express")
const server = express();
server.listen(3000,()=>{
    console.log('server is  runing...')
})
const mysql = require ('mysql')
const bodyParser = require ("body-parser")
const pool = mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'h_life',
    connectionLimit:10
})
// 配置body-parser中间件
server.use(bodyParser.urlencoded({
    extended:false
}))
// 用户登录接口
server.get('/login',(req,res)=>{
    let username=req.query.username
    let password=req.query.password
    console.log(req.query.username,req.query.password)
    let sql='SELECT uid,nickname,sex FROM user WHERE username=? && password=?'
    pool.query(sql,[username,password],(err,results)=>{
        console.log(results)
        if(results.length==0){
            res.send({code:0,message:'用户名或密码错误',results:results})
        }else{
            res.send({code:1,message:"密码正确可以登录",results:results})
        }
    })
})

// 检测用户名是否已经存在的接口
server.get('/usertest',(req,res)=>{
    let username=req.query.uname
    console.log(username)
    let sql = 'SELECT uid FROM user WHERE username = ?'
    pool.query(sql,[username],(err,results)=>{
        if(err) throw err
        if(results.length != 0){
            res.send({code:0,message:'用户名已被占用，不能注册',results:results})
        }else{
            res.send({code:1,message:'可以注册',results:results})
        }
    })
})

// 用户注册接口
server.post('/register',(req,res)=>{
  //  console.log(req.query)
     let username=req.body.uname
     let password=req.body.upwd
    //  console.log(username,password)
    let sql='INSERT INTO user(username,password) VALUES( ? , ? )'
    pool.query(sql,[username,password],(err,results)=>{
        if (err) throw err        
    })

})
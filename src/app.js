import express from 'express'
import config from "./config/config"
import body_parser from './middle_wares/body_parser'
import error_log from './middle_wares/error_log'
import login_pass from './middle_wares/login_pass'
import {ResultJsonFormat} from './config/global-func'

import IndexRouter from "./routers/index"
import UserRouter from "./routers/user"

// 创建服务器
const app = express()

// 解决跨域问题
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');//的允许所有域名的端口请求（跨域解决）
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})

// 1. 配置公共资源访问路径
app.use(express.static(config.publicPath))
app.use(express.static(config.viewsPath))
// 1.1 配置后台权限
// app.use(login_pass)
// 1.2 配置post请求中间件
app.use(body_parser)

// 2. 挂载路由
app.use(IndexRouter)
app.use(UserRouter)
// 2.1 挂载错误日志中间件
app.use(error_log)
// 2.2 配置空路由
app.use((req, res) => {
    res.json(ResultJsonFormat(404))
})

// 3. 启动监听
app.listen(7676, () => {
    console.log('基石已启动!!!')
})

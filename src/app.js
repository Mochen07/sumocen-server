import express from 'express'
import config from "./config/config"
import body_parser from './middle_wares/body_parser'
import error_log from './middle_wares/error_log'
import login_pass from './middle_wares/login_pass'

import IndexRouter from "./routers/index"
import UserRouter from "./routers/user"

// 创建服务器
const app = express()

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
// app.use(error_log)
// 2.2 配置空路由
app.use((req, res) => {
    res.json({
        status: 404,
        message: '你怕是迷路了哟！老弟~'
    })
})

// 3. 启动监听
app.listen(7676, () => {
    console.log('基石已启动!!!')
})

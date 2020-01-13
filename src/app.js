import express from 'express'
import config from "./config/config"

import IndexRouter from "./routers/index"
import UserRouter from "./routers/index"

// 创建服务器
const app = express()

// 1. 配置公共资源访问路径
app.use(express.static(config.publicPath))
app.use(express.static(config.viewsPath))

// 2. 挂载路由
app.use(IndexRouter)
app.use(UserRouter)


app.listen(7676, () => {
    console.log('基石已启动!!!')
})

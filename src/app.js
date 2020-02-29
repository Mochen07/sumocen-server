import express from 'express'
import config from "./config/config"
import body_parser from './middle_wares/body_parser'
import error_log from './middle_wares/error_log'
import login_pass from './middle_wares/login_pass'
import {ResultJsonFormat} from './config/global-func'

// * 权限控制token验证1.1 引入express-session
import session from 'express-session'
// * 权限控制token验证1.2 引入connect-mongo用于express连接数据库存储session
const mongoStore = require('connect-mongo')(session);

import IndexRouter from "./routers/index"
import UserRouter from "./routers/user"

// 创建服务器
const app = express()

// * 权限控制token验证1.3 中间件使用session
app.use(session({
    secret:'sumocen',//加密字符串
    name:'admin_id',//返回客户端key的名称，默认为connect_sid
    resave:false,//强制保存session，即使它没有变化
    saveUninitialized:true,//强制将未初始化的session存储。当新建一个session且未设定属性或值时，它就处于未初始化状态。在设定cookie前，这对于登录验证，减轻服务器存储压力，权限控制是有帮助的，默认为true
    cookie:{maxAge:1800000 },
    rolling:true, //在每次请求时进行设置cookie，将重置cookie过期时间
    store:new mongoStore({//将session数据存储到mongo数据库中
        url:'mongodb://127.0.0.1/sumocen', //数据库地址
        touchAfter:24*3600  //多长时间往数据库中更新存储一次，除了在会话数据上更改了某些数据除外
    })
}));

// 解决跨域问题
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
})

// 1. 配置公共资源访问路径
app.use(express.static(config.publicPath))
app.use(express.static(config.viewsPath))
// 1.1 配置后台权限
app.use(login_pass)
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

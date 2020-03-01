// 权限控制暂时有问题 只要authorization有值就会通过验证
import {ResultJsonFormat} from './../config/global-func'

export default (req, res, next) => {
    // 1. 过滤所有非后端请求(/back权限判断御用字段)
    if (req.path.indexOf('/back') === -1) return next()

    // 2. 判断所有的后端请求是否处于已经登录状态
    console.log(req.headers.authorization, '查看权限控制保存信息')
    if(req.headers.authorization) return next()

    // 3. 没有登录
    if(req.path.indexOf('/back/api/') !== -1){
        return next(new Error('没有足够的访问权限!'));
    }

    res.json(ResultJsonFormat(204))
}

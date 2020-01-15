export default (req, res, next) => {
    // 1. 过滤所有非后端请求(/back权限判断御用字段)
    if (req.path.indexOf('/back') === -1) return next()

    // 2. 判断所有的后端请求是否处于已经登录状态
    if(req.session.token) return next()

    // 3. 没有登录
    if(req.path.indexOf('/back/api/') !== -1){
        return next(new Error('没有足够的访问权限!'));
    }

    res.json({
        status: 204,
        message: '请先登录'
    })
}

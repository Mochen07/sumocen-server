/*
* 统一错误处理
* */
import Error from "../models/Error"

export default (err, req, res, next) => {
    const errLog = new Error({
        errorName: err.name,
        errorMessage: err.message,
        errorStack: err.stack
    })

    errLog.save((error, result) => {
        if (error) { // 数据库出错
            res.json({
                status: 500,
                result: '服务器内部错误*',
                message: error.message
            })
        } else {
            res.json({
                status: 500,
                result: '服务器内部错误',
                message: err.message
            })
        }
    })
}

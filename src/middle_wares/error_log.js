/*
* 统一错误处理
* */
import Error from "../models/Error"
import {ResultJsonFormat} from './../config/global-func'

export default (err, req, res, next) => {
    const errLog = new Error({
        errorName: err.name,
        errorMessage: err.message,
        errorStack: err.stack
    })

    console.log(errLog)

    errLog.save((error, result) => {
        if (error) { // 数据库出错
            res.json(ResultJsonFormat(501, error.message))
        } else {
            res.json(ResultJsonFormat(500, err.message))
        }
    })
}

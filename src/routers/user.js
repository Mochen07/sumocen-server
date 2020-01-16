import express from 'express'
import User from './../models/User'
import md5 from 'blueimp-md5'
const router = express.Router({})
import {ResultJsonFormat} from './../config/global-func'

// 密码加盐字段
const S_KEY = 'J*&^IA@Mi_'

// 生成后台管理员
router.post('/api/user/add', (req, res, next) => {
    const data = req.body
    let {nickname, password} = data
    if (!nickname) return res.json(ResultJsonFormat(200, '请输入用户昵称'))
    // 处理密码
    password = md5(password + S_KEY) || ''

    const user = new User({nickname, password})

    user.save((err, result) => {
        if (err) return next(err)
        res.json(ResultJsonFormat(200))
    })
})


export default router

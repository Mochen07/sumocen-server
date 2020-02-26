import express from 'express'
import User from './../models/User'
import md5 from 'blueimp-md5'
const router = express.Router({})
import {ResultJsonFormat} from './../config/global-func'
// 图片上传
import formidable from 'formidable'
import config from "../config/config"
import {basename} from "path"

// 密码加盐字段
const S_KEY = 'J*&^IA@Mi_'

/*
* name: 生成后台管理员
* params: nickname, password
* */
router.post('/api/user/add', (req, res, next) => {
    const data = req.body
    let {nickname, password} = data
    if (!nickname) return res.json(ResultJsonFormat(200, '请输入用户昵称'))
    User.findOne({nickname: nickname}, (err, user) => {
        if (user) {
            res.json(ResultJsonFormat(200, '该管理员已存在'))
        } else {
            // 处理密码
            password = md5(password + S_KEY) || ''

            const user = new User({nickname, password})

            user.save((err, result) => {
                if (err) return next(err)
                res.json(ResultJsonFormat(200))
            })
        }
    })
})

/*
* name: 登录
* params: nickname, password
* */
router.post('/api/back/user/login', (req, res, next) => {
    const data = req.body
    let {nickname, password} = data
    console.log(data)

    // 查询
    User.findOne({nickname: nickname}, (err, user) => {
        if (err) return next(err)

        if (!user) return res.json(ResultJsonFormat(201, '该管理员不存在'))

        // 处理密码
        password = md5(password + S_KEY) || ''
        if (user.password !== password) return res.json(ResultJsonFormat(201, '密码错误'))

        res.json(ResultJsonFormat(200, {token: user._id}))
    })
})

/*
* name: 图片上传
* params: file
* */
router.post('/api/back/upload', (req, res, next) => {
    // 1. 接收图片数据
    const form = new formidable.IncomingForm()
    form.uploadDir = config.uploadPath // 图片放置的文件夹
    form.keepExtensions = true // 保持文件后缀名
    form.parse(req, (err, body, files) => {
        if (err) return next(err);
        const serverImgName = basename(files.feil.path) // 图片名字
        const fullPath = config.baseUrl + '/uploads/' + serverImgName // 全路径
        console.log(fullPath)
        res.json(ResultJsonFormat(200, {url: fullPath}))
    })
})

export default router

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
* params: username, password
* */
router.post('/api/user/add', (req, res, next) => {
    const data = req.body
    let {username, password} = data
    if (!username) return res.json(ResultJsonFormat(200, '请输入用户昵称'))
    User.findOne({username: username}, (err, user) => {
        if (user) {
            res.json(ResultJsonFormat(200, '该管理员已存在'))
        } else {
            // 处理密码
            password = md5(password + S_KEY) || ''

            const user = new User({username, password})

            user.save((err, result) => {
                if (err) return next(err)
                res.json(ResultJsonFormat(200))
            })
        }
    })
})

/*
* name: 登录
* params: username, password
* */
router.post('/api/user/login', (req, res, next) => {
    const data = req.body
    let {username, password} = data
    console.log(data)

    // 查询
    User.findOne({username: username}, (err, user) => {
        if (err) return next(err)

        if (!user) return res.json(ResultJsonFormat(201, '该管理员不存在'))

        // 处理密码
        password = md5(password + S_KEY) || ''
        if (user.password !== password) return res.json(ResultJsonFormat(201, '密码错误'))
        console.log(user)
        // session中存token
        // req.session.token =  user._id;
        res.json(ResultJsonFormat(200, {
            token: user._id,
            id: user._id,
            username: user.username,
            nickname: user.nickname,
            avatar: user.avatar
        }))
    })
})

/*
* name: 修改管理员信息
* params: username, password, nickname, avatar
* */
router.post('/api/back/user/update', (req, res, next) => {
    const data = req.body
    let {username, password, nickname, avatar} = data
    console.log(username, password, nickname, avatar)

    // 查询
    User.findOne({username: username}, (err, user) => {
        if (err) return next(err)

        if (!user) return res.json(ResultJsonFormat(201, '该管理员不存在'))

        console.log(user)
        user.password = md5(password + S_KEY) || ''
        user.nickname = nickname
        user.avatar = avatar
        user.save((err, result) => {
            if (err) return next(err)

            console.log(result)

            res.json(ResultJsonFormat(200, {
                token: user._id,
                id: user._id,
                username: user.username,
                nickname: user.nickname,
                avatar: user.avatar
            }, '信息更新成功'))
        })
    })
})

/*
* name: 获取用户菜单
* params: id
* */
router.get('/api/back/user/menus/:id', (req, res, next) => {
    // 查询
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err)

        if (!user) return res.json(ResultJsonFormat(201, '该管理员不存在'))

        res.json(ResultJsonFormat(200, user.menus))
    })
})

/*
* name: 用户菜单配置
* params: username, menus
* */
router.post('/api/back/user/menus', (req, res, next) => {
    const data = req.body
    let {username, menus} = data
    console.log(username, menus)

    // 查询
    User.findOne({username: username}, (err, user) => {
        if (err) return next(err)

        if (!user) return res.json(ResultJsonFormat(201, '该管理员不存在'))

        user.menus = menus

        user.save((err, result) => {
            if (err) return next(err)

            console.log(result)

            res.json(ResultJsonFormat(200, user.menus))
        })
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
        const serverImgName = basename(files.file.path) // 图片名字
        const fullPath = config.baseUrl + '/uploads/' + serverImgName // 全路径
        console.log(fullPath)
        res.json(ResultJsonFormat(200, {url: fullPath}))
    })
})

export default router

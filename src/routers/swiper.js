import express from 'express'
import Swiper from './../models/Swiper'
import {ResultJsonFormat} from "./../config/global-func"
const router = express.Router({})

/*
* name: 插入swiper数据
* params: name, url, info, link
* */
router.post('/api/back/swiper/add', (req, res, next) => {
    const data = req.body
    let {name, url, info, link} = data
    if (!name) return res.json(ResultJsonFormat(201, '请输入swiper的名称'))
    if (!url) return res.json(ResultJsonFormat(201, '请上传图片'))

    const swiper = new Swiper({name, url, info, link})
    swiper.save((err, result) => {
        if (err) return next(err)
        res.json(ResultJsonFormat(200, '添加成功'))
    })
})

/*
* name: 修改swiper数据
* params: name, url, info, link
* */
router.post('/api/back/swiper/edit', (req, res, next) => {
    const data = req.body
    let {id, name, url, info, link} = data
    if (!id) return res.json(ResultJsonFormat(201, '请选择修改的swiper的id'))
    if (!name) return res.json(ResultJsonFormat(201, '请输入swiper的名称'))
    if (!url) return res.json(ResultJsonFormat(201, '请上传图片'))

    Swiper.findById(id, (err, swiper) => {
        swiper.name = name
        swiper.url = url
        swiper.info = info
        swiper.link = link
        swiper.lastEditDate = Date.now()

        swiper.save((err, result) => {
            if (err) return next(err)
            res.json(ResultJsonFormat(200, '修改成功'))
        })
    })
})

export default router

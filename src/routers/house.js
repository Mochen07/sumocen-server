import express from 'express'
import House from './../models/House'
import {ResultJsonFormat} from "./../config/global-func"
const router = express.Router({})

/*
* name: 插入house数据
* params: pictureList, province, address, city, area, plot, price, grade
* */
router.post('/api/back/house/add', (req, res, next) => {
    const data = req.body
    // 照片组pictureList, 详细地址province, 省address, 市city, 区area, 小区plot, 价格price, 评分grade
    let {pictureList, province, address, city, area, plot, price, grade} = data

    const house = new House({pictureList, province, address, city, area, plot, price, grade})
    house.save((err, result) => {
        if (err) return next(err)
        res.json(ResultJsonFormat(200, '添加成功'))
    })
})

/*
* name: 修改house数据
* params: id, pictureList, province, address, city, area, plot, price, grade
* */
router.post('/api/back/house/edit', (req, res, next) => {
    const data = req.body
    let {id, pictureList, province, address, city, area, plot, price, grade} = data
    if (!id) return res.json(ResultJsonFormat(201, '请选择修改的house的id'))

    House.findById(id, (err, house) => {
        if (pictureList) house.pictureList = pictureList
        if (province) house.province = province
        if (address) house.address = address
        if (city) house.city = city
        if (area) house.area = area
        if (plot) house.plot = plot
        if (price) house.price = price
        if (grade) house.grade = grade

        house.lastEditDate = Date.now()

        house.save((err, result) => {
            if (err) return next(err)
            res.json(ResultJsonFormat(200, '修改成功'))
        })
    })
})

export default router

import express from 'express'
import Document from './../models/Document'
import {ResultJsonFormat} from "./../config/global-func"
const router = express.Router({})

/*
* name: 插入Document数据
* params: title, content, classify
* */
router.post('/api/back/Document/add', (req, res, next) => {
    const data = req.body
    let {title, content, classify} = data
    if (!title) return res.json(ResultJsonFormat(201, '请输入文章的名称'))
    if (!content) return res.json(ResultJsonFormat(201, '请编辑文章内容'))

    const Document = new Document({title, content, classify})
    Document.save((err, result) => {
        if (err) return next(err)
        res.json(ResultJsonFormat(200, '添加成功'))
    })
})

/*
* name: 修改Document数据
* params: title, content, classify
* */
router.post('/api/back/Document/edit', (req, res, next) => {
    const data = req.body
    let {id, title, content, classify} = data
    if (!id) return res.json(ResultJsonFormat(201, '请选择修改的Document的id'))
    if (!title) return res.json(ResultJsonFormat(201, '请输入文章的名称'))
    if (!content) return res.json(ResultJsonFormat(201, '请编辑文章内容'))

    Document.findById(id, (err, Document) => {
        Document.title = title
        Document.url = url
        Document.content = content
        Document.classify = classify
        Document.lastEditDate = Date.now()

        Document.save((err, result) => {
            if (err) return next(err)
            res.json(ResultJsonFormat(200, '修改成功'))
        })
    })
})

/*
* name: 获取Document列表
* params: get
* */
router.get('/api/Document/list', (req, res, next) => {
    Document.find(null, 'title content classify', (err, DocumentList) => {
        if (err) return next(err)
        res.json(ResultJsonFormat(200, DocumentList))
    })
})

/*
* name: 删除指定Document数据
* params: id
* */
router.post('/api/back/Document/remove', (req, res, next) => {
    const data = req.body
    let {id} = data
    if (!id) return res.json(ResultJsonFormat(201, '请选择修改的Document的id'))
    Document.findByIdAndDelete(id,(err, removeData) => {
        if (err) return next(err)
        if (!removeData) {
            res.json(ResultJsonFormat(200, '已经删除过啦！'))
        } else {
            res.json(ResultJsonFormat(200, '删除成功！'))
        }
    })
})

export default router

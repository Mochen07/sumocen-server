import express from 'express'
const router = express.Router({})

/*
* *******web路由*******
* */

// 重定向
router.get('/', (req, res) => {
    res.redirect('/web')
})

router.get('/web', (req, res) => {
    res.render('web/index.html')
})

export default router

import querystring from 'querystring'

// 处理post请求
export default (req, res, next) => {
    // 1. 过滤get请求
    const type = req.method.toLowerCase()
    if (type === 'get') return next()

    // 2. 过滤文件(图片, 音视频...) content-type:multipart/form-data
    const contentType = req.headers['content-type']
    // console.log(contentType)
    if (contentType && contentType.startsWith('multipart/form-data')) return next()

    // 3. 普通表单提交 content-type:application/x-www-form-urlencoded
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    })
    req.on('end', () => {
        // 处理成json放到body
        req.body = querystring.parse(data)
        next()
    })
}

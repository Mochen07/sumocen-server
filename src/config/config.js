import {join} from 'path'

// 服务器访问路径
export default {
    viewsPath: join(__dirname, '../views'),
    publicPath: join(__dirname, '../../public'),
    uploadPath: join(__dirname, '../../public/uploads'),
    baseUrl: 'http://localhost:7676'
}

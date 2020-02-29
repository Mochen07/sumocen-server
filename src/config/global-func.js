/*
* 全局用的方法
* */

// 返回数据结构
export const ResultJsonFormat = function(status, data=null){
    switch (status) {
        case 200:
            if (typeof(data) === 'string') return {status, message: data}
            return {status, data, message: '成功！'}
        case 201:
            if (typeof(data) === 'string') return {status, message: data}
            return {status, data, message: '成功！'}
        case 204:
            return {status, message: '没有足够的访问权限！请登录！'}
        case 404:
            return {status, message: '你怕是迷路了哟！老弟~'}
        case 500:
            return {status, message: '服务器内部错误！', result: data}
        case 501:
            return {status, message: '数据库存入错误操作错误！', result: data}
        default:
            return {message:'输入状态码未做任何判断！'}
    }
}

'use strict'

const corsHandler = {
  origin: function (ctx) {
    // 这里可以配置不运行跨域的接口地址
    if (ctx.url === '/test') {
        return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}


module.exports = {
  corsHandler
}

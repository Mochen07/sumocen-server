const fs = require("fs");
const path = require('path')
const tool = {}

tool.upload = async (ctx, next) => {
  // 获取上传文件
  const file = ctx.request.files.file
  console.log(file)
  // 创建可读流
  const fileReader = fs.createReadStream(file.path)
  // 设置文件保存路径 + name = 组装成绝对路径
  const fileResource = path.join(__dirname, '/public/upload/') + `/${file.name}`
  // 使用 createWriteStream 写入数据，然后使用管道流pipe拼接
  const writeStream = fs.createWriteStream(fileResource)
  // 写入文件方法
  function fileReaderFunc () {
    fileReader.pipe(writeStream);
    ctx.body = {
      url: uploadUrl + `/${file.name}`,
      code: 0,
      message: '上传成功'
    };
  }
  // 判断 /static/upload 文件夹是否存在，如果不在的话就创建一个
  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        fileReaderFunc()
      }
    });
  } else {
    fileReaderFunc()
  }
  return next()
}

module.exports = tool
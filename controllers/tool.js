const fs = require("fs");
const config = require("../config");
const UploadServices = require('../services').upload
const tool = {}

tool.upload = async (ctx, next) => {
  // 获取上传文件
  const file = ctx.request.files.file
  let path = file.filepath;
  let fname = file.originalFilename; // 原文件名称
  let newName = file.newFilename; // 新文件名称
  let semiPath = newName // 半路经
  let ext = '*' // 文件拓展名默认
  if(file.size>0 && path){
    //得到扩展名
    let extArr = fname.split('.');
    ext = extArr[extArr.length-1];
    let nextPath = path+'.'+ext;
    //重命名文件
    fs.renameSync(path, nextPath);
    semiPath = semiPath+'.'+ext
  }
  const fileInfo = {
    name: fname,
    size: file.size,
    ext: ext,
    url: config.uploadHost + semiPath,
  }
  const result = await UploadServices.addUploadInfo(fileInfo)
  ctx.result = result
  return next()
}

module.exports = tool
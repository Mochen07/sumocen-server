import mongoose from 'mongoose'

// 错误日志结构
const errorSchema = mongoose.Schema({
    errorName: {type: String, required: true}, // 错误名称
    errorMessage: {type: String, required: true}, // 错误消息
    errorStack: {type: String, required: true}, // 错误堆栈
    errorDate: {type: String, default: Date.now()} // 错误时间
})

const Error = mongoose.model('Error', errorSchema)

export default Error

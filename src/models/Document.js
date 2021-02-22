import mongoose from 'mongoose'

// Document
const documentSchema = mongoose.Schema({
    title: {type: String, required: false}, // 文章名称
    content: {type: String, default: 'empty'}, // 文章内容
    classify: {type: String, default: '00'}, // 所属分类
    viewCount: {type: Number, default: 0}, // 浏览次数
    lickCount: {type: Number, default: 0}, // 点赞次数
    joinDate: {type: Date, default: Date.now()}, // 添加时间
    lastEditDate: {type: Date, default: Date.now()}, // 最后编辑时间
})

const Document = mongoose.model('document', documentSchema)

export default Document

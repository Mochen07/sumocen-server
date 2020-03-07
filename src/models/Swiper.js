import mongoose from 'mongoose'

// 轮播图
const swiperSchema = mongoose.Schema({
    name: {type: String, required: true}, // 名称
    url: {type: String, required: true}, // 图片链接
    info: {type: String, required: false}, // 描述
    link: {type: String, required: false}, // 跳转地址或链接
    joinDate: {type: Date, default: Date.now()}, // 添加时间
    lastEditDate: {type: Date, default: Date.now()}, // 最后一次编辑时间
    priority: {type: Number, default: 0}, // 优先级(轮播图显示顺序)
})

const Swiper = mongoose.model('Swiper', swiperSchema)

export default Swiper

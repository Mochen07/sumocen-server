import mongoose from 'mongoose'

// House
const houseSchema = mongoose.Schema({
    pictureList: {type: Array, required: false}, // 照片组
    province: {type: String, default: '未定义'}, // 详细地址
    address: {type: String, default: '未定义'}, // 省
    city: {type: String, default: '未定义'}, // 市
    area: {type: String, required: false}, // 区
    plot: {type: String, default: '未定义'}, // 小区
    price: {type: Number, required: false}, // 价格
    grade: {type: Number, required: false}, // 评分
    joinDate: {type: Date, default: Date.now()}, // 添加时间
    lastEditDate: {type: Date, default: Date.now()}, // 添加时间
})

const House = mongoose.model('house', houseSchema)

export default House

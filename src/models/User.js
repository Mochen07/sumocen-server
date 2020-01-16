import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/sumocen', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', () => {
    console.log('尘网已编织!!!')
})
mongoose.connection.on('error', (err) => {
    throw err
})

// 用户User
const userSchema = mongoose.Schema({
    nickname: {type: String, required: true}, // 呢称
    name: {type: String, default: '芸芸众生'}, // 姓名
    password: {type: String, required: true}, // 密码
    avatar: {type: String, required: false}, // 头像
    phone: {type: Number, required: false}, // 手机
    email: {type: String, required: false}, // 邮箱
    joinDate: {type: Date, required: false}, // 添加时间
    lastEditDate: {type: Date, default: Date.now()}, // 添加时间
})

const User = mongoose.model('user', userSchema)

export default User

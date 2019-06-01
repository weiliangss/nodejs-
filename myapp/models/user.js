//用户登录信息
//引入模块
//定义字段
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }


});
//数据集合
const user = mongoose.model("user", userSchema);
//对应数据库里面的USERS集合
module.exports = user;
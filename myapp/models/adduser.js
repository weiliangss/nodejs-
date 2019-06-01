//定义用户名和密码字段
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adduserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }


});
//给数据库中的adduser表套用模板
const adduser = mongoose.model("adduser", adduserSchema);
module.exports = adduser;
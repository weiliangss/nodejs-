//定义上传商品字段
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    pic: String,
    price: String,
    fee: String,
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: new Date() }

});
const product = mongoose.model("product", productSchema);
module.exports = product;
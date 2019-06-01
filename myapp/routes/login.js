const express = require('express');
const router = express.Router();
//const path = require('path');
const md5 = require('md5');
const user = require("../models/user");
//const formidable = require('formidable');
//const login = require('../middlewares/login'); //引入判断权限中间件
var arr = [];

router.get("/", function(req, res) {
    res.render("login");
})
router.post('/', function(req, res) {
    user.find({
        username: req.body.username,
        password: md5(req.body.password)
    }, function(err, result) {
        if (err) throw err;
        if (result.length) { //匹配成功
            console.log("登陆成功");
            req.session.username = req.body.username;
            req.session.password = md5(req.body.password);
            res.redirect('/add/list');
        } else { //匹配不成功重定向到登录
            console.log("密码错误或用户名不存在");
            res.render('login');

        }
    })
})
module.exports = router;
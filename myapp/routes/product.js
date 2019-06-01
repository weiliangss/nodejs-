const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const product = require('../models/product');
const login = require('../middlewares/login')

router.get('/delete/:id', login, function(req, res) {
    //req.params.id
    //根据id查询数据库  删除这个数据
    product.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log("数据库删除成功");
        //删除相应的图片 
        fs.unlink(path.join(__dirname, "../", 'uploads', req.query.img), function(err) {
            if (err) throw err;
            console.log("图片删除成功");
        });
        //客户端保持list页面展示
        //res.redirect("back");
        res.redirect("/add/list");
    })
})
router.get('/update/:id', login, function(req, res) {
    // req.params.id
    //更具id查询数据
    product.findById(req.params.id, function(err, result) {
        if (err) throw err;
        //提供更新数据的页面  update.ejs
        res.render("update", {
            data: result
        })
    })
})

router.post('/update/:id', function(req, res) {
    //解析数据
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, "../", "uploads");
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        //组装数据
        var obj = {
                ...fields,
                updateAt: new Date() //更新的时间字段
            }
            //判断数据图片有没有更新
        if (files.pic.name) { //图片更新
            obj.pic = "/" + path.basename(files.pic.path);
        } else { //图片没有更新  使用原来的图片

        }
        product.findByIdAndUpdate(req.params.id, obj, function(err) {
            if (err) throw err;
            console.log("更新成功");
            //重定向到展示页面list页面
            res.redirect('/add/list');
        })
    })
})

//查询


router.post('/search', function(req, res) {
    //post请求
    console.log(req.body.searchtext)

    //输入主题模糊搜索图片博客
    // 利用正则表达式可以实现模糊搜索   nichen: new RegExp(fields.searchtext)
    product.find({
                price: new RegExp(req.body.searchtext)
            },
            function(err, result) {
                if (err) throw err;
                if (result.length) { //匹配成功
                    console.log("成功搜索");
                    res.render('list', {
                        arr: result,
                        // sessions: req.session,
                    });
                } else { //搜索不成功
                    console.log("找不到匹配的图片记录")
                    res.redirect('/add/list');
                }
            })
        // })
})


module.exports = router;
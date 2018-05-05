const express = require("express")
const bodyParser = require('body-parser')
const db = require('../bin/db')
const upload = require('../bin/upload')

var router = express.Router()

router.post('/login', bodyParser.json(), (req, res) => {
    db.User.find({ username: req.body.username }).count((err, count) => {
        if (err) {
            res.json({ code: 0, msg: '系统错误,请重试' })
        } else {
            if (count > 0) {
                db.User.findOne({ username: req.body.username }, (err, data) => {
                    if (req.body.password == data.password) {
                        let user = {}
                        user.id = data.id
                        user.username = data.username
                        user.photo = data.photo
                        res.json({ code: 1, msg: '登录成功', user })
                    } else {
                        res.json({ code: 0, msg: '密码错误,请重新输入' })
                    }
                })
            } else {
                res.json({ code: 0, msg: '用户未注册,请注册' })
            }
        }
    })
})

router.post('/register', bodyParser.json(), (req, res) => {
    req.body.isAdmin = false
    new db.User(req.body).save(err => {
        if (err) {
            if (err.code == 11000) {
                res.json({ code: 0, msg: '用户名已存在' })
            } else {
                res.json({ code: 0, msg: '注册失败,系统出错' })
            }
        } else {
            res.json({ code: 1, msg: '注册成功，请登录' })
        }
    })
})

router.post('/update/photo/:id', upload.single('file'), (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, { photo: req.file.filename }, err => {
        if (err) {
            res.json({ code: 0, msg: '上传失败' })
        } else {
            res.json({ code: 1, msg: '上传成功' })
        }
    })
})

router.post('/find/:id', bodyParser.json(), (req,res) => {
    db.User.findById(req.params.id,(err,data)=>{
        let user = {}
        user.id = data.id
        user.username = data.username
        user.photo = data.photo
        res.json({ user })
    })
})
module.exports = router
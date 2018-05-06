const express = require("express")
const bodyParser = require('body-parser')
const db = require('../bin/db')

var router = express.Router()

// 格式日期
function formatTime(t) {
    var M = t.getMonth() + 1,
        d = t.getDate(),
        h = t.getHours(),
        m = t.getMinutes();
    M = M < 10 ? '0' + M : M
    d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    return t.getFullYear() + '-' + M + '-' + d + ' ' + h + ':' + m
}

// 提交问题
router.post('/ask', bodyParser.json(), (req, res) => {
    req.body.askTime = new Date()
    new db.Question(req.body).save(err => {
        if (err) {
            res.json({ code: 0, msg: '提问失败' })
        } else {
            res.json({ code: 1, msg: '提问成功' })
        }
    })
})

// 查询问题
router.post('/find', (req, res) => {
    db.Question.find().populate('user asker').exec((err, data) => {
        res.json({
            questions: data.map(m => {
                m = m.toObject();
                m.id = m._id.toString()
                m.desc = m.content
                let meta = {}
                meta.date = formatTime(m.askTime)
                meta.source = m.asker.username
                m.meta = meta
                delete m._id
                delete m.asker
                delete m.content
                delete m.askTime
                return m
            })
        })
    })
})
module.exports = router
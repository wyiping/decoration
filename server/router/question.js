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

// 查询问题列表
router.post('/find', (req, res) => {
    db.Question.find().populate('user asker').exec((err, data) => {
        res.json({
            questions: data.map(m => {
                m = m.toObject();
                m.id = m._id.toString()
                m.desc = m.content
                m.url = '/question/' + m._id.toString()
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
// 查询问题
router.post('/find/:id', (req, res) => {
    db.Question.findById(req.params.id, (err, data) => {
        res.json({
            question: {
                title: data.title,
                askTime: formatTime(data.askTime),
                content: data.content
            }
        })
    })
})
// 查询回答
router.post('/find/answer/:id', (req, res) => {
    db.Answer.find({ question: req.params.id }).populate('user answerer').exec((err, data) => {
        res.json({
            answers: data.map(m => {
                m = m.toObject();
                m.title = m.content
                let meta = {}
                meta.date = formatTime(m.answerTime)
                meta.source = m.answerer.username
                m.meta = meta
                delete m._id
                delete m.answerer
                delete m.content
                delete m.answerTime
                return m
            })
        })
    })
})
// 提交回答
router.post('/answer', bodyParser.json(), (req, res) => {
    req.body.answerTime = new Date()
    new db.Answer(req.body).save(err => {
        if (err) {
            res.json({ code: 0, msg: '回答失败' })
        } else {
            res.json({ code: 1, msg: '回答成功' })
        }
    })
})

// 查询我的问题
router.post('/find/my/:id', (req, res) => {
    db.Question.find({asker:req.params.id}).populate('user asker').exec((err, data) => {
        res.json({
            questions: data.map(m => {
                m = m.toObject();
                m.id = m._id.toString()
                m.desc = m.content
                m.url = '/question/' + m._id.toString()
                let meta = {}
                meta.date = formatTime(m.askTime)
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
// 查询我的回答
router.post('/find/myanswer/:id', (req, res) => {
    db.Answer.find({ answerer: req.params.id }).populate('question answerer','title username').exec((err, data) => {
        res.json({
            answers: data.map(m => {
                m = m.toObject();
                m.title = m.question.title
                m.desc = m.content
                m.url = '/question/' + m.question._id.toString()
                let meta = {}
                meta.date = formatTime(m.answerTime)
                m.meta = meta
                delete m._id
                delete m.answerer
                delete m.content
                delete m.answerTime
                return m
            })
        })
    })
})
module.exports = router
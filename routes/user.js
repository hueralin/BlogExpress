var express = require('express');
var router = express.Router();

const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    login
} = require('../controlloer/user')

/* 用户登录. */
router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(userData => {
        if(userData.username) {
            // 设置 session
            req.session.username = userData.username
            req.session.realname = userData.realname
            res.json(new SuccessModel("登录成功！"))
        } else {
            res.json(new ErrorModel("登录失败！"))
        }
    })
});

// 登录测试
router.get('/login-test', (req, res, next) => {
	if(req.session.username) {
		res.json(new SuccessModel('已登录！'))
	} else {
		res.json(new ErrorModel('未登录！'))
	}
})

// 用session记录当前用户访问了多少次
router.get('/session-test', (req, res, next) => {
    const session = req.session
    if(session.viewNum === null) {
        session.viewNum = 0
    }
    session.viewNum++
    res.json({
        code: 0,
        data: {
            viewNum: session.viewNum
        }
    })
})

module.exports = router;

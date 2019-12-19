var express = require('express');
var router = express.Router();

/* 用户登录. */
router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    res.json({
        code: 0,
        data: {
            username,
            password
        }
    })
});

module.exports = router;

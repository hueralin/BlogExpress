var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')

const { getBlogList, 
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controlloer/blog')

// 引入登录验证中间件
const loginCheck = require('../middleware/loginCheck')

/* 获取博客列表. */
router.get('/list', function(req, res, next) {
  // req.query 是Express原生自带的
  const author = req.query.author || ''
    const keywords = req.query.keywords || ''
    // result是exec查询数据库的那个promise
    const result = getBlogList(author, keywords)
    // 返回的也是一个promise，包装了SuccessModel对象
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
});

// 获取博客详情
router.get('/detail', (req, res, next) => {
  const result = getBlogDetail(req.query.id)
  return result.then(blogData => {
    res.json(new SuccessModel(blogData))
  })
})

// 新建博客
router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
})

// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  return result.then(val => {
    if(val) {
      res.json(new SuccessModel('更新博客成功'))
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})

// 删除博客
router.post('/delete', loginCheck, (req, res, next) => {
  // 从session中获取用户名，而不是从req.body中
  const author = req.session.username
  const result = deleteBlog(req.query.id, author)
  return result.then(val => {
    if(val) {
      res.json(new SuccessModel('博客删除成功'))
    } else {
      res.json(new ErrorModel('博客删除失败'))
    }
  })
})

module.exports = router;

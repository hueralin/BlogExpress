var express = require('express');
var router = express.Router();

/* 获取博客列表. */
router.get('/list', function(req, res, next) {
  res.json({
      code: 0,
      data: [
          { id: 0, title: 'A' },
          { id: 0, title: 'A' },
          { id: 0, title: 'A' }
      ]
  })
});

module.exports = router;

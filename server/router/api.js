const express = require("express")
var router = express.Router()

// 模拟请求本地数据
router.get('/:type', function (req, res) {
  try {
    res.json({
      code: 1,
      list: eval(require("../data/"+req.params.type+".json")).list
    });
  } catch (error) {
    res.json({
      code:0,
      list:null
    })
  }
});
module.exports = router
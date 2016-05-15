var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
  var val1 = Number(req.body.num1);
  var val2 = Number(req.body.num2);
  var clicked = req.body.clicked;
  var ans = 0;

  if (clicked == false) {
    ans = val1;
  } else {
    ans = val2*val1;
  }

  res.send({answ: ans});
});

module.exports = router;

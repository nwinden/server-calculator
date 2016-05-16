var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
  var val1 = Number(req.body.num1);
  var val2 = Number(req.body.num2);
  var first = req.body.first;
  var ans = 0;

  //divides the information, except the first time, which just sends the first number seleced first and retuns the answer
  if (first < 1) {
    ans = val1;
  } else {
    ans = val2*val1;
  }

  res.send({answ: ans});
});

module.exports = router;

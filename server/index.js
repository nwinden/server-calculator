var express = require('express');
var app = express ();
var bodyParser = require('body-parser');
var path = require('path');
var add = require('./routes/add');
var subtract = require('./routes/subtract');
var multiply = require('./routes/multiply');
var divide = require('./routes/divide');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended:true}));

//the routes to be used for mathematical operations
app.use('/add', add);
app.use('/subtract', subtract);
app.use('/multiply', multiply);
app.use('/divide', divide);

//the path to route to the home page
app.get('/*', function(req, res) {
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get('port'), function() {
  console.log('server is ready on port: ' + app.get('port'));
});

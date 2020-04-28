var express = require('express')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var app = express();
const path = require('path');


app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/js', express.static(path.join(__dirname, '/js')));
app.use('/res', express.static(path.join(__dirname, '/res')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.use('/op', function(req, res) {
  res.render('temp.html')
})
app.use('/', require('./router/gallery.js'))

var today = new Date();
app.listen(3000, function() {
  console.log('server on at ' + today)
})

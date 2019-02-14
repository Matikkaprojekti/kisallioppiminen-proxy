'use strict'
exports.__esModule = true
var express_1 = require('express')
var app = express_1['default']()
var port = 8080
app.get('/', function(req, res) {
  res.send('Hello world')
})

app.listen(port, function() {
  console.log('serversss started at http://localhost:' + port)
})

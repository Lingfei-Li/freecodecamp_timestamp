

var http = require('http');
var express = require('express');
var path = require('path');


var app = express();
app.set('port', (process.env.PORT || 5000));

app.get('*', function(req, res){
    res.send("hello");
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
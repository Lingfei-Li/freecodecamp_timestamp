

var http = require('http');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var moment = require('moment');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname,"public")));

app.get('/:timestr', function(req, res){
    var time = moment(req.params.timestr);
    var resobj = {natural: null, unix: null};
    if(isNaN(time.valueOf())) {
        time = moment.unix(parseInt(req.params.timestr));
        if(!isNaN(time.valueOf())) {
            resobj.natural = time.format("YYYY-MM-DD");
            resobj.unix = time.unix();
        }
    }
    else {
        resobj.natural = time.format("YYYY-MM-DD");
        resobj.unix = time.unix();
    }
    res.json(resobj);
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

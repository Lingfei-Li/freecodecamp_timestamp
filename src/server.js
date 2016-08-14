

var http = require('http');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var moment = require('moment');

var app = express();

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname,"public")));

app.get('/:timestr', (req, res)=>{
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

var port = 1234;
http.createServer(app).listen(port);



console.log("server started on port", port);

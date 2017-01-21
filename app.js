const express = require('express'),
    http = require('http'),
    cors = require('cors'),
    async = require('async');

const app = express();
server = http.Server(app);

require('./initialize.js').db(app);
require('./initialize.js').middleware(app);
Availability = require('./availability.js');

//app.use(cors({origin: 'http://127.0.0.1:8080'}));

app.all('*', (req, res, next) => {
    let allowedOrigins = ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://api.hacknhelp.com'];
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        console.log(origin);
        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    }
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', "GET,POST,PUT,OPTIONS,DELETE");
    next();

});
app.post('/save', (req, res, next) => {
    console.log(req.body);
    let input = req.body;
    let cursor = Availability.findOneAndUpdate({ name: input.name }, {
        $set: {
            week: input.week,
            quarter: input.quarter
        }
    }, {
        new: true,
        upsert: true
    })
    cursor.exec((err, doc) => {
        if (err)
            throw err;
        else if (doc) {
            console.log(doc);
            res.sendStatus(200);
        } else {
            console.log("Sorry couldn't find user");
        }
    });
});

app.post('/fetch', (req, res, next) => {
    console.log(req.body);
    let team_members = req.body.team_members;
    var team_data = [];
    async.each(team_members, function(item, callback) {
        console.log(item);
        let cursor = Availability.findOne({ name: item }, { week: 1, quarter: 1, name: 1 });
        cursor.exec((err, doc) => {
            if (err)
                callback(err);
            else if (doc) {
                team_data.push(doc);
                callback();
            }else{
            	console.log("No documents found")
            	callback();
            }
        });
    }, (err) => {
        if (err)
            throw err;
        else {
            res.status(200).send(team_data);
        }
    });
});


app.get('/', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/html');
    res.end("Hello World");
});

server.listen(5040, () => {
    console.log("Server running at port 5040");
});

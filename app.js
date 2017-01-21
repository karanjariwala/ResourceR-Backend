const express = require('express'),
    http = require('http'),
    cors = require('cors');

const app = express();
server = http.Server(app);

require('./initialize.js').db(app);
require('./initialize.js').middleware(app);


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
    res.sendStatus(200);
});


app.get('/', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/html');
    res.end("Hello World");
});

server.listen(5040, () => {
    console.log("Server running at port 5040");
});

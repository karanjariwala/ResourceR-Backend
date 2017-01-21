const mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

module.exports.db = function(app){
	app.set('db', 'mongodb://localhost:27017/resource');
	mongoose.connect(app.get('db'));
	console.log("db connected");
};

module.exports.middleware = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended : true
	}));
	app.use(bodyParser.text({
		type:"text/plain"
	}));
	app.use(cookieParser("this is my secret key"));
};
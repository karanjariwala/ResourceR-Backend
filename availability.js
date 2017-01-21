const mongoose = require('mongoose'),
Schema = mongoose.Schema;
let availabilitySchema = mongoose.Schema({
	userId : {
		type : Schema.Types.ObjectId
	},
	name : {
		type : String
	},
	week : {
		type : Number
	},
	quarter : {
		type : Number
	}
});

module.exports = mongoose.model('availability', availabilitySchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var createMail = new Schema({
	to:{

		type: String,
		required: true
	},
	from:{

		type: String,
		required: true
	},

	

	emailBody:{

		type: String,
		required: true
	},
	messageid:{type:String, require:false},
	messageDelivered:{type:Boolean, require:false},
    creation_dt:{type:Date, require:true}
			
});
const sendMails = module.exports = mongoose.model('sendMails',createMail);

//module.exports = mongoose.model('sendMails',createMail);

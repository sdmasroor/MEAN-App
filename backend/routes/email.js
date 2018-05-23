var express = require('express');
var router = express.Router();
var sendMails = require('../models/emailModel');
var passport = require('passport');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
//const users = require('../model/email');

var options = {
	auth: {
		api_user: 'sdmasroor',
		api_key: 'Masroor@123'
	}
}

var mailer = nodemailer.createTransport(sgTransport(options));



router.post('/create',(req,res,next)=>{
	let create = new sendMails({
		to : req.body.to,
		from : req.body.from,
		emailBody : req.body.emailBody,
		creation_dt: Date.now()
	});

	create.save((err,item)=>{


		if(err){
			res.json(err);

		}
		else{

			var email = {
				to: [req.body.to],
				from: 'sdmasroor',
				subject: 'Hi there',
				text: req.body.emailBody,
				
			};
			if(item)
			{
				mailer.sendMail(email, function(err, response) {
					if (err) { 
						console.log(err) 
					}
   // console.log(res);
   if(response.message =='success'){
   	
   	sendMails.findOneAndUpdate({_id: item._id},{
   		$set:{
			//messageid: messageId,
			messageDelivered : true,
			
		}
	},{new:true},
	function(err,result){
		
		if(err){
			result.json(err);

		}
		else{
			res.json({msg :'Email Saved & sent successfully'});
		}

		
	}

	);
   }
   
   
});

			}
			

		}
	});
});


router.post('/getSentMails',(req,res,next)=>{

	var query = { _id : req.body.uid};
	sendMails.find(query,(err,item)=>{
		if(err){
			res.json(err);

		}
		else{
			
			res.json(item);
			
			
		}
	});

});


module.exports = router;
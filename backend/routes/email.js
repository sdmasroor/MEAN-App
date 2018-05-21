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
			res.json(req.body);

		}
		else{


    var email = {
    to: [req.body.to],
    from: 'sdmasroor',
    subject: 'Hi there',
    text: req.body.emailBody,
   // html: '<b>Awesome sauce</b>'
};
if(sendMail(email,item))
{
	console.log('#######');
	res.json({msg:"meaage"});
}
 

}
});
	});

function sendMail(email,item){
var response=false;

 mailer.sendMail(email, function(err, res) {
    if (err) { 
        console.log(err) 
    }
    console.log(res);
            if(res.message =='success'){
        	//res.json(item._id);
        	sendMails.findOneAndUpdate({_id: item._id},{
		$set:{
			//messageid: messageId,
			messageDelivered : true,
			
		}
	},{new:true},
	function(err,result){
			// if(res.message =='success')
			// { response =true;
		// console.log(response);
		//console.log(result);
	//}
			// if(err)
			// 	{ response= false;
			//  console.log(response);
			// }
			 return result;
	}
	);
        }
        console.log(response);

});

}



router.get('/getSentMails',(req,res,next)=>{

	//var query = { userName : req.body.username, password: req.body.Password};
	sendMails.find({},(err,item)=>{
		if(err){
			res.json(err);

		}
		else{
			
				res.json(item);
			
			
		}
	});

});


module.exports = router;
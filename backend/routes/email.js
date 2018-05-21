var express = require('express');
var router = express.Router();
var sendMails = require('../models/emailModel');
var passport = require('passport');
var nodemailer = require('nodemailer');
//const users = require('../model/email');


 router.post('/create',(req,res,next)=>{
	let create = new sendMails({
		to : req.body.to,
		from : req.body.from,
		emailBody : req.body.emailBody,
		  creation_dt: Date.now()
	});
	var output=`<p> You have  new email request from SD</p>
			<h3>Contact Details</h3>
			<ul>
			<li>From: SD Masroor</li>
			<li>to:${req.body.to}</li>
			<li>body:${req.body.emailBody}</li>
			</ul>
			<h3>Note</h3>
			<p>This is a test mail.</p>`;

	create.save((err,item)=>{


		if(err){
			res.json(req.body);

		}
		else{
			 let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'abc@gmail.com', // generated ethereal user
            pass: 'abcde' // generated ethereal password
        },
        tls:{
        	rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: req.body.from, // sender address
        to: req.body.to, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: req.body.emailBody, // plain text body
       // html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
       var messageId =  info.messageId;
        
        if(messageId !==''){
        	//res.json(item._id);
        	sendMails.findOneAndUpdate({_id: item._id},{
		$set:{
			messageid: messageId,
			messageDelivered : true,
			
		}
	},
	function(err,result){

		if(err){
			res.json(err);

		}
		else{
		res.json({msg :'Email Saved & sent successfully'});
		}
	}
	);
        }
        else{
        	res.json({msg :'OOPS! somthing went wrong.'});
        }
    });


			
		}
	}
	);


 });

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

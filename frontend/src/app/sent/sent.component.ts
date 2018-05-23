import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
sentmail:any={};
  constructor(private _user:UserService, private _router:Router) { }
    getSentMails()
	{
	let uid = {'uid':localStorage.getItem('userId')};
	this._user.getSentMails(uid)
	.subscribe((data)=>{
	
	this.sentmail = data;
	console.log(this.sentmail);
	});
	
	}
  ngOnInit() {
  this.getSentMails();
  }

}

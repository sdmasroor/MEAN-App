import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  mailDetails:any={};
  username:String='';
  msg:string='';
  email:any={};
  constructor(private _user:UserService, private _router:Router,private SessionService:SessionService,private MessageService:MessageService) { 
    this._user.user()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    )
  }


  addName(data){
    this.username = data.username;
  }
  ngOnInit() {
  this.getuserdetails();
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{console.log(data);
      this.SessionService.unSetStorage();
      this._router.navigate(['/login'])},
      error=>console.error(error)
    )
  }
  getuserdetails(){
 
 let uid = {'uid':localStorage.getItem('userId')};

  this._user.getuserdetails(uid)
    .subscribe((data)=>{
    this.mailDetails.from = data[0].email;
    console.log( data[0]._id);
    this.mailDetails.uid = data[0]._id;
    });

  }
   createMail()
  
  {
    console.log(this.mailDetails);
    this._user.createMail(this.mailDetails)
    .subscribe((data)=>{
    //this.msg = data.msg;
 //this.msg = this.MessageService.setMessage(data);
  setTimeout(this._router.navigate(['/sent']),10000);
    console.log(data);
    });
    
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
  constructor(private _user:UserService, private _router:Router) { 
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
      this._router.navigate(['/login'])},
      error=>console.error(error)
    )
  }
  getuserdetails(){
 
 let uid = {'uid':localStorage.getItem('userId')};

  this._user.getuserdetails(uid)
    .subscribe((data)=>{
    this.mailDetails.from = data[0].email;
    });

  }
   createMail()
  
  {
    console.log(this.mailDetails);
    this._user.createMail(this.mailDetails)
    .subscribe((data)=>{
    
    console.log(data);
    });
    
  }

}

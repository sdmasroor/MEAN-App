import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http:HttpClient) { }

  register(body:any){
  console.log(body)
    return this.http.post('http://127.0.0.1:5000/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){
    return this.http.post('http://127.0.0.1:5000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  user(){
    return this.http.get('http://127.0.0.1:5000/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  logout(){
    return this.http.get('http://127.0.0.1:5000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  createMail(mailDetails){
  console.log(mailDetails);
  return this.http.post('http://127.0.0.1:5000/emails/create',mailDetails,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });

  }
    getSentMails(uid){
console.log(uid);
   return this.http.post('http://127.0.0.1:5000/emails/getSentMails',uid,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

    getuserdetails(userId){
console.log(userId);
   return this.http.post('http://127.0.0.1:5000/users/getuserdetails',userId,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
}


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
   setStorage(user) 
 { localStorage.setItem('userId', user._id); } 

 unSetStorage() 
 { localStorage.removeItem('userId'); } 
}

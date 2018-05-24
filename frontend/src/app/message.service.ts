import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  setMessage(data){
  	var msg = data.msg;
  	return msg;

  }
}

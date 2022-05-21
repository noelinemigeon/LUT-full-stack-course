import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: { name: any; email: any; username: any; password: any; }){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined ) {
      return false;
    } else {
      return true;
    }
  }
  
  validateEmail(email:any){
    console.log(email.email)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.email)
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String; 
  username:String;
  email: String;
  password:String;

  constructor(private ValidateService: ValidateService, private FlashMessages:FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    }

    //Required Fields
    if(!this.ValidateService.validateRegister(user)){
      this.FlashMessages.show('Please fill in all fields',{cssClass: 'alert-danger',timeout: 3000});
      return false;
    }

    //Validate Email
    if(!this.ValidateService.validateEmail(user)){
      this.FlashMessages.show('Please use a valid email',{cssClass: 'alert-danger',timeout: 3000});
      return false;
    }
  } 

}

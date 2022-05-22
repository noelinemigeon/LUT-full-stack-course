import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router} from '@angular/router';

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
  dataRegister:any;

  constructor(
    private ValidateService: ValidateService, 
    private FlashMessages:FlashMessagesService,
    private AuthService: AuthService,
    private router:Router
  
  ) { }

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

    //Register User
    this.AuthService.registerUser(user).subscribe(data => {
      this.dataRegister=data;
      //console.log("DATA = ",data);
      if(this.dataRegister.success){
        this.FlashMessages.show('You are now registered and can log in',{cssClass: 'alert-success',timeout: 3000});
        this.router.navigate(['/login']);
      } else if(this.dataRegister.cause=="username"){
        this.FlashMessages.show('Username already exists : please choose another one.',{cssClass: 'alert-danger',timeout: 3000});
        this.router.navigate(['/register']);
      } else if(this.dataRegister.cause=="email"){
        this.FlashMessages.show('Email already exists : please choose another one.',{cssClass: 'alert-danger',timeout: 3000});
        this.router.navigate(['/register']);
      } else {
        this.FlashMessages.show('Something went wrong',{cssClass: 'alert-danger',timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  } 
 
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  dataLogin: any;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    } 

    this.authService.authenticateUser(user).subscribe(data => {
      //console.log(data);
      this.dataLogin=data;
      if(this.dataLogin.success){
        this.authService.storeUserData(this.dataLogin.token,this.dataLogin.user);
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success', 
          timeout: 5000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(this.dataLogin.msg, {
          cssClass: 'alert-danger', 
          timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

}

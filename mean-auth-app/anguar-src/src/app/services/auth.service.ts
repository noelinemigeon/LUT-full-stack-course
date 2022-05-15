import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  registerUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    //return this.http.post('http://localhost:3000/users/register', user, {headers: headers, observe: 'response'})
    //.pipe(map((res: any) => res.json));
    return this.http.post('http://localhost:3000/users/register', user, { headers });
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers });
  }

  getProfile(){
    //let headers = new HttpHeaders();
    this.loadToken(); //allows us to access the this.authToken
    //headers.append('Authorization',this.authToken);
    //headers.append('Content-Type','application/json'); 
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.authToken
});

    return this.http.get('http://localhost:3000/users/profile', { headers });
  }

  storeUserData(token:any, user:any){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  };

  loadToken(){
    //fetches token from localStorage
    const token = localStorage.getItem('id_token')
    this.authToken = token; 
  }

  logout(){
    //set back the arguments to null
    this.authToken = null;
    this.user = null;
    localStorage.clear(); //clears local storage
  }

}

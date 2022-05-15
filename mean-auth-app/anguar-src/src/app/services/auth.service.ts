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

  storeUserData(token:any, user:any){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  };

  logout(){
    //set back the arguments to null
    this.authToken = null;
    this.user = null;
    localStorage.clear(); //clears local storage
  }

}

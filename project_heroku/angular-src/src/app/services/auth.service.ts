import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  username: any;

  constructor(private http:HttpClient) { }

  registerUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('users/register', user, { headers });
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json'); 
    return this.http.post('users/authenticate', user, { headers });
  }

  getProfile(){
    this.loadToken(); //allows us to access the this.authToken
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.authToken
    });

    return this.http.get('users/profile', { headers });
  }

  getRecipes(){
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.authToken,
    });
    return this.http.get<any>(`users/myrecipes`, {headers})
  }

  modifyRecipe(id:any,newRecipe:any){
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.authToken,
    });
    return this.http.put<any>(`users/itemDetail/${id}/modifyRecipe`,newRecipe, {headers});
  }

  storeUserData(token:any, user:any){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('username',user.username);
    this.authToken=token;
    this.user=user;
  };

  loadToken(){
    //fetches token from localStorage
    const token = localStorage.getItem('id_token')
    this.authToken = token; 
  }

  loggedIn(){
    this.loadToken();
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.authToken);
  }

  logout(){
    //set back the arguments to null
    this.authToken = null;
    this.user = null;
    localStorage.clear(); //clears local storage
  }

}

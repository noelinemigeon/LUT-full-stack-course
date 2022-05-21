import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt"
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient) { }

  addItem(item:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('users/addItem', item, { headers });
  }

  addLike(id:any){
    console.log("Adding like")
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(`users/itemDetail/${id}/addLike`,id, {headers});
  }

  getItems(){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<any>('users/dashboard', {headers})
  }

  getItem(id:any){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<Item>(`users/itemDetail/${id}`).pipe(
    );
  }

  validateRecipe(recipe: { name: any; ingredients: any; recipe: any; difficulty: any; time: any}){
    if(recipe.name == undefined || recipe.ingredients == undefined || recipe.recipe == undefined || 
      recipe.difficulty == undefined || recipe.time == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateDifficulty(recipe: { name: any; ingredients: any; recipe: any; difficulty: any; time: any}){
    if(recipe.difficulty>5 || recipe.difficulty<1) {
      return false;
    } else {
      return true;
    }
  }

  validateTime(recipe: { name: any; ingredients: any; recipe: any; difficulty: any; time: any}){
    if(recipe.time<0) {
      console.log("wrong time")
      return false;
    } else {
      return true;
    }
  }

}

export interface Item {
  name: string;
  type: string;
  size: string;
  price: number;
}
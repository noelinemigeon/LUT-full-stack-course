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
    return this.http.post('http://localhost:3000/users/addItem', item, { headers });
  }

  addLike(id:any){
    console.log("Adding like")
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(`http://localhost:3000/users/itemDetail/${id}/addLike`,id, {headers});
  }

  getItems(){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<any>('http://localhost:3000/users/dashboard', {headers})
  }

  getItem(id:any){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<Item>(`http://localhost:3000/users/itemDetail/${id}`).pipe(
    );
  }
}

export interface Item {
  name: string;
  type: string;
  size: string;
  price: number;
}
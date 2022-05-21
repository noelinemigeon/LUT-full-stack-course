import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ItemsService } from 'src/app/services/items.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  name:String;
  ingredients:String;
  recipe:String;
  difficulty:Number;
  time:Number;
  likes:Number;
  dataItem:any;
  username:any;

  constructor(
    private router:Router,
    private flashMessage:FlashMessagesService,
    private itemService:ItemsService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  addItem(){

    this.username =localStorage.getItem('username')
    console.log("Username = ",this.username)
    const item = {
      name: this.name,
      ingredients: this.ingredients,
      recipe: this.recipe,
      difficulty: this.difficulty,
      time: this.time,
      username:this.username
    }

    //Required Fields
    if(!this.itemService.validateRecipe(item)){
      this.flashMessage.show('Please fill in all fields',{cssClass: 'alert-danger',timeout: 3000});
      return false;
    }

    //Correct difficulty
    if(!this.itemService.validateDifficulty(item)){
      this.flashMessage.show("The difficulty has to be between 1 and 5",{cssClass: 'alert-danger',timeout: 3000});
      return false;
    }

    //Correct time
    if(!this.itemService.validateTime(item)){
      this.flashMessage.show("The time can't be negative",{cssClass: 'alert-danger',timeout: 3000});
      return false;
    }

    this.itemService.addItem(item).subscribe(data =>{
      this.dataItem=data;
      console.log("Username : ",this.username)
      console.log(data);
      if(this.dataItem.success){
        this.flashMessage.show('Item successfuly added',{cssClass: 'alert-success',timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('Something went wrong',{cssClass: 'alert-danger',timeout: 3000});
        this.router.navigate(['/addItem']);
      }
    })
  }

}

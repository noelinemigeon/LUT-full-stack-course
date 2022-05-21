import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-recipe-modify',
  templateUrl: './recipe-modify.component.html',
  styleUrls: ['./recipe-modify.component.css']
})
export class RecipeModifyComponent implements OnInit {
  newRecipe:any;
  name:String;
  ingredients:String;
  recipe:String;
  difficulty:Number;
  time:Number;
  oldRecipe:any;

  constructor(
    private authService:AuthService,
    private route:ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private router:Router,
    private itemService:ItemsService
  ) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log("id from recipe = ",id)
    this.oldRecipe=this.itemService.getItem(id).subscribe(item => {
      this.oldRecipe=item;
      this.oldRecipe.username=this.oldRecipe.item.username
      this.oldRecipe.name=this.oldRecipe.item.name
      this.oldRecipe.ingredients=this.oldRecipe.item.ingredients
      this.oldRecipe.recipe=this.oldRecipe.item.recipe
      this.oldRecipe.difficulty=this.oldRecipe.item.difficulty
      this.oldRecipe.time=this.oldRecipe.item.time
      console.log("Old recipe = ",this.oldRecipe)
    });
  }

  modifyRecipe(){
    const recipe = {
      name: this.name,
      ingredients: this.ingredients,
      recipe: this.recipe,
      difficulty: this.difficulty,
      time: this.time,
    }

    //Not required here because of pre-fill
    // //Required Fields
    // if(!this.itemService.validateRecipe(recipe)){
    //   this.flashMessage.show('Please fill in all fields',{cssClass: 'alert-danger',timeout: 3000});
    //   return false;
    // }

    //Correct difficulty
    if(!this.itemService.validateDifficulty(recipe)){
      this.flashMessage.show("The difficulty has to be between 1 and 5",{cssClass: 'alert-danger',timeout: 3000});
      return false;
    }

    //Correct time
    if(!this.itemService.validateTime(recipe)){
      console.log("correct time")
      this.flashMessage.show("The time can't be negative",{cssClass: 'alert-danger',timeout: 3000});
      return false;
    }

    const id = String(this.route.snapshot.paramMap.get('id'));
    this.authService.modifyRecipe(id,recipe).subscribe(newRecipeValues =>{
      this.newRecipe=newRecipeValues;
      if(this.newRecipe.success){
        this.flashMessage.show('Recipe successfully modified',{cssClass: 'alert-success',timeout: 3000});
        this.router.navigate([`/itemDetail/${id}`]);
        //window.location.reload();
      } else {
        this.flashMessage.show('Something went wrong. If you tried to modify the recipe, remember that only the owner of the recipe can modify it!',{cssClass: 'alert-danger',timeout: 5000});
        this.router.navigate(['/dashboard']);
      }
    })
  } 

}
